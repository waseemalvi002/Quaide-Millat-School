'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teacherAPI } from '@/lib/api';
import { useThemeLang } from '@/context/ThemeLangContext';
import { GraduationCap, Search, Plus, Edit, Trash2, Eye, X, Upload, BookOpen, Award, Info } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_TEACHERS = [
  { _id: '1', name: 'Ahmed Khan', email: 'ahmed.khan@qmschool.edu.pk', phone: '0300-1111111', qualification: 'M.Ed', designation: 'Senior Teacher', subjects: ['Urdu'], classes: ['Class 1', 'Class 2'], salary: 45000, status: 'active', joinDate: '2020-01-15', profileImage: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '2', name: 'Muhammad Farooq', email: 'farooq@qmschool.edu.pk', phone: '0301-2222222', qualification: 'M.Sc Mathematics', designation: 'Head Teacher', subjects: ['Mathematics'], classes: ['Class 5', 'Class 6'], salary: 55000, status: 'active', joinDate: '2018-06-01', profileImage: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '3', name: 'Sajid Ali', email: 'sajid@qmschool.edu.pk', phone: '0302-3333333', qualification: 'M.A English', designation: 'Teacher', subjects: ['English'], classes: ['Class 3', 'Class 4'], salary: 40000, status: 'active', joinDate: '2021-03-10', profileImage: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '4', name: 'Kashif Iqbal', email: 'kashif@qmschool.edu.pk', phone: '0303-4444444', qualification: 'M.Sc Physics', designation: 'Teacher', subjects: ['Physics'], classes: ['Class 7', 'Class 8'], salary: 42000, status: 'active', joinDate: '2019-09-01', profileImage: { url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '5', name: 'Asif Mahmood', email: 'asif@qmschool.edu.pk', phone: '0304-5555555', qualification: 'M.A Urdu', designation: 'Teacher', subjects: ['Urdu'], classes: ['Class 9', 'Class 10'], salary: 38000, status: 'active', joinDate: '2022-01-15', profileImage: { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', isDefault: false } },
];

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState(DEMO_TEACHERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { t } = useThemeLang();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', qualification: '', designation: '',
    subjects: '', classes: '', salary: '', status: 'active'
  });

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, subjects: [formData.subjects.trim()], classes: formData.classes.split(',').map(s => s.trim()) };
    if (selectedTeacher) {
      setTeachers(prev => prev.map(t => t._id === selectedTeacher._id ? { ...t, ...data } : t));
    } else {
      setTeachers(prev => [...prev, { ...data, _id: Date.now().toString(), joinDate: new Date().toISOString().split('T')[0], profileImage: { url: imageFile ? URL.createObjectURL(imageFile) : '', isDefault: true } }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name, email: teacher.email, phone: teacher.phone,
      qualification: teacher.qualification, designation: teacher.designation,
      subjects: teacher.subjects.join(', '), classes: teacher.classes.join(', '),
      salary: teacher.salary, status: teacher.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this teacher?')) setTeachers(prev => prev.filter(t => t._id !== id));
  };

  const resetForm = () => {
    setSelectedTeacher(null);
    setImageFile(null);
    setFormData({ name: '', email: '', phone: '', qualification: '', designation: '', subjects: '', classes: '', salary: '', status: 'active' });
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)' }}>{t('teacher_management')}</h1>
            <p>{t('manage_teachers')}</p>
          </div>
          <button className={styles.vibrantBtn} onClick={() => { resetForm(); setShowModal(true); }}>
            <Plus size={20} /> {t('add_teacher')}
          </button>
        </div>

        {/* User Friendly Instructions */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#fff', margin: '0 0 4px', fontWeight: 800 }}>{t('instructions')}</h4>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>{t('instructions_desc')}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder={t('search_teacher')} value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '48px' }} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><GraduationCap size={24} /></div>
            <div className={styles.statInfo}><h3>{teachers.length}</h3><p>{t('total_teachers')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><BookOpen size={24} /></div>
            <div className={styles.statInfo}><h3>{[...new Set(teachers.flatMap(t => t.subjects))].length}</h3><p>{t('subjects_covered')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><Award size={24} /></div>
            <div className={styles.statInfo}><h3>{teachers.filter(t => t.status === 'active').length}</h3><p>{t('active_teachers')}</p></div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px', overflow: 'hidden' }}>
          <div className="table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: '1000px' }}>
              <thead>
                <tr>
                  <th style={{ color: '#fff' }}>{t('teachers')}</th>
                  <th style={{ color: '#fff' }}>{t('qualification')}</th>
                  <th style={{ color: '#fff' }}>{t('designation')}</th>
                  <th style={{ color: '#fff' }}>{t('subjects')}</th>
                  <th style={{ color: '#fff' }}>{t('classes')}</th>
                  <th style={{ color: '#fff' }}>{t('salary')}</th>
                  <th style={{ color: '#fff' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="profile-img-container" onClick={() => handleEdit(teacher)}>
                          <img src={teacher.profileImage?.url && !teacher.profileImage?.isDefault ? teacher.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="profile-img-overlay"><Edit size={16} /></div>
                        </div>
                        <div><span style={{ fontWeight: 700, color: '#fff' }}>{teacher.name}</span><br /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{teacher.email}</span></div>
                      </div>
                    </td>
                    <td style={{ color: '#e2e8f0' }}>{teacher.qualification}</td>
                    <td style={{ color: '#e2e8f0' }}>{teacher.designation}</td>
                    <td>{teacher.subjects.map((s, i) => <span key={i} className="badge" style={{ background: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa', marginRight: '4px', marginBottom: '2px' }}>{s}</span>)}</td>
                    <td>{teacher.classes.map((c, i) => <span key={i} className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', marginRight: '4px', marginBottom: '2px' }}>{c}</span>)}</td>
                    <td style={{ fontWeight: 800, color: '#facc15' }}>Rs {teacher.salary?.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => { setSelectedTeacher(teacher); setShowViewModal(true); }}><Eye size={16} /></button>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => handleEdit(teacher)}><Edit size={16} /></button>
                        <button className="btn btn-sm btn-danger" style={{ boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }} onClick={() => handleDelete(teacher._id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>{selectedTeacher ? t('edit_teacher') : t('add_teacher')}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label className="form-label">{t('full_name')} *</label><input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('email')} *</label><input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('phone')}</label><input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('qualification')}</label><input className="form-input" value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('designation')}</label><input className="form-input" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('salary')} (Rs)</label><input type="number" className="form-input" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} /></div>
                </div>
                <div className="form-group"><label className="form-label">{t('subjects')} *</label><input className="form-input" required value={formData.subjects} onChange={e => setFormData({ ...formData, subjects: e.target.value })} placeholder="e.g. Mathematics" /></div>
                <div className="form-group"><label className="form-label">{t('classes')} (comma separated)</label><input className="form-input" value={formData.classes} onChange={e => setFormData({ ...formData, classes: e.target.value })} placeholder="e.g. Class 5, Class 6" /></div>
                <div className="form-group">
                  <label className="form-label">{t('profile_image')}</label>
                  <label style={{ display: 'block', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                    {imageFile ? (
                      <div>
                        <img src={URL.createObjectURL(imageFile)} alt="preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3b82f6', marginBottom: '12px' }} />
                        <p style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 600 }}>{imageFile.name}</p>
                      </div>
                    ) : (
                      <>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                          <Upload size={24} style={{ color: '#94a3b8' }} />
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>{t('upload_image')}</p>
                      </>
                    )}
                  </label>
                </div>
                <div className={styles.modalFooter}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '12px 24px' }} onClick={() => setShowModal(false)}>{t('cancel')}</button>
                  <button type="submit" className={styles.vibrantBtn}>{selectedTeacher ? t('save') : t('add_new')}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedTeacher && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h3>{t('teacher_profile')}</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div className="profile-img-container" style={{ width: 120, height: 120, margin: '0 auto 16px', border: '4px solid #3b82f6' }}>
                    <img src={selectedTeacher.profileImage?.url && !selectedTeacher.profileImage?.isDefault ? selectedTeacher.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="profile-img-overlay" style={{ gap: '12px' }}>
                      <label style={{ cursor: 'pointer' }} title="Upload New">
                        <Upload size={20} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            const updated = { ...selectedTeacher, profileImage: { url, isDefault: false } };
                            setTeachers(prev => prev.map(t => t._id === selectedTeacher._id ? updated : t));
                            setSelectedTeacher(updated);
                          }
                        }} />
                      </label>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete Image" onClick={() => {
                        if (confirm('Delete image?')) {
                          const updated = { ...selectedTeacher, profileImage: { url: '', isDefault: true } };
                          setTeachers(prev => prev.map(t => t._id === selectedTeacher._id ? updated : t));
                          setSelectedTeacher(updated);
                        }
                      }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>{selectedTeacher.name}</h2>
                  <p style={{ color: '#facc15', fontWeight: 700 }}>{selectedTeacher.designation}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[[t('email'), selectedTeacher.email], [t('phone'), selectedTeacher.phone], [t('qualification'), selectedTeacher.qualification], [t('salary'), `Rs ${selectedTeacher.salary?.toLocaleString()}`], [t('join_date'), selectedTeacher.joinDate]].map(([l, v], i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>{l}</p>
                      <p style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{v}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('subjects')}:</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedTeacher.subjects.map((s, i) => <span key={i} className="badge" style={{ background: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa', padding: '6px 12px' }}>{s}</span>)}
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.vibrantBtn} onClick={() => setShowViewModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
