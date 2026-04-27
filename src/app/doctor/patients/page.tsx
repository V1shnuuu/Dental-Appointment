'use client';

import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Phone, Mail, Calendar, FileText, 
  ChevronRight, ArrowUpRight, Star,
  ShieldCheck, AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const patients = [
  { id: '4829', name: 'Vishnu Priyan', age: 24, gender: 'M', lastVisit: 'Sep 15, 2026', nextVisit: 'Oct 30, 2026', status: 'Active', balance: '$0.00', risk: 'Low' },
  { id: '1294', name: 'Sarah Jenkins', age: 32, gender: 'F', lastVisit: 'Aug 22, 2026', nextVisit: 'Nov 12, 2026', status: 'Active', balance: '$120.00', risk: 'Medium' },
  { id: '9921', name: 'Michael Chen', age: 45, gender: 'M', lastVisit: 'Oct 01, 2026', nextVisit: 'Oct 28, 2026', status: 'Urgent', balance: '$2,400.00', risk: 'High' },
  { id: '3382', name: 'Emma Watson', age: 29, gender: 'F', lastVisit: 'Jul 10, 2026', nextVisit: 'Jan 15, 2027', status: 'Inactive', balance: '$0.00', risk: 'Low' },
];

export default function PatientManagement() {
  const [search, setSearch] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header & Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Patient Records</h1>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>Managing 1,284 patients across St. Luke's Dental.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Filter size={16} /> Filters
           </button>
           <button className="btn btn-primary" style={{ background: 'var(--teal)', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Plus size={16} /> Add New Patient
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
           <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
           <input 
             placeholder="Search by name, ID, or phone..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             style={{ 
               width: '100%', padding: '10px 12px 10px 40px', borderRadius: 10, 
               border: '1px solid var(--border)', background: 'var(--bg-subtle)',
               fontSize: 14, outline: 'none'
             }} 
           />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
           <span className="badge badge-blue">All Patients</span>
           <span className="badge badge-amber" style={{ opacity: 0.6 }}>Urgent Care</span>
           <span className="badge badge-teal" style={{ opacity: 0.6 }}>New Patients</span>
        </div>
      </div>

      {/* Patient Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Patient Name</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>ID / Age</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Risk Level</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Last Visit</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Balance</th>
                  <th style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px 24px' }}></th>
               </tr>
            </thead>
            <tbody>
               {patients.map((p, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} className="table-row-hover">
                    <td style={{ padding: '16px 24px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>
                             {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                             <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                             <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>v.priyan@email.com</div>
                          </div>
                       </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                       <div style={{ fontSize: 13, fontWeight: 600 }}>#{p.id}</div>
                       <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.age}y · {p.gender}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.risk === 'High' ? '#EF4444' : p.risk === 'Medium' ? '#F59E0B' : '#10B981' }} />
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{p.risk}</span>
                       </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                       <div style={{ fontSize: 13, fontWeight: 600 }}>{p.lastVisit}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: p.balance !== '$0.00' ? '#EF4444' : 'inherit' }}>{p.balance}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                       <span style={{ 
                         fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                         background: p.status === 'Urgent' ? '#FEF2F2' : '#F0FDFA',
                         color: p.status === 'Urgent' ? '#EF4444' : '#0D9488',
                         border: `1px solid ${p.status === 'Urgent' ? '#FECACA' : '#CCFBF1'}`
                       }}>
                         {p.status}
                       </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                       <button className="btn-icon" style={{ background: 'none', border: 'none' }}>
                          <MoreHorizontal size={18} style={{ color: 'var(--text-tertiary)' }} />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
         <div style={{ padding: '16px 24px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Showing 4 of 1,284 patients</span>
            <div style={{ display: 'flex', gap: 8 }}>
               <button className="btn btn-secondary btn-sm" disabled>Previous</button>
               <button className="btn btn-secondary btn-sm">Next</button>
            </div>
         </div>
      </div>

      <style>{`
        .table-row-hover:hover {
          background: #F8FAFC;
        }
      `}</style>
    </div>
  );
}
