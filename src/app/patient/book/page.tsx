'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Star, MapPin, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { bookAppointmentAction } from '@/lib/actions/appointmentActions';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect reschedule mode from query params
  const isReschedule = searchParams.get('reschedule') === 'true';
  const existingDoctor = searchParams.get('doctor');
  const existingSpecialty = searchParams.get('specialty');
  const existingInitials = searchParams.get('initials');
  const existingLocation = searchParams.get('location');
  const existingDate = searchParams.get('date');
  const existingTime = searchParams.get('time');
  const existingReason = searchParams.get('reason');

  const doctors = [
    { id: 'dr-sarah-smith', name: 'Dr. Sarah Smith', specialty: 'General Dentist', rating: 4.9, initials: 'SS', location: 'Main Campus', gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)' },
    { id: 'dr-michael-chen', name: 'Dr. Michael Chen', specialty: 'Orthodontist', rating: 4.8, initials: 'MC', location: 'East Wing', gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)' },
    { id: 'dr-emily-carter', name: 'Dr. Emily Carter', specialty: 'Endodontist', rating: 4.9, initials: 'EC', location: 'Suite 200', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
  ];

  // If rescheduling, auto-select the doctor and skip to step 2
  const matchedDoctor = isReschedule
    ? doctors.find(d => d.name === existingDoctor) || {
        id: 99, name: existingDoctor || '', specialty: existingSpecialty || '',
        rating: 5.0, initials: existingInitials || '??', location: existingLocation || '',
        gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)',
      }
    : null;

  const [step, setStep] = useState(isReschedule ? 2 : 1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(matchedDoctor);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState(existingReason || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialties = ['All', 'General Dentist', 'Orthodontist', 'Endodontist'];
  const filteredDoctors = selectedSpecialty === 'All' ? doctors : doctors.filter(d => d.specialty === selectedSpecialty);

  const slots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: false },
    { time: '03:00 PM', available: true },
  ];

  const handleConfirm = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;
    
    setIsSubmitting(true);
    const result = await bookAppointmentAction({
      doctorId: selectedDoctor.id.toString(),
      date: selectedDate,
      time: selectedSlot,
      reason: reason
    });

    if (result.success) {
      setStep(4);
    } else {
      alert(result.error || 'Failed to book appointment');
    }
    setIsSubmitting(false);
  };

  const handleAddToGoogleCalendar = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;

    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const { hours, minutes } = parseTime(selectedSlot);
    const [year, month, day] = selectedDate.split('-').map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const fmt = (d: Date) =>
      d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0') + 'T' +
      String(d.getHours()).padStart(2, '0') +
      String(d.getMinutes()).padStart(2, '0') + '00';

    const title = encodeURIComponent(`Dental Appointment — ${selectedDoctor.name}`);
    const details = encodeURIComponent(
      `Specialty: ${selectedDoctor.specialty}\nReason: ${reason}\n\nBooked via DentalCare+`
    );
    const location = encodeURIComponent(`DentalCare+ ${selectedDoctor.location}`);
    const dates = `${fmt(startDate)}/${fmt(endDate)}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const pageTitle = isReschedule ? 'Reschedule Appointment' : 'Book Appointment';
  const pageDesc = isReschedule
    ? 'Choose a new date and time for your existing appointment.'
    : 'Find a specialist and schedule your visit.';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {step < 4 && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
          {/* Reschedule Banner */}
          {isReschedule && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px',
              borderRadius: 14, background: 'var(--amber-soft)', border: '1px solid rgba(245,158,11,0.15)',
              marginBottom: 20,
            }}>
              <RefreshCw size={18} style={{ color: 'var(--amber)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber)' }}>Rescheduling Appointment</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Current: {existingDoctor} · {existingDate} at {existingTime}
                </div>
              </div>
            </div>
          )}

          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>{pageTitle}</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{pageDesc}</p>

          {/* Steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 24 }}>
            {(isReschedule ? ['New Schedule', 'Confirm'] : ['Doctor', 'Schedule', 'Confirm']).map((s, i) => {
              const stepNum = isReschedule ? i + 2 : i + 1;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                    background: step > stepNum ? 'var(--accent)' : step === stepNum ? 'var(--accent-soft)' : 'var(--bg-subtle)',
                    color: step > stepNum ? 'white' : step === stepNum ? 'var(--accent)' : 'var(--text-tertiary)',
                    border: step === stepNum ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'all 0.3s',
                  }}>
                    {step > stepNum ? <CheckCircle2 size={14} /> : (isReschedule ? i + 1 : i + 1)}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: step >= stepNum ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s}</span>
                  {i < (isReschedule ? 1 : 2) && <div style={{ flex: 1, height: 2, background: step > stepNum ? 'var(--accent)' : 'var(--border)', borderRadius: 2, marginLeft: 4, transition: 'background 0.4s' }} />}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Select Doctor (skip in reschedule mode) */}
        {step === 1 && !isReschedule && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {specialties.map(s => (
                <button key={s} onClick={() => setSelectedSpecialty(s)}
                  style={{
                    padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    background: selectedSpecialty === s ? 'var(--accent)' : 'var(--bg-surface)',
                    color: selectedSpecialty === s ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${selectedSpecialty === s ? 'var(--accent)' : 'var(--border)'}`,
                    transition: 'all 0.2s',
                  }}
                >{s}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="card" onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                  style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: doc.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                    {doc.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{doc.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{doc.specialty}</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-tertiary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} fill="#F59E0B" color="#F59E0B" /> {doc.rating}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {doc.location}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Schedule */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* Doctor Summary — locked in reschedule mode */}
            <div className="card" style={{ padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: selectedDoctor?.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
                {selectedDoctor?.initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedDoctor?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{selectedDoctor?.specialty}</div>
              </div>
              {isReschedule ? (
                <span className="badge badge-amber" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <RefreshCw size={12} /> Same Doctor
                </span>
              ) : (
                <button onClick={() => setStep(1)} style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
              )}
            </div>

            {/* Show previous date/time for context */}
            {isReschedule && (
              <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-subtle)' }}>
                <div style={{ width: 4, height: 32, borderRadius: 4, background: 'var(--text-tertiary)' }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Schedule</div>
                  <div style={{ fontSize: 13, fontWeight: 500, textDecoration: 'line-through', color: 'var(--text-secondary)' }}>
                    {existingDate} at {existingTime}
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                  {selectedDate && selectedSlot ? `${selectedDate} at ${selectedSlot}` : 'Select new date & time →'}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CalendarDays size={16} style={{ color: 'var(--accent)' }} /> {isReschedule ? 'New Date' : 'Select Date'}
                </h4>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input-field"
                  min={new Date().toISOString().split('T')[0]} style={{ marginBottom: 20 }} />

                {selectedDate && (
                  <>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Clock size={16} style={{ color: 'var(--teal)' }} /> Available Slots
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {slots.map((slot, i) => (
                        <button key={i} disabled={!slot.available} onClick={() => setSelectedSlot(slot.time)}
                          className={`time-slot ${slot.available ? (selectedSlot === slot.time ? 'selected' : 'available') : 'booked'}`}>
                          {slot.time}
                        </button>
                      ))}
                    </div>
                    {selectedSlot && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 12px', borderRadius: 10, background: 'var(--amber-soft)', color: 'var(--amber)', fontSize: 12, fontWeight: 500 }}>
                        <AlertCircle size={14} /> Slot held for 5 minutes
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Reason for Visit</h4>
                <textarea value={reason} onChange={e => setReason(e.target.value)} className="input-field" placeholder="Describe your symptoms or reason..."
                  style={{ minHeight: 140, resize: 'vertical', flex: 1 }} />
                <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedSlot || !reason}
                  className="btn btn-primary" style={{ width: '100%', marginTop: 16, opacity: (!selectedDate || !selectedSlot || !reason) ? 0.5 : 1 }}>
                  {isReschedule ? 'Review Changes' : 'Continue to Summary'} <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {!isReschedule && (
              <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ marginTop: 12 }}>
                <ArrowLeft size={16} /> Back to Doctors
              </button>
            )}
            {isReschedule && (
              <button onClick={() => router.push('/patient/dashboard')} className="btn btn-ghost" style={{ marginTop: 12 }}>
                <ArrowLeft size={16} /> Cancel Reschedule
              </button>
            )}
          </motion.div>
        )}

        {/* STEP 3: Summary */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="card" style={{ maxWidth: 520, margin: '0 auto', overflow: 'hidden' }}>
              <div style={{ padding: '32px 32px 24px', background: isReschedule ? 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' : 'linear-gradient(135deg, #EFF6FF, #F0FDFA)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
                {isReschedule && <RefreshCw size={20} style={{ color: 'var(--amber)', marginBottom: 8 }} />}
                <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {isReschedule ? 'Confirm Reschedule' : 'Appointment Summary'}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {isReschedule ? 'Review your updated appointment details' : 'Review and confirm your booking'}
                </p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Show old → new comparison for reschedule */}
                {isReschedule && (
                  <div style={{ padding: 16, borderRadius: 12, background: 'var(--bg-subtle)', border: '1px solid var(--border)', marginBottom: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Schedule Change</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', fontSize: 13 }}>
                        {existingDate} · {existingTime}
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                        {selectedDate} · {selectedSlot}
                      </div>
                    </div>
                  </div>
                )}

                {[
                  { label: 'Doctor', value: selectedDoctor?.name },
                  { label: 'Specialty', value: selectedDoctor?.specialty },
                  { label: isReschedule ? 'New Date' : 'Date', value: selectedDate },
                  { label: isReschedule ? 'New Time' : 'Time', value: selectedSlot },
                  { label: 'Reason', value: reason },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{r.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
                  <button onClick={handleConfirm} disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1 }}>
                    {isSubmitting ? (isReschedule ? 'Updating...' : 'Confirming...') : (isReschedule ? 'Confirm Reschedule' : 'Confirm Booking')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Success */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{ width: 80, height: 80, borderRadius: '50%', background: isReschedule ? 'linear-gradient(135deg, var(--amber), #F97316)' : 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: isReschedule ? '0 8px 32px rgba(245,158,11,0.3)' : 'var(--shadow-glow)' }}>
              {isReschedule ? <RefreshCw size={36} color="white" /> : <CheckCircle2 size={36} color="white" />}
            </motion.div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              {isReschedule ? 'Appointment Rescheduled!' : 'Booking Confirmed!'}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6 }}>
              Your appointment with {selectedDoctor?.name} is {isReschedule ? 'now moved to' : 'set for'} {selectedDate} at {selectedSlot}.
            </p>
            {isReschedule && (
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 24, lineHeight: 1.5 }}>
                Previous: <span style={{ textDecoration: 'line-through' }}>{existingDate} at {existingTime}</span>
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: isReschedule ? 0 : 20 }}>
              <button onClick={handleAddToGoogleCalendar} className="btn btn-secondary" style={{ width: '100%' }}>
                <CalendarDays size={16} /> {isReschedule ? 'Update Google Calendar' : 'Add to Google Calendar'}
              </button>
                <button onClick={() => router.push('/patient/dashboard')} className="btn btn-primary" style={{ width: '100%' }}>
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
