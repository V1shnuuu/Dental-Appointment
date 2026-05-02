'use client';

import { useActionState, useState, useEffect } from 'react';
import { signupAction } from '@/lib/actions/authActions';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const router = useRouter();
  const [password, setPassword] = useState('');

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const strength = [hasLength, hasUpper, hasNumber].filter(Boolean).length;

  useEffect(() => {
    if (state?.success) {
      if (state.role === 'doctor') {
        router.push('/doctor/dashboard');
      } else {
        router.push('/verify-email');
      }
    }
  }, [state, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      {/* Left Brand Panel */}
      <div style={{
        flex: 1, padding: 60, flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(160deg, #F0FDFA 0%, #EFF6FF 50%, #FFFBEB 100%)',
        position: 'relative', overflow: 'hidden', display: 'none',
      }} className="hide-mobile">
        <style>{`.hide-mobile { display: flex !important; } @media (max-width: 768px) { .hide-mobile { display: none !important; } }`}</style>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(13,148,136,0.06)', filter: 'blur(80px)' }} />

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--text-primary)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          DentalCare+
        </Link>

        <div style={{ maxWidth: 360 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
            Start your <span className="text-gradient">premium care</span> journey.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Create your account in seconds and gain access to a beautifully designed patient portal.
          </p>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>© 2026 DentalCare+. All rights reserved.</p>
      </div>

      {/* Right — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 420 }}
        >
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Create account</h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Join thousands of patients on DentalCare+.</p>
          </div>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {state?.error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: 'var(--rose-soft)', color: 'var(--rose)', fontSize: 13, fontWeight: 500, border: '1px solid rgba(244,63,94,0.15)' }}>
                <AlertCircle size={16} /> {state.error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="input-group">
                <label className="input-label" htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" className="input-field" placeholder="John" required />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="input-field" placeholder="you@example.com" required />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" className="input-field" placeholder="(555) 000-0000" required />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="input-field" placeholder="Create a strong password" required onChange={e => setPassword(e.target.value)} />
              {/* Strength */}
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: 3, flex: 1, borderRadius: 99, background: strength >= i ? (i === 1 ? '#F59E0B' : i === 2 ? '#3B82F6' : '#10B981') : 'var(--border-strong)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
                {[
                  { ok: hasLength, label: 'At least 8 characters' },
                  { ok: hasUpper, label: 'One uppercase letter' },
                  { ok: hasNumber, label: 'One number' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: r.ok ? 'var(--mint)' : 'var(--text-tertiary)' }}>
                    <Check size={12} /> {r.label}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isPending} style={{ width: '100%', padding: '14px 24px', fontSize: 15, marginTop: 4 }}>
              {isPending ? 'Creating...' : 'Create Account'} <ArrowRight size={18} />
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
