'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { loginUser, logoutUser } from '@/lib/auth';
import { z } from 'zod';

const signupSchema = z.object({
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

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    
    // Determine role based on keyword
    const role = parsed.data.email.toLowerCase().includes('.clinic') ? 'doctor' : 'patient';

    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        phone: parsed.data.phone,
        passwordHash,
        role: role,
      }
    });

    await loginUser({ id: user.id, email: user.email, role: user.role });
    return { success: true, role: user.role };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  console.log('--- loginAction Start ---');
  try {
    const data = Object.fromEntries(formData.entries());
    console.log('Login attempt for:', data.email);
    
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      console.log('Validation failed');
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
    
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    });

    if (!user || !user.passwordHash) {
      console.log('User not found');
      return { error: 'Invalid credentials.' };
    }

    const isMatch = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isMatch) {
      console.log('Password mismatch');
      return { error: 'Invalid credentials.' };
    }

    // Dynamic role logic based on keyword
    let currentRole = user.role;
    if (parsed.data.email.toLowerCase().includes('.clinic')) {
      currentRole = 'doctor';
    }
    console.log('Assigned role:', currentRole);

    await loginUser({ id: user.id, email: user.email, role: currentRole });
    console.log('Session created, returning success');
    return { success: true, role: currentRole };
  } catch (error: any) {
    console.error('loginAction Error:', error);
    return { error: error.message || 'An internal error occurred.' };
  }
}

export async function logoutAction() {
  await logoutUser();
}
