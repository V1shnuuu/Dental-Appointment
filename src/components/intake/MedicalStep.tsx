'use client';

import React, { useState } from 'react';
import { useIntake } from '@/context/IntakeContext';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalStep() {
  const { prevStep, nextStep, medicalDetails, setMedicalDetails } = useIntake();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const handleMockUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setMedicalDetails({ ...medicalDetails, hasUpload: true });
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      <h2 style={{ marginBottom: '0.5rem' }}>Medical & Visit Info</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Help us prepare for your visit.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          
          <div className="input-group">
            <label className="input-label">Reason for Visit *</label>
            <select 
              required className="input-field" 
              value={medicalDetails.reason}
              onChange={e => setMedicalDetails({...medicalDetails, reason: e.target.value})}
            >
              <option value="">Select a reason...</option>
              <option value="Tooth Pain">Tooth Pain</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Braces Consultation">Braces Consultation</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Checkup">General Checkup</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {medicalDetails.reason === 'Other' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="input-group -mt-4">
              <input 
                required type="text" className="input-field" placeholder="Please specify..." 
                value={medicalDetails.otherReason}
                onChange={e => setMedicalDetails({...medicalDetails, otherReason: e.target.value})}
              />
            </motion.div>
          )}

          <div className="input-group">
            <label className="input-label flex justify-between">
              <span>Pain Level (0 - 10)</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{medicalDetails.painLevel}</span>
            </label>
            <input 
              type="range" min="0" max="10" 
              style={{ width: '100%', accentColor: 'var(--primary-color)', height: '8px' }}
              value={medicalDetails.painLevel}
              onChange={e => setMedicalDetails({...medicalDetails, painLevel: parseInt(e.target.value)})}
            />
          </div>

          <div className="glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.02)' }}>
            <h4 style={{ marginBottom: '1rem' }}>Medical History</h4>
            <div className="flex gap-8 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={medicalDetails.diabetes}
                  onChange={e => setMedicalDetails({...medicalDetails, diabetes: e.target.checked})}
                />
                Diabetes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={medicalDetails.bloodPressure}
                  onChange={e => setMedicalDetails({...medicalDetails, bloodPressure: e.target.checked})}
                />
                Blood Pressure Issues
              </label>
            </div>
            
            <div className="input-group">
               <label className="input-label" style={{ fontSize: '0.8rem' }}>Known Allergies (if any)</label>
               <input 
                 type="text" className="input-field" placeholder="e.g. Penicillin" 
                 value={medicalDetails.allergies}
                 onChange={e => setMedicalDetails({...medicalDetails, allergies: e.target.value})}
               />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer text-muted">
              <input 
                type="checkbox" 
                checked={medicalDetails.previousVisit}
                onChange={e => setMedicalDetails({...medicalDetails, previousVisit: e.target.checked})}
              />
              I have visited this clinic before
            </label>
          </div>

          {medicalDetails.previousVisit && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="input-group">
              <label className="input-label">Last Visit Date (Approx)</label>
              <input 
                type="date" className="input-field"
                value={medicalDetails.previousVisitDate}
                onChange={e => setMedicalDetails({...medicalDetails, previousVisitDate: e.target.value})}
              />
            </motion.div>
          )}

          {/* Simulated File Upload Component */}
          <div className="input-group mt-2">
            <label className="input-label">Upload X-Rays / Reports (Optional)</label>
            {!medicalDetails.hasUpload ? (
              <button 
                type="button" 
                onClick={handleMockUpload} 
                disabled={uploading}
                className="glass flex flex-col items-center justify-center gap-2" 
                style={{ borderStyle: 'dashed', padding: '2rem', cursor: uploading ? 'wait' : 'pointer', background: 'rgba(255,255,255,0.5)' }}
              >
                {uploading ? (
                  <div className="skeleton" style={{ width: '100px', height: '20px' }}></div>
                ) : (
                  <>
                    <UploadCloud color="var(--primary-color)" size={32} />
                    <span className="text-muted">Click to browse or drag file here</span>
                  </>
                )}
              </button>
            ) : (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass flex items-center justify-between" style={{ padding: '1rem', border: '1px solid var(--secondary-color)', background: 'rgba(46,196,182,0.1)' }}>
                <span style={{ fontWeight: 500, color: 'var(--secondary-color)' }}>report_doc.pdf</span>
                <CheckCircle color="var(--secondary-color)" />
              </motion.div>
            )}
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
          <button type="submit" className="btn btn-primary">Continue to Booking</button>
        </div>
      </form>
    </div>
  );
}
