'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, FileText, Pill, User, Phone, Mail, MapPin
} from 'lucide-react';
import { useState } from 'react';

const patients = [
  { id: '4829', name: 'Vishnu Priyan', age: 24, gender: 'Male', phone: '+91 98765 43210', email: 'v.priyan@email.com', address: '123 Main St, NY', lastVisit: 'Sep 15, 2026', status: 'Active',
    history: [
      { type: 'visit', date: 'Sep 15, 2026', title: 'Routine Checkup', notes: 'Patient reported mild sensitivity in lower left molar. X-rays taken. No signs of decay.' },
      { type: 'prescription', date: 'Sep 15, 2026', title: 'Sensodyne Rx prescribed', notes: 'For cold sensitivity.' },
      { type: 'file', date: 'Sep 15, 2026', title: 'X-Ray_Lower.jpg shared', notes: 'Lower jaw X-rays.' }
    ],
    prescriptions: ['Amoxicillin 500mg', 'Sensodyne Rx'],
    files: ['X-Ray_Lower.jpg', 'Lab_Report.pdf']
  },
  { id: '1294', name: 'Sarah Jenkins', age: 32, gender: 'Female', phone: '+91 87654 32109', email: 'sarah.j@email.com', address: '456 Oak Rd, NY', lastVisit: 'Aug 22, 2026', status: 'Active',
    history: [
      { type: 'visit', date: 'Aug 22, 2026', title: 'Deep Cleaning', notes: 'Performed scaling and root planing.' },
      { type: 'prescription', date: 'Aug 22, 2026', title: 'Chlorhexidine prescribed', notes: 'Mouthwash for gingivitis.' }
    ],
    prescriptions: ['Chlorhexidine Mouthwash'],
    files: ['Perio_Chart.pdf']
  },
  { id: '9921', name: 'Michael Chen', age: 45, gender: 'Male', phone: '+91 76543 21098', email: 'm.chen@email.com', address: '789 Pine Ln, NY', lastVisit: 'Oct 01, 2026', status: 'Urgent',
    history: [
      { type: 'visit', date: 'Oct 01, 2026', title: 'Emergency Visit', notes: 'Broken crown on #14. Temporary placed.' },
      { type: 'prescription', date: 'Oct 01, 2026', title: 'Ibuprofen prescribed', notes: 'Pain management.' },
      { type: 'file', date: 'Oct 01, 2026', title: 'Crown_Scan.stl uploaded', notes: 'Digital impression for lab.' }
    ],
    prescriptions: ['Ibuprofen 400mg'],
    files: ['Crown_Scan.stl']
  }
];

