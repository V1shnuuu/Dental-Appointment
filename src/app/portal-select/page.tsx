'use client';

import { motion } from 'framer-motion';
import { User, Activity, ArrowRight, Heart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function PortalSelect() {
  const router = useRouter();

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      padding: 40
    }}>
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" style={{ top: '10%', left: '10%' }} />
        <div className="ambient-blob blob-2" style={{ bottom: '10%', right: '10%' }} />
      </div>

      <header style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto', width: '100%', marginBottom: 60 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
          <ChevronLeft size={16} /> Back to Site
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} color="white" fill="white" />
          </div>
          DentalConnect
        </div>
        <div style={{ width: 80 }} />
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>Select Your Workspace</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>Choose the portal you want to access today.</p>
        </motion.div>

        <div style={{ display: 'flex', gap: 24, maxWidth: 900, width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Patient Portal */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="card" 
            style={{ 
              flex: 1, minWidth: 340, padding: 48, background: 'var(--bg-surface)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              cursor: 'pointer', border: '2px solid transparent', transition: 'border 0.3s'
            }}
            onClick={() => router.push('/login')}
          >
            <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
              <User size={40} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Patient Portal</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
              Book appointments, check medical history, view prescriptions, and message your care team.
            </p>
            <div className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 8 }}>
              Patient Login <ArrowRight size={18} />
            </div>
          </motion.div>

          {/* Doctor Portal */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="card" 
            style={{ 
              flex: 1, minWidth: 340, padding: 48, background: 'var(--bg-surface)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              cursor: 'pointer', border: '2px solid transparent', transition: 'border 0.3s'
            }}
            onClick={() => router.push('/doctor/login')}
          >
            <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--teal-soft)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
              <Activity size={40} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Doctor Portal</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
              Manage clinical schedule, patient records, issue prescriptions, and clinical chat.
            </p>
            <div className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 8, background: 'var(--teal)' }}>
              Doctor Login <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>

        <p style={{ marginTop: 48, fontSize: 14, color: 'var(--text-tertiary)' }}>
          Need help? <Link href="/" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Contact Support</Link>
        </p>
      </main>
    </div>
  );
}
