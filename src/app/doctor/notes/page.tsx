'use client';

import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Clock, User, 
  ChevronRight, FileText, Star, Trash2, Edit3
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const clinicalNotes = [
  { id: 1, patient: 'Vishnu Priyan', title: 'Post-Root Canal Assessment', content: 'Patient recovering well. Minor sensitivity persists in lower-right quadrant. Prescribed Sensodyne Rx for 4 weeks. Crown preparation scheduled for next visit.', date: 'Oct 15, 2026', time: '11:30 AM', pinned: true, tags: ['Follow-Up', 'Root Canal'] },
  { id: 2, patient: 'Sarah Jenkins', title: 'Periodontal Evaluation', content: 'Mild gingivitis observed in lower anterior region. Deep cleaning performed. Chlorhexidine mouthwash prescribed. Patient educated on proper flossing technique.', date: 'Oct 14, 2026', time: '02:15 PM', pinned: false, tags: ['Cleaning', 'Gingivitis'] },
  { id: 3, patient: 'Michael Chen', title: 'Initial Consultation Notes', content: 'New patient referral from Dr. Patel. Requires crown on tooth #14. Previous X-rays reviewed — bone density appears normal. Impressions taken for crown fabrication.', date: 'Oct 12, 2026', time: '09:45 AM', pinned: false, tags: ['New Patient', 'Crown'] },
  { id: 4, patient: 'Alice Stone', title: 'Whitening — Session 1 Review', content: 'First whitening session completed successfully. Shade improvement from A3 to A1. Patient reports no sensitivity. Second session scheduled in 2 weeks.', date: 'Oct 10, 2026', time: '03:30 PM', pinned: false, tags: ['Cosmetic', 'Whitening'] },
];

export default function ClinicalNotesPage() {
  const [search, setSearch] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  const filtered = clinicalNotes.filter(n =>
    n.patient.toLowerCase().includes(search.toLowerCase()) ||
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Clinical Notes</h1>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Document patient encounters and clinical observations.</p>
        </div>
        <button onClick={() => setShowComposer(true)} className="btn btn-primary" style={{ background: 'var(--teal)', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> New Note
        </button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={fadeUp} className="card" style={{ padding: '12px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input placeholder="Search notes by patient, title, or content..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-subtle)', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Pinned', 'This Week'].map((f, i) => (
            <button key={i} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: i === 0 ? 'var(--teal)' : 'white', color: i === 0 ? 'white' : 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
      </motion.div>

      {/* Notes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {filtered.map((note, i) => (
          <motion.div key={note.id} variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D9488', fontWeight: 700, fontSize: 12 }}>
                    {note.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>{note.patient}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {note.pinned && <Star size={14} style={{ color: '#F59E0B' }} fill="#F59E0B" />}
                  <Edit3 size={14} style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{note.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{note.content}</p>
            </div>
            <div style={{ padding: '12px 24px', background: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {note.tags.map((t, idx) => (
                  <span key={idx} style={{ padding: '2px 8px', borderRadius: 6, background: 'white', border: '1px solid var(--border)', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-tertiary)' }}>
                <Clock size={12} /> {note.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Composer Modal */}
      {showComposer && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ maxWidth: 640, width: '100%', padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ padding: '24px 32px', background: 'var(--teal-soft)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--teal)' }}>New Clinical Note</h2>
              <button onClick={() => setShowComposer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 24, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Patient</label>
                  <select className="input-field" style={{ padding: 12 }}>
                    <option>Vishnu Priyan</option>
                    <option>Sarah Jenkins</option>
                    <option>Michael Chen</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Note Title</label>
                  <input className="input-field" placeholder="e.g. Post-Procedure Assessment" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Clinical Observations</label>
                <textarea className="input-field" placeholder="Document your findings, treatment plan, and follow-up instructions..." style={{ height: 160, resize: 'none' }} />
              </div>
              <div className="input-group">
                <label className="input-label">Tags</label>
                <input className="input-field" placeholder="e.g. Follow-Up, Root Canal, Cosmetic" />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setShowComposer(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button onClick={() => setShowComposer(false)} className="btn btn-primary" style={{ flex: 1, background: 'var(--teal)', border: 'none' }}>Save Note</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
