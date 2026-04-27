'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/authActions';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setDemoPatient = () => {
    setEmail('patient@demo.com');
    setPassword('demo123');
  };

  const setDemoDoctor = () => {
    setEmail('doctor@demo.com');
    setPassword('demo123');
  };

  useEffect(() => {
    if (state?.success) {
      if (state.role === 'doctor') {
        router.push('/doctor/dashboard');
      } else {
        router.push('/patient/dashboard');
      }
    }
  }, [state, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      {/* Left Panel — Branding */}
      <div style={{
        flex: 1, display: 'none', padding: 60, flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(160deg, #EFF6FF 0%, #F0FDFA 50%, #F5F3FF 100%)',
        position: 'relative', overflow: 'hidden',
      }} className="hide-mobile">
        <style>{`.hide-mobile { display: flex !important; } @media (max-width: 768px) { .hide-mobile { display: none !important; } }`}</style>
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(80px)' }} />

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--text-primary)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          DentalCare+
        </Link>

        <div style={{ maxWidth: 360 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
            Welcome back to your <span className="text-gradient">care journey</span>.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Access your appointments, health records, and care recommendations — all in one place.
          </p>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>© 2026 DentalCare+. All rights reserved.</p>
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
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Sign in</h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Enter your credentials to access your portal.</p>
          </div>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {state?.error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'var(--rose-soft)', color: 'var(--rose)', fontSize: 13, fontWeight: 500, border: '1px solid rgba(244,63,94,0.15)' }}>
                <AlertCircle size={16} /> {state.error}
              </div>
            )}

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="input-field" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label" htmlFor="password">Password</label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>Forgot?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" required style={{ paddingRight: 44 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending} style={{ width: '100%', padding: '14px 24px', fontSize: 15, marginTop: 4 }}>
              {isPending ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
            </button>

            {/* Demo Credentials */}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="button" onClick={setDemoPatient} className="btn btn-secondary" style={{ flex: 1, padding: '10px', fontSize: 13, cursor: 'pointer' }}>
                Demo Patient
              </button>
              <button type="button" onClick={setDemoDoctor} className="btn btn-secondary" style={{ flex: 1, padding: '10px', fontSize: 13, cursor: 'pointer' }}>
                Demo Doctor
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: 'var(--text-secondary)' }}>
            New to DentalCare+?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
