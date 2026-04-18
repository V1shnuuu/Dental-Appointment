'use client';

import React from 'react';
import { IntakeProvider, useIntake } from '@/context/IntakeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Steps imports
import AuthStep from '@/components/intake/AuthStep';
import PersonalStep from '@/components/intake/PersonalStep';
import MedicalStep from '@/components/intake/MedicalStep';
import BookingStep from '@/components/intake/BookingStep';
import ConfirmationStep from '@/components/intake/ConfirmationStep';

function IntakeFlow() {
  const { currentStep } = useIntake();

  const variants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const stepsList = ['Authentication', 'Personal Details', 'Medical Info', 'Book Appointment'];

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {currentStep < 5 && (
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="text-center" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            Patient <span className="text-gradient">Intake</span>
          </h1>
          
          <div className="flex items-center justify-between relative" style={{ zIndex: 1 }}>
            <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'rgba(0,0,0,0.05)', zIndex: -1 }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--gradient-primary)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {stepsList.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isPast = currentStep > stepNumber;
              
              return (
                <div key={stepNumber} className="flex flex-col items-center gap-2" style={{ width: '80px' }}>
                  <div 
                    style={{ 
                      width: '36px', height: '36px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isActive || isPast ? 'white' : 'var(--bg-color)',
                      border: isActive || isPast ? '2px solid var(--primary-color)' : '2px solid rgba(0,0,0,0.1)',
                      color: isActive || isPast ? 'var(--primary-color)' : 'var(--text-muted)',
                      fontWeight: 600, transition: 'all 0.3s'
                    }}
                  >
                    {isPast ? '✓' : stepNumber}
                  </div>
                  <div style={{ fontSize: '0.75rem', textAlign: 'center', color: isActive ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: isActive ? 600 : 400 }}>
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="glass" style={{ padding: '2.5rem', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {currentStep === 1 && <AuthStep />}
            {currentStep === 2 && <PersonalStep />}
            {currentStep === 3 && <MedicalStep />}
            {currentStep === 4 && <BookingStep />}
            {currentStep === 5 && <ConfirmationStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function IntakePage() {
  return (
    <IntakeProvider>
      <IntakeFlow />
    </IntakeProvider>
  );
}
