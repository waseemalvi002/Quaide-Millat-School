'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Plus, X } from 'lucide-react';

export default function TeacherResults() {
  const [selectedClass, setSelectedClass] = useState('Class 5-A');
  const [examType, setExamType] = useState('Monthly');
  const [students, setStudents] = useState([
    { name: 'Ali Khan', roll: 'QM-05-001', marks: { english: 85, urdu: 78, math: 92, science: 75, islamiat: 88 } },
    { name: 'Hassan Ahmed', roll: 'QM-05-002', marks: { english: 72, urdu: 68, math: 80, science: 70, islamiat: 82 } },
    { name: 'Saeed Iqbal', roll: 'QM-05-003', marks: { english: 90, urdu: 85, math: 95, science: 88, islamiat: 90 } },
    { name: 'Imran Javed', roll: 'QM-05-004', marks: { english: 65, urdu: 72, math: 58, science: 60, islamiat: 75 } },
  ]);
  const [saved, setSaved] = useState(false);
  const subjects = ['english', 'urdu', 'math', 'science', 'islamiat'];

  const updateMark = (idx, sub, val) => {
    const updated = [...students];
    updated[idx].marks[sub] = parseInt(val) || 0;
    setStudents(updated);
    setSaved(false);
  };

  const getTotal = (marks) => Object.values(marks).reduce((s, m) => s + m, 0);
  const getPercentage = (marks) => (getTotal(marks) / (subjects.length * 100) * 100).toFixed(1);
  const getGrade = (pct) => pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F';

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div><h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Upload Results</h1><p style={{ color: '#64748b' }}>Enter marks for your students</p></div>
          <button className={`btn ${saved ? 'btn-success' : 'btn-primary'}`} style={saved ? { background: '#10b981', color: '#fff' } : {}} onClick={() => setSaved(true)}>
            {saved ? '✓ Saved' : 'Save Results'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="form-input" style={{ width: '180px' }}>
            {['Class 5-A', 'Class 6-A', 'Class 7-A', 'Class 8-A'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={examType} onChange={e => setExamType(e.target.value)} className="form-input" style={{ width: '160px' }}>
            {['Weekly', '15-Days', 'Monthly', 'Mid-Term', 'Final'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Student</th><th>Roll No</th>{subjects.map(s => <th key={s} style={{ textTransform: 'capitalize' }}>{s}</th>)}<th>Total</th><th>%</th><th>Grade</th></tr></thead>
              <tbody>
                {students.map((s, idx) => {
                  const pct = getPercentage(s.marks);
                  return (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td><span className="badge badge-primary">{s.roll}</span></td>
                      {subjects.map(sub => (
                        <td key={sub}><input type="number" min="0" max="100" value={s.marks[sub]} onChange={e => updateMark(idx, sub, e.target.value)} style={{ width: '60px', padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem' }} /></td>
                      ))}
                      <td style={{ fontWeight: 700 }}>{getTotal(s.marks)}/{subjects.length * 100}</td>
                      <td style={{ fontWeight: 700, color: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>{pct}%</td>
                      <td><span style={{ fontWeight: 800, fontSize: '1rem', color: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>{getGrade(pct)}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
