'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MOCK_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM', '03:00 PM', '04:30 PM'
];

export default function BookingPage() {
  const { role } = useAuth();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);

  // Generate simple mock days array
  const currentMonth = 'October 2026';
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleBooking = async () => {
    setIsBooking(true);
    
    // Fire Notification API Route asynchronously
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `🚨 <b>New Appointment Booked!</b>\n\n👤 <b>Patient:</b> ${role === 'guest' ? 'Guest' : 'Demo User'}\n🗓 <b>Date:</b> ${currentMonth.split(' ')[0]} ${selectedDate}\n⏰ <b>Time:</b> ${selectedSlot}`
      })
    }).catch(err => console.error("Notification failed:", err));

    setTimeout(() => {
      setIsBooking(false);
      setStep(3);
    }, 1500);
  };

  const containerVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="container mt-8 flex flex-col items-center" style={{ padding: '2rem 1rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 style={{ fontSize: '2.5rem' }}>Book an <span className="text-gradient">Appointment</span></h1>
        <p className="text-muted">Select a date and time that works best for you.</p>
      </motion.div>

      <div className="glass" style={{ width: '100%', maxWidth: '800px', padding: '2rem', minHeight: '500px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div key="step1" variants={containerVars} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2"><CalendarIcon /> {currentMonth}</h3>
                <div className="flex gap-2">
                  <button className="btn" style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.05)' }}><ChevronLeft size={20} /></button>
                  <button className="btn" style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.05)' }}><ChevronRight size={20} /></button>
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className="text-muted" style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d}</div>
                ))}
                {/* empty offsets */}
                <div></div><div></div><div></div><div></div>
                {/* Days */}
                {days.map(d => (
                  <motion.button
                    key={d}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedDate(d); setStep(2); }}
                    style={{
                      padding: '1rem 0',
                      borderRadius: '12px',
                      border: 'none',
                      background: selectedDate === d ? 'var(--gradient-primary)' : 'transparent',
                      color: selectedDate === d ? 'white' : 'var(--text-main)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                    className={selectedDate === d ? 'shadow-hover' : ''}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={containerVars} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-6 relative">
              <button 
                onClick={() => setStep(1)} 
                className="btn text-muted" 
                style={{ padding: '0', background: 'transparent', justifyContent: 'flex-start', width: 'fit-content' }}
              >
                <ChevronLeft size={18} /> Back to Calendar
              </button>
              
              <h3 className="flex items-center gap-2">
                <Clock /> Select Time for {currentMonth.split(' ')[0]} {selectedDate}
              </h3>

              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                {MOCK_SLOTS.map((slot, i) => (
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleBooking}
                    disabled={isBooking || role === 'guest'}
                    style={{ opacity: role === 'guest' ? 0.5 : 1, width: '100%', maxWidth: '250px' }}
                  >
                    {isBooking ? 'Confirming...' : 'Confirm Appointment'}
                  </button>
                </motion.div>
              )}
              {role === 'guest' && selectedSlot && (
                <p className="text-center text-muted" style={{ fontSize: '0.9rem' }}>Please log in to confirm booking.</p>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center" style={{ minHeight: '300px' }}>
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                style={{ background: 'rgba(46,196,182,0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem' }}
              >
                <CheckCircle color="var(--secondary-color)" size={64} />
              </motion.div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Booking Confirmed!</h2>
              <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>
                Your appointment on <strong>{currentMonth.split(' ')[0]} {selectedDate} at {selectedSlot}</strong> has been successfully scheduled.
              </p>
              <button className="btn btn-secondary" onClick={() => { setStep(1); setSelectedDate(null); setSelectedSlot(null); }}>
                Book Another
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
