'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CalendarDays, Activity, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Stethoscope } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const history = [
  {
    id: 'v1', date: 'Sep 1, 2026', type: 'General Checkup', doctor: 'Dr. Sarah Smith', color: 'var(--accent)',
    notes: 'Patient reported minor sensitivity in lower right quadrant. Examination showed no visible decay. Recommended sensitive toothpaste and follow-up in 6 months.',
    treatments: ['Cleaning', 'Fluoride Treatment'], prescriptions: [],
    xrays: ['Bite-wing X-Ray — Right', 'Bite-wing X-Ray — Left'],
  },
  {
    id: 'v2', date: 'Mar 15, 2026', type: 'Root Canal', doctor: 'Dr. Michael Chen', color: 'var(--rose)',
    notes: 'Performed root canal on tooth #14. Procedure went smoothly. Prescribed antibiotics and pain management.',
    treatments: ['Root Canal', 'Crown Prep'], prescriptions: ['Amoxicillin 500mg', 'Ibuprofen 400mg'],
    xrays: ['Periapical X-Ray #14'],
  },
  {
    id: 'v3', date: 'Sep 10, 2025', type: 'Deep Cleaning', doctor: 'Dr. Sarah Smith', color: 'var(--teal)',
    notes: 'Routine deep cleaning. Mild gingivitis noted. Instructed patient on proper flossing techniques and recommended chlorhexidine mouthwash.',
    treatments: ['Deep Cleaning'], prescriptions: ['Chlorhexidine Mouthwash'],
    xrays: [],
  },
];

export default function MedicalHistory() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = history.filter(h =>
    (filterType === 'All' || h.type === filterType) &&
    (h.notes.toLowerCase().includes(search.toLowerCase()) ||
     h.type.toLowerCase().includes(search.toLowerCase()) ||
     h.doctor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Medical History</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Your complete dental care journey.</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field" placeholder="Search records..." style={{ paddingLeft: 40 }} />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="input-field" style={{ paddingLeft: 40, paddingRight: 32, appearance: 'none', cursor: 'pointer', minWidth: 160 }}>
            <option value="All">All Types</option>
            <option value="General Checkup">Checkup</option>
            <option value="Root Canal">Procedure</option>
            <option value="Deep Cleaning">Cleaning</option>
          </select>
        </div>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: 'var(--border)', zIndex: 0 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((visit, i) => {
            const isExpanded = expandedId === visit.id;
            return (
              <motion.div key={visit.id} variants={fadeUp} style={{ position: 'relative', paddingLeft: 52 }}>
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute', left: 12, top: 28,
                  width: 16, height: 16, borderRadius: '50%',
                  background: visit.color, border: '4px solid var(--bg-base)',
                  boxShadow: `0 0 0 2px ${visit.color}30`, zIndex: 1,
                }} />

                <div className="card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpandedId(isExpanded ? null : visit.id)}>
                  <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${visit.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: visit.color, flexShrink: 0 }}>
                        <CalendarDays size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{visit.date}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{visit.doctor} · {visit.type}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge badge-blue">{visit.type}</span>
                      {isExpanded ? <ChevronUp size={18} style={{ color: 'var(--text-tertiary)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-tertiary)' }} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
                      >
                        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          {/* Left */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                              <Activity size={14} style={{ color: 'var(--text-tertiary)' }} />
                              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Clinical Notes</span>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, padding: 16, background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                              {visit.notes}
                            </p>
                            {visit.treatments.length > 0 && (
                              <div style={{ marginTop: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                  <Stethoscope size={14} style={{ color: 'var(--text-tertiary)' }} />
                                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Treatments</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                  {visit.treatments.map((t, idx) => (
                                    <span key={idx} className="badge badge-teal">{t}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right */}
                          <div>
                            {visit.prescriptions.length > 0 && (
                              <div style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                  <FileText size={14} style={{ color: 'var(--text-tertiary)' }} />
                                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Prescriptions</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  {visit.prescriptions.map((p, idx) => (
                                    <div key={idx} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)' }} />
                                      {p}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {visit.xrays.length > 0 && (
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                  <ImageIcon size={14} style={{ color: 'var(--text-tertiary)' }} />
                                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Imaging</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                                  {visit.xrays.map((x, idx) => (
                                    <div key={idx} style={{ aspectRatio: '16/9', borderRadius: 10, overflow: 'hidden', background: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                      <ImageIcon size={20} style={{ color: 'var(--text-tertiary)', marginBottom: 4 }} />
                                      <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 500, textAlign: 'center', padding: '0 8px' }}>{x}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-tertiary)' }}>
              <Search size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p style={{ fontSize: 14 }}>No records found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
