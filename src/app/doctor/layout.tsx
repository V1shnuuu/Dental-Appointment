'use client';

import { 
  LayoutDashboard, Calendar, 
  Pill, FolderClosed, MessageSquare, 
  Settings, LogOut, Heart, Bell, Search, Command,
  Plus, History, Network
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
  { name: 'History', href: '/doctor/history', icon: History },
  { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { name: 'Messages', href: '/doctor/messages', icon: MessageSquare, badge: 3 },
  { name: 'Collab', href: '/doctor/collab', icon: Network },
  { name: 'Prescriptions', href: '/doctor/prescriptions', icon: Pill },
  { name: 'Shared Files', href: '/doctor/files', icon: FolderClosed },
  { name: 'Settings', href: '/doctor/settings', icon: Settings },
];

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  // Skip layout for login page
  if (pathname === '/doctor/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    router.push('/portal-select');
  };

  return (
    <div style={{ display: 'flex', background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* ═══ SIDEBAR ═══ */}
      <aside className="sidebar" style={{ 
        background: 'var(--bg-surface)', 
        borderRight: '1px solid var(--border)',
        width: 280
      }}>
        {/* Branding */}
        <Link href="/doctor/dashboard" style={{ 
          display: 'flex', alignItems: 'center', gap: 12, 
          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20, 
          color: 'var(--text-primary)', padding: '0 8px', marginBottom: 32, 
          textDecoration: 'none' 
        }}>
          <div style={{ 
            width: 36, height: 36, borderRadius: 10, 
            background: 'linear-gradient(135deg, #0D9488, #14B8A6)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          DentalConnect<span style={{ color: 'var(--teal)' }}>OS</span>
        </Link>

        {/* Global Action */}
        <button className="btn btn-primary" style={{ 
          width: '100%', marginBottom: 24, padding: '12px', fontSize: 14,
          background: 'var(--teal)', border: 'none', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <Plus size={16} /> New Clinical Note
        </button>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ 
            fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', 
            textTransform: 'uppercase', letterSpacing: '0.1em', 
            padding: '8px 14px 4px' 
          }}>Clinical Console</p>
          {navItems.map(item => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`sidebar-item ${active ? 'active' : ''}`}
                style={{ color: active ? 'var(--teal)' : 'var(--text-secondary)' }}
              >
                <Icon size={18} style={{ color: active ? 'var(--teal)' : 'var(--text-tertiary)' }} />
                {item.name}
                {item.badge && (
                  <span style={{ 
                    marginLeft: 'auto', background: 'var(--teal)', color: 'white', 
                    fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 6 
                  }}>{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Doctor Profile */}
        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px' }}>
            <div style={{ 
              width: 40, height: 40, borderRadius: 12, 
              background: 'linear-gradient(135deg, var(--teal), #0F766E)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: 'white', fontWeight: 700, fontSize: 14
            }}>
              JW
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Dr. James Wilson</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Medical Director</div>
            </div>
            <button onClick={handleLogout} className="btn-icon" style={{ border: 'none', background: 'none' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{ flex: 1, marginLeft: 280, minHeight: '100vh', position: 'relative' }}>
        {/* Top Command Bar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 40px', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 400 }}>
             <div style={{ 
               display: 'flex', alignItems: 'center', gap: 10, width: '100%',
               padding: '10px 16px', borderRadius: 12, border: '1px solid var(--border)',
               background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', fontSize: 14,
               cursor: 'pointer'
             }} onClick={() => setShowSearch(true)}>
                <Search size={16} />
                <span>Search patients, files, or notes...</span>
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 2, fontSize: 11, background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 6 }}>
                  <Command size={10} />K
                </span>
             </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right', marginRight: 8 }} className="desktop-only">
               <div style={{ fontSize: 12, fontWeight: 700 }}>St. Luke's Dental Clinic</div>
               <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Main Campus · Floor 2</div>
            </div>
            <button className="btn-icon" style={{ position: 'relative', width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border)' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--rose)', border: '2px solid white' }} />
            </button>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--teal), #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
              JW
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div style={{ padding: '40px 40px 80px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global CSS for Doctor Theme */}
      <style>{`
        :root {
          --teal: #0D9488;
          --teal-soft: #F0FDFA;
          --teal-border: #99F6E4;
        }
        .sidebar-item.active {
          background: var(--teal-soft) !important;
          color: var(--teal) !important;
          border-right: 3px solid var(--teal);
          border-radius: 0 12px 12px 0;
          margin-right: 12px;
        }
        @media (max-width: 768px) {
          aside { display: none !important; }
          main { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
