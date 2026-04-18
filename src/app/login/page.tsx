'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowRight, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate backend verification
    setTimeout(() => {
      login('patient');
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 relative overflow-hidden"
      >
        {/* Subtle background glow effect */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary-color)', opacity: 0.1, borderRadius: '50%', filter: 'blur(40px)' }}></div>

        <div className="flex justify-center mb-6">
          <div style={{ padding: '1rem', background: 'var(--gradient-primary)', borderRadius: '50%', color: 'white' }}>
            <LogIn size={28} />
          </div>
        </div>

        <h2 className="text-center font-bold text-2xl mb-2">Welcome Back</h2>
        <p className="text-center text-muted mb-8 text-sm">
          Sign in to view your appointments, prescriptions, and dental records.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="input-group">
            <label className="input-label font-medium">Email or Phone Number</label>
            <input 
              required
              type="text" 
              className="input-field shadow-sm" 
              placeholder="e.g. 555-0123 or abc@abc.com" 
              value={identifier || ''}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          {!isOTP ? (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="input-group">
              <label className="input-label flex justify-between font-medium">
                Password
                <span className="text-primary cursor-pointer text-xs font-semibold hover:underline">Forgot?</span>
              </label>
              <input 
                required
                type="password" 
                className="input-field shadow-sm" 
                placeholder="••••••••" 
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="input-group">
              <label className="input-label font-medium">One-Time Password (OTP)</label>
              <input 
                required
                type="text" 
                className="input-field shadow-sm text-center tracking-widest text-lg" 
                placeholder="0 0 0 0 0 0" 
                maxLength={6}
              />
              <p className="text-xs text-muted mt-2 text-right">We sent a code to your device</p>
            </motion.div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
            disabled={isLoading}
            style={{ padding: '0.8rem' }}
          >
            {isLoading ? 'Authenticating...' : (isOTP ? 'Verify & Login' : 'Secure Login')}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/5 dark:bg-white/10"></div>
          <span className="text-xs text-muted font-medium uppercase">Or connect with</span>
          <div className="h-px flex-1 bg-black/5 dark:bg-white/10"></div>
        </div>

        <button 
          onClick={() => setIsOTP(!isOTP)}
          className="btn btn-secondary w-full"
          type="button"
        >
          {isOTP ? 'Use Password Instead' : 'Login via OTP (Phone)'}
        </button>

      </motion.div>
    </div>
  );
}
