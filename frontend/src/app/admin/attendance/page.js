'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import styles from '../admin.module.css';

const STUDENTS_CLASS1 = [
  { _id: '1', name: 'Ali Khan', rollNumber: 'QM-01-001' },
  { _id: '2', name: 'Hassan Ahmed', rollNumber: 'QM-01-002' },
  { _id: '3', name: 'Saeed Iqbal', rollNumber: 'QM-01-003' },
  { _id: '4', name: 'Imran Javed', rollNumber: 'QM-01-004' },
  { _id: '5', name: 'Umar Farooq', rollNumber: 'QM-01-005' },
  { _id: '6', name: 'Rizwan Ali', rollNumber: 'QM-01-006' },
  { _id: '7', name: 'Kamran Shah', rollNumber: 'QM-01-007' },
  { _id: '8', name: 'Adnan Malik', rollNumber: 'QM-01-008' },
];

export default function AdminAttendance() {
  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(
    STUDENTS_CLASS1.reduce((acc, s) => ({ ...acc, [s._id]: 'present' }), {})
  );
  const [saved, setSaved] = useState(false);

  const toggleAttendance = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;
  const leaveCount = Object.values(attendance).filter(v => v === 'leave').length;

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Attendance Management</h1><p>Mark daily attendance for students</p></div>
          <button className="btn btn-primary" onClick={() => setSaved(true)}>
            <CheckCircle size={18} /> {saved ? 'Saved ✓' : 'Save Attendance'}
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><CheckCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{presentCount}</h3><p>Present</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#ef4444' }}><XCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{absentCount}</h3><p>Absent</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><Clock size={24} /></div>
            <div className={styles.statInfo}><h3>{leaveCount}</h3><p>On Leave</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{STUDENTS_CLASS1.length}</h3><p>Total</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="form-input" style={{ width: '180px' }}>
            {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
          </select>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="form-input" style={{ width: '200px' }} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button className="btn btn-sm btn-success" style={{ background: '#10b981', color: '#fff' }}
              onClick={() => setAttendance(STUDENTS_CLASS1.reduce((acc, s) => ({ ...acc, [s._id]: 'present' }), {}))}>
              Mark All Present
            </button>
          </div>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Roll No</th><th>Student Name</th><th style={{ textAlign: 'center' }}>Present</th><th style={{ textAlign: 'center' }}>Absent</th><th style={{ textAlign: 'center' }}>Leave</th><th>Status</th></tr></thead>
              <tbody>
                {STUDENTS_CLASS1.map(student => (
                  <tr key={student._id}>
                    <td><span className="badge badge-primary">{student.rollNumber}</span></td>
                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => toggleAttendance(student._id, 'present')}
                        style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
                          borderColor: attendance[student._id] === 'present' ? '#10b981' : '#e2e8f0',
                          background: attendance[student._id] === 'present' ? '#10b981' : 'transparent',
                          color: attendance[student._id] === 'present' ? '#fff' : '#94a3b8'
                        }}><CheckCircle size={16} /></button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => toggleAttendance(student._id, 'absent')}
                        style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
                          borderColor: attendance[student._id] === 'absent' ? '#ef4444' : '#e2e8f0',
                          background: attendance[student._id] === 'absent' ? '#ef4444' : 'transparent',
                          color: attendance[student._id] === 'absent' ? '#fff' : '#94a3b8'
                        }}><XCircle size={16} /></button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => toggleAttendance(student._id, 'leave')}
                        style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
                          borderColor: attendance[student._id] === 'leave' ? '#f59e0b' : '#e2e8f0',
                          background: attendance[student._id] === 'leave' ? '#f59e0b' : 'transparent',
                          color: attendance[student._id] === 'leave' ? '#fff' : '#94a3b8'
                        }}><Clock size={16} /></button>
                    </td>
                    <td>
                      <span className={`badge ${attendance[student._id] === 'present' ? 'badge-success' : attendance[student._id] === 'absent' ? 'badge-danger' : 'badge-warning'}`}>
                        {attendance[student._id]}
                      </span>
                    </td>
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
