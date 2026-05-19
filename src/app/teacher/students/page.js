'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, Search, Eye, X, Filter, Info } from 'lucide-react';
import styles from '../teacher.module.css';

const DEMO = [
  { _id: '1', name: 'Ali Khan', roll: 'QM-05-001', class: 'Class 5-A', age: 11, phone: '0300-1234567', attendance: '94%', lastGrade: 'A' },
  { _id: '2', name: 'Hassan Ahmed', roll: 'QM-05-002', class: 'Class 5-A', age: 11, phone: '0301-2345678', attendance: '88%', lastGrade: 'B+' },
  { _id: '3', name: 'Usman Ghani', roll: 'QM-06-001', class: 'Class 6-A', age: 12, phone: '0302-3456789', attendance: '96%', lastGrade: 'A' },
  { _id: '4', name: 'Bilal Hussain', roll: 'QM-06-002', class: 'Class 6-A', age: 12, phone: '0303-4567890', attendance: '90%', lastGrade: 'B' },
  { _id: '5', name: 'Hamza Malik', roll: 'QM-07-001', class: 'Class 7-A', age: 13, phone: '0304-5678901', attendance: '92%', lastGrade: 'A-' },
];

export default function TeacherStudents() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selected, setSelected] = useState(null);
  
  const filtered = DEMO.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchesClass = selectedClass === 'All' || s.class.includes(`Class ${selectedClass}`);
    return matchesSearch && matchesClass;
  });

  const classes = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', color: 'var(--heading-accent)' }}>My Students</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px', fontWeight: 600 }}>Manage students in your assigned classes</p>

        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>Student Directory</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Use the filters below to find specific students and view their performance records.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search by name or roll no..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '48px' }} />
          </div>
          <div style={{ flex: 1, position: 'relative', minWidth: '150px' }}>
            <Filter size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="form-input" style={{ paddingLeft: '48px' }}>
              {classes.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : `Class ${c}`}</option>)}
            </select>
          </div>
        </div>

        <div className="card" style={{ border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: '#fff' }}>Student</th>
                  <th style={{ color: '#fff' }}>Roll No</th>
                  <th style={{ color: '#fff' }}>Class</th>
                  <th style={{ color: '#fff' }}>Attendance</th>
                  <th style={{ color: '#fff' }}>Last Grade</th>
                  <th style={{ color: '#fff' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 700, color: '#fff' }}>{s.name}</td>
                    <td><span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{s.roll}</span></td>
                    <td style={{ color: '#e2e8f0' }}>{s.class}</td>
                    <td style={{ color: parseFloat(s.attendance) >= 90 ? '#10b981' : '#f59e0b', fontWeight: 800 }}>{s.attendance}</td>
                    <td style={{ fontWeight: 800, color: 'var(--heading-accent)' }}>{s.lastGrade}</td>
                    <td><button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setSelected(s)}><Eye size={16} /> View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ color: 'var(--heading-accent)' }}>Student Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, boxShadow: '0 10px 20px rgba(37,99,235,0.3)' }}>{selected.name.split(' ').map(n => n[0]).join('')}</div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{selected.name}</h3>
                  <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', marginTop: '4px' }}>{selected.roll}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[['Class', selected.class], ['Age', selected.age], ['Phone', selected.phone], ['Attendance', selected.attendance], ['Last Grade', selected.lastGrade]].map(([l, v], i) => (
                    <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>{l}</p>
                      <p style={{ fontWeight: 700, color: '#fff' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
