'use client';

import { motion } from 'framer-motion';
import { 
  Users, Calendar, Clock, MessageSquare, 
  TrendingUp, ArrowRight, Pill, FileText, 
  Plus, CheckCircle2, AlertCircle, Sparkles,
  ChevronRight, Activity, Thermometer, ShieldCheck,
  Stethoscope
} from 'lucide-react';
import Link from 'next/link';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function DoctorDashboard() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* ═══ CLINICAL COMMAND HEADER ═══ */}
      <motion.div variants={fadeUp} style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)',
        borderRadius: 24, padding: '32px 40px', position: 'relative', overflow: 'hidden',
        boxShadow: '0 24px 48px -12px rgba(13, 148, 136, 0.25)',
        color: 'white'
      }}>
        {/* Abstract background elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 99, backdropFilter: 'blur(10px)' }}>Live Console</span>
              <span style={{ fontSize: 12, opacity: 0.8 }}>Session active for 4h 12m</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Welcome back, Dr. Wilson</h1>
            <p style={{ fontSize: 15, opacity: 0.9, maxWidth: 500, lineHeight: 1.6 }}>
              Your morning clinic starts in <span style={{ fontWeight: 700, color: '#99F6E4' }}>12 minutes</span>. You have 8 scheduled patients and 2 urgent prescription reviews.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
             <button className="btn" style={{ padding: '14px 28px', background: 'white', color: 'var(--teal)', border: 'none', fontWeight: 700, borderRadius: 14 }}>Start Morning Clinic</button>
          </div>
        </div>
      </motion.div>

      {/* ═══ REAL-TIME CLINICAL METRICS ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { label: 'Patient Queue', value: '08', sub: '2 Waiting', icon: Users, color: '#0D9488' },
          { label: 'Active Treatments', value: '14', sub: '3 Completing Today', icon: Activity, color: '#6366F1' },
          { label: 'Chat Inquiries', value: '05', sub: '2 New Requests', icon: MessageSquare, color: '#8B5CF6' },
          { label: 'Clinical Tasks', value: '12', sub: '4 Critical', icon: ClipboardList, color: '#F59E0B' },
        ].map((stat, i) => {
          const Icon = stat.icon || ClipboardList;
          return (
            <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 24, border: '1px solid var(--border)', transition: 'transform 0.2s' }} whileHover={{ y: -4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)' }}>LIVE</div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 8 }}>{stat.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* ═══ DYNAMIC WORKSPACE BENTO ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
        
        {/* Left: Patient Command Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <motion.div variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-subtle)' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Morning Patient Queue</h3>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Next patient: Vishnu Priyan (10:00 AM)</p>
              </div>
              <button className="btn btn-secondary btn-sm">Full Schedule</button>
            </div>
            <div style={{ padding: 12 }}>
              {[
                { name: 'Vishnu Priyan', time: '10:00 AM', procedure: 'Root Canal Therapy', status: 'In Office', vitals: { temp: '98.6°F', bpm: '72' }, color: '#0D9488' },
                { name: 'Sarah Jenkins', time: '10:45 AM', procedure: 'Dental Prophylaxis', status: 'Confirmed', vitals: { temp: '--', bpm: '--' }, color: '#6366F1' },
                { name: 'Michael Chen', time: '11:30 AM', procedure: 'Initial Consultation', status: 'Check-in Pending', vitals: { temp: '--', bpm: '--' }, color: '#8B5CF6' },
              ].map((patient, i) => (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', 
                  borderRadius: 16, border: '1px solid var(--border)', background: 'white',
                  marginBottom: i < 2 ? 10 : 0, transition: 'all 0.2s', cursor: 'pointer'
                }} className="patient-row-hover">
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${patient.color}15`, color: patient.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{patient.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                       <Clock size={12} /> {patient.time} · {patient.procedure}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, marginRight: 20 }} className="desktop-only">
                     <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Vitals</div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{patient.vitals.temp}</div>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>BPM</div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{patient.vitals.bpm}</div>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                      background: patient.status === 'In Office' ? '#F0FDFA' : '#F8F9FA',
                      color: patient.status === 'In Office' ? '#0D9488' : '#64748B',
                      border: `1px solid ${patient.status === 'In Office' ? '#CCFBF1' : '#E2E8F0'}`
                    }}>
                      {patient.status}
                    </span>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-tertiary)' }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Clinical Insights Bento */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
             <motion.div variants={fadeUp} className="card" style={{ padding: 24, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                   <Sparkles size={18} style={{ color: '#F59E0B' }} />
                   <h4 style={{ fontSize: 14, fontWeight: 800 }}>AI Diagnostic Assistant</h4>
                </div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
                  Scanned 12 new X-rays. Detected potential hairline fracture on patient <strong>#4829</strong> (M. Chen).
                </p>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%', fontSize: 12 }}>Review Findings</button>
             </motion.div>
             
             <motion.div variants={fadeUp} className="card" style={{ padding: 24, background: '#FDFCFB', border: '1px solid #F3E8E0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                   <ShieldCheck size={18} style={{ color: '#0D9488' }} />
                   <h4 style={{ fontSize: 14, fontWeight: 800 }}>Compliance Status</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#E2E8F0' }}>
                      <div style={{ width: '94%', height: '100%', borderRadius: 3, background: '#0D9488' }} />
                   </div>
                   <span style={{ fontSize: 12, fontWeight: 700 }}>94%</span>
                </div>
                <p style={{ fontSize: 11, color: '#64748B', marginTop: 12 }}>2 signatures pending for yesterday's procedures.</p>
             </motion.div>
          </div>
        </div>

        {/* Right: Operational Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Quick Actions Panel */}
          <motion.div variants={fadeUp} className="card" style={{ padding: 24 }}>
             <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Quick Actions</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'New Rx', icon: Pill, color: '#F59E0B' },
                  { label: 'Add Note', icon: FileText, color: '#0D9488' },
                  { label: 'X-Ray', icon: Camera, color: '#6366F1' },
                  { label: 'Recall', icon: Calendar, color: '#8B5CF6' },
                ].map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button key={i} style={{ 
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, 
                      padding: '16px 8px', borderRadius: 16, border: '1px solid var(--border)',
                      background: 'var(--bg-subtle)', cursor: 'pointer', transition: 'all 0.2s'
                    }} className="action-button-hover">
                      <div style={{ color: action.color }}><Icon size={20} /></div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>{action.label}</span>
                    </button>
                  );
                })}
             </div>
          </motion.div>

          {/* Critical Messages */}
          <motion.div variants={fadeUp} className="card" style={{ padding: 24 }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800 }}>Urgent Messages</h3>
                <span style={{ background: '#FEE2E2', color: '#EF4444', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 6 }}>2 PRIORITY</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { name: 'Sarah (Reception)', msg: 'Patient Sarah Jenkins is requesting to reschedule.', time: '4m ago' },
                  { name: 'Lab Admin', msg: 'The implant for Michael Chen has arrived.', time: '12m ago' },
                ].map((chat, i) => (
                  <div key={i} style={{ padding: 14, borderRadius: 12, border: '1px solid var(--border)', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                       <span style={{ fontSize: 13, fontWeight: 700 }}>{chat.name}</span>
                       <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{chat.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{chat.msg}</div>
                  </div>
                ))}
             </div>
             <Link href="/doctor/chat" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: 12, fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}>Open Message Center</Link>
          </motion.div>

          {/* Clinical Reminders */}
          <motion.div variants={fadeUp} className="card" style={{ padding: 24, background: 'linear-gradient(to bottom right, #FFFFFF, #F8FAFC)' }}>
             <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Clinical Reminders</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { task: 'Approve Lab Results', priority: 'High', due: '1h' },
                  { task: 'Stock Audit: Local Anesthetics', priority: 'Medium', due: 'Tomorrow' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.priority === 'High' ? '#EF4444' : '#F59E0B' }} />
                     <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.task}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Due: {item.due}</div>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>

      </div>

      {/* Global Component Styles */}
      <style>{`
        .patient-row-hover:hover {
          border-color: var(--teal) !important;
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
        }
        .action-button-hover:hover {
          background: white !important;
          border-color: var(--teal) !important;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1.6fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

const ClipboardList = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
);

const Camera = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
