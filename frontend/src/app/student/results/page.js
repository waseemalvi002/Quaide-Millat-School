'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Download, Eye, X } from 'lucide-react';

const DEMO = [
  { _id: '1', examType: 'Monthly', term: 'January 2025', totalMarks: 500, obtained: 420, percentage: 84, grade: 'A', position: 2, subjects: [{ name: 'English', total: 100, obtained: 85 }, { name: 'Urdu', total: 100, obtained: 78 }, { name: 'Math', total: 100, obtained: 92 }, { name: 'Science', total: 100, obtained: 80 }, { name: 'Islamiat', total: 100, obtained: 85 }] },
  { _id: '2', examType: 'Weekly', term: 'Week 2 Jan', totalMarks: 250, obtained: 198, percentage: 79.2, grade: 'B+', position: 3, subjects: [{ name: 'English', total: 50, obtained: 42 }, { name: 'Urdu', total: 50, obtained: 38 }, { name: 'Math', total: 50, obtained: 45 }, { name: 'Science', total: 50, obtained: 35 }, { name: 'Islamiat', total: 50, obtained: 38 }] },
  { _id: '3', examType: 'Monthly', term: 'December 2024', totalMarks: 500, obtained: 380, percentage: 76, grade: 'B+', position: 4, subjects: [{ name: 'English', total: 100, obtained: 78 }, { name: 'Urdu', total: 100, obtained: 72 }, { name: 'Math', total: 100, obtained: 85 }, { name: 'Science', total: 100, obtained: 70 }, { name: 'Islamiat', total: 100, obtained: 75 }] },
];

export default function StudentResults() {
  const [selected, setSelected] = useState(null);
  const gradeColors = { 'A+': '#059669', 'A': '#10b981', 'B+': '#3b82f6', 'B': '#60a5fa', 'C': '#f59e0b', 'D': '#ef4444' };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Results</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>View your academic performance</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {DEMO.map(r => (
            <div key={r._id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelected(r)}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-info">{r.examType}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{r.term}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', margin: '16px 0' }}>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: gradeColors[r.grade] }}>{r.grade}</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Grade</p></div>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: r.percentage >= 80 ? '#10b981' : '#f59e0b' }}>{r.percentage}%</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Percentage</p></div>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800 }}>#{r.position}</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Position</p></div>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>{r.obtained}/{r.totalMarks} marks</p>
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '550px', maxHeight: '90vh', overflow: 'auto' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Report Card - {selected.term}</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div style={{ textAlign: 'center', padding: '16px', background: 'linear-gradient(135deg,#1a56db,#3b82f6)', borderRadius: '12px', color: '#fff', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1rem' }}>Quaid-e-Millat Public Boys High School</h2>
                  <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{selected.examType} Exam - {selected.term}</p>
                </div>
                <table className="table" style={{ marginBottom: '16px' }}>
                  <thead><tr><th>Subject</th><th>Total</th><th>Obtained</th><th>%</th></tr></thead>
                  <tbody>
                    {selected.subjects.map((s, i) => (
                      <tr key={i}><td style={{ fontWeight: 600 }}>{s.name}</td><td>{s.total}</td><td>{s.obtained}</td>
                        <td style={{ fontWeight: 600, color: (s.obtained / s.total * 100) >= 60 ? '#10b981' : '#ef4444' }}>{(s.obtained / s.total * 100).toFixed(0)}%</td></tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}>
                  <span>Total: {selected.obtained}/{selected.totalMarks}</span><span>Grade: {selected.grade}</span><span>Position: #{selected.position}</span>
                </div>
                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                  <button className="btn btn-secondary"><Download size={16} /> Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
