'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CreditCard, Search, Eye, CheckCircle, X, Clock, AlertCircle, Download, Upload } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_PAYMENTS = [
  { _id: '1', student: 'Ali Khan', rollNumber: 'QM-01-001', amount: 2000, month: 'January 2025', method: 'JazzCash', transactionId: 'JC-2025-001', status: 'verified', date: '2025-01-10', receipt: null },
  { _id: '2', student: 'Hassan Ahmed', rollNumber: 'QM-01-002', amount: 2000, month: 'January 2025', method: 'Easypaisa', transactionId: 'EP-2025-002', status: 'verified', date: '2025-01-14', receipt: null },
  { _id: '3', student: 'Muhammad Usman', rollNumber: 'QM-02-001', amount: 2000, month: 'January 2025', method: 'Bank Transfer', transactionId: 'BT-2025-003', status: 'pending', date: '2025-01-18', receipt: 'screenshot.jpg' },
  { _id: '4', student: 'Bilal Hussain', rollNumber: 'QM-02-002', amount: 2000, month: 'January 2025', method: 'JazzCash', transactionId: 'JC-2025-004', status: 'verified', date: '2025-01-12', receipt: null },
  { _id: '5', student: 'Ahmed Raza', rollNumber: 'QM-03-001', amount: 2200, month: 'January 2025', method: 'Cash', transactionId: 'CASH-005', status: 'verified', date: '2025-01-08', receipt: null },
  { _id: '6', student: 'Hamza Malik', rollNumber: 'QM-04-001', amount: 2200, month: 'January 2025', method: 'Easypaisa', transactionId: 'EP-2025-006', status: 'rejected', date: '2025-01-20', receipt: 'screenshot2.jpg' },
  { _id: '7', student: 'Fahad Sheikh', rollNumber: 'QM-05-001', amount: 2500, month: 'January 2025', method: 'Bank Transfer', transactionId: 'BT-2025-007', status: 'pending', date: '2025-01-22', receipt: 'screenshot3.jpg' },
];

export default function AdminPayments() {
  const [payments, setPayments] = useState(DEMO_PAYMENTS);
  const [search, setSearch] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = payments.filter(p => {
    const m1 = p.student.toLowerCase().includes(search.toLowerCase()) || p.transactionId.toLowerCase().includes(search.toLowerCase());
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
                {filtered.map(payment => (
                  <tr key={payment._id}>
                    <td><div><span style={{ fontWeight: 600 }}>{payment.student}</span><br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>{payment.rollNumber}</span></div></td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showViewModal && selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Payment Details</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gap: '10px' }}>
                  {[['Student', selected.student], ['Roll Number', selected.rollNumber], ['Amount', `Rs ${selected.amount.toLocaleString()}`], ['Month', selected.month], ['Method', selected.method], ['Transaction ID', selected.transactionId], ['Date', selected.date], ['Status', selected.status]].map(([l, v], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: '6px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{l}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                {selected.receipt && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Payment Screenshot</p>
                    <div style={{ width: '100%', height: 150, background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      <Upload size={32} />
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary"><Download size={16} /> Receipt</button>
                  <button className="btn btn-primary" onClick={() => setShowViewModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
