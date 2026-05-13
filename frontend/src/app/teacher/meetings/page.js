'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Clock, Video, MessageSquare, Plus, Info, X } from 'lucide-react';
import styles from '../teacher.module.css';

const DEMO_MEETINGS = [
  { _id: '1', studentName: 'Ali Khan', parentName: 'Imran Khan', date: '2025-05-20', time: '10:00 AM', status: 'scheduled', topic: 'Academic Progress' },
  { _id: '2', studentName: 'Hassan Ahmed', parentName: 'Tariq Ahmed', date: '2025-05-21', time: '11:30 AM', status: 'scheduled', topic: 'Discipline Issue' },
  { _id: '3', studentName: 'Muhammad Usman', parentName: 'Abdul Rashid', date: '2025-05-22', time: '09:00 AM', status: 'completed', topic: 'Fee Discussion' },
];

export default function TeacherMeetings() {
  const [meetings, setMeetings] = useState(DEMO_MEETINGS);
  const [showModal, setShowModal] = useState(false);

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
      <div style={{ padding: '24px' }}>
        <div className={styles.header} style={{ marginBottom: '32px' }}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)', fontSize: '1.8rem', fontWeight: 800 }}>Meetings & PTMs</h1>
            <p style={{ color: '#94a3b8' }}>Manage your appointments with parents and students</p>
          </div>
          <button className={styles.vibrantBtn} onClick={() => setShowModal(true)}>
            <Plus size={20} /> Request Meeting
          </button>
        </div>

        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '32px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>Meeting Schedule</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>View your upcoming Parent-Teacher Meetings. You can request new meetings or message parents directly.</p>
          </div>
        </div>

        <div className="card" style={{ border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: '#fff' }}>Student & Parent</th>
                  <th style={{ color: '#fff' }}>Date & Time</th>
                  <th style={{ color: '#fff' }}>Topic</th>
                  <th style={{ color: '#fff' }}>Status</th>
                  <th style={{ color: '#fff' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting._id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{meeting.studentName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Parent: {meeting.parentName}</div>
                      </div>
                    </td>
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
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} title="Message Parent"><MessageSquare size={16} /></button>
                        <button className="btn btn-sm btn-primary" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa' }} title="Join Video Call"><Video size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h3>Request New Meeting</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px' }}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <div className="form-group"><label className="form-label">Student Name</label><input className="form-input" placeholder="Enter student name" /></div>
                <div className="form-group"><label className="form-label">Meeting Topic</label><input className="form-input" placeholder="e.g. Academic Progress" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Preferred Date</label><input type="date" className="form-input" /></div>
                  <div className="form-group"><label className="form-label">Preferred Time</label><input type="time" className="form-input" /></div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className="btn btn-secondary" style={{ padding: '12px 24px' }} onClick={() => setShowModal(false)}>Cancel</button>
                <button className={styles.vibrantBtn} onClick={() => setShowModal(false)}>Send Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
