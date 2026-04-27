'use client';

import { motion } from 'framer-motion';
import { 
  Plus, Pill, Search, Filter, ArrowRight, 
  FileText, CheckCircle2, History, Trash2, 
  Download, Printer, Send
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function PrescriptionCenter() {
  const [showComposer, setShowComposer] = useState(false);

  const activePrescriptions = [
    { id: 1, patient: 'Vishnu Priyan', medication: 'Amoxicillin', dosage: '500mg', freq: '1 pill / 8 hrs', duration: '7 Days', status: 'Active', date: 'Oct 12, 2026' },
    { id: 2, patient: 'Sarah Jenkins', medication: 'Ibuprofen', dosage: '400mg', freq: 'As needed', duration: '5 Days', status: 'Active', date: 'Oct 14, 2026' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Prescription Center</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Compose, review, and manage patient medications.</p>
        </div>
        <button 
          onClick={() => setShowComposer(true)}
          className="btn btn-primary" 
          style={{ background: 'var(--teal)', border: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}
        >
          <Plus size={18} /> New Prescription
        </button>
      </div>

      {/* ═══ PRESCRIPTION COMPOSER (Overlay) ═══ */}
      {showComposer && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
           <motion.div 
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             className="card" 
             style={{ maxWidth: 640, width: '100%', padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}
           >
              <div style={{ padding: '24px 32px', background: 'var(--teal-soft)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--teal)' }}>New Prescription</h2>
                 <button onClick={() => setShowComposer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><Plus size={24} style={{ transform: 'rotate(45deg)' }} /></button>
              </div>
              
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="input-group">
                       <label className="input-label">Select Patient</label>
                       <select className="input-field" style={{ padding: '12px' }}>
                          <option>Vishnu Priyan</option>
                          <option>Sarah Jenkins</option>
                          <option>Michael Chen</option>
                       </select>
                    </div>
                    <div className="input-group">
                       <label className="input-label">Medication Name</label>
                       <input className="input-field" placeholder="e.g. Amoxicillin" />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div className="input-group">
                       <label className="input-label">Dosage</label>
                       <input className="input-field" placeholder="500mg" />
                    </div>
                    <div className="input-group">
                       <label className="input-label">Frequency</label>
                       <input className="input-field" placeholder="1 / 8 hrs" />
                    </div>
                    <div className="input-group">
                       <label className="input-label">Duration</label>
                       <input className="input-field" placeholder="7 Days" />
                    </div>
                 </div>

                 <div className="input-group">
                    <label className="input-label">Additional Instructions</label>
                    <textarea className="input-field" placeholder="Take after meals..." style={{ height: 100, resize: 'none' }} />
                 </div>

                 <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button onClick={() => setShowComposer(false)} className="btn btn-secondary" style={{ flex: 1 }}>Discard Draft</button>
                    <button className="btn btn-primary" style={{ flex: 1, background: 'var(--teal)', border: 'none', display: 'flex', justifyContent: 'center', gap: 8 }}>
                       <Send size={18} /> Send to Patient
                    </button>
                 </div>
              </div>
           </motion.div>
        </div>
      )}

      {/* Dashboard Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
         <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--teal-soft)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Pill size={20} />
            </div>
            <div>
               <div style={{ fontSize: 22, fontWeight: 800 }}>24</div>
               <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Issued this month</div>
            </div>
         </div>
         <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <History size={20} />
            </div>
            <div>
               <div style={{ fontSize: 22, fontWeight: 800 }}>182</div>
               <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Historical total</div>
            </div>
         </div>
         <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--purple-soft)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <FileText size={20} />
            </div>
            <div>
               <div style={{ fontSize: 22, fontWeight: 800 }}>14</div>
               <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Drafts pending</div>
            </div>
         </div>
      </div>

      {/* Main Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
         <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Active Patient Prescriptions</h3>
            <div style={{ display: 'flex', gap: 8 }}>
               <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input placeholder="Filter by patient..." style={{ padding: '8px 12px 8px 32px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, outline: 'none' }} />
               </div>
               <button className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Filter size={14} /> Filter</button>
            </div>
         </div>

         <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ textAlign: 'left', background: 'var(--bg-subtle)' }}>
                     {['Patient', 'Medication', 'Schedule', 'Status', 'Date Issued', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '16px 32px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {activePrescriptions.map((rx, i) => (
                     <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '20px 32px', fontSize: 14, fontWeight: 700 }}>{rx.patient}</td>
                        <td style={{ padding: '20px 32px' }}>
                           <div style={{ fontSize: 14, fontWeight: 600 }}>{rx.medication}</div>
                           <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{rx.dosage}</div>
                        </td>
                        <td style={{ padding: '20px 32px' }}>
                           <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{rx.freq}</div>
                           <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{rx.duration}</div>
                        </td>
                        <td style={{ padding: '20px 32px' }}>
                           <span className="badge badge-blue">{rx.status}</span>
                        </td>
                        <td style={{ padding: '20px 32px', fontSize: 13, color: 'var(--text-secondary)' }}>{rx.date}</td>
                        <td style={{ padding: '20px 32px' }}>
                           <div style={{ display: 'flex', gap: 8 }}>
                              <button className="btn-icon" style={{ border: 'none' }} title="Print"><Printer size={16} /></button>
                              <button className="btn-icon" style={{ border: 'none' }} title="Download"><Download size={16} /></button>
                              <button className="btn-icon" style={{ border: 'none', color: 'var(--rose)' }} title="Delete"><Trash2 size={16} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div style={{ padding: '20px 32px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
               Load more prescriptions <ArrowRight size={14} />
            </button>
         </div>
      </div>

    </div>
  );
}
