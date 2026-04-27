'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Paperclip, Phone, Video, Search, Smile,
  Hash, Users, FileText, Image as ImageIcon, CheckCheck, UserPlus, Info,
  Settings
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const channels = [
  { id: 'c1', name: 'general', type: 'channel', unread: 0 },
  { id: 'c2', name: 'lab-reports', type: 'channel', unread: 3 },
  { id: 'c3', name: 'reception-desk', type: 'channel', unread: 0 },
];

const teamMembers = [
  { id: 'u1', name: 'Dr. Sarah Smith', role: 'Orthodontist', online: true, avatar: 'SS', unread: 0 },
  { id: 'u2', name: 'John (Lab Tech)', role: 'Dental Lab', online: true, avatar: 'JL', unread: 1 },
  { id: 'u3', name: 'Emma (Reception)', role: 'Front Desk', online: false, avatar: 'ER', unread: 0 },
];

const chatHistories: Record<string, Array<{ id: number; sender: string; name?: string; text: string; time: string; status?: string; isSelf?: boolean }>> = {
  'c2': [
    { id: 1, sender: 'u2', name: 'John (Lab Tech)', text: "I've uploaded the new crowns for Mr. Chen.", time: '09:15 AM', isSelf: false },
    { id: 2, sender: 'u2', name: 'John (Lab Tech)', text: "They are ready for fitting this afternoon.", time: '09:16 AM', isSelf: false },
    { id: 3, sender: 'self', name: 'You', text: "Thanks John. I'll review them before the 2 PM appointment.", time: '09:20 AM', isSelf: true, status: 'read' },
  ],
  'u1': [
    { id: 10, sender: 'u1', name: 'Dr. Sarah Smith', text: "Can you take a look at the X-rays for Patient #4829?", time: '11:00 AM', isSelf: false },
    { id: 11, sender: 'self', name: 'You', text: "Sure, I'll check them right after my current consultation.", time: '11:05 AM', isSelf: true, status: 'read' },
  ]
};

