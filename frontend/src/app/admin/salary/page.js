'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DollarSign, Search, Download, Eye, CheckCircle, X, Clock, Plus, Upload, Edit, Trash2, Save } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_SALARIES = [
  { _id: '1', employee: 'Ahmed Khan', type: 'Teacher', month: 'January', year: 2025, basic: 45000, allowances: 5000, deductions: 2000, netSalary: 48000, workingDays: 26, presentDays: 25, status: 'paid', paidDate: '2025-02-01', profileImage: '/teacher_1.png' },
  { _id: '2', employee: 'Muhammad Farooq', type: 'Teacher', month: 'January', year: 2025, basic: 55000, allowances: 8000, deductions: 3000, netSalary: 60000, workingDays: 26, presentDays: 26, status: 'paid', paidDate: '2025-02-01', profileImage: '/teacher_2.png' },
  { _id: '3', employee: 'Sajid Ali', type: 'Teacher', month: 'January', year: 2025, basic: 40000, allowances: 4000, deductions: 1500, netSalary: 42500, workingDays: 26, presentDays: 24, status: 'pending', paidDate: null, profileImage: '/teacher_1.png' },
  { _id: '4', employee: 'Kashif Iqbal', type: 'Teacher', month: 'January', year: 2025, basic: 42000, allowances: 5000, deductions: 2000, netSalary: 45000, workingDays: 26, presentDays: 26, status: 'approved', paidDate: null, profileImage: '/teacher_2.png' },
  { _id: '5', employee: 'Rashid Peon', type: 'Staff', month: 'January', year: 2025, basic: 20000, allowances: 2000, deductions: 500, netSalary: 21500, workingDays: 26, presentDays: 24, status: 'paid', paidDate: '2025-02-01', profileImage: '/teacher_1.png' },
  { _id: '6', employee: 'Akbar Ali', type: 'Staff', month: 'January', year: 2025, basic: 18000, allowances: 1500, deductions: 500, netSalary: 19000, workingDays: 26, presentDays: 25, status: 'pending', paidDate: null, profileImage: '/teacher_2.png' },
  { _id: '7', employee: 'Nasir Ahmed', type: 'Staff', month: 'January', year: 2025, basic: 25000, allowances: 3000, deductions: 1000, netSalary: 27000, workingDays: 26, presentDays: 26, status: 'paid', paidDate: '2025-02-01', profileImage: '/teacher_1.png' },
  { _id: '8', employee: 'Asif Mahmood', type: 'Teacher', month: 'January', year: 2025, basic: 38000, allowances: 4000, deductions: 1500, netSalary: 40500, workingDays: 26, presentDays: 23, status: 'pending', paidDate: null, profileImage: '/teacher_2.png' },
];

