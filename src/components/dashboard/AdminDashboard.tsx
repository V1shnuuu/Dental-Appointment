'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <motion.h2 variants={item} style={{ fontSize: '2rem' }}>System <span className="text-gradient">Overview</span></motion.h2>
      </div>

      <motion.div variants={item} className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div className="glass flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(46,196,182,0.1)', padding: '1rem', borderRadius: '50%' }}>
            <TrendingUp color="var(--secondary-color)" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Appointments (Monthly)</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>1,248</div>
            <div className="text-muted" style={{ fontSize: '0.8rem', color: 'var(--secondary-color)' }}>+12% from last month</div>
          </div>
        </div>

        <div className="glass flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(77,168,218,0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Users color="var(--primary-color)" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Total Patients</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>5,892</div>
          </div>
        </div>
        
        <div className="glass flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(100,116,139,0.1)', padding: '1rem', borderRadius: '50%' }}>
            <DollarSign color="#64748B" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Revenue (Today)</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>$4,250</div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass" style={{ padding: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center text-muted">
          <TrendingUp size={48} opacity={0.2} style={{ margin: '0 auto 1rem auto' }} />
          <div>Analytics charts placeholder. <br/> (Imagine a beautiful Recharts line graph here!)</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
