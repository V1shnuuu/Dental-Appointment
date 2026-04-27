'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Paperclip, Phone, Video, CheckCheck, Search, Smile, Mic,
  Shield, ChevronRight, Activity, FileText, Pill, Calendar,
  User, Image as ImageIcon, X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ── Conversation Data ── */
const allPatients = [
  { id: 1, name: 'Vishnu Priyan', age: 24, gender: 'Male', phone: '+91 98765 43210', online: true, lastMsg: 'Should I use it every morning?', time: '10:48 AM', unread: 0, isNew: false, intake: 'Sep 1, 2026', nextAppt: 'Oct 30, 2026', conditions: ['Sensitivity', 'Minor cavity'], prescriptions: ['Amoxicillin 500mg', 'Sensodyne Rx'], files: ['X-Ray_Lower.jpg', 'Lab_Report.pdf'] },
  { id: 2, name: 'Sarah Jenkins', age: 32, gender: 'Female', phone: '+91 87654 32109', online: false, lastMsg: 'Thanks for the appointment.', time: '09:15 AM', unread: 2, isNew: false, intake: 'Aug 22, 2026', nextAppt: 'Nov 12, 2026', conditions: ['Mild gingivitis'], prescriptions: ['Chlorhexidine Mouthwash'], files: ['Perio_Chart.pdf'] },
  { id: 3, name: 'Michael Chen', age: 45, gender: 'Male', phone: '+91 76543 21098', online: true, lastMsg: 'X-rays attached.', time: 'Yesterday', unread: 0, isNew: false, intake: 'Oct 1, 2026', nextAppt: 'Oct 28, 2026', conditions: ['Crown needed #14'], prescriptions: ['Ibuprofen 400mg'], files: ['Crown_Scan.stl'] },
  { id: 4, name: 'Emma Watson', age: 29, gender: 'Female', phone: '+91 65432 10987', online: false, lastMsg: '', time: 'Just registered', unread: 0, isNew: true, intake: 'Oct 27, 2026', nextAppt: 'Pending', conditions: [], prescriptions: [], files: [] },
  { id: 5, name: 'David Miller', age: 38, gender: 'Male', phone: '+91 54321 09876', online: false, lastMsg: '', time: 'Just registered', unread: 0, isNew: true, intake: 'Oct 27, 2026', nextAppt: 'Pending', conditions: [], prescriptions: [], files: [] },
];

const chatHistories: Record<number, Array<{ id: number; sender: string; text: string; time: string; status: string; type?: string; fileName?: string }>> = {
  1: [
    { id: 1, sender: 'doctor', text: "Hi Vishnu, I've reviewed your recent X-rays. Everything looks good overall.", time: '10:42 AM', status: 'read' },
    { id: 2, sender: 'doctor', text: "I've issued a prescription for a specialized toothpaste to help with that cold sensitivity you mentioned.", time: '10:45 AM', status: 'read' },
    { id: 3, sender: 'patient', text: "Thank you doctor! I'll pick that up today. Should I use it every morning?", time: '10:48 AM', status: 'read' },
  ],
  2: [
    { id: 10, sender: 'patient', text: "Hi Doctor, when is my next cleaning scheduled?", time: '09:10 AM', status: 'read' },
    { id: 11, sender: 'doctor', text: "Your next appointment is confirmed for November 12. See you then!", time: '09:12 AM', status: 'read' },
    { id: 12, sender: 'patient', text: "Thanks for the appointment.", time: '09:15 AM', status: 'read' },
  ],
  3: [
    { id: 20, sender: 'patient', text: "Doctor, I've attached the X-rays from my previous dentist.", time: 'Yesterday', status: 'read' },
    { id: 21, sender: 'patient', text: "X-rays attached.", time: 'Yesterday', status: 'read', type: 'file', fileName: 'Previous_XRays.zip' },
    { id: 22, sender: 'doctor', text: "Thanks Michael. I'll review these before your visit on the 28th.", time: 'Yesterday', status: 'read' },
  ],
  4: [],
  5: [],
};

