'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Search, Plus, Eye, Download, X, Award, TrendingUp, Pencil, Trash2, Upload } from 'lucide-react';
import styles from '../admin.module.css';

const CLASSES = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];

const DEMO_RESULTS = [
  { _id: '1',  student: 'Ali Hassan',       rollNumber: 'QM-2024-101', class: 'Class 1',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 300, obtainedMarks: 270, percentage: 90.0, grade: 'A', subjects: [{ name: 'Urdu', total: 100, obtained: 95 }, { name: 'English', total: 100, obtained: 88 }, { name: 'Maths', total: 100, obtained: 87 }], profileImage: { url: '/boy_1.png' } },
  { _id: '2',  student: 'Umar Farooq',      rollNumber: 'QM-2024-102', class: 'Class 2',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 300, obtainedMarks: 255, percentage: 85.0, grade: 'A', subjects: [{ name: 'Urdu', total: 100, obtained: 90 }, { name: 'English', total: 100, obtained: 82 }, { name: 'Maths', total: 100, obtained: 83 }], profileImage: { url: '/boy_2.png' } },
  { _id: '3',  student: 'Hamza Tariq',      rollNumber: 'QM-2024-103', class: 'Class 3',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 400, obtainedMarks: 320, percentage: 80.0, grade: 'A', subjects: [{ name: 'Urdu', total: 100, obtained: 85 }, { name: 'English', total: 100, obtained: 78 }, { name: 'Maths', total: 100, obtained: 80 }, { name: 'Science', total: 100, obtained: 77 }], profileImage: { url: '/boy_3.png' } },
  { _id: '4',  student: 'Bilal Sheikh',     rollNumber: 'QM-2024-104', class: 'Class 4',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 400, obtainedMarks: 300, percentage: 75.0, grade: 'B', subjects: [{ name: 'Urdu', total: 100, obtained: 80 }, { name: 'English', total: 100, obtained: 72 }, { name: 'Maths', total: 100, obtained: 75 }, { name: 'Science', total: 100, obtained: 73 }], profileImage: { url: '/boy_1.png' } },
  { _id: '5',  student: 'Zain Malik',       rollNumber: 'QM-2024-105', class: 'Class 5',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 400, obtainedMarks: 340, percentage: 85.0, grade: 'A', subjects: [{ name: 'Urdu', total: 100, obtained: 88 }, { name: 'English', total: 100, obtained: 84 }, { name: 'Maths', total: 100, obtained: 86 }, { name: 'Science', total: 100, obtained: 82 }], profileImage: { url: '/boy_2.png' } },
  { _id: '6',  student: 'Faizan Ahmed',     rollNumber: 'QM-2024-106', class: 'Class 6',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 500, obtainedMarks: 390, percentage: 78.0, grade: 'B', subjects: [{ name: 'Urdu', total: 100, obtained: 82 }, { name: 'English', total: 100, obtained: 76 }, { name: 'Maths', total: 100, obtained: 80 }, { name: 'Science', total: 100, obtained: 76 }, { name: 'S.St', total: 100, obtained: 76 }], profileImage: { url: '/boy_3.png' } },
  { _id: '7',  student: 'Saad Riaz',        rollNumber: 'QM-2024-107', class: 'Class 7',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 500, obtainedMarks: 410, percentage: 82.0, grade: 'A', subjects: [{ name: 'Urdu', total: 100, obtained: 88 }, { name: 'English', total: 100, obtained: 80 }, { name: 'Maths', total: 100, obtained: 84 }, { name: 'Science', total: 100, obtained: 82 }, { name: 'S.St', total: 100, obtained: 76 }], profileImage: { url: '/boy_1.png' } },
  { _id: '8',  student: 'Daniyal Khan',     rollNumber: 'QM-2024-108', class: 'Class 8',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 500, obtainedMarks: 360, percentage: 72.0, grade: 'B', subjects: [{ name: 'Urdu', total: 100, obtained: 75 }, { name: 'English', total: 100, obtained: 70 }, { name: 'Maths', total: 100, obtained: 72 }, { name: 'Science', total: 100, obtained: 73 }, { name: 'S.St', total: 100, obtained: 70 }], profileImage: { url: '/boy_2.png' } },
  { _id: '9',  student: 'Muhammad Ali',     rollNumber: 'QM-2024-109', class: 'Class 9',  examType: 'Monthly', term: 'Jan 2025', totalMarks: 500, obtainedMarks: 425, percentage: 85.0, grade: 'A', subjects: [{ name: 'Math', total: 100, obtained: 92 }, { name: 'Physics', total: 100, obtained: 88 }, { name: 'Chemistry', total: 100, obtained: 85 }, { name: 'English', total: 100, obtained: 78 }, { name: 'Urdu', total: 100, obtained: 82 }], profileImage: { url: '/boy_3.png' } },
  { _id: '10', student: 'Ahmed Raza',       rollNumber: 'QM-2024-110', class: 'Class 10', examType: 'Monthly', term: 'Jan 2025', totalMarks: 500, obtainedMarks: 380, percentage: 76.0, grade: 'B', subjects: [{ name: 'Math', total: 100, obtained: 72 }, { name: 'Physics', total: 100, obtained: 68 }, { name: 'Chemistry', total: 100, obtained: 80 }, { name: 'English', total: 100, obtained: 82 }, { name: 'Urdu', total: 100, obtained: 78 }], profileImage: { url: '/boy_1.png' } },
  { _id: '11', student: 'Kamran Butt',      rollNumber: 'QM-2024-111', class: 'Class 11', examType: 'Monthly', term: 'Jan 2025', totalMarks: 550, obtainedMarks: 462, percentage: 84.0, grade: 'A', subjects: [{ name: 'Math', total: 100, obtained: 90 }, { name: 'Physics', total: 100, obtained: 85 }, { name: 'Chemistry', total: 100, obtained: 88 }, { name: 'Biology', total: 100, obtained: 82 }, { name: 'English', total: 100, obtained: 82 }, { name: 'Urdu', total: 50, obtained: 35 }], profileImage: { url: '/boy_2.png' } },
  { _id: '12', student: 'Shahzaib Noor',    rollNumber: 'QM-2024-112', class: 'Class 12', examType: 'Annual',  term: 'Annual 2025', totalMarks: 550, obtainedMarks: 495, percentage: 90.0, grade: 'A', subjects: [{ name: 'Math', total: 100, obtained: 95 }, { name: 'Physics', total: 100, obtained: 92 }, { name: 'Chemistry', total: 100, obtained: 90 }, { name: 'Biology', total: 100, obtained: 88 }, { name: 'English', total: 100, obtained: 88 }, { name: 'Urdu', total: 50, obtained: 42 }], profileImage: { url: '/boy_3.png' } },
];

