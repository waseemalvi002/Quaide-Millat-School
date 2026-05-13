'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Download, CheckCircle, Clock } from 'lucide-react';

const DEMO = [
  { _id: '1', month: 'January 2025', amount: 2500, dueDate: '2025-01-15', status: 'paid', paidDate: '2025-01-10', late: 0 },
  { _id: '2', month: 'December 2024', amount: 2500, dueDate: '2024-12-15', status: 'paid', paidDate: '2024-12-12', late: 0 },
  { _id: '3', month: 'February 2025', amount: 2500, dueDate: '2025-02-15', status: 'unpaid', paidDate: null, late: 0 },
];

export default function ParentFees() {
  const badges = { paid: 'badge-success', unpaid: 'badge-warning' };
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Fee Status</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Ali Khan (QM-05-001) fee history</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '20px', background: '#10b98115', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>Rs 5,000</p><p style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Paid</p>
          </div>
          <div style={{ padding: '20px', background: '#f59e0b15', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>Rs 2,500</p><p style={{ fontSize: '0.8rem', color: '#64748b' }}>Pending</p>
          </div>
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Month</th><th>Amount</th><th>Due Date</th><th>Paid Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {DEMO.map(f => (
                  <tr key={f._id}>
                    <td style={{ fontWeight: 600 }}>{f.month}</td>
                    <td>Rs {f.amount.toLocaleString()}</td>
                    <td>{f.dueDate}</td>
                    <td>{f.paidDate || '-'}</td>
                    <td><span className={`badge ${badges[f.status]}`}>{f.status}</span></td>
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
