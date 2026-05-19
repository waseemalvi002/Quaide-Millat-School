'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useThemeLang } from '@/context/ThemeLangContext';
import { Calendar, Clock, User, Phone, MessageSquare, Plus, Search, Filter, CheckCircle, XCircle, Users, Info } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_MEETINGS = [
  { _id: '1', type: 'Teacher-Parent', studentName: 'Ali Khan', parentName: 'Imran Khan', teacherName: 'Ahmed Khan', date: '2025-05-20', time: '10:00 AM', status: 'scheduled', topic: 'Academic Progress' },
  { _id: '2', type: 'Principal-Parent', studentName: 'Hassan Ahmed', parentName: 'Tariq Ahmed', teacherName: 'Principal', date: '2025-05-21', time: '11:30 AM', status: 'scheduled', topic: 'Discipline Issue' },
  { _id: '3', type: 'Teacher-Parent', studentName: 'Muhammad Usman', parentName: 'Abdul Rashid', teacherName: 'Sajid Ali', date: '2025-05-22', time: '09:00 AM', status: 'completed', topic: 'Fee Discussion' },
  { _id: '4', type: 'Principal-Parent', studentName: 'Zain Abbas', parentName: 'Ali Abbas', teacherName: 'Principal', date: '2025-05-23', time: '02:00 PM', status: 'cancelled', topic: 'Scholarship Application' },
  { _id: '5', type: 'Teacher-Parent', studentName: 'Ahmed Raza', parentName: 'Muhammad Raza', teacherName: 'Asif Mahmood', date: '2025-05-24', time: '10:30 AM', status: 'scheduled', topic: 'Subject Selection' },
  { _id: '6', type: 'Teacher-Parent', studentName: 'Hamza Malik', parentName: 'Shahid Malik', teacherName: 'Kashif Iqbal', date: '2025-05-25', time: '12:00 PM', status: 'scheduled', topic: 'Behavioral Report' },
];

export default function MeetingsPage() {
  const { t } = useThemeLang();
  const [meetings, setMeetings] = useState(DEMO_MEETINGS);
  const [activeTab, setActiveTab] = useState('all');

  const filteredMeetings = meetings.filter(m => {
    if (activeTab === 'all') return true;
    if (activeTab === 'teacher') return m.type === 'Teacher-Parent';
    if (activeTab === 'principal') return m.type === 'Principal-Parent';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled': return <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>Scheduled</span>;
      case 'completed': return <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Completed</span>;
      case 'cancelled': return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>Cancelled</span>;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)' }}>Meetings Management</h1>
            <p>Schedule and track Parent-Teacher/Principal meetings</p>
          </div>
          <button className={styles.vibrantBtn}>
            <Plus size={20} /> Schedule Meeting
          </button>
        </div>

        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)', marginTop: '24px' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>Manage Your Appointments</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>View, schedule, and manage meetings between parents and teachers or the principal.</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{meetings.length}</h3><p>Total Meetings</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><CheckCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{meetings.filter(m => m.status === 'scheduled').length}</h3><p>Upcoming</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><Calendar size={24} /></div>
            <div className={styles.statInfo}><h3>{meetings.filter(m => m.type === 'Principal-Parent').length}</h3><p>Principal Meetings</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', marginTop: '32px' }}>
          {['all', 'teacher', 'principal'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'vibrantBtn' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize', padding: activeTab === tab ? '10px 20px !important' : '10px 20px', background: activeTab === tab ? '' : 'rgba(255,255,255,0.05)', border: activeTab === tab ? '' : '1px solid rgba(255,255,255,0.1)' }}
            >
              {tab === 'all' ? 'All Meetings' : tab === 'teacher' ? 'Teacher-Parent' : 'Principal-Parent'}
            </button>
          ))}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: '#fff' }}>Type</th>
                  <th style={{ color: '#fff' }}>Student & Parent</th>
                  <th style={{ color: '#fff' }}>Teacher/Host</th>
                  <th style={{ color: '#fff' }}>Date & Time</th>
                  <th style={{ color: '#fff' }}>Topic</th>
                  <th style={{ color: '#fff' }}>Status</th>
                  <th style={{ color: '#fff' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeetings.map((meeting) => (
                  <tr key={meeting._id}>
                    <td>
                      <span className="badge" style={{ background: meeting.type === 'Principal-Parent' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: meeting.type === 'Principal-Parent' ? '#f59e0b' : '#60a5fa' }}>
                        {meeting.type}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{meeting.studentName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Parent: {meeting.parentName}</div>
                      </div>
                    </td>
                    <td style={{ color: '#e2e8f0' }}>{meeting.teacherName}</td>
                    <td>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 600 }}><Calendar size={14} /> {meeting.date}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}><Clock size={14} /> {meeting.time}</div>
                      </div>
                    </td>
                    <td style={{ color: '#e2e8f0' }}>{meeting.topic}</td>
                    <td>{getStatusBadge(meeting.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><MessageSquare size={16} /></button>
                        <button className="btn btn-sm btn-danger" style={{ boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }}><XCircle size={16} /></button>
                      </div>
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
