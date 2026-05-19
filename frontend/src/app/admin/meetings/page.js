'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useThemeLang } from '@/context/ThemeLangContext';
import { Calendar, Clock, User, Phone, MessageSquare, Plus, Search, Filter, CheckCircle, XCircle, Users, Info, Upload, Edit, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_MEETINGS = [
  { _id: '1', type: 'Teacher-Parent', studentName: 'Ali Khan', parentName: 'Imran Khan', teacherName: 'Ahmed Khan', teacherImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', date: '2025-05-20', time: '10:00 AM', status: 'scheduled', topic: 'Academic Progress' },
  { _id: '2', type: 'Principal-Parent', studentName: 'Hassan Ahmed', parentName: 'Tariq Ahmed', teacherName: 'Principal', teacherImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', date: '2025-05-21', time: '11:30 AM', status: 'scheduled', topic: 'Discipline Issue' },
  { _id: '3', type: 'Teacher-Parent', studentName: 'Muhammad Usman', parentName: 'Abdul Rashid', teacherName: 'Sajid Ali', teacherImg: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', date: '2025-05-22', time: '09:00 AM', status: 'completed', topic: 'Fee Discussion' },
  { _id: '4', type: 'Principal-Parent', studentName: 'Zain Abbas', parentName: 'Ali Abbas', teacherName: 'Principal', teacherImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1544168190-79c17527004f?w=400&h=400&fit=crop', date: '2025-05-23', time: '02:00 PM', status: 'cancelled', topic: 'Scholarship Application' },
  { _id: '5', type: 'Teacher-Parent', studentName: 'Ahmed Raza', parentName: 'Muhammad Raza', teacherName: 'Asif Mahmood', teacherImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', date: '2025-05-24', time: '10:30 AM', status: 'scheduled', topic: 'Subject Selection' },
  { _id: '6', type: 'Teacher-Parent', studentName: 'Hamza Malik', parentName: 'Shahid Malik', teacherName: 'Kashif Iqbal', teacherImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', parentImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', date: '2025-05-25', time: '12:00 PM', status: 'scheduled', topic: 'Behavioral Report' },
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

  const getStatusBadge = (meeting) => {
    const { status } = meeting;
    const stylesMap = {
      scheduled: { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', next: 'completed' },
      completed: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981', next: 'cancelled' },
      cancelled: { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171', next: 'scheduled' }
    };
    const s = stylesMap[status] || stylesMap.scheduled;
    
    return (
      <span 
        className="badge" 
        style={{ background: s.bg, color: s.color, cursor: 'pointer', transition: '0.2s' }}
        onClick={() => setMeetings(prev => prev.map(m => m._id === meeting._id ? { ...m, status: s.next } : m))}
        title="Click to change status"
      >
        {status.toUpperCase()}
      </span>
    );
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}
                          onClick={() => document.getElementById(`p-img-${meeting._id}`).click()}
                        >
                          <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
                            <img src={meeting.parentImg || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="img-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                              <Upload size={12} color="#fff" />
                            </div>
                          </div>
                          <input id={`p-img-${meeting._id}`} type="file" hidden accept="image/*" onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const url = URL.createObjectURL(e.target.files[0]);
                              setMeetings(prev => prev.map(m => m._id === meeting._id ? { ...m, parentImg: url } : m));
                            }
                          }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{meeting.studentName}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Parent: {meeting.parentName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}
                          onClick={() => document.getElementById(`t-img-${meeting._id}`).click()}
                        >
                          <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
                            <img src={meeting.teacherImg || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="img-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                              <Upload size={12} color="#fff" />
                            </div>
                          </div>
                          <input id={`t-img-${meeting._id}`} type="file" hidden accept="image/*" onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const url = URL.createObjectURL(e.target.files[0]);
                              setMeetings(prev => prev.map(m => m._id === meeting._id ? { ...m, teacherImg: url } : m));
                            }
                          }} />
                        </div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{meeting.teacherName}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 600 }}><Calendar size={14} /> {meeting.date}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}><Clock size={14} /> {meeting.time}</div>
                      </div>
                    </td>
                    <td style={{ color: '#e2e8f0' }}>{meeting.topic}</td>
                    <td>{getStatusBadge(meeting)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}><MessageSquare size={16} /></button>
                        <button className="btn btn-sm btn-danger" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }} onClick={() => { if(confirm('Cancel meeting?')) setMeetings(prev => prev.filter(m => m._id !== meeting._id)) }}><Trash2 size={16} /></button>
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
