'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { teacherAPI } from '@/lib/api';
import { useThemeLang } from '@/context/ThemeLangContext';
import { GraduationCap, Search, Plus, Edit, Trash2, Eye, X, Upload, BookOpen, Award, Info } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_TEACHERS = [
  // Class 1–4 Primary Teachers
  { _id: '1',  name: 'Irfan Jameel',     email: 'irfan@qmschool.edu.pk',    phone: '0310-9998887', qualification: 'B.Ed',             designation: 'Primary Teacher',    subjects: ['General'],            classes: ['Class 1'],  salary: 30000, status: 'active', joinDate: '2017-05-12', profileImage: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '2',  name: 'Bilal Warraich',   email: 'bilal@qmschool.edu.pk',    phone: '0313-1112223', qualification: 'B.Ed',             designation: 'Primary Teacher',    subjects: ['General'],            classes: ['Class 2'],  salary: 32000, status: 'active', joinDate: '2022-01-10', profileImage: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '3',  name: 'Kashif Mehmood',  email: 'kashif@qmschool.edu.pk',   phone: '0314-4445556', qualification: 'B.Ed',             designation: 'Primary Teacher',    subjects: ['General'],            classes: ['Class 3'],  salary: 33000, status: 'active', joinDate: '2020-08-05', profileImage: { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '4',  name: 'Amjad Sabri',     email: 'amjad@qmschool.edu.pk',    phone: '0315-7778889', qualification: 'B.Ed',             designation: 'Primary Teacher',    subjects: ['General'],            classes: ['Class 4'],  salary: 34000, status: 'active', joinDate: '2021-05-20', profileImage: { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  // Class 5–12 — One Teacher, One Subject Each
  { _id: '5',  name: 'Zahid Hussain',   email: 'zahid@qmschool.edu.pk',    phone: '0321-4443332', qualification: 'B.Ed',             designation: 'Teacher',            subjects: ['Maths'],              classes: ['Class 5'],  salary: 34000, status: 'active', joinDate: '2022-03-01', profileImage: { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '6',  name: 'Mustafa Akram',   email: 'mustafa@qmschool.edu.pk',  phone: '0312-5554443', qualification: 'M.Sc Maths',      designation: 'Teacher',            subjects: ['Maths'],              classes: ['Class 6'],  salary: 35000, status: 'active', joinDate: '2019-11-20', profileImage: { url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '7',  name: 'Faisal Qureshi',  email: 'faisal@qmschool.edu.pk',   phone: '0323-8889990', qualification: 'B.Sc Physics',    designation: 'Teacher',            subjects: ['Science'],            classes: ['Class 7'],  salary: 35000, status: 'active', joinDate: '2022-09-15', profileImage: { url: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '8',  name: 'Rashid Minhas',   email: 'rashid@qmschool.edu.pk',   phone: '0311-7776665', qualification: 'M.A Pak Studies', designation: 'Teacher',            subjects: ['Pak Studies'],        classes: ['Class 8'],  salary: 38000, status: 'active', joinDate: '2021-09-01', profileImage: { url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '9',  name: 'Sajid Ali',       email: 'sajid@qmschool.edu.pk',    phone: '0302-3333333', qualification: 'M.A English',    designation: 'Teacher',            subjects: ['English'],            classes: ['Class 9'],  salary: 40000, status: 'active', joinDate: '2021-03-10', profileImage: { url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '10', name: 'Ahmed Khan',      email: 'ahmed@qmschool.edu.pk',    phone: '0300-1111111', qualification: 'M.A Urdu',        designation: 'Senior Teacher',     subjects: ['Urdu'],               classes: ['Class 10'], salary: 42000, status: 'active', joinDate: '2020-01-15', profileImage: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '11', name: 'Tahir Shah',      email: 'tahir@qmschool.edu.pk',    phone: '0318-5556667', qualification: 'M.Sc Chemistry',  designation: 'Senior Teacher',     subjects: ['Chemistry'],          classes: ['Class 11'], salary: 42000, status: 'active', joinDate: '2020-10-10', profileImage: { url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  { _id: '12', name: 'Muhammad Farooq', email: 'farooq@qmschool.edu.pk',   phone: '0301-2222222', qualification: 'M.Sc Mathematics',designation: 'Head Teacher',       subjects: ['Maths'],              classes: ['Class 12'], salary: 55000, status: 'active', joinDate: '2018-06-01', profileImage: { url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face', isDefault: false } },
  // Sports — All Classes
  { _id: '13', name: 'Babar Azam',      email: 'babar@qmschool.edu.pk',    phone: '0325-3334445', qualification: 'DPE',             designation: 'Sports Coordinator', subjects: ['Physical Education'], classes: ['All'],      salary: 33000, status: 'active', joinDate: '2023-04-10', profileImage: { url: 'https://images.unsplash.com/photo-1584999734482-0361aecad844?w=200&h=200&fit=crop&crop=face', isDefault: false } },
];

const getTeacherAvatar = (teacher) => {
  if (!teacher) return '/teacher_1.png';
  const imageUrl = teacher.profileImage?.url;
  // Always show the stored URL (all male teacher_1.png by default)
  if (imageUrl) return imageUrl;
  return '/teacher_1.png';
};



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
          <button 
            className={styles.vibrantBtn} 
            onClick={() => { resetForm(); setShowModal(true); }}
            style={{ padding: '12px 24px', fontSize: '1rem', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)' }}
          >
            <Plus size={22} /> {t('add_teacher')}
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

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder={t('search_teacher')} value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '48px' }} />
          </div>
          <select 
            className="form-input" 
            style={{ width: '200px' }}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val ? `Class ${val}` : '');
            }}
          >
            <option value="">{t('all_classes') || 'All Classes'}</option>
            {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>Class {i + 1}</option>)}
          </select>
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

        <div className="card" style={{ marginTop: '20px', overflow: 'hidden' }}>
          <div className="table-wrapper" style={{ overflowX: 'auto', maxHeight: '550px', overflowY: 'auto' }}>
            <table className="table" style={{ minWidth: '100%', width: '100%', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                   <th style={{ color: '#fff', padding: '12px 16px', width: '20%' }}>{t('teachers')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '15%' }}>{t('qualification')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '15%' }}>{t('designation')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '15%' }}>{t('subjects')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '10%' }}>{t('classes')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '10%' }}>{t('salary')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '10%' }}>{t('status')}</th>
                  <th style={{ color: '#fff', padding: '12px 16px', width: '10%' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher, index) => {
                  const displayAvatar = getTeacherAvatar(teacher);
                  return (
                    <tr key={teacher._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            style={{ position: 'relative', width: '45px', height: '45px', cursor: 'pointer', flexShrink: 0 }} 
                            onClick={() => document.getElementById(`t-img-input-${teacher._id}`).click()}
                            title="Click to change image"
                          >
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                              <img 
                                src={displayAvatar} 
                                alt="" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', borderRadius: '50%' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                <Upload size={14} color="#fff" />
                              </div>
                            </div>
                          </div>
                          <input 
                            id={`t-img-input-${teacher._id}`}
                            type="file" 
                            hidden 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const url = URL.createObjectURL(e.target.files[0]);
                                setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, profileImage: { ...t.profileImage, url } } : t));
                              }
                            }}
                          />
                        </div>
                        <div>
                          <span 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, name: e.target.innerText } : t))}
                            style={{ fontWeight: 700, color: '#fff', outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
                          >
                            {teacher.name}
                          </span>
                          <br />
                          <span 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, email: e.target.innerText } : t))}
                            style={{ fontSize: '0.75rem', color: '#94a3b8', outline: 'none' }}
                          >
                            {teacher.email}
                          </span>
                        </div>
                      </td>
                    <td style={{ color: '#e2e8f0', padding: '10px 16px' }}>
                      <span 
                        contentEditable 
                        suppressContentEditableWarning
                        onBlur={(e) => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, qualification: e.target.innerText } : t))}
                        style={{ outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
                      >
                        {teacher.qualification}
                      </span>
                    </td>
                    <td style={{ color: '#e2e8f0', padding: '10px 16px' }}>
                      <span 
                        contentEditable 
                        suppressContentEditableWarning
                        onBlur={(e) => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, designation: e.target.innerText } : t))}
                        style={{ outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
                      >
                        {teacher.designation}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {teacher.subjects.map((s, i) => <span key={i} className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)' }}>{s}</span>)}
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span className="badge" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)', fontWeight: 700, padding: '4px 12px', borderRadius: '8px' }}>
                        {teacher.classes[0]}
                      </span>
                    </td>
                    <td style={{ fontWeight: 800, color: '#facc15', padding: '10px 16px' }}>
                      Rs <span 
                        contentEditable 
                        suppressContentEditableWarning
                        onBlur={(e) => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, salary: parseInt(e.target.innerText.replace(/,/g, '')) || 0 } : t))}
                        style={{ outline: 'none' }}
                      >
                        {teacher.salary?.toLocaleString()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span 
                        onClick={() => setTeachers(prev => prev.map(t => t._id === teacher._id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t))}
                        className={`badge ${teacher.status === 'active' ? 'badge-success' : 'badge-danger'}`} 
                        style={{ cursor: 'pointer', transition: '0.2s', padding: '6px 12px', minWidth: '80px', textAlign: 'center' }}
                        title="Click to toggle status"
                      >
                        {(teacher.status || 'active').toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-sm btn-secondary" 
                          style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }} 
                          onClick={() => handleEdit(teacher)}
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-danger" 
                          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }} 
                          onClick={() => handleDelete(teacher._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                    <img 
                      src={getTeacherAvatar(selectedTeacher, selectedTeacher._id ? parseInt(selectedTeacher._id) || 0 : 0)} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
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
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>{t('close')}</button>
                <button className={styles.vibrantBtn} onClick={() => { setShowViewModal(false); handleEdit(selectedTeacher); }}>
                  <Edit size={16} /> {t('update_profile')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