export default function DoctorCollabHub() {
  const [activeChat, setActiveChat] = useState<any>({ ...channels[1], isChannel: true });
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(chatHistories['c2'] || []);
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatHistory(chatHistories[activeChat.id] || []);
  }, [activeChat]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { 
      id: Date.now(), sender: 'self', name: 'You', text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isSelf: true, status: 'sent' 
    };
    const updated = [...chatHistory, newMsg];
    setChatHistory(updated);
    chatHistories[activeChat.id] = updated;
    setMessage('');
    
    if (!activeChat.isChannel) {
      setTimeout(() => setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)), 800);
      setTimeout(() => setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m)), 2000);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 152px)', margin: '0 -40px -80px', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>

      {/* ═══ LEFT: SIDEBAR ═══ */}
      <div style={{ width: 280, background: '#111B21', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>St. Luke's Team</h2>
          <button style={{ background: 'none', border: 'none', color: '#ACB5BD', cursor: 'pointer' }}><Settings size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {/* Channels */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ padding: '0 16px', fontSize: 12, fontWeight: 700, color: '#667781', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>Channels</div>
            {channels.map(c => (
              <div 
                key={c.id} 
                onClick={() => setActiveChat({ ...c, isChannel: true })}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer',
                  background: activeChat.id === c.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeChat.id === c.id ? 'white' : '#ACB5BD',
                  borderLeft: activeChat.id === c.id ? '3px solid #0D9488' : '3px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Hash size={16} />
                  <span style={{ fontSize: 14, fontWeight: activeChat.id === c.id || c.unread > 0 ? 600 : 400 }}>{c.name}</span>
                </div>
                {c.unread > 0 && <span style={{ background: '#EF4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{c.unread}</span>}
              </div>
            ))}
          </div>

          {/* Direct Messages */}
          <div>
            <div style={{ padding: '0 16px', fontSize: 12, fontWeight: 700, color: '#667781', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>Direct Messages</div>
            {teamMembers.map(m => (
              <div 
                key={m.id} 
                onClick={() => setActiveChat({ ...m, isChannel: false })}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer',
                  background: activeChat.id === m.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeChat.id === m.id ? 'white' : '#ACB5BD',
                  borderLeft: activeChat.id === m.id ? '3px solid #0D9488' : '3px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: '#2A3942', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>{m.avatar}</div>
                    {m.online && <div style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#10B981', border: '1px solid #111B21' }} />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: activeChat.id === m.id || m.unread > 0 ? 600 : 400 }}>{m.name.split(' ')[0]}</span>
                </div>
                {m.unread > 0 && <span style={{ background: '#0D9488', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{m.unread}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CENTER: CHAT AREA ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111B21', display: 'flex', alignItems: 'center', gap: 6 }}>
              {activeChat.isChannel ? <Hash size={20} style={{ color: '#667781' }} /> : null}
              {activeChat.name}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, color: '#54656F', alignItems: 'center' }}>
            {!activeChat.isChannel && <Phone size={18} style={{ cursor: 'pointer' }} />}
            {!activeChat.isChannel && <Video size={18} style={{ cursor: 'pointer' }} />}
            <UserPlus size={18} style={{ cursor: 'pointer' }} />
            <Search size={18} style={{ cursor: 'pointer' }} />
            <Info size={18} onClick={() => setShowInfo(!showInfo)} style={{ cursor: 'pointer', color: showInfo ? '#0D9488' : '#54656F' }} />
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {chatHistory.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#667781' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {activeChat.isChannel ? <Hash size={32} /> : <Users size={32} />}
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#111B21' }}>
                {activeChat.isChannel ? `Welcome to #${activeChat.name}` : `Start conversation with ${activeChat.name}`}
              </h3>
              <p style={{ fontSize: 14, margin: 0 }}>This is the beginning of your chat history.</p>
            </div>
          )}

          <AnimatePresence>
            {chatHistory.map((msg, i) => {
              const showHeader = i === 0 || chatHistory[i - 1].sender !== msg.sender;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 12 }}>
                  {showHeader ? (
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: msg.isSelf ? '#0D9488' : '#6366F1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {msg.isSelf ? 'You' : msg.name?.charAt(0)}
                    </div>
                  ) : <div style={{ width: 36 }} />}
                  <div style={{ flex: 1 }}>
                    {showHeader && (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#111B21' }}>{msg.name}</span>
                        <span style={{ fontSize: 11, color: '#667781' }}>{msg.time}</span>
                      </div>
                    )}
                    <div style={{ fontSize: 14.5, color: '#111B21', lineHeight: 1.5, display: 'inline-block', position: 'relative' }}>
                      {msg.text}
                      {msg.isSelf && !activeChat.isChannel && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8, color: msg.status === 'read' ? '#0D9488' : '#ACB5BD', verticalAlign: 'middle' }}>
                          <CheckCheck size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ border: '1px solid #E9EDEF', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#F8F9FA', padding: '8px 12px', borderBottom: '1px solid #E9EDEF', display: 'flex', gap: 12, color: '#667781' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><Paperclip size={16} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><ImageIcon size={16} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}><Smile size={16} /></button>
            </div>
            <div style={{ display: 'flex', padding: '12px', background: 'white' }}>
              <input 
                placeholder={`Message ${activeChat.isChannel ? '#' + activeChat.name : activeChat.name}`}
                value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14 }}
              />
              <button onClick={handleSend} style={{ background: message.trim() ? '#0D9488' : '#E9EDEF', color: 'white', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: message.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT: INFO PANEL ═══ */}
      {showInfo && (
        <div style={{ width: 300, background: '#F8F9FA', borderLeft: '1px solid #E9EDEF', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid #E9EDEF' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px 0', color: '#111B21' }}>Details</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: activeChat.isChannel ? 8 : '50%', background: activeChat.isChannel ? '#E9EDEF' : '#2A3942', color: activeChat.isChannel ? '#54656F' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>
                {activeChat.isChannel ? <Hash size={24} /> : activeChat.avatar}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{activeChat.name}</div>
                {!activeChat.isChannel && <div style={{ fontSize: 12, color: '#667781' }}>{activeChat.role}</div>}
              </div>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#667781', textTransform: 'uppercase', marginBottom: 12 }}>Shared Files</div>
            {[1, 2].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px', background: 'white', borderRadius: 8, border: '1px solid #E9EDEF', marginBottom: 8 }}>
                <FileText size={16} style={{ color: '#0D9488' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Report_W{i}.pdf</div>
                  <div style={{ fontSize: 10, color: '#667781' }}>2.4 MB</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
