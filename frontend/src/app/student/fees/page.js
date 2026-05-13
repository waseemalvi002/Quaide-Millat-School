'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DEMO = [
  { _id: '1', month: 'January 2025', amount: 2500, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-10', late: 0 },
  { _id: '2', month: 'December 2024', amount: 2500, dueDate: '2024-12-15', status: 'paid', paidDate: '2024-12-12', late: 0 },
  { _id: '3', month: 'November 2024', amount: 2500, dueDate: '2024-11-15', status: 'paid', paidDate: '2024-11-18', late: 200 },
  { _id: '4', month: 'February 2025', amount: 2500, dueDate: '2025-02-15', status: 'unpaid', paidDate: null, late: 0 },
];

export default function StudentFees() {
  const icons = { paid: <CheckCircle size={14} />, unpaid: <Clock size={14} />, overdue: <AlertCircle size={14} /> };
  const badges = { paid: 'badge-success', unpaid: 'badge-warning', overdue: 'badge-danger' };
  const totalPaid = DEMO.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount + f.late, 0);
  const totalDue = DEMO.filter(f => f.status !== 'paid').reduce((s, f) => s + f.amount, 0);

  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Fees</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>View your fee status and payment history</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '20px', background: '#10b98115', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>Rs {totalPaid.toLocaleString()}</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Paid</p>
          </div>
          <div style={{ padding: '20px', background: '#f59e0b15', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>Rs {totalDue.toLocaleString()}</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Pending</p>
          </div>
          <div style={{ padding: '20px', background: '#3b82f615', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>Rs 2,500</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Monthly Fee</p>
          </div>
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Month</th><th>Amount</th><th>Due Date</th><th>Late Fee</th><th>Paid Date</th><th>Status</th><th>Receipt</th></tr></thead>
              <tbody>
                {DEMO.map(f => (
                  <tr key={f._id}>
                    <td style={{ fontWeight: 600 }}>{f.month}</td>
                    <td style={{ fontWeight: 600 }}>Rs {f.amount.toLocaleString()}</td>
                    <td>{f.dueDate}</td>
                    <td style={{ color: f.late > 0 ? '#ef4444' : '#10b981' }}>Rs {f.late}</td>
                    <td>{f.paidDate || '-'}</td>
                    <td><span className={`badge ${badges[f.status]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>{icons[f.status]} {f.status}</span></td>
                    <td>{f.status === 'paid' ? <button className="btn btn-sm btn-secondary"><Download size={14} /></button> : <button className="btn btn-sm btn-primary">Pay Now</button>}</td>
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
