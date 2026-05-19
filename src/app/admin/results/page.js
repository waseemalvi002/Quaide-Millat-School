'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Search, Plus, Eye, Download, X, Award, TrendingUp } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_RESULTS = [
  { _id: '1', student: 'Ali Khan', rollNumber: 'QM-01-001', class: 'Class 1', examType: 'Monthly', term: 'January 2025', totalMarks: 450, obtainedMarks: 380, percentage: 84.4, grade: 'A', position: 1, subjects: [{ name: 'English', total: 100, obtained: 85 }, { name: 'Urdu', total: 100, obtained: 78 }, { name: 'Math', total: 100, obtained: 92 }, { name: 'Islamiat', total: 100, obtained: 88 }, { name: 'GK', total: 50, obtained: 37 }] },
  { _id: '2', student: 'Hassan Ahmed', rollNumber: 'QM-01-002', class: 'Class 1', examType: 'Monthly', term: 'January 2025', totalMarks: 450, obtainedMarks: 340, percentage: 75.6, grade: 'B+', position: 2, subjects: [{ name: 'English', total: 100, obtained: 72 }, { name: 'Urdu', total: 100, obtained: 68 }, { name: 'Math', total: 100, obtained: 80 }, { name: 'Islamiat', total: 100, obtained: 82 }, { name: 'GK', total: 50, obtained: 38 }] },
  { _id: '3', student: 'Muhammad Usman', rollNumber: 'QM-02-001', class: 'Class 2', examType: 'Monthly', term: 'January 2025', totalMarks: 500, obtainedMarks: 420, percentage: 84.0, grade: 'A', position: 1, subjects: [{ name: 'English', total: 100, obtained: 88 }, { name: 'Urdu', total: 100, obtained: 82 }, { name: 'Math', total: 100, obtained: 90 }, { name: 'Islamiat', total: 100, obtained: 85 }, { name: 'Science', total: 100, obtained: 75 }] },
  { _id: '4', student: 'Ahmed Raza', rollNumber: 'QM-03-001', class: 'Class 3', examType: 'Weekly', term: 'Week 1 Jan', totalMarks: 250, obtainedMarks: 198, percentage: 79.2, grade: 'B+', position: 1, subjects: [{ name: 'English', total: 50, obtained: 42 }, { name: 'Urdu', total: 50, obtained: 38 }, { name: 'Math', total: 50, obtained: 45 }, { name: 'Science', total: 50, obtained: 35 }, { name: 'Islamiat', total: 50, obtained: 38 }] },
  { _id: '5', student: 'Hamza Malik', rollNumber: 'QM-04-001', class: 'Class 4', examType: 'Monthly', term: 'January 2025', totalMarks: 600, obtainedMarks: 480, percentage: 80.0, grade: 'A-', position: 1, subjects: [{ name: 'English', total: 100, obtained: 82 }, { name: 'Urdu', total: 100, obtained: 78 }, { name: 'Math', total: 100, obtained: 88 }, { name: 'Science', total: 100, obtained: 75 }, { name: 'Islamiat', total: 100, obtained: 85 }, { name: 'Social Studies', total: 100, obtained: 72 }] },
  { _id: '6', student: 'Fahad Sheikh', rollNumber: 'QM-05-001', class: 'Class 5', examType: 'Monthly', term: 'January 2025', totalMarks: 600, obtainedMarks: 522, percentage: 87.0, grade: 'A', position: 1, subjects: [{ name: 'English', total: 100, obtained: 90 }, { name: 'Urdu', total: 100, obtained: 85 }, { name: 'Math', total: 100, obtained: 92 }, { name: 'Science', total: 100, obtained: 88 }, { name: 'Islamiat', total: 100, obtained: 82 }, { name: 'Social Studies', total: 100, obtained: 85 }] },
];

