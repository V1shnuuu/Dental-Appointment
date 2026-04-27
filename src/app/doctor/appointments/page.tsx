'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, 
  Phone, MessageSquare, MoreHorizontal, Filter,
  ChevronLeft, ChevronRight, Plus, Video,
  Search, ArrowRight, Bell
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const appointments = [
  { id: 1, patient: 'Vishnu Priyan', time: '09:00', duration: 60, type: 'Root Canal', status: 'confirmed', day: 2, color: '#0D9488' },
  { id: 2, patient: 'Sarah Jenkins', time: '10:30', duration: 30, type: 'Cleaning', status: 'confirmed', day: 2, color: '#6366F1' },
  { id: 3, patient: 'Michael Chen', time: '14:00', duration: 45, type: 'Consultation', status: 'pending', day: 2, color: '#8B5CF6' },
  { id: 4, patient: 'Emma Watson', time: '09:30', duration: 30, type: 'Checkup', status: 'confirmed', day: 3, color: '#F59E0B' },
  { id: 5, patient: 'David Miller', time: '11:00', duration: 60, type: 'Crown Prep', status: 'confirmed', day: 4, color: '#EF4444' },
];

const todayAppointments = [
  { patient: 'Vishnu Priyan', time: '09:00 AM', type: 'Root Canal Therapy', status: 'In Progress', phone: '+91 98765 43210', notes: 'Follow-up from Sep visit' },
  { patient: 'Sarah Jenkins', time: '10:30 AM', type: 'Dental Prophylaxis', status: 'Waiting', phone: '+91 87654 32109', notes: 'Routine cleaning' },
  { patient: 'Michael Chen', time: '02:00 PM', type: 'Initial Consultation', status: 'Confirmed', phone: '+91 76543 21098', notes: 'New patient referral' },
  { patient: 'Alice Stone', time: '03:30 PM', type: 'Whitening Session', status: 'Confirmed', phone: '+91 65432 10987', notes: 'Second session' },
  { patient: 'Bob Williams', time: '04:15 PM', type: 'Emergency — Toothache', status: 'Urgent', phone: '+91 54321 09876', notes: 'Severe pain, walk-in' },
];

export default function AppointmentManagement() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedAppt, setSelectedAppt] = useState<typeof todayAppointments[0] | null>(null);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Header */}
      <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Appointments</h1>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Manage your schedule and patient visits.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           <div style={{ display: 'flex', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <button onClick={() => setView('list')} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, background: view === 'list' ? 'var(--teal)' : 'white', color: view === 'list' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>List</button>
              <button onClick={() => setView('calendar')} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, background: view === 'calendar' ? 'var(--teal)' : 'white', color: view === 'calendar' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>Calendar</button>
           </div>
           <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Filter size={16} /> Filters</button>
        </div>
      </motion.div>

      {/* Today's Stats */}
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Today', value: '8', icon: Calendar, color: '#0D9488' },
          { label: 'Completed', value: '3', icon: CheckCircle2, color: '#10B981' },
          { label: 'Pending', value: '4', icon: Clock, color: '#F59E0B' },
          { label: 'Urgent', value: '1', icon: AlertCircle, color: '#EF4444' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}><Icon size={20} /></div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {view === 'list' ? (
        /* ═══ LIST VIEW ═══ */
        <motion.div variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>Today — Oct 27, 2026</h3>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input placeholder="Search patients..." style={{ padding: '8px 12px 8px 32px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, outline: 'none', width: 200 }} />
            </div>
          </div>
          <div>
            {todayAppointments.map((appt, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedAppt(appt)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', 
                  borderBottom: '1px solid var(--border)', cursor: 'pointer',
                  background: selectedAppt === appt ? '#F0FDFA' : 'white',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: appt.status === 'Urgent' ? '#FEF2F2' : '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: appt.status === 'Urgent' ? '#EF4444' : '#0D9488', flexShrink: 0 }}>
                  {appt.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{appt.patient}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{appt.type} · {appt.notes}</div>
                </div>
                <div style={{ textAlign: 'right', marginRight: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{appt.time}</div>
                  <span style={{ 
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                    background: appt.status === 'In Progress' ? '#DBEAFE' : appt.status === 'Urgent' ? '#FEE2E2' : appt.status === 'Waiting' ? '#FEF3C7' : '#F0FDFA',
                    color: appt.status === 'In Progress' ? '#2563EB' : appt.status === 'Urgent' ? '#EF4444' : appt.status === 'Waiting' ? '#D97706' : '#0D9488'
                  }}>
                    {appt.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href="/doctor/chat" className="btn-icon" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}><MessageSquare size={14} /></Link>
                  <button className="btn-icon" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}><Phone size={14} /></button>
                  <button className="btn-icon" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}><Bell size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* ═══ CALENDAR VIEW ═══ */
        <motion.div variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="btn-icon" style={{ border: '1px solid var(--border)' }}><ChevronLeft size={16} /></button>
              <h3 style={{ fontSize: 16, fontWeight: 800 }}>October 2026</h3>
              <button className="btn-icon" style={{ border: '1px solid var(--border)' }}><ChevronRight size={16} /></button>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Week 44 · Mon 26 – Sat 31</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(6, 1fr)', minHeight: 500 }}>
            {/* Time column */}
            <div style={{ borderRight: '1px solid var(--border)' }}>
              <div style={{ height: 44, borderBottom: '1px solid var(--border)' }} />
              {timeSlots.map(t => (
                <div key={t} style={{ height: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4, fontSize: 11, color: 'var(--text-tertiary)', borderBottom: '1px solid #F1F5F9' }}>{t}</div>
              ))}
            </div>
            {/* Day columns */}
            {weekDays.map((day, di) => (
              <div key={day} style={{ borderRight: di < 5 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)', fontSize: 12, fontWeight: 700, color: di === 1 ? '#0D9488' : 'var(--text-secondary)', background: di === 1 ? '#F0FDFA' : 'transparent' }}>
                  {day} {26 + di}
                </div>
                <div style={{ position: 'relative', height: 600 }}>
                  {appointments.filter(a => a.day === di).map(a => {
                    const [h, m] = a.time.split(':').map(Number);
                    const top = ((h - 8) * 60 + m);
                    return (
                      <div key={a.id} style={{
                        position: 'absolute', top, left: 4, right: 4, height: a.duration - 4,
                        background: `${a.color}15`, border: `1px solid ${a.color}40`, borderLeft: `3px solid ${a.color}`,
                        borderRadius: 8, padding: '4px 8px', fontSize: 11, overflow: 'hidden', cursor: 'pointer'
                      }}>
                        <div style={{ fontWeight: 700, color: a.color }}>{a.patient}</div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>{a.time} · {a.type}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Follow-up Panel */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>Pending Follow-Ups</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { patient: 'Vishnu Priyan', reason: 'Post root canal check', due: 'Oct 30', urgency: 'Normal' },
            { patient: 'Sarah Jenkins', reason: 'Gingivitis re-evaluation', due: 'Nov 5', urgency: 'Normal' },
            { patient: 'David Miller', reason: 'Crown fitting', due: 'Nov 2', urgency: 'High' },
          ].map((f, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{f.patient}</span>
                {f.urgency === 'High' && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: '#FEE2E2', color: '#EF4444' }}>Priority</span>}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{f.reason}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Due: {f.due}</span>
                <Link href="/doctor/chat" style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}>Send Reminder →</Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
