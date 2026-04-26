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
    
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        phone: parsed.data.phone,
        passwordHash,
        role: 'patient',
      }
    });

    await loginUser({ id: user.id, email: user.email, role: user.role });
    return { success: true };
  } catch (error: any) {
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

    await loginUser({ id: user.id, email: user.email, role: user.role });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logoutAction() {
  await logoutUser();
}
