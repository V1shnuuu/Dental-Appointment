'use client';

import { motion } from 'framer-motion';
import { 
  Send, Paperclip, MoreVertical, 
  Phone, Video, Pill, FileText, CheckCheck,
  Heart, CheckCircle2, Shield
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function PatientMessages() {
  const [message, setMessage] = useState('');

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Messages</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Direct clinical chat with your dental care team.</p>
      </motion.div>

      <div style={{ 
        height: '600px', background: 'var(--bg-surface)', borderRadius: 24, 
        border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Chat Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-subtle)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--teal), #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                 <Heart size={20} fill="white" />
              </div>
              <div>
                 <div style={{ fontSize: 16, fontWeight: 700 }}>Dr. James Wilson</div>
                 <div style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Care Team · Online</div>
              </div>
           </div>
           <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-tertiary)', marginRight: 12 }}>
                 <Shield size={14} /> End-to-end Encrypted
              </div>
              <button className="btn-icon" style={{ border: 'none', background: 'var(--bg-surface)' }}><Phone size={18} /></button>
              <button className="btn-icon" style={{ border: 'none', background: 'var(--bg-surface)' }}><MoreVertical size={18} /></button>
           </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Doctor Message */}
          <div style={{ display: 'flex', gap: 12, maxWidth: '75%' }}>
             <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: 12, fontWeight: 700 }}>
                JW
             </div>
             <div>
                <div style={{ background: 'var(--bg-subtle)', padding: '14px 18px', borderRadius: '4px 20px 20px 20px', fontSize: 14, lineHeight: 1.6 }}>
                  Hi Vishnu, I've reviewed your recent X-rays. Everything looks good, but I've issued a prescription for a specialized toothpaste to help with that cold sensitivity you mentioned.
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 6, display: 'block' }}>10:45 AM</span>
             </div>
          </div>

          {/* Patient Message */}
          <div style={{ display: 'flex', gap: 12, maxWidth: '75%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
             <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: 12, fontWeight: 700 }}>
                VP
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ background: 'var(--accent)', color: 'white', padding: '14px 18px', borderRadius: '20px 4px 20px 20px', fontSize: 14, lineHeight: 1.6 }}>
                  Thank you doctor! I'll pick that up today. Should I use it every morning?
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                   <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>10:48 AM</span>
                   <CheckCheck size={14} style={{ color: 'var(--accent)' }} />
                </div>
             </div>
          </div>

          {/* Doctor Message with Attachment */}
          <div style={{ display: 'flex', gap: 12, maxWidth: '75%' }}>
             <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: 12, fontWeight: 700 }}>
                JW
             </div>
             <div>
                <div style={{ background: 'var(--bg-subtle)', padding: '14px 18px', borderRadius: '4px 20px 20px 20px', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                  Yes, every morning and night. I've also shared the detailed care instructions below.
                </div>
                <div className="card" style={{ padding: 16, background: 'var(--bg-surface)', border: '1px solid var(--border)', maxWidth: 300 }}>
                   <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <FileText size={20} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                         <div style={{ fontSize: 13, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Care_Instructions.pdf</div>
                         <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>1.2 MB · PDF</div>
                      </div>
                   </div>
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 6, display: 'block' }}>10:52 AM</span>
             </div>
          </div>
        </div>

        {/* Chat Input */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', padding: '10px 16px', borderRadius: 16, border: '1px solid var(--border)' }}>
              <button className="btn-icon" style={{ border: 'none', background: 'none' }}><Paperclip size={20} /></button>
              <input 
                placeholder="Type your message..." 
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14 }} 
              />
              <button className="btn btn-primary" style={{ width: 40, height: 40, borderRadius: 10, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                 <Send size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
