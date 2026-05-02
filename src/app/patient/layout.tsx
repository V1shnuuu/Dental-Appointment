'use client';

import { LayoutDashboard, CalendarDays, Activity, FileText, Settings, LogOut, Heart, Bell, Search, Command, MessageSquare, FolderClosed } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { logoutAction, getUserProfileAction } from '@/lib/actions/authActions';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
  { name: 'Book Appointment', href: '/patient/book', icon: CalendarDays },
  { name: 'Medical History', href: '/patient/history', icon: Activity },
  { name: 'Messages', href: '/patient/messages', icon: MessageSquare },
  { name: 'Prescriptions', href: '/patient/prescriptions', icon: FileText },
  { name: 'Shared Files', href: '/patient/files', icon: FolderClosed },
  { name: 'Settings', href: '/patient/settings', icon: Settings },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserProfileAction();
      if (userData) {
        setUser({ name: userData.name, email: userData.email || '' });
      }
    }
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    logout();
    await logoutAction();
    router.push('/login');
  };

  return (
    <div style={{ display: 'flex', background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* Ambient */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      {/* ═══ SIDEBAR ═══ */}
      <aside className="sidebar" style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
        {/* Logo */}
        <Link href="/patient/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', padding: '0 8px', marginBottom: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Heart size={15} color="white" fill="white" />
          </div>
          DentalCare<span style={{ color: 'var(--accent)' }}>+</span>
        </Link>

        {/* Search Trigger */}
        <button
          onClick={() => setShowSearch(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)',
            background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', fontSize: 13,
            cursor: 'pointer', marginBottom: 8, marginTop: 16,
          }}
        >
          <Search size={14} />
          <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 5 }}>
            <Command size={10} />K
          </span>
        </button>

        {/* Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 14px 4px' }}>Menu</p>
          {navItems.map(item => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className={`sidebar-item ${active ? 'active' : ''}`}>
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ marginTop: 'auto' }}>
          {/* Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 12px', borderTop: '1px solid var(--border)', marginTop: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
              {user?.name?.substring(0, 2).toUpperCase() || 'UP'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'Loading...'}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || ''}</div>
            </div>
            <button onClick={handleLogout} className="btn-icon" style={{ width: 32, height: 32, border: 'none' }} title="Sign Out">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{ flex: 1, marginLeft: 260, minHeight: '100vh', position: 'relative' }}>
        {/* Top Bar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(250, 251, 253, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid var(--border)',
          padding: '0 32px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
        }}>
          <button className="btn-icon" style={{ position: 'relative' }}>
            <Bell size={18} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--rose)', border: '2px solid var(--bg-surface)' }} />
          </button>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            {user?.name?.substring(0, 2).toUpperCase() || 'UP'}
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '32px 32px 60px' }}>
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

      {/* ═══ COMMAND PALETTE ═══ */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 160 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 540, background: 'var(--bg-surface)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <Search size={18} style={{ color: 'var(--text-tertiary)' }} />
                <input autoFocus placeholder="Search anything..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: 'var(--text-primary)', background: 'transparent' }} />
                <span style={{ fontSize: 11, background: 'var(--bg-subtle)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 5, color: 'var(--text-tertiary)' }}>ESC</span>
              </div>
              <div style={{ padding: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 8px', marginBottom: 4 }}>Quick Actions</p>
                {[
                  { label: 'Book Appointment', href: '/patient/book' },
                  { label: 'View Medical History', href: '/patient/history' },
                  { label: 'Dashboard', href: '/patient/dashboard' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} onClick={() => setShowSearch(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }}>
                    <CalendarDays size={16} style={{ color: 'var(--text-tertiary)' }} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media (max-width: 768px) { main { margin-left: 0 !important; } }`}</style>
    </div>
  );
}
