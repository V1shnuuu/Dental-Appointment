'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Stethoscope, ArrowRight, ArrowLeft, CheckCircle2, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function IntakeWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', phone: '', address: '', emergencyContact: '',
    allergies: '', existingConditions: '', medications: '', previousProcedures: '',
    painLevel: 0, symptoms: '', reasonForVisit: '', insuranceDetails: '',
  });

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('intake_draft');
    if (saved) { try { setFormData(JSON.parse(saved)); } catch {} }
  }, []);

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => localStorage.setItem('intake_draft', JSON.stringify(formData)), 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, isClient]);

  const handleChange = (e: any) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const handleSubmit = () => { localStorage.removeItem('intake_draft'); setStep(4); };

  if (!isClient) return null;

  const steps = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Medical', icon: Activity },
    { id: 3, title: 'Dental', icon: Stethoscope },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', position: 'relative' }}>
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <div style={{ width: '100%', maxWidth: 640, position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 40, color: 'var(--text-primary)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={14} color="white" fill="white" />
          </div>
          DentalCare+
        </Link>

        {step < 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Patient Intake</h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>Complete your profile to get started with booking.</p>

            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 36 }}>
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step > s.id ? 'var(--accent)' : step === s.id ? 'var(--accent-soft)' : 'var(--bg-subtle)',
                      color: step > s.id ? 'white' : step === s.id ? 'var(--accent)' : 'var(--text-tertiary)',
                      border: step === s.id ? '2px solid var(--accent)' : '2px solid transparent',
                      transition: 'all 0.3s',
                    }}>
                      {step > s.id ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: step >= s.id ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s.title}</span>
                    {i < 2 && <div style={{ flex: 1, height: 2, borderRadius: 2, background: step > s.id ? 'var(--accent)' : 'var(--border)', marginLeft: 4, transition: 'background 0.4s' }} />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="card" style={{ padding: 32, minHeight: 380 }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Personal Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="input-group"><label className="input-label">First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" /></div>
                  <div className="input-group"><label className="input-label">Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" /></div>
                  <div className="input-group"><label className="input-label">Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input-field" /></div>
                  <div className="input-group"><label className="input-label">Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className="input-field" /></div>
                  <div className="input-group" style={{ gridColumn: 'span 2' }}><label className="input-label">Address</label><input name="address" value={formData.address} onChange={handleChange} className="input-field" /></div>
                  <div className="input-group" style={{ gridColumn: 'span 2' }}><label className="input-label">Emergency Contact</label><input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="input-field" placeholder="Name & Phone" /></div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Medical History</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="input-group"><label className="input-label">Allergies</label><textarea name="allergies" value={formData.allergies} onChange={handleChange} className="input-field" style={{ minHeight: 80 }} placeholder="e.g. Penicillin, Latex" /></div>
                  <div className="input-group"><label className="input-label">Existing Conditions</label><textarea name="existingConditions" value={formData.existingConditions} onChange={handleChange} className="input-field" style={{ minHeight: 80 }} placeholder="e.g. Diabetes, Hypertension" /></div>
                  <div className="input-group"><label className="input-label">Current Medications</label><textarea name="medications" value={formData.medications} onChange={handleChange} className="input-field" style={{ minHeight: 80 }} /></div>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Dental Intake</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="input-group">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Pain Level</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{formData.painLevel}/10</span>
                    </label>
                    <input type="range" min="0" max="10" name="painLevel" value={formData.painLevel} onChange={handleChange} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)' }}><span>No Pain</span><span>Severe</span></div>
                  </div>
                  <div className="input-group"><label className="input-label">Symptoms</label><textarea name="symptoms" value={formData.symptoms} onChange={handleChange} className="input-field" style={{ minHeight: 80 }} placeholder="Describe what you are experiencing..." /></div>
                  <div className="input-group">
                    <label className="input-label">Reason for Visit</label>
                    <select name="reasonForVisit" value={formData.reasonForVisit} onChange={handleChange} className="input-field">
                      <option value="">Select a reason</option>
                      <option value="General Checkup">General Checkup</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Toothache">Toothache</option>
                      <option value="Whitening">Whitening</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group"><label className="input-label">Insurance Provider (Optional)</label><input name="insuranceDetails" value={formData.insuranceDetails} onChange={handleChange} className="input-field" placeholder="Provider & Member ID" /></div>
                </div>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 0' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: 'var(--shadow-glow)' }}>
                  <CheckCircle2 size={32} color="white" />
                </motion.div>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Profile Complete!</h2>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>Your information has been securely saved.</p>
                <button onClick={() => router.push('/patient/dashboard')} className="btn btn-primary">
                  Go to Dashboard <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="btn btn-ghost" style={{ opacity: step === 1 ? 0.4 : 1 }}>
              <ArrowLeft size={16} /> Back
            </button>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Draft auto-saved</span>
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn btn-primary btn-sm">Next <ArrowRight size={14} /></button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-primary btn-sm">Complete <CheckCircle2 size={14} /></button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