export default function PatientHistory() {
  const [search, setSearch] = useState('');
  const [activePatient, setActivePatient] = useState(patients[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.includes(search)
  );

  return (
    <div style={{ height: 'calc(100vh - 152px)', margin: '0 -40px -80px', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
      
      {/* ═══ LEFT: PATIENT LIST ═══ */}
      <div style={{ width: 340, background: 'white', borderRight: '1px solid #E9EDEF', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E9EDEF' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Patient Directory</h2>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#667781' }} />
            <input 
              placeholder="Search patients by name or ID..." 
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid #E9EDEF', background: '#F8F9FA', fontSize: 13, outline: 'none' }} 
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredPatients.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setActivePatient(p)}
              style={{ 
                padding: '16px 20px', cursor: 'pointer', borderBottom: '1px solid #F8F9FA',
                background: activePatient.id === p.id ? '#F0FDFA' : 'white',
                borderLeft: activePatient.id === p.id ? '3px solid #0D9488' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111B21' }}>{p.name}</span>
                <span style={{ fontSize: 12, color: '#667781', fontWeight: 600 }}>#{p.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#667781' }}>Last visit: {p.lastVisit}</span>
                <span style={{ 
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                  background: p.status === 'Urgent' ? '#FEF2F2' : '#F0FDF4',
                  color: p.status === 'Urgent' ? '#EF4444' : '#10B981' 
                }}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ RIGHT: PATIENT DETAILS ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8F9FA', overflowY: 'auto' }}>
        
        {/* Header Profile */}
        <div style={{ padding: '32px 40px', background: 'white', borderBottom: '1px solid #E9EDEF' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #0D9488, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 32 }}>
              {activePatient.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#111B21' }}>{activePatient.name}</h1>
              <div style={{ display: 'flex', gap: 24, color: '#54656F', fontSize: 13, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><User size={14} /> {activePatient.age} yrs, {activePatient.gender}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} /> {activePatient.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {activePatient.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {activePatient.address}</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ background: '#0D9488', border: 'none' }}>Edit Details</button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: 32, marginTop: 32, borderBottom: '2px solid transparent' }}>
            {[
              { id: 'overview', label: 'Overview & History' },
              { id: 'prescriptions', label: 'Prescriptions' },
              { id: 'files', label: 'Files & Documents' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  background: 'none', border: 'none', padding: '0 0 12px 0', cursor: 'pointer',
                  fontSize: 14, fontWeight: 600, color: activeTab === tab.id ? '#0D9488' : '#667781',
                  borderBottom: activeTab === tab.id ? '2px solid #0D9488' : '2px solid transparent',
                  marginBottom: -2
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '32px 40px', flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* OVERVIEW & HISTORY TAB */}
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#111B21' }}>Interaction History</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {activePatient.history.map((event, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: event.type === 'visit' ? '#F0FDFA' : event.type === 'prescription' ? '#FEF3C7' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: event.type === 'visit' ? '#0D9488' : event.type === 'prescription' ? '#D97706' : '#3B82F6' }}>
                            {event.type === 'visit' && <Calendar size={16} />}
                            {event.type === 'prescription' && <Pill size={16} />}
                            {event.type === 'file' && <FileText size={16} />}
                          </div>
                          {i < activePatient.history.length - 1 && <div style={{ width: 2, flex: 1, background: '#E9EDEF', marginTop: 4 }} />}
                        </div>
                        <div style={{ paddingBottom: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: '#111B21' }}>{event.title}</span>
                            <span style={{ fontSize: 12, color: '#667781' }}>{event.date}</span>
                          </div>
                          <p style={{ fontSize: 14, color: '#54656F', margin: 0, lineHeight: 1.5 }}>{event.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRESCRIPTIONS TAB */}
              {activeTab === 'prescriptions' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111B21' }}>Active Prescriptions</h3>
                    <button className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Pill size={14} /> Add Prescription</button>
                  </div>
                  {activePatient.prescriptions.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                      {activePatient.prescriptions.map((rx, i) => (
                        <div key={i} style={{ background: 'white', border: '1px solid #E9EDEF', borderRadius: 12, padding: 20 }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0FDFA', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={20} /></div>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 700 }}>{rx}</div>
                              <div style={{ fontSize: 12, color: '#667781' }}>Active</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>View Details</button>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Renew</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 12, border: '1px dashed #E9EDEF', color: '#667781' }}>No active prescriptions for this patient.</div>}
                </div>
              )}

              {/* FILES TAB */}
              {activeTab === 'files' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111B21' }}>Shared Documents</h3>
                    <button className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><FileText size={14} /> Upload File</button>
                  </div>
                  {activePatient.files.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {activePatient.files.map((file, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'white', border: '1px solid #E9EDEF', borderRadius: 12 }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} /></div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600 }}>{file}</div>
                              <div style={{ fontSize: 12, color: '#667781' }}>Uploaded recently</div>
                            </div>
                          </div>
                          <button className="btn btn-secondary btn-sm">Download</button>
                        </div>
                      ))}
                    </div>
                  ) : <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 12, border: '1px dashed #E9EDEF', color: '#667781' }}>No files shared with this patient.</div>}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
