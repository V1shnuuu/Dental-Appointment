'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Activity, CheckCircle, Clock } from 'lucide-react';

export default function DoctorDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const schedule = [
    { time: '09:00 AM', patient: 'Sarah Jenkins', type: 'Root Canal', status: 'completed' },
    { time: '10:00 AM', patient: 'Alex Carter', type: 'General Checkup', status: 'current' },
    { time: '11:30 AM', patient: 'Michael V.', type: 'Teeth Cleaning', status: 'upcoming' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <motion.h2 variants={item} style={{ fontSize: '2rem' }}>Dr. Smith's <span className="text-gradient">Schedule</span></motion.h2>
      </div>

      <motion.div variants={item} className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="glass flex items-center gap-4" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(77,168,218,0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Users color="var(--primary-color)" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Today's Patients</h4>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>8</div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>Today's Appointments</h3>
        <div className="flex flex-col gap-4">
          {schedule.map((appt, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.9)' }}
              className="flex items-center justify-between glass" 
              style={{ padding: '1rem 1.5rem', border: appt.status === 'current' ? '1px solid var(--primary-color)' : 'var(--glass-border)' }}
            >
              <div className="flex items-center gap-4">
                <div style={{ color: 'var(--text-muted)', fontWeight: 500, minWidth: '80px' }}>
                  {appt.time}
                </div>
                <div style={{ width: '2px', height: '40px', background: 'rgba(0,0,0,0.1)' }}></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{appt.patient}</div>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>{appt.type}</div>
                </div>
              </div>
              <div>
                {appt.status === 'completed' && <CheckCircle color="var(--secondary-color)" />}
                {appt.status === 'current' && <Activity color="var(--primary-color)" />}
                {appt.status === 'upcoming' && <Clock color="var(--text-muted)" />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
