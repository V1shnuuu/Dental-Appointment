'use client';

import React from 'react';
import PatientDashboard from '@/components/dashboard/PatientDashboard';

export default function DashboardPage() {
  return (
    <div className="container mt-8 mb-8" style={{ padding: '2rem' }}>
      <PatientDashboard />
    </div>
  );
}
