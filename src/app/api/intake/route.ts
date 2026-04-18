import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientDetails, medicalDetails, bookingDetails } = body;

    // 1. Transaction to safely create User, Info, and Appointment
    const result = await prisma.$transaction(async (tx) => {
      
      // a. Create or update User
      let user = await tx.user.findFirst({
        where: { phone: patientDetails.phone }
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            phone: patientDetails.phone,
            email: patientDetails.email || null,
          }
        });
      }

      // b. Upsert PatientInfo
      const patientInfo = await tx.patientInfo.upsert({
        where: { userId: user.id },
        update: {
          fullName: patientDetails.fullName,
          age: parseInt(patientDetails.age) || 0,
          gender: patientDetails.gender,
          address: patientDetails.address || '',
          diabetes: medicalDetails.diabetes,
          bloodPressure: medicalDetails.bloodPressure,
          allergies: medicalDetails.allergies,
          previousVisit: medicalDetails.previousVisit,
          previousVisitDate: medicalDetails.previousVisitDate,
        },
        create: {
          userId: user.id,
          fullName: patientDetails.fullName,
          age: parseInt(patientDetails.age) || 0,
          gender: patientDetails.gender,
          address: patientDetails.address || '',
          diabetes: medicalDetails.diabetes,
          bloodPressure: medicalDetails.bloodPressure,
          allergies: medicalDetails.allergies,
          previousVisit: medicalDetails.previousVisit,
          previousVisitDate: medicalDetails.previousVisitDate,
        }
      });

      // c. Create Appointment
      // (Using a fallback doctor if the DB is unseeded yet, or the mocked ID)
      const appointment = await tx.appointment.create({
        data: {
          patientId: user.id,
          // Since we didn't seed doctors rigidly for the MVP, use a dummy or create one if it doesn't exist
          doctor: {
            connectOrCreate: {
              where: { id: bookingDetails.doctorId },
              create: {
                id: bookingDetails.doctorId,
                name: bookingDetails.doctorId === '1' ? 'Dr. Sarah Smith' : 'Dr. Alex Carter',
                specialty: 'General Dentist'
              }
            }
          },
          appointmentDate: bookingDetails.date,
          appointmentTime: bookingDetails.timeSlot,
          reason: medicalDetails.reason === 'Other' ? medicalDetails.otherReason : medicalDetails.reason,
          painLevel: medicalDetails.painLevel,
          notes: bookingDetails.notes
        }
      });

      return appointment;
    });

    // 2. Dispatch Telegram Notification
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (BOT_TOKEN && CHAT_ID) {
      const msg = `🚨 <b>New Patient Intake & Booking!</b>\n\n👤 <b>Patient:</b> ${patientDetails.fullName}\n📞 <b>Phone:</b> ${patientDetails.phone}\n💊 <b>Reason:</b> ${medicalDetails.reason}\n🌡 <b>Pain Level:</b> ${medicalDetails.painLevel}/10\n\n🗓 <b>Date:</b> ${bookingDetails.date}\n⏰ <b>Time:</b> ${bookingDetails.timeSlot}\n\n🆔 <b>Booking ID:</b> ${result.id.slice(0, 8).toUpperCase()}`;
      
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' }),
      }).catch(err => console.error("Telegram error:", err)); // fire and forget
    }

    return NextResponse.json({ 
      success: true, 
      appointmentId: result.id.slice(0, 8).toUpperCase() 
    });

  } catch (error: any) {
    console.error('Intake Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
