'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, UserCheck } from 'lucide-react';
import { useIntake } from '@/context/IntakeContext';

const MOCK_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM'];

export default function BookingStep() {
  const { prevStep, bookingDetails, setBookingDetails, submitForm, isSubmitting } = useIntake();
  
  const [selectedDate, setSelectedDate] = useState<number | null>(bookingDetails.date ? parseInt(bookingDetails.date) : null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(bookingDetails.timeSlot || null);

  const [step, setStep] = useState<number>(bookingDetails.doctorId ? 2 : 1); 

  const currentMonth = 'October 2026';
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleConfirm = async () => {
    // Save to context
    setBookingDetails({ 
      ...bookingDetails, 
      date: `${currentMonth.split(' ')[0]} ${selectedDate}`, 
      timeSlot: selectedSlot!
    });
    
    // Attempt Submit
    await submitForm(); // This handles backend save + Telegram notification inside Context
  };

  const containerVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="flex flex-col relative" style={{ minHeight: '400px' }}>
      
      <AnimatePresence mode="wait">
        
        {step === 1 && (
          <motion.div key="step1" variants={containerVars} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-4">
            <h2 style={{ marginBottom: '0.5rem' }}>Select Doctor</h2>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>Choose your preferred specialist.</p>
            
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {[
                { id: '1', name: 'Dr. Sarah Smith', spec: 'General Dentist' },
                { id: '2', name: 'Dr. Alex Carter', spec: 'Orthodontist' },
              ].map(doc => (
                <motion.button
                  key={doc.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setBookingDetails({ ...bookingDetails, doctorId: doc.id });
                    setStep(2);
                  }}
                  className="glass flex flex-col items-start"
                  style={{
                    padding: '1.5rem',
                    border: bookingDetails.doctorId === doc.id ? '2px solid var(--primary-color)' : 'var(--glass-border)',
                    background: bookingDetails.doctorId === doc.id ? 'rgba(77, 168, 218, 0.1)' : 'var(--card-bg)',
                    cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <UserCheck color={bookingDetails.doctorId === doc.id ? 'var(--primary-color)' : 'var(--text-muted)'} size={24} className="mb-2" />
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{doc.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>{doc.spec}</div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <button type="button" className="btn btn-secondary" onClick={prevStep}>Back to Medical</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={containerVars} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="btn text-muted" style={{ padding: '0', background: 'transparent', justifyContent: 'flex-start', width: 'fit-content' }}>
                <ChevronLeft size={18} /> Back
              </button>
              <h3 className="flex items-center gap-2"><CalendarIcon /> {currentMonth}</h3>
            </div>

            {/* Calendar UI */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-muted" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d}</div>
              ))}
              {/* empty offsets */}
              <div></div><div></div><div></div><div></div>
              {days.map(d => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedDate(d); setSelectedSlot(null); setStep(3); }}
                  style={{
                    padding: '1rem 0',
                    borderRadius: '12px', border: 'none',
                    background: selectedDate === d ? 'var(--gradient-primary)' : 'transparent',
                    color: selectedDate === d ? 'white' : 'var(--text-main)',
                    fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s'
                  }}
                  className={selectedDate === d ? 'shadow-hover' : ''}
                >
                  {d}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-4">
              <button type="button" className="btn btn-secondary" onClick={prevStep}>Back to Medical</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={containerVars} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-6">
            <button onClick={() => setStep(2)} className="btn text-muted" style={{ padding: '0', background: 'transparent', justifyContent: 'flex-start', width: 'fit-content' }}>
              <ChevronLeft size={18} /> Back to Calendar
            </button>
            
            <h3 className="flex items-center gap-2">
              <Clock /> Select Time for {currentMonth.split(' ')[0]} {selectedDate}
            </h3>

            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
              {MOCK_SLOTS.map((slot) => (
                <motion.button
                  key={slot}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSlot(slot)}
                  className="glass"
                  style={{
                    padding: '1rem',
                    border: selectedSlot === slot ? '2px solid var(--primary-color)' : 'var(--glass-border)',
                    background: selectedSlot === slot ? 'rgba(77, 168, 218, 0.1)' : 'var(--card-bg)',
                    fontWeight: 600,
                    color: selectedSlot === slot ? 'var(--primary-color)' : 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  {slot}
                </motion.button>
              ))}
            </div>

            {selectedSlot && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex flex-col gap-4 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="input-group">
                  <label className="input-label">Additional Notes for Doctor</label>
                  <textarea 
                    className="input-field" 
                    placeholder="E.g., I'm feeling very anxious about this visit."
                    rows={3}
                    value={bookingDetails.notes}
                    onChange={e => setBookingDetails({...bookingDetails, notes: e.target.value})}
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button className="btn btn-primary" onClick={handleConfirm} disabled={isSubmitting} style={{ width: '100%', maxWidth: '250px' }}>
                    {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
