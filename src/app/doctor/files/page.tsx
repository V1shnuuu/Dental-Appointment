'use client';

import { motion } from 'framer-motion';
import { 
  Plus, Upload, Search, Filter, 
  File, FileText, Image as ImageIcon, 
  MoreVertical, Download, Trash2, Share2,
  FolderClosed, HardDrive, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function DoctorFileVault() {
  const [dragActive, setDragActive] = useState(false);

  const recentFiles = [
    { name: 'X-Ray_Upper_Jaw_15_Sep.jpg', patient: 'Vishnu Priyan', type: 'Image', size: '4.2 MB', date: '2h ago' },
    { name: 'Lab_Report_Blood_Work.pdf', patient: 'Sarah Jenkins', type: 'PDF', size: '1.8 MB', date: '5h ago' },
    { name: 'Referral_Letter_Dr_Chen.pdf', patient: 'Michael Chen', type: 'PDF', size: '0.5 MB', date: 'Yesterday' },
    { name: 'MRI_Scan_Digital_Copy.zip', patient: 'Emma Watson', type: 'Archive', size: '128 MB', date: '2 days ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Clinical File Vault</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Securely share clinical documents, reports, and X-rays with patients.</p>
        </div>
        <button className="btn btn-primary" style={{ background: 'var(--teal)', border: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}>
          <Upload size={18} /> Upload New File
        </button>
      </div>

      {/* Storage Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
         <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
               <HardDrive size={20} style={{ color: 'var(--teal)' }} />
               <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>64% Used</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>12.8 GB</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Total Clinical Storage</div>
            <div style={{ height: 6, background: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
               <div style={{ width: '64%', height: '100%', background: 'var(--teal)' }} />
            </div>
         </div>
         <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <FolderClosed size={24} />
            </div>
            <div>
               <div style={{ fontSize: 20, fontWeight: 800 }}>842</div>
               <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total Shared Files</div>
            </div>
         </div>
         <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--teal-soft)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ShieldCheck size={24} />
            </div>
            <div>
               <div style={{ fontSize: 20, fontWeight: 800 }}>Encrypted</div>
               <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>End-to-End HIPAA Secure</div>
            </div>
         </div>
      </div>

      {/* Dropzone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        style={{ 
          padding: '60px', border: `2px dashed ${dragActive ? 'var(--teal)' : 'var(--border)'}`, 
          borderRadius: 24, background: dragActive ? 'var(--teal-soft)' : 'var(--bg-subtle)',
          textAlign: 'center', transition: 'all 0.3s'
        }}
      >
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--text-tertiary)' }}>
           <Upload size={28} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Drag and drop clinical files</h3>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24 }}>Max file size: 256MB · Supports JPG, PNG, PDF, ZIP</p>
        <button className="btn btn-secondary" style={{ padding: '10px 24px' }}>Browse Files</button>
      </div>

      {/* File Explorer */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
         <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>Recent Clinical Documents</h3>
            <div style={{ display: 'flex', gap: 12 }}>
               <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input placeholder="Search files..." style={{ padding: '10px 12px 10px 36px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, outline: 'none' }} />
               </div>
               <button className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Filter size={16} /> Filter</button>
            </div>
         </div>

         <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {recentFiles.map((file, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -4 }}
                 style={{ 
                   padding: 20, borderRadius: 20, border: '1px solid var(--border)', 
                   background: 'var(--bg-subtle)', position: 'relative' 
                 }}
               >
                  <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                     <MoreVertical size={16} />
                  </button>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: 12, 
                    background: 'var(--bg-surface)', border: '1px solid var(--border)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    marginBottom: 16, color: file.type === 'Image' ? 'var(--accent)' : 'var(--teal)' 
                  }}>
                    {file.type === 'Image' ? <ImageIcon size={24} /> : <FileText size={24} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 12 }}>
                    {file.patient} · {file.size}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                     <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{file.date}</span>
                     <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-icon" style={{ width: 28, height: 28, border: 'none' }} title="Download"><Download size={14} /></button>
                        <button className="btn-icon" style={{ width: 28, height: 28, border: 'none' }} title="Share"><Share2 size={14} /></button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         <div style={{ padding: '20px 32px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button className="btn btn-ghost btn-sm">View Full Clinical Library</button>
         </div>
      </div>

    </div>
  );
}