const getStudentAvatar = (res, index) => {
  if (!res) return '/boy_1.png';
  const imageUrl = res.profileImage?.url;
  if (imageUrl) return imageUrl;
  const name = res.student || '';
  const isFemale = name.includes('Sara') || name.includes('Ayesha') || name.includes('Fatima') || name.includes('Zainab') || name.includes('Mariam');
  return isFemale ? `/girl_${(index % 3) + 1}.png` : `/boy_${(index % 3) + 1}.png`;
};



export default function AdminResults() {
  const [results, setResults] = useState(DEMO_RESULTS);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student: '', rollNumber: '', class: 'Class 1', examType: 'Monthly', term: 'Jan 2025', 
    subjects: [{ name: 'Math', total: 100, obtained: 0 }]
  });

  const handleSave = () => {
    const totalMarks = formData.subjects.reduce((s, sub) => s + Number(sub.total || 0), 0);
    const obtainedMarks = formData.subjects.reduce((s, sub) => s + Number(sub.obtained || 0), 0);
    const percentage = totalMarks > 0 ? Number(((obtainedMarks / totalMarks) * 100).toFixed(1)) : 0;
    
    const newResult = { ...formData, totalMarks, obtainedMarks, percentage, grade: percentage >= 80 ? 'A' : 'B' };
    if (isEditing) setResults(prev => prev.map(r => r._id === formData._id ? newResult : r));
    else setResults(prev => [{ ...newResult, _id: Date.now().toString() }, ...prev]);
    setShowFormModal(false);
  };

  const filtered = results.filter(r => (r.student.toLowerCase().includes(search.toLowerCase()) || r.rollNumber.toLowerCase().includes(search.toLowerCase())) && (!filterClass || r.class === filterClass));

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Result Management</h1><p>Edit and update all student report cards</p></div>
          <button className="btn btn-primary" onClick={() => { setIsEditing(false); setFormData({ student: '', rollNumber: '', class: 'Class 1', examType: 'Monthly', term: 'Jan 2025', subjects: [{ name: 'Math', total: 100, obtained: 0 }] }); setShowFormModal(true); }}><Plus size={18} /> Add Result</button>
        </div>

        <div style={{ display: 'flex', gap: '12px', margin: '24px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px', width: '100%' }} />
          </div>
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="form-input" style={{ width: '160px' }}>
            <option value="">All Classes</option>
            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead><tr><th>Student</th><th>Roll No</th><th>Class</th><th>Marks</th><th>%</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((res, index) => {
                  const displayAvatar = getStudentAvatar(res, index);
                  return (
                    <tr key={res._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            style={{ position: 'relative', width: '45px', height: '45px', cursor: 'pointer', flexShrink: 0 }} 
                            onClick={() => document.getElementById(`r-img-input-${res._id}`).click()}
                            title="Click to change image"
                          >
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                              <img src={displayAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', borderRadius: '50%' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                <Upload size={14} color="#fff" />
                              </div>
                            </div>
                          <input 
                            id={`r-img-input-${res._id}`}
                            type="file" 
                            hidden 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const url = URL.createObjectURL(e.target.files[0]);
                                setResults(prev => prev.map(r => r._id === res._id ? { ...r, profileImage: { ...r.profileImage, url } } : r));
                              }
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: 600 }}>{res.student}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-primary">{res.rollNumber}</span></td>
                    <td>{res.class}</td>
                    <td>{res.obtainedMarks}/{res.totalMarks}</td>
                    <td>{res.percentage}%</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-sm btn-info" onClick={() => { setIsEditing(true); setFormData({ ...res }); setShowFormModal(true); }}><Pencil size={16} /> Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => setResults(results.filter(r => r._id !== res._id))}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>

        {showFormModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: '#1e293b', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'white' }}>{isEditing ? 'Edit Result' : 'Add Result'}</h3>
                <button onClick={() => setShowFormModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div className="form-group"><label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Student Name</label><input className="form-input" style={{ width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }} value={formData.student} onChange={e => setFormData({ ...formData, student: e.target.value })} /></div>
                  <div className="form-group"><label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Roll No</label><input className="form-input" style={{ width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }} value={formData.rollNumber} onChange={e => setFormData({ ...formData, rollNumber: e.target.value })} /></div>
                  <div className="form-group"><label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Class</label>
                    <select className="form-input" style={{ width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }} value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}>
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Exam Type</label>
                    <select className="form-input" style={{ width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }} value={formData.examType} onChange={e => setFormData({ ...formData, examType: e.target.value })}>
                      <option>Monthly</option><option>Mid-Term</option><option>Annual</option>
                    </select>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #334155', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h4 style={{ color: '#60a5fa', margin: 0 }}>Subjects</h4>
                    <button className="btn btn-sm btn-primary" onClick={() => setFormData({ ...formData, subjects: [...formData.subjects, { name: '', total: 100, obtained: 0 }] })}>+ Add Subject</button>
                  </div>
                  {formData.subjects.map((sub, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 50px', gap: '15px', marginBottom: '10px' }}>
                      <input className="form-input" style={{ background: '#0f172a', color: 'white', border: '1px solid #334155', padding: '10px', borderRadius: '8px' }} placeholder="Subject" value={sub.name} onChange={e => { const s = [...formData.subjects]; s[idx].name = e.target.value; setFormData({ ...formData, subjects: s }); }} />
                      <input className="form-input" type="number" style={{ background: '#0f172a', color: 'white', border: '1px solid #334155', padding: '10px', borderRadius: '8px' }} placeholder="Total" value={sub.total} onChange={e => { const s = [...formData.subjects]; s[idx].total = e.target.value; setFormData({ ...formData, subjects: s }); }} />
                      <input className="form-input" type="number" style={{ background: '#0f172a', color: 'white', border: '1px solid #334155', padding: '10px', borderRadius: '8px' }} placeholder="Obtained" value={sub.obtained} onChange={e => { const s = [...formData.subjects]; s[idx].obtained = e.target.value; setFormData({ ...formData, subjects: s }); }} />
                      <button className="btn btn-sm btn-danger" onClick={() => setFormData({ ...formData, subjects: formData.subjects.filter((_, i) => i !== idx) })}>X</button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px 30px', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn btn-secondary" onClick={() => setShowFormModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
