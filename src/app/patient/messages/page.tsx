'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Paperclip, MoreVertical, 
  Phone, Video, CheckCheck,
  Heart, Shield, Search, ChevronLeft,
  Smile, Mic, Image as ImageIcon, Camera
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { getUserProfileAction } from '@/lib/actions/authActions';

const mockConversations = [
  { id: 1, name: 'Dr. James Wilson', role: 'Lead Dentist', online: true, avatar: 'JW', lastMsg: 'I\'ve reviewed your X-rays...', time: '10:52 AM', unread: 0 },
  { id: 2, name: 'Sarah (Reception)', role: 'Scheduling', online: false, avatar: 'SR', lastMsg: 'Your appointment is confirmed.', time: 'Yesterday', unread: 2 },
  { id: 3, name: 'Dental Lab', role: 'Support', online: true, avatar: 'DL', lastMsg: 'The crown is ready for fitting.', time: 'Monday', unread: 0 },
];

const mockChatHistory = [
  { id: 1, sender: 'doctor', text: "Hi Vishnu, I've reviewed your recent X-rays. Everything looks good, but I've issued a prescription for a specialized toothpaste to help with that cold sensitivity you mentioned.", time: '10:45 AM', status: 'read' },
  { id: 2, sender: 'patient', text: "Thank you doctor! I'll pick that up today. Should I use it every morning?", time: '10:48 AM', status: 'read' },
  { id: 3, sender: 'doctor', text: "Yes, every morning and night. I've also shared the detailed care instructions below.", time: '10:52 AM', status: 'read' },
];

