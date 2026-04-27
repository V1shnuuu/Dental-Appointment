'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/authActions';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Heart, AlertCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DoctorLoginPage() {
  // Using the same loginAction but could be a doctor-specific one if needed
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setDemoDoctor = () => {
    setEmail('doctor@demo.com');
    setPassword('demo123');
  };

  useEffect(() => {
    if (state?.success) {
      router.push('/doctor/dashboard');
    }
  }, [state, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Left Panel — Doctor Branding */}
      <div style={{
        flex: 1, display: 'none', padding: 60, flexDirection: 'column', justifyContent: 'space-between',
        background: '#111B21', color: 'white',
        position: 'relative', overflow: 'hidden',
      }} className="hide-mobile">
        <style>{`.hide-mobile { display: flex !important; } @media (max-width: 768px) { .hide-mobile { display: none !important; } }`}</style>
        
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', bottom: -150, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'rgba(13, 148, 136, 0.15)', filter: 'blur(100px)' }} />

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 24, color: 'white', textDecoration: 'none', zIndex: 10 }}>
          <div style={{ 
            width: 40, height: 40, borderRadius: 12, 
            background: 'linear-gradient(135deg, #0D9488, #14B8A6)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <Heart size={20} color="white" fill="white" />
          </div>
          DentalConnect<span style={{ color: '#14B8A6' }}>OS</span>
        </Link>

        <div style={{ maxWidth: 420, zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: 99, color: '#2DD4BF', fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            <ShieldCheck size={16} /> Secure Provider Portal
          </div>
          <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            The clinical workspace for <span style={{ color: '#2DD4BF' }}>modern practices.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            Manage appointments, interact with patients, collaborate with your team, and access records securely in one unified HIPAA-compliant dashboard.
          </p>
        </div>

        <p style={{ fontSize: 13, color: '#64748B', zIndex: 10 }}>© 2026 DentalConnect OS. All rights reserved.</p>
      </div>

      {/* Right Panel — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, color: '#111B21' }}>Provider Sign in</h1>
            <p style={{ fontSize: 15, color: '#64748B' }}>Enter your credentials to access the clinical portal.</p>
          </div>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {state?.error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: '#FEF2F2', color: '#EF4444', fontSize: 13, fontWeight: 500, border: '1px solid #FECACA' }}>
                <AlertCircle size={16} /> {state.error}
              </div>
            )}
            
            {/* Hidden field to force role to doctor for the action if needed */}
            <input type="hidden" name="role" value="doctor" />

            <div className="input-group">
              <label className="input-label" htmlFor="email">Work Email</label>
              <input id="email" name="email" type="email" className="input-field" placeholder="dr.smith@dentalconnect.com" required style={{ borderColor: '#E2E8F0', padding: 14 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label" htmlFor="password">Password</label>
                <Link href="/forgot-password" style={{ fontSize: 13, color: '#0D9488', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" required style={{ paddingRight: 44, borderColor: '#E2E8F0', padding: 14 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending} style={{ width: '100%', padding: '16px 24px', fontSize: 15, marginTop: 8, background: '#0D9488', border: 'none', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              {isPending ? 'Authenticating...' : 'Access Dashboard'} <ArrowRight size={18} />
            </button>

            {/* Demo Credentials */}
            <button type="button" onClick={setDemoDoctor} className="btn" style={{ width: '100%', padding: '12px', fontSize: 14, marginTop: 4, background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', border: '1px solid rgba(13, 148, 136, 0.2)', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>
              Load Demo Provider Login
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: '#64748B' }}>
            Not registered as a provider?{' '}
            <Link href="/contact" style={{ color: '#0D9488', fontWeight: 600, textDecoration: 'none' }}>Contact Admin</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
