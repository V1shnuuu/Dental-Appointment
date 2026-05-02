'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function bookAppointmentAction(data: {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}) {
  const session = await getSession();
  if (!session || !session.id) {
    return { error: 'You must be logged in to book an appointment.' };
  }

  try {
    const appointment = await prisma.appointment.create({
      data: {
        patientId: session.id,
        doctorId: data.doctorId,
        date: new Date(data.date),
        time: data.time,
        reason: data.reason,
        status: 'confirmed',
      },
    });

    revalidatePath('/patient/dashboard');
    return { success: true, appointment };
  } catch (error: any) {
    console.error('Booking Error:', error);
    return { error: 'Failed to book appointment: ' + error.message };
  }
}

export async function getPatientAppointmentsAction() {
  const session = await getSession();
  if (!session || !session.id) return [];

  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientId: session.id },
      include: {
        doctor: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return appointments.map(appt => ({
      id: appt.id,
      doctor: appt.doctor.name,
      specialty: appt.doctor.specialty,
      date: appt.date.toISOString().split('T')[0],
      time: appt.time,
      reason: appt.reason,
      status: appt.status,
      initials: appt.doctor.name.split(' ').map(n => n[0]).join(''),
    }));
  } catch (error) {
    console.error('Fetch Appointments Error:', error);
    return [];
  }
}
