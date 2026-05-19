'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, Send, Trash2, X, Check, AlertCircle, Info, CheckCircle, ShieldCheck, UserPlus, XCircle } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO = [
  { 
    _id: 'reg_1', 
    title: 'New User Registration', 
    name: 'Waseem Akram', 
    role: 'Teacher',
    message: 'Waseem Akram has requested to join the portal as a Teacher. Please verify and approve.', 
    type: 'approval', 
    priority: 'high', 
    recipients: 'Admin Only', 
    date: '2025-05-16', 
    isRead: false, 
    status: 'pending' 
  },
  { _id: '1', title: 'Fee Reminder', message: 'Monthly fee for January is due. Please pay before 15th.', type: 'fee', priority: 'high', recipients: 'All Parents', date: '2025-01-10', isRead: false },
  { _id: '2', title: 'PTM Announcement', message: 'Parent-Teacher meeting on 25th January at 10:00 AM.', type: 'general', priority: 'medium', recipients: 'All Parents', date: '2025-01-12', isRead: true },
  { _id: '3', title: 'Holiday Notice', message: 'School will remain closed on 5th February (Kashmir Day).', type: 'general', priority: 'low', recipients: 'All Users', date: '2025-01-15', isRead: false },
  { _id: '4', title: 'Result Published', message: 'Monthly exam results for Class 1-5 have been published.', type: 'result', priority: 'medium', recipients: 'Students & Parents', date: '2025-01-18', isRead: true },
  { _id: '5', title: 'Online Class Scheduled', message: 'Mathematics class for Class 5 at 10:00 AM tomorrow.', type: 'class', priority: 'medium', recipients: 'Class 5 Students', date: '2025-01-19', isRead: false },
];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(DEMO);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'general', priority: 'medium', recipients: 'All Users' });

  const typeIcons = { approval: <ShieldCheck size={16} />, fee: <AlertCircle size={16} />, general: <Info size={16} />, result: <CheckCircle size={16} />, class: <Bell size={16} /> };
  const typeColors = { approval: '#8b5cf6', fee: '#ef4444', general: '#3b82f6', result: '#10b981', class: '#f59e0b' };
  
  const handleSend = () => {
    setNotifications(prev => [{ ...form, _id: Date.now().toString(), date: new Date().toISOString().split('T')[0], isRead: false }, ...prev]);
    setShowModal(false);
    setForm({ title: '', message: '', type: 'general', priority: 'medium', recipients: 'All Users' });
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)' }}>Notifications</h1>
            <p>Send and manage school notifications</p>
          </div>
          <button className={styles.vibrantBtn} onClick={() => setShowModal(true)}>
            <Send size={20} /> Send Notification
          </button>
        </div>

        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)', marginTop: '24px' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>Communication Hub</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Send important updates, fee reminders, and announcements to parents and students instantly.</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Bell size={24} /></div>
            <div className={styles.statInfo}><h3>{notifications.length}</h3><p>Total Sent</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><AlertCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{notifications.filter(n => !n.isRead).length}</h3><p>Unread</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><CheckCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{notifications.filter(n => n.isRead).length}</h3><p>Read</p></div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          {notifications.map((notif, index) => (
            <div key={notif._id} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '20px', 
              padding: '24px', 
              borderBottom: index === notifications.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)', 
              background: notif.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(59, 130, 246, 0.05)', 
              transition: 'all 0.2s' 
            }}>
              <div style={{ width: 44, height: 44, borderRadius: '14px', background: `${typeColors[notif.type]}20`, color: typeColors[notif.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${typeColors[notif.type]}40` }}>
                {typeIcons[notif.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: notif.isRead ? '#fff' : 'var(--heading-accent)' }}>{notif.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{notif.date}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '16px', lineHeight: '1.6' }}>{notif.message}</p>
                
                {notif.type === 'approval' && notif.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, status: 'approved', message: `APPROVED: ${n.message}` } : n));
                        alert('User approved successfully!');
                      }}
                      className="btn btn-sm" 
                      style={{ background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Check size={14} /> Approve User
                    </button>
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, status: 'rejected', message: `REJECTED: ${n.message}` } : n));
                        alert('User registration rejected.');
                      }}
                      className="btn btn-sm" 
                      style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid #f87171', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span className="badge" style={{ 
                    background: notif.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : notif.priority === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(96, 165, 250, 0.2)',
                    color: notif.priority === 'high' ? '#f87171' : notif.priority === 'medium' ? '#fbbf24' : '#60a5fa',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '1px'
                  }}>{notif.priority}</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Recipient: <span style={{ color: '#60a5fa' }}>{notif.recipients}</span></span>
                  {notif.status && (
                    <span className="badge" style={{ background: notif.status === 'approved' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', color: notif.status === 'approved' ? '#10b981' : '#94a3b8' }}>
                      {notif.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <button className="btn btn-sm btn-danger" style={{ flexShrink: 0, borderRadius: '10px' }} onClick={() => setNotifications(prev => prev.filter(n => n._id !== notif._id))}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '550px' }}>
              <div className={styles.modalHeader}>
                <h3>Send New Notification</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <div className="form-group"><label className="form-label">Notification Title *</label><input className="form-input" placeholder="Enter title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Message Content *</label><textarea className="form-input" rows={4} placeholder="Type your message here..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label className="form-label">Notification Type</label>
                    <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="general">General</option><option value="fee">Fee Reminder</option><option value="result">Result Update</option><option value="class">Class Update</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Urgency Level</label>
                    <select className="form-input" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                      <option value="low">Low Priority</option><option value="medium">Medium Priority</option><option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Send To</label>
                  <select className="form-input" value={form.recipients} onChange={e => setForm({ ...form, recipients: e.target.value })}>
                    <option value="All Users">All Registered Users</option><option value="All Parents">All Parents</option><option value="All Teachers">All Teachers</option><option value="All Students">All Students</option>
                    {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className="btn btn-secondary" style={{ padding: '12px 24px' }} onClick={() => setShowModal(false)}>Discard</button>
                <button className={styles.vibrantBtn} onClick={handleSend}><Send size={18} /> Send Broadcast</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
