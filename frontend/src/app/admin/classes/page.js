'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookOpen, Plus, Edit, Trash2, X, Users, FileText } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_CLASSES = [
  { _id: '1', name: 'Class 1', numericLevel: 1, category: 'primary', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat'], monthlyFee: 2000, students: 70, teacher: 'Ahmed Khan' },
  { _id: '2', name: 'Class 2', numericLevel: 2, category: 'primary', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'General Knowledge'], monthlyFee: 2000, students: 70, teacher: 'Ahmed Khan' },
  { _id: '3', name: 'Class 3', numericLevel: 3, category: 'primary', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'General Knowledge'], monthlyFee: 2200, students: 70, teacher: 'Sajid Ali' },
  { _id: '4', name: 'Class 4', numericLevel: 4, category: 'primary', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Social Studies', 'Science'], monthlyFee: 2200, students: 70, teacher: 'Sajid Ali' },
  { _id: '5', name: 'Class 5', numericLevel: 5, category: 'primary', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Social Studies', 'Science'], monthlyFee: 2500, students: 70, teacher: 'Muhammad Farooq' },
  { _id: '6', name: 'Class 6', numericLevel: 6, category: 'middle', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Pak Studies', 'Science', 'Computer'], monthlyFee: 2800, students: 70, teacher: 'Muhammad Farooq' },
  { _id: '7', name: 'Class 7', numericLevel: 7, category: 'middle', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Pak Studies', 'Science', 'Computer'], monthlyFee: 2800, students: 70, teacher: 'Kashif Iqbal' },
  { _id: '8', name: 'Class 8', numericLevel: 8, category: 'middle', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Pak Studies', 'Science', 'Computer'], monthlyFee: 3000, students: 70, teacher: 'Kashif Iqbal' },
  { _id: '9', name: 'Class 9', numericLevel: 9, category: 'high', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Pak Studies', 'Physics', 'Chemistry', 'Biology', 'Computer'], monthlyFee: 3500, students: 70, teacher: 'Tahir Mehmood' },
  { _id: '10', name: 'Class 10', numericLevel: 10, category: 'high', sections: ['A', 'B'], subjects: ['English', 'Urdu', 'Math', 'Islamiat', 'Pak Studies', 'Physics', 'Chemistry', 'Biology', 'Computer'], monthlyFee: 3500, students: 70, teacher: 'Tahir Mehmood' },
  { _id: '11', name: 'Class 11 (Pre-Med)', numericLevel: 11, category: 'high', sections: ['A'], subjects: ['English', 'Urdu', 'Biology', 'Physics', 'Chemistry', 'Islamiat'], monthlyFee: 4500, students: 35, teacher: 'Kamran Shah' },
  { _id: '12', name: 'Class 11 (Pre-Eng)', numericLevel: 11, category: 'high', sections: ['B'], subjects: ['English', 'Urdu', 'Math', 'Physics', 'Chemistry', 'Islamiat'], monthlyFee: 4500, students: 35, teacher: 'Kamran Shah' },
  { _id: '13', name: 'Class 12 (Pre-Med)', numericLevel: 12, category: 'high', sections: ['A'], subjects: ['English', 'Urdu', 'Biology', 'Physics', 'Chemistry', 'Pak Studies'], monthlyFee: 5000, students: 35, teacher: 'Tahir Mehmood' },
  { _id: '14', name: 'Class 12 (Pre-Eng)', numericLevel: 12, category: 'high', sections: ['B'], subjects: ['English', 'Urdu', 'Math', 'Physics', 'Chemistry', 'Pak Studies'], monthlyFee: 5000, students: 35, teacher: 'Tahir Mehmood' },
  { _id: '15', name: 'Nursery', numericLevel: 0, category: 'primary', sections: ['A', 'B'], subjects: ['English Oral', 'Urdu Oral', 'Math Oral', 'General Knowledge', 'Art'], monthlyFee: 1500, students: 60, teacher: 'Rehman Gul' },
];

export default function AdminClasses() {
  const [classes, setClasses] = useState(DEMO_CLASSES);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({ name: '', numericLevel: '', category: 'primary', sections: 'A', subjects: '', monthlyFee: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, sections: formData.sections.split(',').map(s => s.trim()), subjects: formData.subjects.split(',').map(s => s.trim()) };
    if (selected) {
      setClasses(prev => prev.map(c => c._id === selected._id ? { ...c, ...data } : c));
    } else {
      setClasses(prev => [...prev, { ...data, _id: Date.now().toString(), students: 0, teacher: 'Unassigned' }]);
    }
    setShowModal(false); setSelected(null);
  };

  const handleEdit = (cls) => {
    setSelected(cls);
    setFormData({ name: cls.name, numericLevel: cls.numericLevel, category: cls.category, sections: cls.sections.join(', '), subjects: cls.subjects.join(', '), monthlyFee: cls.monthlyFee });
    setShowModal(true);
  };

  const categoryColors = { primary: { bg: '#dbeafe', color: '#1d4ed8' }, middle: { bg: '#fef3c7', color: '#92400e' }, high: { bg: '#d1fae5', color: '#065f46' } };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Class Management</h1><p>Manage classes, sections, and subjects</p></div>
          <button className="btn btn-primary" onClick={() => { setSelected(null); setFormData({ name: '', numericLevel: '', category: 'primary', sections: 'A', subjects: '', monthlyFee: '' }); setShowModal(true); }}>
            <Plus size={18} /> Add Class
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><BookOpen size={24} /></div>
            <div className={styles.statInfo}><h3>{classes.length}</h3><p>Total Classes</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{classes.reduce((s, c) => s + c.students, 0)}</h3><p>Total Students</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><FileText size={24} /></div>
            <div className={styles.statInfo}><h3>{[...new Set(classes.flatMap(c => c.subjects))].length}</h3><p>Unique Subjects</p></div>
          </div>
        </div>

        {/* Class Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
          {classes.map(cls => (
            <div key={cls._id} className="card card-3d" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 className="animate-text-hover" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--heading-accent)' }}>{cls.name}</h3>
                  <span className="badge" style={{ background: categoryColors[cls.category]?.bg, color: categoryColors[cls.category]?.color }}>{cls.category}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="stat-zoom" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--gray-400)', textTransform: 'uppercase', fontWeight: 700 }}>Students</p>
                    <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gray-900)' }}>{cls.students}</p>
                  </div>
                  <div className="stat-zoom" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--gray-400)', textTransform: 'uppercase', fontWeight: 700 }}>Monthly Fee</p>
                    <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#facc15' }}>Rs {cls.monthlyFee.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginBottom: '8px', fontWeight: 500 }}>Sections: {cls.sections.join(', ')}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {cls.subjects.slice(0, 5).map((s, i) => <span key={i} className="badge badge-info" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>{s}</span>)}
                  {cls.subjects.length > 5 && <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>+{cls.subjects.length - 5}</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(cls)} style={{ borderRadius: '10px' }}><Edit size={14} /> Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Delete?')) setClasses(prev => prev.filter(c => c._id !== cls._id)); }} style={{ borderRadius: '10px' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{selected ? 'Edit Class' : 'Add New Class'}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Class Name *</label><input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Class 11" /></div>
                  <div className="form-group"><label className="form-label">Level Number *</label><input type="number" className="form-input" required value={formData.numericLevel} onChange={e => setFormData({ ...formData, numericLevel: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Category</label>
                    <select className="form-input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                      <option value="primary">Primary</option><option value="middle">Middle</option><option value="high">High</option><option value="college">College</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Monthly Fee (Rs)</label><input type="number" className="form-input" value={formData.monthlyFee} onChange={e => setFormData({ ...formData, monthlyFee: e.target.value })} /></div>
                </div>
                <div className="form-group"><label className="form-label">Sections (comma separated)</label><input className="form-input" value={formData.sections} onChange={e => setFormData({ ...formData, sections: e.target.value })} placeholder="A, B, C" /></div>
                <div className="form-group"><label className="form-label">Subjects (comma separated)</label><textarea className="form-input" rows={3} value={formData.subjects} onChange={e => setFormData({ ...formData, subjects: e.target.value })} placeholder="English, Urdu, Math, Science" /></div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{selected ? 'Update' : 'Add'} Class</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
