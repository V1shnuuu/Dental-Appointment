'use client';

import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, AlertCircle, Pill } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const prescriptions = [
  { name: 'Amoxicillin 500mg', dose: '1 capsule every 8 hours', duration: '7 days', status: 'Active', doctor: 'Dr. Michael Chen', date: 'Mar 15, 2026', refills: 0, color: 'var(--accent)' },
  { name: 'Ibuprofen 400mg', dose: 'As needed for pain', duration: 'As needed', status: 'Active', doctor: 'Dr. Michael Chen', date: 'Mar 15, 2026', refills: 2, color: 'var(--teal)' },
  { name: 'Chlorhexidine Mouthwash', dose: 'Rinse twice daily', duration: '14 days', status: 'Completed', doctor: 'Dr. Sarah Smith', date: 'Sep 10, 2025', refills: 0, color: 'var(--text-tertiary)' },
];

export default function PrescriptionsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: 800, margin: '0 auto' }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Prescriptions</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Manage your current and past medications.</p>
      </motion.div>

      {/* Summary */}
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Active', value: '2', color: 'var(--accent)', bg: 'var(--accent-soft)' },
          { label: 'Completed', value: '1', color: 'var(--text-tertiary)', bg: 'var(--bg-subtle)' },
          { label: 'Refills Available', value: '2', color: 'var(--mint)', bg: 'var(--mint-soft)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 20, cursor: 'default' }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {prescriptions.map((rx, i) => (
          <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 24, display: 'flex', alignItems: 'flex-start', gap: 20, cursor: 'default' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${rx.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: rx.color, flexShrink: 0 }}>
              <FileText size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{rx.name}</h3>
                <span className={`badge ${rx.status === 'Active' ? 'badge-blue' : 'badge-teal'}`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {rx.status === 'Active' && <span className="status-dot" />}
                  {rx.status}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 13 }}>
                <div><span style={{ color: 'var(--text-tertiary)' }}>Dosage:</span> <span style={{ fontWeight: 500 }}>{rx.dose}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>Duration:</span> <span style={{ fontWeight: 500 }}>{rx.duration}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>Prescribed by:</span> <span style={{ fontWeight: 500 }}>{rx.doctor}</span></div>
                <div><span style={{ color: 'var(--text-tertiary)' }}>Date:</span> <span style={{ fontWeight: 500 }}>{rx.date}</span></div>
              </div>
              {rx.refills > 0 && (
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'var(--mint-soft)', fontSize: 12, fontWeight: 500, color: 'var(--mint)' }}>
                  <CheckCircle2 size={14} /> {rx.refills} refill(s) available
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
