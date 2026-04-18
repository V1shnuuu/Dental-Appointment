'use client';

import React from 'react';
import { useIntake } from '@/context/IntakeContext';

export default function PersonalStep() {
  const { prevStep, nextStep, patientDetails, setPatientDetails } = useIntake();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex flex-col">
      <h2 style={{ marginBottom: '0.5rem' }}>Personal Details</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Please provide your contact and demographic details.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="input-group">
            <label className="input-label">Full Name *</label>
            <input 
              required type="text" className="input-field" placeholder="John Doe" 
              value={patientDetails.fullName}
              onChange={e => setPatientDetails({...patientDetails, fullName: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Age *</label>
              <input 
                required type="number" min="1" max="120" className="input-field" placeholder="Age" 
                value={patientDetails.age}
                onChange={e => setPatientDetails({...patientDetails, age: parseInt(e.target.value) || ''})}
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Gender</label>
              <select 
                className="input-field"
                value={patientDetails.gender}
                onChange={e => setPatientDetails({...patientDetails, gender: e.target.value})}
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number *</label>
            <input 
              required type="tel" pattern="[0-9]{10}" title="Ten digit phone number" className="input-field" placeholder="10-digit number" 
              value={patientDetails.phone}
              onChange={e => setPatientDetails({...patientDetails, phone: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" className="input-field" placeholder="john@example.com" 
              value={patientDetails.email}
              onChange={e => setPatientDetails({...patientDetails, email: e.target.value})}
            />
          </div>

          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Home Address</label>
            <input 
              type="text" className="input-field" placeholder="123 Street Name, City" 
              value={patientDetails.address}
              onChange={e => setPatientDetails({...patientDetails, address: e.target.value})}
            />
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
          <button type="submit" className="btn btn-primary">Continue to Medical</button>
        </div>
      </form>
    </div>
  );
}
