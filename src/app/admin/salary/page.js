'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Search, Download, Eye, CheckCircle, X, Clock, Plus } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_SALARIES = [
  { _id: '1', employee: 'Ahmed Khan', type: 'Teacher', month: 'January', year: 2025, basic: 45000, allowances: 5000, deductions: 2000, netSalary: 48000, workingDays: 26, presentDays: 25, status: 'paid', paidDate: '2025-02-01' },
  { _id: '2', employee: 'Muhammad Farooq', type: 'Teacher', month: 'January', year: 2025, basic: 55000, allowances: 8000, deductions: 3000, netSalary: 60000, workingDays: 26, presentDays: 26, status: 'paid', paidDate: '2025-02-01' },
  { _id: '3', employee: 'Sajid Ali', type: 'Teacher', month: 'January', year: 2025, basic: 40000, allowances: 4000, deductions: 1500, netSalary: 42500, workingDays: 26, presentDays: 24, status: 'pending', paidDate: null },
  { _id: '4', employee: 'Kashif Iqbal', type: 'Teacher', month: 'January', year: 2025, basic: 42000, allowances: 5000, deductions: 2000, netSalary: 45000, workingDays: 26, presentDays: 26, status: 'approved', paidDate: null },
  { _id: '5', employee: 'Rashid Peon', type: 'Staff', month: 'January', year: 2025, basic: 20000, allowances: 2000, deductions: 500, netSalary: 21500, workingDays: 26, presentDays: 24, status: 'paid', paidDate: '2025-02-01' },
  { _id: '6', employee: 'Akbar Ali', type: 'Staff', month: 'January', year: 2025, basic: 18000, allowances: 1500, deductions: 500, netSalary: 19000, workingDays: 26, presentDays: 25, status: 'pending', paidDate: null },
  { _id: '7', employee: 'Nasir Ahmed', type: 'Staff', month: 'January', year: 2025, basic: 25000, allowances: 3000, deductions: 1000, netSalary: 27000, workingDays: 26, presentDays: 26, status: 'paid', paidDate: '2025-02-01' },
  { _id: '8', employee: 'Asif Mahmood', type: 'Teacher', month: 'January', year: 2025, basic: 38000, allowances: 4000, deductions: 1500, netSalary: 40500, workingDays: 26, presentDays: 23, status: 'pending', paidDate: null },
];

export default function AdminSalary() {
  const [salaries, setSalaries] = useState(DEMO_SALARIES);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const filtered = salaries.filter(s => {
    const m1 = s.employee.toLowerCase().includes(search.toLowerCase());
    const m2 = !filterType || s.type === filterType;
    const m3 = !filterStatus || s.status === filterStatus;
    return m1 && m2 && m3;
  });

  const totalPaid = salaries.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.netSalary, 0);
  const totalPending = salaries.filter(s => s.status !== 'paid').reduce((sum, s) => sum + s.netSalary, 0);

  const statusStyles = {
    paid: { bg: '#d1fae5', color: '#065f46', icon: <CheckCircle size={12} /> },
    approved: { bg: '#dbeafe', color: '#1d4ed8', icon: <CheckCircle size={12} /> },
    pending: { bg: '#fef3c7', color: '#92400e', icon: <Clock size={12} /> },
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Salary Management</h1><p>Manage payroll for teachers and staff</p></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export</button>
            <button className="btn btn-primary" onClick={() => setShowGenerateModal(true)}><Plus size={18} /> Generate Payroll</button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {totalPaid.toLocaleString()}</h3><p>Total Paid</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {totalPending.toLocaleString()}</h3><p>Pending</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><DollarSign size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {(totalPaid + totalPending).toLocaleString()}</h3><p>Total Payroll</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search employee..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px' }} />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="form-input" style={{ width: '150px' }}>
            <option value="">All Types</option><option value="Teacher">Teachers</option><option value="Staff">Staff</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-input" style={{ width: '150px' }}>
            <option value="">All Status</option><option value="paid">Paid</option><option value="approved">Approved</option><option value="pending">Pending</option>
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Employee</th><th>Type</th><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net Salary</th><th>Days</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(salary => (
                  <tr key={salary._id}>
                    <td style={{ fontWeight: 600 }}>{salary.employee}</td>
                    <td><span className={`badge ${salary.type === 'Teacher' ? 'badge-info' : 'badge-warning'}`}>{salary.type}</span></td>
                    <td>{salary.month} {salary.year}</td>
                    <td>Rs {salary.basic.toLocaleString()}</td>
                    <td style={{ color: '#10b981' }}>+Rs {salary.allowances.toLocaleString()}</td>
                    <td style={{ color: '#ef4444' }}>-Rs {salary.deductions.toLocaleString()}</td>
                    <td style={{ fontWeight: 700 }}>Rs {salary.netSalary.toLocaleString()}</td>
                    <td>{salary.presentDays}/{salary.workingDays}</td>
                    <td>
                      <span className="badge" style={{ background: statusStyles[salary.status]?.bg, color: statusStyles[salary.status]?.color, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {statusStyles[salary.status]?.icon} {salary.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setSelected(salary); setShowViewModal(true); }}><Eye size={14} /></button>
                        {salary.status === 'pending' && (
                          <button className="btn btn-sm btn-success" style={{ background: '#10b981', color: '#fff' }}
                            onClick={() => setSalaries(prev => prev.map(s => s._id === salary._id ? { ...s, status: 'approved' } : s))}>Approve</button>
                        )}
                        {salary.status === 'approved' && (
                          <button className="btn btn-sm btn-primary"
                            onClick={() => setSalaries(prev => prev.map(s => s._id === salary._id ? { ...s, status: 'paid', paidDate: new Date().toISOString().split('T')[0] } : s))}>Pay</button>
                        )}
                        <button className="btn btn-sm btn-secondary"><Download size={14} /></button>
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
                <h3>Salary Slip</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div style={{ textAlign: 'center', padding: '16px', background: 'linear-gradient(135deg, #1a56db, #3b82f6)', borderRadius: '12px', color: '#fff', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1rem' }}>Quaid-e-Millat Public Boys High School</h2>
                  <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>Salary Slip - {selected.month} {selected.year}</p>
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {[['Employee', selected.employee], ['Type', selected.type], ['Basic Salary', `Rs ${selected.basic.toLocaleString()}`], ['Allowances', `+Rs ${selected.allowances.toLocaleString()}`], ['Deductions', `-Rs ${selected.deductions.toLocaleString()}`], ['Working Days', `${selected.presentDays}/${selected.workingDays}`]].map(([l, v], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: '6px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{l}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#1e293b', borderRadius: '8px', color: '#fff', marginTop: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Net Salary</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Rs {selected.netSalary.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary"><Download size={16} /> Download PDF</button>
                  <button className="btn btn-primary" onClick={() => setShowViewModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showGenerateModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Generate Monthly Payroll</h3>
                <button onClick={() => setShowGenerateModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div className="form-group"><label className="form-label">Month</label>
                  <select className="form-input">{['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m} value={m}>{m}</option>)}</select>
                </div>
                <div className="form-group"><label className="form-label">Year</label><input type="number" className="form-input" defaultValue={2025} /></div>
                <div className="form-group"><label className="form-label">Employee Type</label>
                  <select className="form-input"><option value="all">All Employees</option><option value="teacher">Teachers Only</option><option value="staff">Staff Only</option></select>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowGenerateModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setShowGenerateModal(false)}>Generate</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
