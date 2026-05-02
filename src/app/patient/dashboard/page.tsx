'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Clock, ArrowRight, ChevronRight, Activity, FileText, Heart, Sparkles, TrendingUp, Sun, Bell, MessageSquare, FolderClosed } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserProfileAction } from '@/lib/actions/authActions';
import { getPatientAppointmentsAction } from '@/lib/actions/appointmentActions';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function PatientDashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const [user, setUser] = useState<any>(null);
  const [realAppointments, setRealAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserProfileAction();
      if (userData) {
        setUser(userData);
      }
      const appts = await getPatientAppointmentsAction();
      setRealAppointments(appts);
    }
    fetchData();
  }, []);

  const isMock = user?.email === 'patient@demo.com';
  const displayName = isMock ? 'Vishnu' : (user?.name || '...');

  const stats = isMock ? [
    { label: 'Upcoming Visits', value: '2', icon: CalendarDays, color: 'var(--accent)', bg: 'var(--accent-soft)', trend: '+1 this week' },
    { label: 'Past Visits', value: '14', icon: Activity, color: 'var(--teal)', bg: 'var(--teal-soft)', trend: 'Last: Sep 1' },
    { label: 'Health Score', value: '92', icon: Heart, color: 'var(--mint)', bg: 'var(--mint-soft)', trend: '+4 pts' },
    { label: 'Active Rx', value: '2', icon: FileText, color: 'var(--purple)', bg: 'var(--purple-soft)', trend: 'Renewing soon' },
  ] : [
    { label: 'Upcoming Visits', value: realAppointments.length.toString(), icon: CalendarDays, color: 'var(--accent)', bg: 'var(--accent-soft)', trend: realAppointments.length > 0 ? 'Upcoming soon' : 'None scheduled' },
    { label: 'Past Visits', value: '0', icon: Activity, color: 'var(--teal)', bg: 'var(--teal-soft)', trend: 'No history' },
    { label: 'Health Score', value: '--', icon: Heart, color: 'var(--mint)', bg: 'var(--mint-soft)', trend: 'Pending visit' },
    { label: 'Active Rx', value: '0', icon: FileText, color: 'var(--purple)', bg: 'var(--purple-soft)', trend: 'None' },
  ];

  const nextAppt = isMock ? {
    doctor: 'Dr. Sarah Smith',
    reason: 'General Checkup',
    date: 'Oct 15, 2026',
    time: '10:00 AM',
    initials: 'SS'
  } : realAppointments[0] || null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ═══ HERO HEADER ═══ */}
      <motion.div variants={fadeUp} style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 50%, #F5F3FF 100%)',
        borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden',
        border: '1px solid var(--border)',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 100, width: 250, height: 250, borderRadius: '50%', background: 'rgba(13,148,136,0.05)', filter: 'blur(80px)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sun size={20} style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{greeting}</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              Welcome back, {displayName} <span style={{ fontSize: 28 }}>👋</span>
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 420 }}>
              {isMock 
                ? 'Your next appointment is in 3 days. Everything looks great with your dental health.'
                : 'Ready to take care of your smile today? Book an appointment to get started.'}
            </p>
          </div>
          <Link href="/patient/book" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: 14 }}>
            Book Appointment <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* ═══ STAT CARDS ═══ */}
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 24, cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <Icon size={20} />
                </div>
                <TrendingUp size={14} style={{ color: 'var(--mint)' }} />
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>{stat.trend}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ═══ BENTO GRID ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>

        {/* Next Appointment */}
        {nextAppt ? (
          <motion.div variants={fadeUp} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Next Appointment</h3>
              <span className="badge badge-blue" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="status-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
                Confirmed
              </span>
            </div>
            <div style={{ padding: '20px 28px 28px' }}>
              <div style={{
                display: 'flex', gap: 24, alignItems: 'center',
                background: 'linear-gradient(135deg, #EFF6FF, #F0FDFA)',
                borderRadius: 16, padding: 24, border: '1px solid var(--border)',
              }}>
                {/* Doctor Avatar */}
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                  {nextAppt.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{nextAppt.doctor}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{nextAppt.reason}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, fontWeight: 500 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
                      <CalendarDays size={14} /> {nextAppt.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal)' }}>
                      <Clock size={14} /> {nextAppt.time}
                    </span>
                  </div>
                </div>
                <Link href="/patient/book" className="btn btn-secondary btn-sm">Reschedule</Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarDays size={24} />
             </div>
             <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>No Upcoming Visits</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>You don't have any appointments scheduled yet.</p>
             </div>
             <Link href="/patient/book" className="btn btn-primary btn-sm">Book Your First Visit</Link>
          </motion.div>
        )}

        {/* AI Care Assistant */}
        <motion.div variants={fadeUp} className="card" style={{ padding: 28, background: 'linear-gradient(160deg, #FFFBEB, #FEF3C7)', cursor: 'default' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--amber)', marginBottom: 20 }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Care Assistant</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
            Based on your history, we recommend scheduling a cleaning within the next 30 days.
          </p>
          <Link href="/patient/book" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Schedule Now <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* ═══ BOTTOM ROW ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

        {/* Health Score Ring */}
        <motion.div variants={fadeUp} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'default' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 16 }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-subtle)" strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={264} strokeDashoffset={264 * (1 - 0.92)}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)' }} />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--teal)" />
              </linearGradient>
            </defs>
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Outfit, sans-serif', fill: 'var(--text-primary)' }}>92</text>
          </svg>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Dental Health Score</h4>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Excellent — Keep it up!</p>
        </motion.div>

        {/* Prescriptions */}
        <motion.div variants={fadeUp} className="card" style={{ padding: 24, cursor: 'default' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Active Prescriptions</h3>
            <FileText size={16} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Amoxicillin 500mg', dose: '1 pill / 8 hours' },
              { name: 'Ibuprofen 400mg', dose: 'As needed' },
            ].map((rx, i) => (
              <div key={i} style={{ padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{rx.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{rx.dose}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Communication Hub */}
        <motion.div variants={fadeUp} className="card" style={{ padding: 24, cursor: 'default' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Communication</h3>
            <MessageSquare size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { text: 'Dr. Wilson sent a message', sub: 'Regarding your X-rays', icon: MessageSquare, color: 'var(--accent)', href: '/patient/messages' },
              { text: 'New report shared', sub: 'Care_Instructions.pdf', icon: FolderClosed, color: 'var(--teal)', href: '/patient/files' },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                   <item.icon size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/patient/messages" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>Open Message Center</Link>
        </motion.div>
      </div>

      {/* ═══ VISIT TIMELINE ═══ */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28, cursor: 'default' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Activity</h3>
          <Link href="/patient/history" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { date: 'Sep 1, 2026', event: 'General Checkup — Dr. Smith', type: 'Checkup', color: 'var(--accent)' },
            { date: 'Mar 15, 2026', event: 'Root Canal — Dr. Chen', type: 'Procedure', color: 'var(--rose)' },
            { date: 'Sep 10, 2025', event: 'Deep Cleaning — Dr. Smith', type: 'Cleaning', color: 'var(--teal)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, border: '3px solid var(--bg-surface)', boxShadow: `0 0 0 2px ${item.color}30`, flexShrink: 0 }} />
                {i < 2 && <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.event}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.date}</div>
              </div>
              <span className={`badge badge-${item.color === 'var(--accent)' ? 'blue' : item.color === 'var(--rose)' ? 'rose' : 'teal'}`} style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`@media (max-width: 768px) { 
        [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        [style*="grid-template-columns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
        [style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
      }`}</style>
    </motion.div>
  );
}
