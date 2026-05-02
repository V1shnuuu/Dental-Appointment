'use client';

import { motion } from 'framer-motion';
import { 
  FolderClosed, FileText, Image as ImageIcon, 
  Download, MoreVertical, Search, ShieldCheck,
  ChevronRight, Calendar
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

import { useState, useEffect } from 'react';
import { getUserProfileAction } from '@/lib/actions/authActions';

export default function PatientFiles() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserProfileAction();
      if (userData) {
        setUser(userData);
      }
    }
    fetchUser();
  }, []);

  const isMock = user?.email === 'patient@demo.com';
  
  const mockFiles = [
    { name: 'Dental_Health_Report.csv', provider: 'System Generated', type: 'Report', size: '1.2 KB', date: 'Oct 26, 2026', url: '/dental_health_report.csv' },
    { name: 'X-Ray_Lower_Jaw.jpg', provider: 'Dr. James Wilson', type: 'X-Ray', size: '4.2 MB', date: 'Sep 15, 2026' },
    { name: 'Care_Instructions.pdf', provider: 'Dr. James Wilson', type: 'Instruction', size: '1.2 MB', date: 'Sep 16, 2026' },
    { name: 'Lab_Report_Blood_Work.pdf', provider: 'Medical Lab', type: 'Report', size: '1.8 MB', date: 'Aug 10, 2026' },
  ];

  const sharedFiles = isMock ? mockFiles : [];

  const categories = isMock ? [
    { label: 'X-Rays', count: 1, color: 'var(--accent)' },
    { label: 'Lab Reports', count: 4, color: 'var(--purple)' },
    { label: 'Prescriptions', count: 12, color: 'var(--teal)' },
  ] : [
    { label: 'X-Rays', count: 0, color: 'var(--accent)' },
    { label: 'Lab Reports', count: 0, color: 'var(--purple)' },
    { label: 'Prescriptions', count: 0, color: 'var(--teal)' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Shared Files</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>View and download documents shared by your doctor.</p>
      </motion.div>

      {/* Security Banner */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ 
        padding: '20px 24px', borderRadius: 20, background: 'var(--teal-soft)', 
        border: '1px solid var(--teal-border)', display: 'flex', alignItems: 'center', gap: 16 
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'white', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
           <ShieldCheck size={22} />
        </div>
        <div style={{ flex: 1 }}>
           <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Secure Health Record Access</div>
           <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>All files are encrypted and only accessible by you and your medical team.</div>
        </div>
      </motion.div>

      {/* File Explorer */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <FolderClosed size={18} style={{ color: 'var(--text-tertiary)' }} />
             <h3 style={{ fontSize: 16, fontWeight: 800 }}>Document Library</h3>
          </div>
          <div style={{ position: 'relative' }}>
             <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
             <input placeholder="Search documents..." style={{ padding: '10px 12px 10px 36px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, outline: 'none', background: 'var(--bg-subtle)' }} />
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {sharedFiles.map((file, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.01, background: 'var(--bg-surface)' }}
                style={{ 
                  padding: '20px', borderRadius: 20, border: '1px solid var(--border)', 
                  background: 'var(--bg-subtle)', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', gap: 16, alignItems: 'center'
                }}
              >
                <div style={{ 
                  width: 52, height: 52, borderRadius: 14, 
                  background: 'white', border: '1px solid var(--border)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: file.type === 'X-Ray' ? 'var(--accent)' : 'var(--teal)', flexShrink: 0 
                }}>
                  {file.type === 'X-Ray' ? <ImageIcon size={26} /> : <FileText size={26} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', gap: 10 }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {file.date}</span>
                     <span>{file.size}</span>
                  </div>
                </div>
                <a href={file.url || '#'} download={file.name} style={{ textDecoration: 'none' }}>
                  <button className="btn-icon" style={{ background: 'white', border: '1px solid var(--border)' }}>
                     <Download size={16} />
                  </button>
                </a>
              </motion.div>
            ))}

            {sharedFiles.length === 0 && (
              <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px 0', color: 'var(--text-tertiary)' }}>
                <FolderClosed size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p style={{ fontSize: 14 }}>No documents have been shared with you yet.</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '20px 32px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <button className="btn btn-ghost btn-sm">Request older records <ChevronRight size={14} /></button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
         {categories.map((cat, i) => (
           <div key={i} className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: cat.color, marginBottom: 4 }}>{cat.count}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{cat.label}</div>
           </div>
         ))}
      </div>
    </div>
  );
}
