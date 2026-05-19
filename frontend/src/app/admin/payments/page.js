'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CreditCard, Search, Eye, CheckCircle, X, Clock, AlertCircle, Download, Upload, Edit } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_PAYMENTS = [
  { _id: '1', student: 'Ali Khan', rollNumber: 'QM-01-001', amount: 2000, month: 'January 2025', method: 'JazzCash', transactionId: 'JC-2025-001', status: 'verified', date: '2025-01-10', receipt: null, profileImage: '/boy_1.png' },
  { _id: '2', student: 'Hassan Ahmed', rollNumber: 'QM-01-002', amount: 2000, month: 'January 2025', method: 'Easypaisa', transactionId: 'EP-2025-002', status: 'verified', date: '2025-01-14', receipt: null, profileImage: '/boy_2.png' },
  { _id: '3', student: 'Muhammad Usman', rollNumber: 'QM-02-001', amount: 2000, month: 'January 2025', method: 'Bank Transfer', transactionId: 'BT-2025-003', status: 'pending', date: '2025-01-18', receipt: 'screenshot.jpg', profileImage: '/boy_3.png' },
  { _id: '4', student: 'Bilal Hussain', rollNumber: 'QM-02-002', amount: 2000, month: 'January 2025', method: 'JazzCash', transactionId: 'JC-2025-004', status: 'verified', date: '2025-01-12', receipt: null, profileImage: '/boy_1.png' },
  { _id: '5', student: 'Ahmed Raza', rollNumber: 'QM-03-001', amount: 2200, month: 'January 2025', method: 'Cash', transactionId: 'CASH-005', status: 'verified', date: '2025-01-08', receipt: null, profileImage: '/boy_2.png' },
  { _id: '6', student: 'Hamza Malik', rollNumber: 'QM-04-001', amount: 2200, month: 'January 2025', method: 'Easypaisa', transactionId: 'EP-2025-006', status: 'rejected', date: '2025-01-20', receipt: 'screenshot2.jpg', profileImage: '/boy_3.png' },
  { _id: '7', student: 'Fahad Sheikh', rollNumber: 'QM-05-001', amount: 2500, month: 'January 2025', method: 'Bank Transfer', transactionId: 'BT-2025-007', status: 'pending', date: '2025-01-22', receipt: 'screenshot3.jpg', profileImage: '/boy_1.png' },
];

const getStudentAvatar = (payment, index) => {
  if (!payment) return '/boy_1.png';
  if (payment.profileImage) return payment.profileImage;
  const name = payment.student || '';
  const isFemale = name.includes('Sara') || name.includes('Ayesha') || name.includes('Fatima') || name.includes('Zainab') || name.includes('Mariam');
  return isFemale ? `/girl_${(index % 3) + 1}.png` : `/boy_${(index % 3) + 1}.png`;
};



