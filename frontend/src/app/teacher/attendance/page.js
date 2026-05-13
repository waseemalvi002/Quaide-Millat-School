'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const STUDENTS = [
  { _id: '1', name: 'Ali Khan', roll: 'QM-05-001' },
  { _id: '2', name: 'Hassan Ahmed', roll: 'QM-05-002' },
  { _id: '3', name: 'Saeed Iqbal', roll: 'QM-05-003' },
  { _id: '4', name: 'Imran Javed', roll: 'QM-05-004' },
  { _id: '5', name: 'Umar Farooq', roll: 'QM-05-005' },
  { _id: '6', name: 'Rizwan Ali', roll: 'QM-05-006' },
];

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('Class 5-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(STUDENTS.reduce((a, s) => ({ ...a, [s._id]: 'present' }), {}));
  const [saved, setSaved] = useState(false);

  const toggle = (id, st) => { setAttendance(p => ({ ...p, [id]: st })); setSaved(false); };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div><h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Mark Attendance</h1><p style={{ color: '#64748b' }}>Mark daily attendance for your class</p></div>
          <button className={`btn ${saved ? 'btn-success' : 'btn-primary'}`} style={saved ? { background: '#10b981', color: '#fff' } : {}} onClick={() => setSaved(true)}>
            {saved ? '✓ Saved' : 'Save Attendance'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="form-input" style={{ width: '180px' }}>
            {['Class 5-A', 'Class 6-A', 'Class 7-A'].map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="form-input" style={{ width: '200px' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {[['Present', Object.values(attendance).filter(v => v === 'present').length, '#10b981'],
            ['Absent', Object.values(attendance).filter(v => v === 'absent').length, '#ef4444'],
            ['Leave', Object.values(attendance).filter(v => v === 'leave').length, '#f59e0b']].map(([l, v, c]) => (
            <div key={l} style={{ padding: '12px 20px', background: `${c}15`, borderRadius: '10px', textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: c }}>{v}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{l}</p>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Roll No</th><th>Student</th><th style={{ textAlign: 'center' }}>Present</th><th style={{ textAlign: 'center' }}>Absent</th><th style={{ textAlign: 'center' }}>Leave</th><th>Status</th></tr></thead>
              <tbody>
                {STUDENTS.map(s => (
                  <tr key={s._id}>
                    <td><span className="badge badge-primary">{s.roll}</span></td>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    {['present', 'absent', 'leave'].map(st => (
                      <td key={st} style={{ textAlign: 'center' }}>
                        <button onClick={() => toggle(s._id, st)} style={{
                          width: 34, height: 34, borderRadius: '50%', border: '2px solid', cursor: 'pointer',
                          borderColor: attendance[s._id] === st ? (st === 'present' ? '#10b981' : st === 'absent' ? '#ef4444' : '#f59e0b') : '#e2e8f0',
                          background: attendance[s._id] === st ? (st === 'present' ? '#10b981' : st === 'absent' ? '#ef4444' : '#f59e0b') : 'transparent',
                          color: attendance[s._id] === st ? '#fff' : '#94a3b8', transition: 'all 0.2s'
                        }}>{st === 'present' ? <CheckCircle size={14} /> : st === 'absent' ? <XCircle size={14} /> : <Clock size={14} />}</button>
                      </td>
                    ))}
                    <td><span className={`badge ${attendance[s._id] === 'present' ? 'badge-success' : attendance[s._id] === 'absent' ? 'badge-danger' : 'badge-warning'}`}>{attendance[s._id]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
