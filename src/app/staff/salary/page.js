'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Download } from 'lucide-react';

const DEMO = [
  { _id: '1', month: 'January 2025', basic: 20000, allowances: 2000, deductions: 500, net: 21500, status: 'paid', paidDate: '2025-02-01' },
  { _id: '2', month: 'December 2024', basic: 20000, allowances: 2000, deductions: 500, net: 21500, status: 'paid', paidDate: '2025-01-01' },
  { _id: '3', month: 'February 2025', basic: 20000, allowances: 2000, deductions: 0, net: 22000, status: 'pending', paidDate: null },
];

export default function StaffSalary() {
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Salary</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>View your salary history and slips</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '20px', background: '#3b82f615', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>Rs 20,000</p><p style={{ fontSize: '0.8rem', color: '#64748b' }}>Basic Salary</p>
          </div>
          <div style={{ padding: '20px', background: '#10b98115', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>Rs 43,000</p><p style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Received</p>
          </div>
        </div>
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net</th><th>Status</th><th>Slip</th></tr></thead>
              <tbody>
                {DEMO.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 600 }}>{s.month}</td>
                    <td>Rs {s.basic.toLocaleString()}</td>
                    <td style={{ color: '#10b981' }}>+Rs {s.allowances.toLocaleString()}</td>
                    <td style={{ color: '#ef4444' }}>-Rs {s.deductions.toLocaleString()}</td>
                    <td style={{ fontWeight: 700 }}>Rs {s.net.toLocaleString()}</td>
                    <td><span className={`badge ${s.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span></td>
                    <td>{s.status === 'paid' && <button className="btn btn-sm btn-secondary"><Download size={14} /> PDF</button>}</td>
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
