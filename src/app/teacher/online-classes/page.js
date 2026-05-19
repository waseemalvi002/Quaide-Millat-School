'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Video, ExternalLink, Clock } from 'lucide-react';

const DEMO = [
  { _id: '1', title: 'Math - Chapter 5', class: 'Class 5-A', date: '2025-01-20', time: '10:00 AM', platform: 'Zoom', url: 'https://zoom.us/j/123', status: 'scheduled' },
  { _id: '2', title: 'Math - Chapter 6', class: 'Class 6-A', date: '2025-01-21', time: '11:00 AM', platform: 'Google Meet', url: 'https://meet.google.com/abc', status: 'scheduled' },
  { _id: '3', title: 'Math - Revision', class: 'Class 7-A', date: '2025-01-19', time: '09:00 AM', platform: 'Zoom', url: 'https://zoom.us/j/789', status: 'completed' },
];

export default function TeacherOnlineClasses() {
  const [classes, setClasses] = useState(DEMO);
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Online Classes</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage your scheduled virtual classes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px' }}>
          {classes.map(cls => (
            <div key={cls._id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{cls.title}</h3>
                  <span className={`badge ${cls.status === 'completed' ? 'badge-success' : 'badge-info'}`}>{cls.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>📚 {cls.class} | 📅 {cls.date} | ⏰ {cls.time}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
                  <span className="badge badge-info">{cls.platform}</span>
                  {cls.status === 'scheduled' && (
                    <a href={cls.url} target="_blank" className="btn btn-sm btn-primary"><ExternalLink size={14} /> Start Class</a>
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