export default function AdminPayments() {
  const [payments, setPayments] = useState(DEMO_PAYMENTS);
  const [search, setSearch] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = payments.filter(p => {
    const studentName = p.student || '';
    const transId = p.transactionId || '';
    const m1 = studentName.toLowerCase().includes(search.toLowerCase()) || transId.toLowerCase().includes(search.toLowerCase());
    const m2 = !filterMethod || p.method === filterMethod;
    const m3 = !filterStatus || p.status === filterStatus;
    return m1 && m2 && m3;
  });

  const methodColors = { 'JazzCash': { bg: '#fee2e2', color: '#dc2626' }, 'Easypaisa': { bg: '#d1fae5', color: '#059669' }, 'Bank Transfer': { bg: '#dbeafe', color: '#1d4ed8' }, 'Cash': { bg: '#fef3c7', color: '#92400e' } };
  const statusStyles = { verified: 'badge-success', pending: 'badge-warning', rejected: 'badge-danger' };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Payment Management</h1><p>Track and verify digital payments</p></div>
          <button className="btn btn-secondary"><Download size={18} /> Export</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><CreditCard size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {payments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0).toLocaleString()}</h3><p>Verified</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><Clock size={24} /></div>
            <div className={styles.statInfo}><h3>{payments.filter(p => p.status === 'pending').length}</h3><p>Pending Verification</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#ef4444' }}><AlertCircle size={24} /></div>
            <div className={styles.statInfo}><h3>{payments.filter(p => p.status === 'rejected').length}</h3><p>Rejected</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search by student or transaction ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px' }} />
          </div>
          <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="form-input" style={{ width: '160px' }}>
            <option value="">All Methods</option><option value="JazzCash">JazzCash</option><option value="Easypaisa">Easypaisa</option><option value="Bank Transfer">Bank Transfer</option><option value="Cash">Cash</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-input" style={{ width: '150px' }}>
            <option value="">All Status</option><option value="verified">Verified</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Student</th><th>Amount</th><th>Month</th><th>Method</th><th>Transaction ID</th><th>Date</th><th>Receipt</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((payment, index) => {
                  const displayAvatar = getStudentAvatar(payment, index);
                  return (
                    <tr key={payment._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            style={{ position: 'relative', width: '45px', height: '45px', cursor: 'pointer', flexShrink: 0 }} 
                            onClick={() => document.getElementById(`p-img-input-${payment._id}`).click()}
                            title="Click to change image"
                          >
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                              <img src={displayAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', borderRadius: '50%' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                <Upload size={14} color="#fff" />
                              </div>
                            </div>
                          <input 
                            id={`p-img-input-${payment._id}`}
                            type="file" 
                            hidden 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const url = URL.createObjectURL(e.target.files[0]);
                                setPayments(prev => prev.map(p => p._id === payment._id ? { ...p, profileImage: url } : p));
                              }
                            }}
                          />
                        </div>
                        <div>
                          <span style={{ fontWeight: 600 }}>{payment.student}</span><br />
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{payment.rollNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>Rs {payment.amount.toLocaleString()}</td>
                    <td>{payment.month}</td>
                    <td><span className="badge" style={{ background: methodColors[payment.method]?.bg, color: methodColors[payment.method]?.color }}>{payment.method}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{payment.transactionId}</td>
                    <td>{payment.date}</td>
                    <td>{payment.receipt ? <span className="badge badge-info" style={{ cursor: 'pointer' }}><Upload size={12} /> View</span> : <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>N/A</span>}</td>
                    <td><span className={`badge ${statusStyles[payment.status]}`}>{payment.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setSelected(payment); setShowViewModal(true); }}><Eye size={14} /></button>
                        {payment.status === 'pending' && (<>
                          <button className="btn btn-sm btn-success" style={{ background: '#10b981', color: '#fff' }}
                            onClick={() => setPayments(prev => prev.map(p => p._id === payment._id ? { ...p, status: 'verified' } : p))}>✓</button>
                          <button className="btn btn-sm btn-danger"
                            onClick={() => setPayments(prev => prev.map(p => p._id === payment._id ? { ...p, status: 'rejected' } : p))}>✗</button>
                        </>)}
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>

        {showViewModal && selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px' }}>
                <h3 style={{ color: '#fff', margin: 0 }}>Edit Payment Details</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <div className="card-body" style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div 
                    style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto', cursor: 'pointer' }}
                    onClick={() => document.getElementById('modal-img-input').click()}
                  >
                    <img 
                      src={getStudentAvatar(selected, selected._id ? parseInt(selected._id) || 0 : 0)} 
                      alt="" 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid #3b82f6', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#3b82f6', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0a0f1e' }}>
                      <Edit size={14} />
                    </div>
                  </div>
                  <input 
                    id="modal-img-input" 
                    type="file" 
                    hidden 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const url = URL.createObjectURL(e.target.files[0]);
                        setSelected({ ...selected, profileImage: url });
                      }
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Student Name</label>
                    <input className="form-input" value={selected.student} onChange={(e) => setSelected({ ...selected, student: e.target.value })} style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Roll Number</label>
                    <input className="form-input" value={selected.rollNumber} onChange={(e) => setSelected({ ...selected, rollNumber: e.target.value })} style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Amount (Rs)</label>
                    <input type="number" className="form-input" value={selected.amount} onChange={(e) => setSelected({ ...selected, amount: parseInt(e.target.value) })} style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Payment Method</label>
                    <select className="form-input" value={selected.method} onChange={(e) => setSelected({ ...selected, method: e.target.value })} style={{ width: '100%' }}>
                      <option value="JazzCash">JazzCash</option><option value="Easypaisa">Easypaisa</option><option value="Bank Transfer">Bank Transfer</option><option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Status</label>
                    <select className="form-input" value={selected.status} onChange={(e) => setSelected({ ...selected, status: e.target.value })} style={{ width: '100%' }}>
                      <option value="verified">Verified</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Cancel</button>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      setPayments(prev => prev.map(p => p._id === selected._id ? selected : p));
                      setShowViewModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
