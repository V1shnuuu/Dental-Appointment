'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Bell, Palette } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function SettingsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: 720, margin: '0 auto' }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Settings</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Manage your account and preferences.</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28, marginBottom: 20, cursor: 'default' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 22, fontFamily: 'Outfit, sans-serif', boxShadow: 'var(--shadow-glow)' }}>
            VP
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Vishnu Priyan</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Patient ID: #84920 · Member since Jan 2024</p>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Edit Profile</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={13} /> Email</label>
            <input className="input-field" defaultValue="vishnu@email.com" />
          </div>
          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={13} /> Phone</label>
            <input className="input-field" defaultValue="(555) 123-4567" />
          </div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={13} /> Address</label>
            <input className="input-field" defaultValue="123 Main Street, Suite 100" />
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20 }}>Save Changes</button>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28, marginBottom: 20, cursor: 'default' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={18} style={{ color: 'var(--accent)' }} /> Notification Preferences
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Appointment Reminders', desc: 'Get reminded 24 hours before visits', on: true },
            { label: 'Prescription Alerts', desc: 'Notifications for medication schedules', on: true },
            { label: 'Health Tips', desc: 'Weekly dental care tips and insights', on: false },
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{n.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{n.desc}</div>
              </div>
              <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked={n.on} style={{ display: 'none' }} />
                <div style={{ width: 44, height: 24, borderRadius: 12, background: n.on ? 'var(--accent)' : 'var(--border-strong)', transition: 'background 0.3s', position: 'relative' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: n.on ? 23 : 3, transition: 'left 0.3s', boxShadow: 'var(--shadow-sm)' }} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28, cursor: 'default' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={18} style={{ color: 'var(--teal)' }} /> Security
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Change Password</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Last changed 30 days ago</div>
            </div>
            <button className="btn btn-secondary btn-sm">Update</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Two-Factor Authentication</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Add an extra layer of security</div>
            </div>
            <button className="btn btn-secondary btn-sm">Enable</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