export default function PatientWhatsAppChat() {
  const [user, setUser] = useState<any>(null);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserProfileAction();
      if (userData) {
        setUser(userData);
        const isMock = userData.email === 'patient@demo.com';
        if (isMock) {
          setActiveChat(mockConversations[0]);
          setChatHistory(mockChatHistory);
        }
      }
    }
    fetchUser();
  }, []);

  const isMock = user?.email === 'patient@demo.com';
  const conversations = isMock ? mockConversations : [];
  const displayName = isMock ? 'Vishnu' : (user?.name || '...');
  const displayAvatar = isMock ? 'VP' : (user?.name?.substring(0, 2).toUpperCase() || '??');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setChatHistory([...chatHistory, newMsg]);
    setMessage('');

    // Simulated doctor response
    setTimeout(() => {
       setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m));
    }, 1000);
    setTimeout(() => {
       setChatHistory(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m));
    }, 2000);
  };

  return (
    <div style={{ 
      height: 'calc(100vh - 140px)', margin: '0 -32px -60px', display: 'flex', 
      background: '#F0F2F5', overflow: 'hidden', borderTop: '1px solid var(--border)' 
    }}>
      
      {/* Sidebar */}
      <div style={{ 
        width: 360, background: 'white', borderRight: '1px solid #E9EDEF', 
        display: 'flex', flexDirection: 'column' 
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '16px', background: '#F0F2F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{displayAvatar}</div>
          <div style={{ display: 'flex', gap: 20, color: '#54656F' }}>
            <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ImageIcon size={20} /></motion.button>
            <motion.button whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><MoreVertical size={20} /></motion.button>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #E9EDEF' }}>
          <div style={{ background: '#F0F2F5', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '6px 12px', gap: 12 }}>
            <Search size={16} style={{ color: '#54656F' }} />
            <input placeholder="Search or start new chat" style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, flex: 1 }} />
          </div>
        </div>

        {/* Chat List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => setActiveChat(conv)}
              style={{ 
                display: 'flex', gap: 12, padding: '12px 16px', cursor: 'pointer',
                background: activeChat.id === conv.id ? '#F0F2F5' : 'transparent',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = activeChat.id === conv.id ? '#F0F2F5' : '#F5F6F6'}
              onMouseLeave={(e) => e.currentTarget.style.background = activeChat.id === conv.id ? '#F0F2F5' : 'transparent'}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#54656F', flexShrink: 0, position: 'relative' }}>
                {conv.avatar}
                {conv.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#10B981', border: '2px solid white' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0, borderBottom: '1px solid #F5F6F6', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: '#111B21' }}>{conv.name}</span>
                  <span style={{ fontSize: 12, color: conv.unread > 0 ? '#00A884' : '#667781' }}>{conv.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <p style={{ fontSize: 13, color: '#667781', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.lastMsg}</p>
                   {conv.unread > 0 && <span style={{ background: '#25D366', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>{conv.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {activeChat ? (
          <>
            {/* Chat Area Header */}
            <div style={{ padding: '10px 16px', background: '#F0F2F5', borderLeft: '1px solid #E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E9EDEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#54656F' }}>
                    {activeChat.avatar}
                  </div>
                  <div>
                     <div style={{ fontSize: 16, fontWeight: 500, color: '#111B21' }}>{activeChat.name}</div>
                     <div style={{ fontSize: 12, color: '#667781' }}>{activeChat.online ? 'online' : 'last seen recently'}</div>
                  </div>
               </div>
               <div style={{ display: 'flex', gap: 24, color: '#54656F' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Video size={20} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Phone size={20} /></button>
                  <div style={{ width: 1, height: 20, background: '#D1D7DB' }} />
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Search size={20} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><MoreVertical size={20} /></button>
               </div>
            </div>

            {/* Messaging Interface */}
            <div 
              ref={scrollRef}
              style={{ 
                flex: 1, overflowY: 'auto', padding: '20px 60px', 
                background: '#EFEAE2', 
                backgroundImage: 'url("https://w0.peakpx.com/wallpaper/580/678/HD-wallpaper-whatsapp-background-whatsapp-texture.jpg")',
                backgroundSize: '400px',
                display: 'flex', flexDirection: 'column', gap: 4
              }}
            >
              {/* Encryption Notice */}
              <div style={{ alignSelf: 'center', background: '#FFF5C4', padding: '6px 12px', borderRadius: 8, fontSize: 12, color: '#54656F', display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0 20px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                 <Shield size={14} /> Messages are end-to-end encrypted. No one outside of this chat, not even Dental Connect OS, can read or listen to them.
              </div>

              <AnimatePresence>
                {chatHistory.map((msg, i) => {
                  const isPatient = msg.sender === 'patient';
                  return (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      style={{ 
                        alignSelf: isPatient ? 'flex-end' : 'flex-start',
                        maxWidth: '65%',
                        position: 'relative',
                        marginBottom: 4
                      }}
                    >
                      <div style={{ 
                        background: isPatient ? '#D9FDD3' : 'white',
                        padding: '8px 12px 6px',
                        borderRadius: isPatient ? '8px 0 8px 8px' : '0 8px 8px 8px',
                        boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                        fontSize: 14.5,
                        lineHeight: 1.5,
                        color: '#111B21',
                        position: 'relative'
                      }}>
                        {msg.text}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
                           <span style={{ fontSize: 11, color: '#667781' }}>{msg.time}</span>
                           {isPatient && (
                             <div style={{ color: msg.status === 'read' ? '#53bdeb' : '#8696a0' }}>
                               {msg.status === 'sent' ? <CheckCheck size={14} style={{ opacity: 0.5 }} /> : <CheckCheck size={14} />}
                             </div>
                           )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div style={{ padding: '8px 16px', background: '#F0F2F5', display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ display: 'flex', gap: 16, color: '#54656F' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Smile size={24} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Paperclip size={24} /></button>
               </div>
               <div style={{ flex: 1, background: 'white', borderRadius: 8, padding: '9px 12px' }}>
                  <input 
                    placeholder="Type a message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: 15 }} 
                  />
               </div>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {message.trim() ? (
                    <button 
                      onClick={handleSend}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}
                    >
                      <Send size={24} />
                    </button>
                  ) : (
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#54656F' }}>
                      <Mic size={24} />
                    </button>
                  )}
               </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F0F2F5', gap: 20 }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}>
              <Smile size={60} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111B21', marginBottom: 8 }}>Your inbox is empty</h3>
              <p style={{ fontSize: 14, color: '#667781' }}>Once you start a conversation with our staff,<br />your messages will appear here.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