export default function AdminResults() {
  const [results, setResults] = useState(DEMO_RESULTS);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filtered = results.filter(r => {
    const m1 = r.student.toLowerCase().includes(search.toLowerCase()) || r.rollNumber.toLowerCase().includes(search.toLowerCase());
    const m2 = !filterClass || r.class === filterClass;
    const m3 = !filterExam || r.examType === filterExam;
    return m1 && m2 && m3;
  });

  const gradeColors = { 'A+': '#059669', 'A': '#10b981', 'A-': '#34d399', 'B+': '#3b82f6', 'B': '#60a5fa', 'C': '#f59e0b', 'D': '#ef4444', 'F': '#dc2626' };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Result Management</h1><p>Upload and manage academic results</p></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary"><Download size={18} /> Export PDF</button>
            <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}><Plus size={18} /> Upload Results</button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><Award size={24} /></div>
            <div className={styles.statInfo}><h3>{results.length}</h3><p>Total Results</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><TrendingUp size={24} /></div>
            <div className={styles.statInfo}><h3>{(results.reduce((s, r) => s + r.percentage, 0) / results.length).toFixed(1)}%</h3><p>Avg Percentage</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><FileText size={24} /></div>
            <div className={styles.statInfo}><h3>{results.filter(r => r.percentage >= 80).length}</h3><p>A Grade Students</p></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px' }} />
          </div>
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="form-input" style={{ width: '160px' }}>
            <option value="">All Classes</option>{[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
          </select>
          <select value={filterExam} onChange={(e) => setFilterExam(e.target.value)} className="form-input" style={{ width: '160px' }}>
            <option value="">All Exams</option><option value="Weekly">Weekly</option><option value="15-Days">15-Days</option><option value="Monthly">Monthly</option><option value="Mid-Term">Mid-Term</option><option value="Final">Final</option>
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Student</th><th>Roll No</th><th>Class</th><th>Exam</th><th>Marks</th><th>%</th><th>Grade</th><th>Position</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(result => (
                  <tr key={result._id}>
                    <td style={{ fontWeight: 600 }}>{result.student}</td>
                    <td><span className="badge badge-primary">{result.rollNumber}</span></td>
                    <td>{result.class}</td>
                    <td><span className="badge badge-info">{result.examType}</span></td>
                    <td>{result.obtainedMarks}/{result.totalMarks}</td>
                    <td style={{ fontWeight: 700, color: result.percentage >= 80 ? '#10b981' : result.percentage >= 60 ? '#f59e0b' : '#ef4444' }}>{result.percentage}%</td>
                    <td><span style={{ fontWeight: 700, color: gradeColors[result.grade] || '#64748b', fontSize: '1rem' }}>{result.grade}</span></td>
                    <td><span className="badge badge-warning">#{result.position}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setSelectedResult(result); setShowViewModal(true); }}><Eye size={14} /></button>
                        <button className="btn btn-sm btn-secondary"><Download size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Result Card */}
        {showViewModal && selectedResult && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Report Card - {selectedResult.student}</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div style={{ textAlign: 'center', padding: '16px', background: 'linear-gradient(135deg, #1a56db, #3b82f6)', borderRadius: '12px', color: '#fff', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1rem', marginBottom: '4px' }}>Quaid-e-Millat Public Boys High School</h2>
                  <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{selectedResult.examType} Exam - {selectedResult.term}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Roll No</p><p style={{ fontWeight: 700 }}>{selectedResult.rollNumber}</p>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Grade</p><p style={{ fontWeight: 700, color: gradeColors[selectedResult.grade], fontSize: '1.2rem' }}>{selectedResult.grade}</p>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Position</p><p style={{ fontWeight: 700 }}>#{selectedResult.position}</p>
                  </div>
                </div>
                <table className="table" style={{ marginBottom: '20px' }}>
                  <thead><tr><th>Subject</th><th>Total</th><th>Obtained</th><th>%</th></tr></thead>
                  <tbody>
                    {selectedResult.subjects.map((sub, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{sub.name}</td><td>{sub.total}</td><td>{sub.obtained}</td>
                        <td style={{ fontWeight: 600, color: (sub.obtained / sub.total * 100) >= 60 ? '#10b981' : '#ef4444' }}>{(sub.obtained / sub.total * 100).toFixed(0)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#1e293b', borderRadius: '8px', color: '#fff' }}>
                  <span>Total: {selectedResult.obtainedMarks}/{selectedResult.totalMarks}</span>
                  <span>Percentage: {selectedResult.percentage}%</span>
                  <span>Grade: {selectedResult.grade}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary"><Download size={16} /> Download PDF</button>
                  <button className="btn btn-primary" onClick={() => setShowViewModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Upload Results</h3>
                <button onClick={() => setShowUploadModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <div className="card-body">
                <div className="form-group"><label className="form-label">Class *</label>
                  <select className="form-input"><option value="">Select Class</option>{[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}</select>
                </div>
                <div className="form-group"><label className="form-label">Exam Type *</label>
                  <select className="form-input"><option value="">Select Type</option><option value="Weekly">Weekly</option><option value="15-Days">15-Days</option><option value="Monthly">Monthly</option><option value="Mid-Term">Mid-Term</option><option value="Final">Final</option></select>
                </div>
                <div className="form-group"><label className="form-label">Term/Month</label><input className="form-input" placeholder="e.g. January 2025" /></div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setShowUploadModal(false)}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
