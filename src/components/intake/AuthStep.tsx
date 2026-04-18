'use client';

import React, { useState } from 'react';
import { useIntake } from '@/context/IntakeContext';

export default function AuthStep() {
  const { nextStep, setPatientDetails } = useIntake();
  const [isLogin, setIsLogin] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      // If registering new, set email/phone and go to Personal Details
      if (identifier.includes('@')) {
        setPatientDetails(prev => ({ ...prev, email: identifier }));
      } else {
        setPatientDetails(prev => ({ ...prev, phone: identifier }));
      }
      nextStep();
    } else {
      // If logging in, we would fetch patient details from DB here.
      // For now, mock a successful login flow padding the details, then skip to Booking (Step 4)
      setPatientDetails({
        fullName: 'Demo Returning Patient',
        age: 30,
        gender: 'Female',
        phone: '1234567890',
        email: 'demo@example.com',
        address: '123 Main St'
      });
      // Skip straight to Medical info or Booking. Let's just go to step 2 logically to verify info.
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        {isLogin ? 'Log in to quickly book your appointment.' : 'Register to streamline your dental visits.'}
      </p>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '350px' }}>
        <div className="input-group">
          <label className="input-label">Email or Phone Number</label>
          <input 
            required 
            type="text" 
            className="input-field" 
            placeholder="Enter email or 10-digit phone" 
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
          />
        </div>

        <div className="input-group mb-8">
          <label className="input-label">Password {isLogin ? '' : '(Optional)'}</label>
          <input 
            required={isLogin} 
            type="password" 
            className="input-field" 
            placeholder="••••••••" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
          {isLogin ? 'Login Securely' : 'Continue'}
        </button>
      </form>

      <p className="text-muted text-center" style={{ fontSize: '0.9rem' }}>
        {isLogin ? "Don't have an account?" : "Already a patient?"}
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)} 
          style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, marginLeft: '0.5rem', cursor: 'pointer' }}
        >
          {isLogin ? 'Register' : 'Log in'}
        </button>
      </p>

      {!isLogin && (
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', width: '100%', gap: '1rem', opacity: 0.5 }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.8rem' }}>OR OTP LOGIN</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--text-muted)' }} />
        </div>
      )}
    </div>
  );
}
