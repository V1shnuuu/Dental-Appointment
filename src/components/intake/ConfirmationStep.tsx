'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Home, ArrowRight } from 'lucide-react';
import { useIntake } from '@/context/IntakeContext';
import Link from 'next/link';

export default function ConfirmationStep() {
  const { confirmationId, patientDetails, bookingDetails } = useIntake();

  // Find doc mock name to display
  const docName = bookingDetails.doctorId === '1' ? 'Dr. Sarah Smith' : 'Dr. Alex Carter';

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center" style={{ minHeight: '350px' }}>
      
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        style={{ background: 'rgba(46,196,182,0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem' }}
      >
        <CheckCircle color="var(--secondary-color)" size={64} />
      </motion.div>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
      <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        Thank you, {patientDetails.fullName}. Your appointment has been successfully scheduled.
      </p>

      <div className="glass flex flex-col items-start text-left w-full" style={{ padding: '2rem', maxWidth: '400px', marginBottom: '2rem' }}>
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', width: '100%', marginBottom: '1rem' }}>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Booking ID</div>
          <div style={{ fontWeight: 600, fontFamily: 'monospace', letterSpacing: '2px', color: 'var(--primary-color)' }}>{confirmationId}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Doctor</div>
            <div style={{ fontWeight: 500 }}>{docName}</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Patient</div>
            <div style={{ fontWeight: 500 }}>{patientDetails.fullName}</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Date</div>
            <div style={{ fontWeight: 500 }}>{bookingDetails.date}</div>
          </div>
          <div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Time</div>
            <div style={{ fontWeight: 500 }}>{bookingDetails.timeSlot}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="btn btn-secondary flex items-center gap-2">
          <Download size={18} /> Download Receipt
        </button>
        <Link href="/dashboard" className="btn btn-primary flex items-center gap-2">
          Back to Dashboard <ArrowRight size={18} />
        </Link>
      </div>

    </motion.div>
  );
}
