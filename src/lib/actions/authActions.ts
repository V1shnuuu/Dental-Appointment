'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { loginUser, logoutUser, getSession } from '@/lib/auth';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signupAction(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = signupSchema.safeParse(data);
    
    if (!parsed.success) {
      return { error: 'Invalid fields. Password must be 8+ chars.' };
    }
    
    // 1. Check if user exists in Prisma
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: parsed.data.email },
          { phone: parsed.data.phone }
        ]
      }
    });

    if (existingUser) {
      return { error: 'User with this email or phone already exists.' };
    }

    // 2. Create User in Firebase
    let firebaseUser: FirebaseUser;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        parsed.data.email, 
        parsed.data.password
      );
      firebaseUser = userCredential.user;
    } catch (fbError: any) {
      console.error('Firebase Signup Error:', fbError.code);
      if (fbError.code === 'auth/email-already-in-use') {
        return { error: 'Email already in use in Firebase.' };
      }
      return { error: 'Firebase error: ' + fbError.message };
    }

    // 3. Create User in Prisma linked to Firebase
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const role = parsed.data.email.toLowerCase().includes('.clinic') ? 'doctor' : 'patient';

    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        phone: parsed.data.phone,
        passwordHash,
        firebaseUid: firebaseUser.uid,
        role: role,
        ...(role === 'patient' ? {
          patientProfile: {
            create: {
              firstName: parsed.data.firstName,
              lastName: parsed.data.lastName,
            }
          }
        } : {})
      }
    });

    await loginUser({ id: user.id, email: user.email, role: user.role });
    return { success: true, role: user.role };
  } catch (error: any) {
    console.error('Signup Error:', error);
    return { error: error.message };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return { error: 'Invalid fields.' };
    }

    // Demo Accounts Bypass
    if (parsed.data.email === 'patient@demo.com' && parsed.data.password === 'demo123') {
      await loginUser({ id: 'demo-patient-id', email: 'patient@demo.com', role: 'patient' });
      return { success: true, role: 'patient' };
    }
    if (parsed.data.email === 'doctor@demo.com' && parsed.data.password === 'demo123') {
      await loginUser({ id: 'demo-doctor-id', email: 'doctor@demo.com', role: 'doctor' });
      return { success: true, role: 'doctor' };
    }

    // 1. Try Firebase Login first
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        parsed.data.email,
        parsed.data.password
      );
      const firebaseUser = userCredential.user;

      const user = await prisma.user.findUnique({
        where: { firebaseUid: firebaseUser.uid }
      });

      if (user) {
        await loginUser({ id: user.id, email: user.email, role: user.role });
        return { success: true, role: user.role };
      }
      // If firebase user exists but not in Prisma, handle it (e.g. sync or error)
      console.warn('Firebase user exists but no Prisma record found:', firebaseUser.uid);
    } catch (fbError: any) {
      console.log('Firebase Login failed, trying legacy local login...');
    }

    // 2. Fallback to Legacy Login (Prisma + Bcrypt)
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    });

    if (!user || !user.passwordHash) {
      return { error: 'Invalid credentials.' };
    }

    const isMatch = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isMatch) {
      return { error: 'Invalid credentials.' };
    }

    // Sync legacy user to Firebase if they don't have a UID yet? 
    // For now, just log them in normally
    await loginUser({ id: user.id, email: user.email, role: user.role });
    return { success: true, role: user.role };
  } catch (error: any) {
    console.error('loginAction Error:', error);
    return { error: error.message || 'An internal error occurred.' };
  }
}

export async function logoutAction() {
  await logoutUser();
}

export async function getUserProfileAction() {
  const session = await getSession();
  if (!session || !session.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: {
      patientProfile: true,
      doctorProfile: true
    }
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.patientProfile?.firstName || '',
    lastName: user.patientProfile?.lastName || '',
    phone: user.phone || '',
    name: user.patientProfile 
      ? `${user.patientProfile.firstName} ${user.patientProfile.lastName}` 
      : (user.email?.split('@')[0] || 'User')
  };
}

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session || !session.id) return { error: 'Not authenticated' };

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;

  try {
    // 1. Update user phone
    await prisma.user.update({
      where: { id: session.id },
      data: { phone }
    });

    // 2. Upsert patient profile
    await prisma.patientProfile.upsert({
      where: { userId: session.id },
      update: {
        firstName: firstName,
        lastName: lastName
      },
      create: {
        userId: session.id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        dateOfBirth: new Date('1990-01-01') // Default to prevent validation errors if client is out of sync
      }
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Update Profile Error Detailed:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    return { error: `Failed to update profile: ${error.message}` };
  }
}