const getEmployeeAvatar = (salary, index) => {
  if (!salary) return '/teacher_1.png';
  if (salary.profileImage) return salary.profileImage;
  const name = salary.employee || '';
  const isFemale = name.includes('Nida') || name.includes('Hina') || name.includes('Sara') || name.includes('Ayesha') || name.includes('Fatima');
  return isFemale ? `/teacher_2.png` : `/teacher_1.png`;
};



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
                {filtered.map((salary, index) => {
                  const displayAvatar = getEmployeeAvatar(salary, index);
                  return (
                    <tr key={salary._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            style={{ position: 'relative', width: '45px', height: '45px', cursor: 'pointer', flexShrink: 0 }} 
                            onClick={() => document.getElementById(`s-img-input-${salary._id}`).click()}
                            title="Click to change image"
                          >
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                              <img src={displayAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', borderRadius: '50%' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                <Upload size={14} color="#fff" />
                              </div>
                            </div>
                          <input 
                            id={`s-img-input-${salary._id}`}
                            type="file" 
                            hidden 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const url = URL.createObjectURL(e.target.files[0]);
                                setSalaries(prev => prev.map(s => s._id === salary._id ? { ...s, profileImage: url } : s));
                              }
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: 600 }}>{salary.employee}</span>
                      </div>
                    </td>
                    <td><span className={`badge ${salary.type === 'Teacher' ? 'badge-info' : 'badge-warning'}`}>{salary.type}</span></td>
                    <td>{salary.month} {salary.year}</td>
                    <td>Rs {salary.basic.toLocaleString()}</td>
                    <td style={{ color: '#10b981' }}>+Rs {salary.allowances.toLocaleString()}</td>
                    <td style={{ color: '#ef4444' }}>-Rs {salary.deductions.toLocaleString()}</td>
                    <td style={{ fontWeight: 700 }}>Rs {salary.netSalary.toLocaleString()}</td>
                    <td>{salary.presentDays}/{salary.workingDays}</td>
                    <td>
                      <span 
                        onClick={() => {
                          const nextStatus = salary.status === 'pending' ? 'approved' : salary.status === 'approved' ? 'paid' : 'pending';
                          setSalaries(prev => prev.map(s => s._id === salary._id ? { ...s, status: nextStatus, paidDate: nextStatus === 'paid' ? new Date().toISOString().split('T')[0] : null } : s));
                        }}
                        className="badge" 
                        style={{ 
                          background: statusStyles[salary.status]?.bg, 
                          color: statusStyles[salary.status]?.color, 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          cursor: 'pointer',
                          minWidth: '90px',
                          justifyContent: 'center'
                        }}
                        title="Click to toggle status"
                      >
                        {statusStyles[salary.status]?.icon} {salary.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }} onClick={() => { setSelected(salary); setShowViewModal(true); }}><Edit size={14} /></button>
                        <button className="btn btn-sm btn-danger" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }} onClick={() => { if(confirm('Delete this record?')) setSalaries(prev => prev.filter(s => s._id !== salary._id)) }}><Trash2 size={14} /></button>
                        <button className="btn btn-sm btn-secondary"><Download size={14} /></button>
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
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(5px)' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Edit Salary Details</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px' }}><X size={20} /></button>
              </div>
              <div className="card-body" style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#94a3b8' }}>Employee Name</label>
                    <input className="form-input" value={selected.employee} onChange={(e) => setSelected({...selected, employee: e.target.value})} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#94a3b8' }}>Basic Salary</label>
                      <input type="number" className="form-input" value={selected.basic} onChange={(e) => {
                        const basic = parseInt(e.target.value) || 0;
                        setSelected({...selected, basic, netSalary: basic + selected.allowances - selected.deductions});
                      }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#94a3b8' }}>Allowances</label>
                      <input type="number" className="form-input" value={selected.allowances} onChange={(e) => {
                        const allowances = parseInt(e.target.value) || 0;
                        setSelected({...selected, allowances, netSalary: selected.basic + allowances - selected.deductions});
                      }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#94a3b8' }}>Deductions</label>
                      <input type="number" className="form-input" value={selected.deductions} onChange={(e) => {
                        const deductions = parseInt(e.target.value) || 0;
                        setSelected({...selected, deductions, netSalary: selected.basic + selected.allowances - deductions});
                      }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#94a3b8' }}>Working Days</label>
                      <input type="number" className="form-input" value={selected.presentDays} onChange={(e) => setSelected({...selected, presentDays: parseInt(e.target.value) || 0})} />
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '12px', marginTop: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#60a5fa', fontWeight: 600 }}>Calculated Net Salary</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#facc15' }}>Rs {selected.netSalary?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowViewModal(false)}>Cancel</button>
                    <button className="btn btn-primary" style={{ flex: 1, background: '#3b82f6' }} onClick={() => {
                      setSalaries(prev => prev.map(s => s._id === selected._id ? selected : s));
                      setShowViewModal(false);
                    }}><Save size={18} /> Save Changes</button>
                  </div>
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
