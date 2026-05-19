'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Video, ExternalLink } from 'lucide-react';

const DEMO = [
  { _id: '1', title: 'Mathematics - Chapter 5', teacher: 'Muhammad Farooq', date: '2025-01-20', time: '10:00 AM', platform: 'Zoom', url: 'https://zoom.us/j/123', status: 'scheduled' },
  { _id: '2', title: 'Science - Solar System', teacher: 'Kashif Iqbal', date: '2025-01-19', time: '11:00 AM', platform: 'Google Meet', url: 'https://meet.google.com/abc', status: 'completed' },
  { _id: '3', title: 'English - Grammar', teacher: 'Sajid Ali', date: '2025-01-21', time: '09:30 AM', platform: 'Zoom', url: 'https://zoom.us/j/456', status: 'live' },
];

export default function StudentOnlineClasses() {
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Online Classes</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Join your scheduled virtual classes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px' }}>
          {DEMO.map(cls => (
            <div key={cls._id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{cls.title}</h3>
                  <span className={`badge ${cls.status === 'live' ? 'badge-danger' : cls.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                    {cls.status === 'live' ? '🔴 LIVE' : cls.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>👨‍🏫 {cls.teacher}</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>📅 {cls.date} ⏰ {cls.time}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-info">{cls.platform}</span>
                  {(cls.status === 'live' || cls.status === 'scheduled') && (
                    <a href={cls.url} target="_blank" className="btn btn-sm btn-primary"><ExternalLink size={14} /> Join Class</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
