'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const DEMO = [
  { date: '2025-01-20', day: 'Monday', status: 'present', checkIn: '8:00 AM', checkOut: '4:00 PM' },
  { date: '2025-01-19', day: 'Sunday', status: 'holiday', checkIn: '-', checkOut: '-' },
  { date: '2025-01-18', day: 'Saturday', status: 'present', checkIn: '8:05 AM', checkOut: '4:00 PM' },
  { date: '2025-01-17', day: 'Friday', status: 'present', checkIn: '7:55 AM', checkOut: '4:00 PM' },
  { date: '2025-01-16', day: 'Thursday', status: 'absent', checkIn: '-', checkOut: '-' },
  { date: '2025-01-15', day: 'Wednesday', status: 'present', checkIn: '8:00 AM', checkOut: '4:00 PM' },
  { date: '2025-01-14', day: 'Tuesday', status: 'present', checkIn: '8:10 AM', checkOut: '4:00 PM' },
  { date: '2025-01-13', day: 'Monday', status: 'present', checkIn: '7:50 AM', checkOut: '4:00 PM' },
];

export default function StaffAttendance() {
  const present = DEMO.filter(d => d.status === 'present').length;
  const working = DEMO.filter(d => d.status !== 'holiday').length;
  const statusBadge = { present: 'badge-success', absent: 'badge-danger', leave: 'badge-warning', holiday: 'badge-info' };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Attendance</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Attendance: {((present / working) * 100).toFixed(1)}% ({present}/{working} days)</p>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Date</th><th>Day</th><th>Check In</th><th>Check Out</th><th>Status</th></tr></thead>
              <tbody>
                {DEMO.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.date}</td><td>{d.day}</td>
                    <td>{d.checkIn}</td><td>{d.checkOut}</td>
                    <td><span className={`badge ${statusBadge[d.status]}`}>{d.status}</span></td>
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
