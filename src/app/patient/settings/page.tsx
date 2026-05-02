'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Bell, Palette, CheckCircle2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfileAction, updateProfileAction } from '@/lib/actions/authActions';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserProfileAction();
      if (userData) {
        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          address: (userData as any).address || ''
        });
      }
    }
    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    startTransition(async () => {
      const fd = new FormData();
      fd.append('firstName', formData.firstName);
      fd.append('lastName', formData.lastName);
      fd.append('phone', formData.phone);
      
      const res = await updateProfileAction(fd);
      if (res.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        const userData = await getUserProfileAction();
        if (userData) setUser(userData);
        router.refresh();
      } else {
        setMessage({ type: 'error', text: res.error || 'Failed to update' });
      }
    });
  };

  const isMock = user?.email === 'patient@demo.com';
  const displayData = isMock ? {
    name: 'Vishnu Priyan',
    email: 'vishnu@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Suite 100',
    id: '#84920',
    memberSince: 'Jan 2024'
  } : {
    name: user?.name || '...',
    email: user?.email || '...',
    id: user?.id?.substring(0, 8) || '...',
    memberSince: 'May 2026'
  };

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
            {displayData.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{displayData.name}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Patient ID: {displayData.id} · Member since {displayData.memberSince}</p>
          </div>
        </div>

        {message.text && (
          <div style={{ 
            marginBottom: 20, padding: '12px 16px', borderRadius: 12, 
            background: message.type === 'success' ? 'var(--mint-soft)' : 'var(--rose-soft)',
            color: message.type === 'success' ? 'var(--mint)' : 'var(--rose)',
            fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8
          }}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <Shield size={18} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="input-group">
            <label className="input-label"><User size={14} /> First Name</label>
            <input 
              value={formData.firstName} 
              onChange={e => setFormData({...formData, firstName: e.target.value})}
              className="input-field" 
              placeholder="First Name" 
              disabled={isMock}
            />
          </div>
          <div className="input-group">
            <label className="input-label"><User size={14} /> Last Name</label>
            <input 
              value={formData.lastName} 
              onChange={e => setFormData({...formData, lastName: e.target.value})}
              className="input-field" 
              placeholder="Last Name" 
              disabled={isMock}
            />
          </div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label className="input-label"><Mail size={14} /> Email Address</label>
            <input value={displayData.email} className="input-field" disabled style={{ opacity: 0.6 }} />
          </div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label className="input-label"><Phone size={14} /> Phone</label>
            <input 
              value={isMock ? displayData.phone : formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="input-field" 
              placeholder="Phone Number" 
              disabled={isMock}
            />
          </div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label className="input-label"><MapPin size={14} /> Address</label>
            <input 
              value={isMock ? displayData.address : formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="input-field" 
              placeholder="Your Address" 
              disabled={isMock}
            />
          </div>
          
          {!isMock && (
            <button type="submit" disabled={isPending} className="btn btn-primary" style={{ gridColumn: 'span 2', marginTop: 12 }}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </form>
      </motion.div>

      {/* Preferences Section */}
      <motion.div variants={fadeUp} className="card" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bell size={18} style={{ color: 'var(--accent)' }} /> Notification Preferences
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { title: 'Appointment Reminders', desc: 'Get reminded 24 hours before visits' },
            { title: 'New Messages', desc: 'Notify when a doctor sends a message' },
            { title: 'Lab Results', desc: 'Alert when new results are available' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 20, background: 'var(--accent)', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, borderRadius: '50%', background: 'white' }} />
              </div>
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
