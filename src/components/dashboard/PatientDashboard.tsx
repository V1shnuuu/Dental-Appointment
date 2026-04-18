'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, User } from 'lucide-react';

export default function PatientDashboard() {
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
        <motion.h2 variants={item} style={{ fontSize: '2.5rem' }}>Welcome back, <span className="text-gradient">John Doe!</span></motion.h2>
      </div>

      <motion.div variants={item} className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Profile Card */}
        <div className="glass flex flex-col gap-4" style={{ padding: '2rem' }}>
          <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <div style={{ background: 'var(--gradient-primary)', color: 'white', padding: '1rem', borderRadius: '50%' }}>
              <User size={32} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Account Details</h3>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>Patient ID: #PAT-84920</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>Phone Number</div>
              <div style={{ fontWeight: 500 }}>+1 (555) 012-3456</div>
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>Email</div>
              <div style={{ fontWeight: 500 }}>john@example.com</div>
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>Age / Gender</div>
              <div style={{ fontWeight: 500 }}>30 • Male</div>
            </div>
            <div>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>Blood Group</div>
              <div style={{ fontWeight: 500 }}>O+</div>
            </div>
          </div>
        </div>

        {/* Next Appt Card */}
        <div className="glass flex flex-col justify-center gap-4" style={{ padding: '2rem', background: 'rgba(77,168,218,0.05)' }}>
          <div className="flex items-center gap-4">
            <div style={{ background: 'var(--primary-color)', color: 'white', padding: '1rem', borderRadius: '50%' }}>
              <Calendar size={32} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Next Appointment</h4>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-color)' }}>Oct 24, 10:00 AM</div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm font-medium">
            <span className="badge badge-teal">Dr. Sarah Smith</span>
            <span className="badge badge-teal" style={{ background: 'rgba(0,0,0,0.05)' }}>General Checkup</span>
          </div>
        </div>
      </motion.div>

      {/* Previous Visit Datas */}
      <motion.div variants={item} className="glass" style={{ padding: '2rem' }}>
        <h3 className="flex items-center gap-2" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
          <FileText color="var(--secondary-color)" /> Previous Visit History & Datas
        </h3>
        
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
            <div className="flex gap-6">
              <div style={{ textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary-color)' }}>15</div>
                <div className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 600 }}>SEP 2026</div>
              </div>
              <div style={{ borderLeft: '2px solid rgba(0,0,0,0.05)', paddingLeft: '1.5rem' }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Root Canal Therapy</div>
                <div className="text-muted flex items-center gap-2" style={{ fontSize: '0.9rem' }}>
                  <User size={14}/> Dr. Alex Carter
                </div>
                <div className="mt-2 text-sm" style={{ fontStyle: 'italic', color: 'var(--text-main)', opacity: 0.8 }}>
                  "Patient endured mild pain. Prescribed antibiotics for 5 days. Needs follow-up crown placement."
                </div>
              </div>
            </div>
            <div className="badge badge-teal" style={{ background: 'var(--secondary-color)', color: 'white' }}>Completed</div>
          </div>

          <div className="flex items-center justify-between" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '16px' }}>
            <div className="flex gap-6">
              <div style={{ textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary-color)' }}>02</div>
                <div className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 600 }}>JAN 2026</div>
              </div>
              <div style={{ borderLeft: '2px solid rgba(0,0,0,0.05)', paddingLeft: '1.5rem' }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Annual Cleaning & Scaling</div>
                <div className="text-muted flex items-center gap-2" style={{ fontSize: '0.9rem' }}>
                  <User size={14}/> Dr. Sarah Smith
                </div>
                <div className="mt-2 text-sm" style={{ fontStyle: 'italic', color: 'var(--text-main)', opacity: 0.8 }}>
                  "Routine scaling. Gums look healthy. X-Rays updated and stored in core system."
                </div>
              </div>
            </div>
            <div className="badge badge-teal" style={{ background: 'var(--secondary-color)', color: 'white' }}>Completed</div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