export default function DoctorMessagingHub() {
  const [activePatient, setActivePatient] = useState(allPatients[0]);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(chatHistories[1]);
  const [showProfile, setShowProfile] = useState(true);
  const [tab, setTab] = useState<'all' | 'new'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatHistory(chatHistories[activePatient.id] || []);
  }, [activePatient]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), sender: 'doctor', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'sent' };
    const updated = [...chatHistory, newMsg];
    setChatHistory(updated);
    chatHistories[activePatient.id] = updated;
    setMessage('');
    setTimeout(() => setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)), 800);
    setTimeout(() => setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m)), 2000);
  };

  const sendQuickReply = (text: string) => { setMessage(text); };

  const filteredPatients = allPatients
    .filter(p => tab === 'new' ? p.isNew : true)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const newPatientCount = allPatients.filter(p => p.isNew).length;

  return (
    <div style={{ height: 'calc(100vh - 152px)', margin: '0 -40px -80px', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>

      {/* ═══ LEFT: CONTACT LIST ═══ */}
      <div style={{ width: 340, background: 'white', borderRight: '1px solid #E9EDEF', display: 'flex', flexDirection: 'column' }}>
        {/* Tabs */}
        <div style={{ padding: '12px 16px', background: '#F0F2F5', display: 'flex', gap: 8 }}>
          <button onClick={() => setTab('all')} style={{ flex: 1, padding: '8px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: tab === 'all' ? '#0D9488' : 'white', color: tab === 'all' ? 'white' : '#54656F', border: 'none', cursor: 'pointer' }}>All Patients</button>
          <button onClick={() => setTab('new')} style={{ flex: 1, padding: '8px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: tab === 'new' ? '#0D9488' : 'white', color: tab === 'new' ? 'white' : '#54656F', border: 'none', cursor: 'pointer', position: 'relative' }}>
            New Patients
            {newPatientCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{newPatientCount}</span>}
          </button>
        </div>
        {/* Search */}
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #E9EDEF' }}>
          <div style={{ background: '#F0F2F5', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '6px 12px', gap: 10 }}>
            <Search size={16} style={{ color: '#54656F' }} />
            <input placeholder="Search patients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, flex: 1 }} />
          </div>
        </div>
        {/* Patient List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredPatients.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#667781', fontSize: 13 }}>No patients found</div>}
          {filteredPatients.map(p => (
            <div key={p.id} onClick={() => { setActivePatient(p); setShowProfile(true); }} style={{ display: 'flex', gap: 12, padding: '12px 16px', cursor: 'pointer', background: activePatient.id === p.id ? '#F0F2F5' : 'transparent', transition: 'background 0.15s' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: p.isNew ? '#FEF3C7' : '#E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: p.isNew ? '#D97706' : '#54656F', flexShrink: 0, position: 'relative', fontSize: 16 }}>
                {p.name.charAt(0)}
                {p.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0, borderBottom: '1px solid #F5F6F6', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#111B21' }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: p.unread > 0 ? '#00A884' : '#667781' }}>{p.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 13, color: '#667781', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                    {p.isNew ? '✨ New patient — Start conversation' : (p.lastMsg || 'No messages yet')}
                  </p>
                  {p.unread > 0 && <span style={{ background: '#25D366', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{p.unread}</span>}
                  {p.isNew && <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6 }}>NEW</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CENTER: CHAT AREA ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '10px 16px', background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#54656F' }}>{activePatient.name.charAt(0)}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#111B21' }}>{activePatient.name}</div>
              <div style={{ fontSize: 12, color: '#667781' }}>{activePatient.online ? 'online' : 'last seen recently'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, color: '#54656F', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Video size={20} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Phone size={20} /></button>
            <button onClick={() => setShowProfile(!showProfile)} style={{ background: showProfile ? '#E9EDEF' : 'none', border: 'none', cursor: 'pointer', color: '#54656F', borderRadius: 6, padding: 4 }}><User size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 60px', background: '#EFEAE2', backgroundImage: 'url("https://w0.peakpx.com/wallpaper/580/678/HD-wallpaper-whatsapp-background-whatsapp-texture.jpg")', backgroundSize: '400px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ alignSelf: 'center', background: '#FFF5C4', padding: '6px 14px', borderRadius: 8, fontSize: 12, color: '#54656F', display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 16px', boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
            <Shield size={14} /> Messages are end-to-end encrypted. HIPAA compliant.
          </div>

          {chatHistory.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👋</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#111B21' }}>New Patient: {activePatient.name}</div>
              <p style={{ fontSize: 13, color: '#667781', textAlign: 'center', maxWidth: 320 }}>This patient just registered. Send a welcome message to start the conversation.</p>
              <button onClick={() => sendQuickReply(`Hi ${activePatient.name.split(' ')[0]}, welcome to St. Luke's Dental! I'm Dr. Wilson. How can I help you today?`)} style={{ padding: '10px 20px', borderRadius: 99, background: '#0D9488', color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Send Welcome Message
              </button>
            </div>
          )}

          <AnimatePresence>
            {chatHistory.map(msg => {
              const isDoctor = msg.sender === 'doctor';
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ alignSelf: isDoctor ? 'flex-end' : 'flex-start', maxWidth: '65%', marginBottom: 2 }}>
                  <div style={{ background: isDoctor ? '#D9FDD3' : 'white', padding: '8px 12px 6px', borderRadius: isDoctor ? '8px 0 8px 8px' : '0 8px 8px 8px', boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)', fontSize: 14.5, lineHeight: 1.45, color: '#111B21' }}>
                    {msg.type === 'file' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(0,0,0,0.04)', borderRadius: 8, marginBottom: 4 }}>
                        <FileText size={20} style={{ color: '#54656F' }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{msg.fileName}</div>
                          <div style={{ fontSize: 11, color: '#667781' }}>Document</div>
                        </div>
                      </div>
                    ) : msg.text}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
                      <span style={{ fontSize: 11, color: '#667781' }}>{msg.time}</span>
                      {isDoctor && <div style={{ color: msg.status === 'read' ? '#53bdeb' : '#8696a0' }}><CheckCheck size={14} /></div>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Replies */}
        <div style={{ padding: '6px 16px', background: '#F0F2F5', borderTop: '1px solid #E9EDEF', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {['Take medication as directed', 'Your lab results are ready', 'Please schedule a follow-up', 'See you at your next appointment'].map((t, i) => (
            <button key={i} onClick={() => sendQuickReply(t)} style={{ padding: '5px 12px', borderRadius: 99, background: 'white', border: '1px solid #E9EDEF', fontSize: 12, color: '#54656F', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '8px 16px', background: '#F0F2F5', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Smile size={24} /></button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowAttachMenu(!showAttachMenu)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Paperclip size={24} /></button>
            {showAttachMenu && (
              <div style={{ position: 'absolute', bottom: 40, left: 0, background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: 8, display: 'flex', flexDirection: 'column', gap: 2, width: 180, zIndex: 10 }}>
                {[
                  { icon: FileText, label: 'Send Prescription', color: '#0D9488' },
                  { icon: ImageIcon, label: 'Share X-Ray/Scan', color: '#6366F1' },
                  { icon: FileText, label: 'Lab Report', color: '#F59E0B' },
                  { icon: Pill, label: 'Care Instructions', color: '#8B5CF6' },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return <button key={i} onClick={() => setShowAttachMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#111B21', textAlign: 'left', width: '100%' }}><Icon size={18} style={{ color: a.color }} />{a.label}</button>;
                })}
              </div>
            )}
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: 8, padding: '9px 12px' }}>
            <input placeholder="Type a message" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ width: '100%', border: 'none', outline: 'none', fontSize: 15 }} />
          </div>
          {message.trim() ? (
            <button onClick={handleSend} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Send size={24} /></button>
          ) : (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><Mic size={24} /></button>
          )}
        </div>
      </div>

      {/* ═══ RIGHT: PATIENT PROFILE PANEL ═══ */}
      {showProfile && (
        <div style={{ width: 320, background: 'white', borderLeft: '1px solid #E9EDEF', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '16px', background: '#F0F2F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#111B21' }}>Patient Info</span>
            <button onClick={() => setShowProfile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}><X size={18} /></button>
          </div>

          {/* Profile Header */}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '8px solid #F0F2F5' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0D9488, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>
              {activePatient.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{activePatient.name}</h3>
            <p style={{ fontSize: 13, color: '#667781', marginBottom: 8 }}>{activePatient.age}y · {activePatient.gender} · {activePatient.phone}</p>
            {activePatient.isNew && <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>Recently Registered</span>}
          </div>

          {/* Sections */}
          <div style={{ padding: '16px 20px', borderBottom: '8px solid #F0F2F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Calendar size={14} style={{ color: '#0D9488' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#54656F', textTransform: 'uppercase' }}>Appointments</span>
            </div>
            <div style={{ fontSize: 13, padding: 12, background: '#F8F9FA', borderRadius: 10, border: '1px solid #E9EDEF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#667781' }}>Next Visit</span>
                <span style={{ fontWeight: 600 }}>{activePatient.nextAppt}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#667781' }}>Intake Date</span>
                <span style={{ fontWeight: 600 }}>{activePatient.intake}</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 20px', borderBottom: '8px solid #F0F2F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Activity size={14} style={{ color: '#0D9488' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#54656F', textTransform: 'uppercase' }}>Clinical Notes</span>
            </div>
            {activePatient.conditions.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {activePatient.conditions.map((c, i) => (
                  <span key={i} style={{ padding: '4px 10px', borderRadius: 6, background: '#F0FDFA', border: '1px solid #CCFBF1', fontSize: 12, color: '#0D9488', fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            ) : <p style={{ fontSize: 12, color: '#667781' }}>No clinical notes yet. Start assessment after first visit.</p>}
          </div>

          <div style={{ padding: '16px 20px', borderBottom: '8px solid #F0F2F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Pill size={14} style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#54656F', textTransform: 'uppercase' }}>Prescriptions</span>
            </div>
            {activePatient.prescriptions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {activePatient.prescriptions.map((rx, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'white', border: '1px solid #E9EDEF', borderRadius: 8, fontSize: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                    {rx}
                  </div>
                ))}
              </div>
            ) : <p style={{ fontSize: 12, color: '#667781' }}>No prescriptions issued yet.</p>}
          </div>

          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FileText size={14} style={{ color: '#6366F1' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#54656F', textTransform: 'uppercase' }}>Shared Files</span>
            </div>
            {activePatient.files.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {activePatient.files.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'white', border: '1px solid #E9EDEF', borderRadius: 8, fontSize: 12 }}>
                    <span>{f}</span>
                    <ChevronRight size={14} style={{ color: '#ACB5BD' }} />
                  </div>
                ))}
              </div>
            ) : <p style={{ fontSize: 12, color: '#667781' }}>No files shared yet.</p>}
          </div>

          <div style={{ padding: '16px 20px', marginTop: 'auto' }}>
            <Link href="/doctor/history" className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', textDecoration: 'none', fontSize: 13 }}>View Full Patient Profile</Link>
          </div>
        </div>
      )}
    </div>
  );
}
