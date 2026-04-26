'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Heart, CalendarDays, Activity, Shield, Users, 
  Sparkles, CheckCircle2, ChevronRight, Play, Star, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="landing-root" style={{ background: 'var(--bg-base)', overflowX: 'hidden' }}>
      {/* ═══ NAVBAR ═══ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(250, 251, 253, 0.7)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--text-primary)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          DentalConnect <span style={{ color: 'var(--accent)' }}>OS</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {['Features', 'How it Works', 'Pricing', 'About'].map(item => (
            <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {item}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/portal-select" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link href="/portal-select" className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: 12, fontSize: 14 }}>
            Get Started
          </Link>
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none' }}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} style={{ padding: '180px 40px 120px', textAlign: 'center', position: 'relative' }}>
        <div className="ambient-bg">
          <div className="ambient-blob blob-1" style={{ width: 600, height: 600, top: -100, left: '50%', marginLeft: -300 }} />
          <div className="ambient-blob blob-2" style={{ width: 800, height: 800, bottom: -400, right: -100 }} />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto' }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            <Sparkles size={14} /> Now Available: Patient & Doctor Multi-Portal
          </motion.div>
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 24 }}>
            Modern Dental Care <br />
            <span style={{ background: 'linear-gradient(to right, var(--accent), var(--teal))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reimagined.</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
            One connected platform for Patients and Doctors. DentalConnect OS streamlines everything from clinical notes to patient bookings.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Link href="/portal-select" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: 16, borderRadius: 16 }}>
              Get Started Now <ArrowRight size={18} />
            </Link>
            <button className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: 16, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Play size={16} fill="currentColor" /> Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          style={{ 
            marginTop: 80, position: 'relative', zIndex: 10, 
            perspective: '2000px', y, opacity
          }}
        >
          <motion.div
            initial={{ opacity: 0, rotateX: 20, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              maxWidth: 1100, margin: '0 auto', background: 'var(--bg-surface)', 
              borderRadius: 24, boxShadow: '0 40px 100px rgba(0,0,0,0.1)', border: '1px solid var(--border)',
              overflow: 'hidden', padding: 12
            }}
          >
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 16, padding: '12px 16px', border: '1px solid var(--border)', display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
              </div>
              <div style={{ flex: 1, height: 10, background: 'rgba(0,0,0,0.05)', borderRadius: 99, maxWidth: 300 }} />
            </div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              style={{ width: '100%', borderRadius: 12, display: 'block', filter: 'brightness(0.98)' }}
            />
          </motion.div>

          {/* Floating Widgets */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.5 }}
            style={{ position: 'absolute', top: '20%', left: '5%', zIndex: 20, width: 220 }}
            className="floating-widget"
          >
            <div className="card" style={{ padding: 20, textAlign: 'left', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
              <CalendarDays size={24} style={{ color: 'var(--accent)', marginBottom: 12 }} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>Upcoming Visit</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Tomorrow at 10:00 AM</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 60, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.6 }}
            style={{ position: 'absolute', bottom: '15%', right: '5%', zIndex: 20, width: 220 }}
            className="floating-widget"
          >
            <div className="card" style={{ padding: 20, textAlign: 'left', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
              <CheckCircle2 size={24} style={{ color: 'var(--teal)', marginBottom: 12 }} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>Payment Success</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Invoice #8492 Paid</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ PORTAL SELECTOR (Inline Preview) ═══ */}
      <section style={{ padding: '100px 40px', background: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Unified Portal Selection</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 60 }}>Choose your workspace to get started.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900, margin: '0 auto' }}>
            <Link href="/portal-select" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ y: -8 }} className="card" style={{ padding: 40, background: 'var(--bg-surface)', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Users size={32} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Patient Portal</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Book appointments, view medical history, and chat with your doctor.</p>
                <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  Enter Portal <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/portal-select" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ y: -8 }} className="card" style={{ padding: 40, background: 'var(--bg-surface)', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--teal-soft)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Activity size={32} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Doctor Portal</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Manage appointments, patient clinical notes, and prescriptions.</p>
                <div style={{ marginTop: 24, fontSize: 14, fontWeight: 600, color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  Enter Portal <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES BENTO GRID ═══ */}
      <section id="features" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Everything you need to <br /> run a modern clinic.</h2>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)' }}>Powerful tools designed for health professionals.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'minmax(240px, auto)', gap: 24 }}>
            {/* Bento Items */}
            <div style={{ gridColumn: 'span 8' }} className="card">
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 'auto' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700 }}>Smart Appointment Queue</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Real-time sync between doctor and patient schedules.</p>
                  </div>
                </div>
                <div style={{ marginTop: 40, background: 'var(--bg-subtle)', borderRadius: 16, height: 200, border: '1px solid var(--border)', overflow: 'hidden', padding: 20 }}>
                   <div style={{ display: 'flex', gap: 12 }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--border)' }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-soft)', marginBottom: 8 }} />
                          <div style={{ height: 10, background: 'var(--bg-subtle)', borderRadius: 4, width: '60%', marginBottom: 6 }} />
                          <div style={{ height: 10, background: 'var(--bg-subtle)', borderRadius: 4, width: '40%' }} />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="card">
              <div style={{ padding: 40, background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)', height: '100%' }}>
                <Shield size={32} style={{ color: 'var(--teal)', marginBottom: 20 }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>HIPAA Compliant</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>Your data is encrypted end-to-end with enterprise-grade security protocols.</p>
              </div>
            </div>

            <div style={{ gridColumn: 'span 4' }} className="card">
              <div style={{ padding: 40 }}>
                <Activity size={32} style={{ color: 'var(--purple)', marginBottom: 20 }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Clinical Analytics</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>Track clinic performance and patient health trends with ease.</p>
              </div>
            </div>

            <div style={{ gridColumn: 'span 8' }} className="card">
              <div style={{ padding: 40, display: 'flex', gap: 40, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Slack-like Messaging</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>Direct communication between doctor and patient with file sharing and prescriptions.</p>
                </div>
                <div style={{ flex: 1, background: 'var(--bg-subtle)', borderRadius: 16, padding: 20, border: '1px solid var(--border)' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ alignSelf: 'flex-start', background: 'var(--accent)', color: 'white', padding: '8px 12px', borderRadius: '12px 12px 12px 4px', fontSize: 12 }}>Hello Doctor!</div>
                      <div style={{ alignSelf: 'flex-end', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '12px 12px 4px 12px', fontSize: 12, border: '1px solid var(--border)' }}>How can I help you?</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <footer style={{ padding: '120px 40px 60px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>Ready to modernize your practice?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 80 }}>
            <Link href="/portal-select" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: 16 }}>Get Started</Link>
            <button className="btn btn-secondary" style={{ padding: '16px 40px', fontSize: 16 }}>Book a Demo</button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 18 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={14} color="white" fill="white" />
              </div>
              DentalConnect
            </div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>
              © 2026 DentalConnect OS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: block !important; }
          [style*="grid-template-columns: repeat(12"] { grid-template-columns: 1fr !important; }
          [style*="grid-column: span 8"], [style*="grid-column: span 4"] { grid-column: span 1 !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          .floating-widget { display: none; }
        }
      `}</style>
    </div>
  );
}
