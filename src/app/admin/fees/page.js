'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Search, Plus, Eye, Download, X, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_FEES = [
  { _id: '1', student: 'Ali Khan', rollNumber: 'QM-01-001', class: 'Class 1', month: 'January 2025', amount: 2000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-10', lateAmount: 0 },
  { _id: '2', student: 'Hassan Ahmed', rollNumber: 'QM-01-002', class: 'Class 1', month: 'January 2025', amount: 2000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-14', lateAmount: 0 },
  { _id: '3', student: 'Muhammad Usman', rollNumber: 'QM-02-001', class: 'Class 2', month: 'January 2025', amount: 2000, dueDate: '2025-01-15', status: 'unpaid', paidDate: null, lateAmount: 200 },
  { _id: '4', student: 'Bilal Hussain', rollNumber: 'QM-02-002', class: 'Class 2', month: 'January 2025', amount: 2000, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-12', lateAmount: 0 },
  { _id: '5', student: 'Ahmed Raza', rollNumber: 'QM-03-001', class: 'Class 3', month: 'January 2025', amount: 2200, dueDate: '2025-01-15', status: 'overdue', paidDate: null, lateAmount: 500 },
  { _id: '6', student: 'Zain Abbas', rollNumber: 'QM-03-002', class: 'Class 3', month: 'January 2025', amount: 2200, dueDate: '2025-01-15', status: 'partial', paidDate: null, lateAmount: 0, paidAmount: 1000 },
  { _id: '7', student: 'Hamza Malik', rollNumber: 'QM-04-001', class: 'Class 4', month: 'January 2025', amount: 2200, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-05', lateAmount: 0 },
  { _id: '8', student: 'Fahad Sheikh', rollNumber: 'QM-05-001', class: 'Class 5', month: 'January 2025', amount: 2500, dueDate: '2025-01-15', status: 'unpaid', paidDate: null, lateAmount: 200 },
];

export default function AdminFees() {
  const [fees, setFees] = useState(DEMO_FEES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = fees.filter(f => {
    const matchSearch = f.student.toLowerCase().includes(search.toLowerCase()) || f.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalCollected = fees.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'unpaid' || f.status === 'partial').reduce((s, f) => s + f.amount, 0);
  const totalOverdue = fees.filter(f => f.status === 'overdue').reduce((s, f) => s + f.amount + f.lateAmount, 0);

  const statusIcons = { paid: <CheckCircle size={14} />, unpaid: <Clock size={14} />, overdue: <AlertCircle size={14} />, partial: <Clock size={14} /> };
  const statusClasses = { paid: 'badge-success', unpaid: 'badge-warning', overdue: 'badge-danger', partial: 'badge-info' };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Fee Management</h1><p>Track and manage student fees</p></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export</button>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={18} /> Generate Fees</button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {totalCollected.toLocaleString()}</h3><p>Total Collected</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {totalPending.toLocaleString()}</h3><p>Pending</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#ef4444' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {totalOverdue.toLocaleString()}</h3><p>Overdue</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>{fees.length}</h3><p>Total Records</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search by student name or roll number..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px' }} />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-input" style={{ width: '160px' }}>
            <option value="">All Status</option>
            <option value="paid">Paid</option><option value="unpaid">Unpaid</option><option value="overdue">Overdue</option><option value="partial">Partial</option>
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Student</th><th>Roll No</th><th>Class</th><th>Month</th><th>Amount</th><th>Late Fee</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(fee => (
                  <tr key={fee._id}>
                    <td style={{ fontWeight: 600 }}>{fee.student}</td>
                    <td><span className="badge badge-primary">{fee.rollNumber}</span></td>
                    <td>{fee.class}</td>
                    <td>{fee.month}</td>
                    <td style={{ fontWeight: 600 }}>Rs {fee.amount.toLocaleString()}</td>
                    <td style={{ color: fee.lateAmount > 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>Rs {fee.lateAmount}</td>
                    <td>{fee.dueDate}</td>
                    <td>
                      <span className={`badge ${statusClasses[fee.status]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {statusIcons[fee.status]} {fee.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-sm btn-secondary"><Eye size={14} /></button>
                        <button className="btn btn-sm btn-success" style={{ background: '#10b981', color: '#fff' }} onClick={() => {
                          setFees(prev => prev.map(f => f._id === fee._id ? { ...f, status: 'paid', paidDate: new Date().toISOString().split('T')[0] } : f));
                        }}>Mark Paid</button>
                        <button className="btn btn-sm btn-secondary"><Download size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Generate Monthly Fees</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div className="form-group"><label className="form-label">Select Month</label>
                  <input type="month" className="form-input" />
                </div>
                <div className="form-group"><label className="form-label">Select Class</label>
                  <select className="form-input"><option value="">All Classes</option>{[...Array(10)].map((_, i) => <option key={i} value={i + 1}>Class {i + 1}</option>)}</select>
                </div>
                <div className="form-group"><label className="form-label">Due Date</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group"><label className="form-label">Late Fee (Rs)</label>
                  <input type="number" className="form-input" placeholder="200" />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setShowModal(false)}>Generate Fees</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
