'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';

const DEMO = [
  { date: '2025-01-20', day: 'Monday', status: 'present' },
  { date: '2025-01-19', day: 'Sunday', status: 'holiday' },
  { date: '2025-01-18', day: 'Saturday', status: 'present' },
  { date: '2025-01-17', day: 'Friday', status: 'present' },
  { date: '2025-01-16', day: 'Thursday', status: 'absent' },
  { date: '2025-01-15', day: 'Wednesday', status: 'present' },
  { date: '2025-01-14', day: 'Tuesday', status: 'present' },
  { date: '2025-01-13', day: 'Monday', status: 'present' },
  { date: '2025-01-12', day: 'Sunday', status: 'holiday' },
  { date: '2025-01-11', day: 'Saturday', status: 'present' },
  { date: '2025-01-10', day: 'Friday', status: 'leave' },
  { date: '2025-01-09', day: 'Thursday', status: 'present' },
  { date: '2025-01-08', day: 'Wednesday', status: 'present' },
];

export default function StudentAttendance() {
  const present = DEMO.filter(d => d.status === 'present').length;
  const absent = DEMO.filter(d => d.status === 'absent').length;
  const leave = DEMO.filter(d => d.status === 'leave').length;
  const working = DEMO.filter(d => d.status !== 'holiday').length;
  const pct = ((present / working) * 100).toFixed(1);

  const statusIcon = { present: <CheckCircle size={16} color="#10b981" />, absent: <XCircle size={16} color="#ef4444" />, leave: <Clock size={16} color="#f59e0b" />, holiday: <Calendar size={16} color="#94a3b8" /> };
  const statusBadge = { present: 'badge-success', absent: 'badge-danger', leave: 'badge-warning', holiday: 'badge-info' };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Attendance</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Track your attendance record</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '16px', marginBottom: '24px' }}>
          {[['Present', present, '#10b981'], ['Absent', absent, '#ef4444'], ['Leave', leave, '#f59e0b'], ['Attendance', `${pct}%`, '#3b82f6']].map(([l, v, c]) => (
            <div key={l} style={{ padding: '16px', background: `${c}10`, borderRadius: '12px', textAlign: 'center', border: `1px solid ${c}30` }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: c }}>{v}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{l}</p>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Date</th><th>Day</th><th>Status</th></tr></thead>
              <tbody>
                {DEMO.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.date}</td><td>{d.day}</td>
                    <td><span className={`badge ${statusBadge[d.status]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>{statusIcon[d.status]} {d.status}</span></td>
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
