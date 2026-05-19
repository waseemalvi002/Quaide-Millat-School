'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, Check, Info } from 'lucide-react';
import styles from '../teacher.module.css';

const DEMO = [
  { _id: '1', title: 'PTM Announcement', message: 'Parent-Teacher meeting on 25th January at 10:00 AM.', date: '2025-01-12', isRead: false },
  { _id: '2', title: 'Salary Credited', message: 'Your salary for January has been credited.', date: '2025-02-01', isRead: true },
  { _id: '3', title: 'Schedule Update', message: 'Your Class 5 schedule changed to 11 AM.', date: '2025-01-18', isRead: false },
];

export default function TeacherNotifications() {
  const [notifs, setNotifs] = useState(DEMO);
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', color: 'var(--heading-accent)' }}>Notifications</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px', fontWeight: 600 }}>{notifs.filter(n => !n.isRead).length} unread updates</p>
        
        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>Teacher Inbox</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Track meeting requests, salary credits, and schedule adjustments from the administration.</p>
          </div>
        </div>

        <div className="card" style={{ border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          {notifs.map((n, index) => (
            <div key={n._id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              padding: '20px 24px', 
              borderBottom: index === notifs.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)', 
              background: n.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(59, 130, 246, 0.05)', 
              cursor: 'pointer',
              transition: 'all 0.2s' 
            }}
              onClick={() => setNotifs(prev => prev.map(x => x._id === n._id ? { ...x, isRead: true } : x))}>
              <div style={{ 
                width: 44, 
                height: 44, 
                borderRadius: '12px', 
                background: n.isRead ? 'rgba(255,255,255,0.05)' : 'rgba(59, 130, 246, 0.2)', 
                color: n.isRead ? '#94a3b8' : '#3b82f6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0,
                border: n.isRead ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                {n.isRead ? <Check size={18} /> : <Bell size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: n.isRead ? '#e2e8f0' : 'var(--heading-accent)' }}>{n.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>{n.message}</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
