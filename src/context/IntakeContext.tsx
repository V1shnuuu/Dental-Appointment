'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Step = 1 | 2 | 3 | 4 | 5; // 5 is confirmation

interface PatientDetails {
  fullName: string;
  age: number | '';
  gender: string;
  phone: string;
  email: string;
  address: string;
}

interface MedicalDetails {
  reason: string;
  otherReason: string;
  painLevel: number;
  diabetes: boolean;
  bloodPressure: boolean;
  allergies: string;
  previousVisit: boolean;
  previousVisitDate: string;
  hasUpload: boolean;
}

interface BookingDetails {
  doctorId: string;
  date: string;
  timeSlot: string;
  notes: string;
}

interface IntakeContextType {
  currentStep: Step;
  setStep: (step: Step) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  patientDetails: PatientDetails;
  setPatientDetails: React.Dispatch<React.SetStateAction<PatientDetails>>;
  
  medicalDetails: MedicalDetails;
  setMedicalDetails: React.Dispatch<React.SetStateAction<MedicalDetails>>;

  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;

  isSubmitting: boolean;
  setIsSubmitting: (state: boolean) => void;
  submitForm: () => Promise<boolean>;
  confirmationId: string;
}

const IntakeContext = createContext<IntakeContextType | undefined>(undefined);

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [currentStep, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    fullName: '', age: '', gender: '', phone: '', email: '', address: ''
  });

  const [medicalDetails, setMedicalDetails] = useState<MedicalDetails>({
    reason: '', otherReason: '', painLevel: 0, diabetes: false, bloodPressure: false,
    allergies: '', previousVisit: false, previousVisitDate: '', hasUpload: false
  });

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    doctorId: '', date: '', timeSlot: '', notes: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5) as Step);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientDetails, medicalDetails, bookingDetails })
      });
      const data = await response.json();
      if (data.success) {
        setConfirmationId(data.appointmentId);
        nextStep(); // move to step 5 (success)
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IntakeContext.Provider value={{
      currentStep, setStep, nextStep, prevStep,
      patientDetails, setPatientDetails,
      medicalDetails, setMedicalDetails,
      bookingDetails, setBookingDetails,
      isSubmitting, setIsSubmitting, submitForm, confirmationId
    }}>
      {children}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  const context = useContext(IntakeContext);
  if (!context) throw new Error('useIntake must be used within IntakeProvider');
  return context;
}
