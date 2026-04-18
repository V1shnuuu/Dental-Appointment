'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.4 } },
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Decorators */}
      <div 
        style={{ 
          position: 'absolute', top: '-10%', left: '-10%', 
          width: '500px', height: '500px', 
          background: 'radial-gradient(circle, rgba(77, 168, 218, 0.15) 0%, transparent 70%)',
          zIndex: -1 
        }} 
      />
      <div 
        style={{ 
          position: 'absolute', bottom: '10%', right: '-5%', 
          width: '600px', height: '600px', 
          background: 'radial-gradient(circle, rgba(46, 196, 182, 0.1) 0%, transparent 70%)',
          zIndex: -1 
        }} 
      />

      {/* Hero Section */}
      <motion.section 
        className="container flex flex-col items-center justify-center text-center" 
        style={{ minHeight: '80vh', padding: '4rem 2rem' }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="badge badge-blue mb-4">
          ✨ Welcome to the Future of Dental Care
        </motion.div>
        
        <motion.h1 variants={itemVariants} style={{ fontSize: '3.5rem', lineHeight: 1.2, maxWidth: '800px', marginBottom: '1.5rem' }}>
          Experience <span className="text-gradient">Premium</span> Dental <br />
          Appointment Booking
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-muted" style={{ fontSize: '1.125rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
          Fluid interactions, smart scheduling, and role-based access. Designed to bring clarity, speed, and elegance to healthcare management.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <Link href="/intake" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            Book Appointment <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
          <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            View Dashboard
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="container mt-8 mb-8" style={{ padding: '4rem 2rem' }}>
        <motion.div 
          className="grid gap-8" 
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.2, duration: 0.6 }}
        >
          {/* Card 1 */}
          <motion.div className="glass flex flex-col gap-4" style={{ padding: '2rem' }}>
            <div style={{ background: 'rgba(77,168,218,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarDays color="var(--primary-color)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Smart Scheduling</h3>
            <p>Interactive animated calendars with real-time slot validation. Zero double bookings.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="glass flex flex-col gap-4" style={{ padding: '2rem' }}>
            <div style={{ background: 'rgba(46,196,182,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck color="var(--secondary-color)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Role-Based Access</h3>
            <p>Custom dashboards for Patients, Doctors, and Admins. Protected routes and seamless transitions.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div className="glass flex flex-col gap-4" style={{ padding: '2rem' }}>
            <div style={{ background: 'rgba(100,116,139,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity color="var(--text-muted)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Fluid Interactions</h3>
            <p>Smooth scrolling, parallax headers, and micro-animations deliver a premium SaaS feel.</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
