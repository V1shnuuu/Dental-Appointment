'use client';

import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Shield, Bell, 
  Palette, Lock, LogOut, ChevronRight,
  Heart, Camera, Globe, Clock, 
  ShieldCheck, Smartphone, Key
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

export default function DoctorSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    router.push('/portal-select');
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <motion.div variants={fadeUp}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Manage your profile, preferences, and account security.</p>
      </motion.div>

      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        {/* Sidebar Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12,
                background: activeTab === tab.id ? '#F0FDFA' : 'transparent',
                color: activeTab === tab.id ? '#0D9488' : 'var(--text-secondary)',
                border: activeTab === tab.id ? '1px solid #CCFBF1' : '1px solid transparent',
                fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s'
              }}>
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}

          <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 16 }}>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12,
              background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%'
            }}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Panels */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {activeTab === 'profile' && (
            <div>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Doctor Profile</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Your professional information visible to patients.</p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #0D9488, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 28, position: 'relative' }}>
                    JW
                    <button style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%', background: 'white', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Dr. James Wilson</div>
                    <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Medical Director · St. Luke's Dental</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input className="input-field" defaultValue="Dr. James Wilson" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Specialization</label>
                    <input className="input-field" defaultValue="General & Cosmetic Dentistry" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input className="input-field" defaultValue="j.wilson@stlukes-dental.com" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone</label>
                    <input className="input-field" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">License Number</label>
                    <input className="input-field" defaultValue="MDS-IN-2014-8821" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Years of Practice</label>
                    <input className="input-field" defaultValue="12 Years" />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Bio / About</label>
                  <textarea className="input-field" defaultValue="Board-certified dentist specializing in restorative and cosmetic procedures. Committed to providing compassionate, evidence-based care." style={{ height: 100, resize: 'none' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  <button className="btn btn-secondary">Cancel</button>
                  <button onClick={handleSave} className="btn btn-primary" style={{ background: 'var(--teal)', border: 'none' }}>
                    {saved ? '✓ Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Notification Preferences</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Control how you receive alerts and updates.</p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'New Patient Messages', desc: 'Get notified when a patient sends a message', enabled: true },
                  { label: 'Appointment Reminders', desc: '15-minute heads up before each appointment', enabled: true },
                  { label: 'New Patient Registrations', desc: 'Alert when a new patient joins your practice', enabled: true },
                  { label: 'Prescription Confirmations', desc: 'Notify when a patient picks up their Rx', enabled: false },
                  { label: 'Lab Report Arrivals', desc: 'Alert when a lab result is uploaded', enabled: true },
                  { label: 'Weekly Analytics Digest', desc: 'Summary of your practice performance', enabled: false },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{n.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{n.desc}</div>
                    </div>
                    <label style={{ position: 'relative', width: 48, height: 26, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={n.enabled} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: 99,
                        background: n.enabled ? '#0D9488' : '#E2E8F0',
                        transition: 'background 0.3s'
                      }}>
                        <span style={{
                          position: 'absolute', top: 3, left: n.enabled ? 24 : 3,
                          width: 20, height: 20, borderRadius: '50%', background: 'white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                          transition: 'left 0.3s'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Security & Access</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Manage your account security and session.</p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ padding: 20, borderRadius: 16, border: '1px solid #CCFBF1', background: '#F0FDFA', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ShieldCheck size={24} style={{ color: '#0D9488' }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0D9488' }}>HIPAA Compliant Account</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Your data is encrypted and meets healthcare compliance standards.</div>
                  </div>
                </div>

                {[
                  { icon: Lock, label: 'Change Password', desc: 'Last changed 30 days ago' },
                  { icon: Smartphone, label: 'Two-Factor Authentication', desc: 'Enabled via Authenticator App' },
                  { icon: Key, label: 'Active Sessions', desc: '2 devices currently logged in' },
                  { icon: Globe, label: 'Login History', desc: 'View all login activity' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}><Icon size={18} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.desc}</div>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Workspace Preferences</h3>
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Customize your clinical workspace.</p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="input-group">
                  <label className="input-label">Default Appointment Duration</label>
                  <select className="input-field" defaultValue="30" style={{ padding: 12 }}>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Working Hours</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input className="input-field" type="time" defaultValue="09:00" />
                    <input className="input-field" type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Timezone</label>
                  <select className="input-field" defaultValue="IST" style={{ padding: 12 }}>
                    <option value="IST">Asia/Kolkata (IST)</option>
                    <option value="EST">America/New_York (EST)</option>
                    <option value="PST">America/Los_Angeles (PST)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Quick Reply Templates</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Take medication as directed', 'Your lab results are in', 'Please schedule a follow-up', 'Appointment confirmed'].map((t, i) => (
                      <span key={i} style={{ padding: '6px 12px', borderRadius: 8, background: 'var(--bg-subtle)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSave} className="btn btn-primary" style={{ background: 'var(--teal)', border: 'none' }}>
                    {saved ? '✓ Saved!' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
