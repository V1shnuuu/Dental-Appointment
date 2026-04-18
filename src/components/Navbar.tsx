'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Stethoscope, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { role, logout, login } = useAuth();

  return (
    <nav className="glass-nav flex items-center justify-between w-full" style={{ padding: '1rem 4rem' }}>
      <Link href="/" className="flex items-center gap-4 text-gradient" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
        <Stethoscope size={28} color="var(--primary-color)" />
        <span>DentalCare+</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
        <Link href="/services" style={{ fontWeight: 500 }}>Services</Link>

        {role === 'guest' ? (
          <div className="flex gap-4">
            <Link href="/login" className="btn btn-secondary">Login</Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="badge badge-teal" style={{ textTransform: 'capitalize' }}>
              {role} Mode
            </span>
            <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>Dashboard</Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout} 
              className="flex items-center gap-2 text-muted"
            >
              <LogOut size={18} /> Logout
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  );
}
