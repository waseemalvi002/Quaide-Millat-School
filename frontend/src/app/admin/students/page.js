'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { studentAPI } from '@/lib/api';
import { useThemeLang } from '@/context/ThemeLangContext';
import {
  Users, Search, Plus, Edit, Trash2, Eye, Download,
  Filter, ChevronLeft, ChevronRight, X, Upload, Info
} from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_STUDENTS = [
  { _id: '1', name: 'Ali Khan', fatherName: 'Imran Khan', rollNumber: 'QM-01-001', class: { name: 'Class 1' }, section: 'A', age: 7, phone: '0300-1234567', status: 'active', profileImage: { url: 'https://images.unsplash.com/photo-1503945438517-f65904a52ce6?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '2', name: 'Hassan Ahmed', fatherName: 'Tariq Ahmed', rollNumber: 'QM-01-002', class: { name: 'Class 1' }, section: 'A', age: 7, phone: '0301-2345678', status: 'active', profileImage: { url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '3', name: 'Muhammad Usman', fatherName: 'Abdul Rashid', rollNumber: 'QM-02-001', class: { name: 'Class 2' }, section: 'A', age: 8, phone: '0302-3456789', status: 'active', profileImage: { url: 'https://images.unsplash.com/photo-1540346030739-1d44ea3e77c2?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '4', name: 'Bilal Hussain', fatherName: 'Sajjad Hussain', rollNumber: 'QM-02-002', class: { name: 'Class 2' }, section: 'B', age: 8, phone: '0303-4567890', status: 'active', profileImage: { url: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '5', name: 'Ahmed Raza', fatherName: 'Muhammad Raza', rollNumber: 'QM-03-001', class: { name: 'Class 3' }, section: 'A', age: 9, phone: '0304-5678901', status: 'active', profileImage: { url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop', isDefault: false } },
];

export default function AdminStudents() {
  const [students, setStudents] = useState(DEMO_STUDENTS);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const { t } = useThemeLang();
  const [formData, setFormData] = useState({
    name: '', fatherName: '', rollNumber: '', class: '', section: 'A',
    age: '', phone: '', email: '', address: '', status: 'active'
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await studentAPI.getAll();
      if (res.data?.data?.length) setStudents(res.data.data);
    } catch { /* use demo data */ }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.fatherName.toLowerCase().includes(search.toLowerCase());
    const matchClass = !filterClass || s.class?.name === filterClass;
    return matchSearch && matchClass;
  });

  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudent) {
      setStudents(prev => prev.map(s => s._id === selectedStudent._id ? { ...s, ...formData } : s));
    } else {
      const newStudent = { ...formData, _id: Date.now().toString(), class: { name: formData.class }, profileImage: { url: imageFile ? URL.createObjectURL(imageFile) : '', isDefault: true } };
      setStudents(prev => [...prev, newStudent]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name, fatherName: student.fatherName, rollNumber: student.rollNumber,
      class: student.class?.name || '', section: student.section, age: student.age,
      phone: student.phone, email: student.email || '', address: student.address || '', status: student.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s._id !== id));
    }
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setImageFile(null);
    setFormData({ name: '', fatherName: '', rollNumber: '', class: '', section: 'A', age: '', phone: '', email: '', address: '', status: 'active' });
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)' }}>{t('student_management')}</h1>
            <p>{t('manage_students')}</p>
          </div>
          <button className={styles.vibrantBtn} onClick={() => { resetForm(); setShowModal(true); }}>
            <Plus size={20} /> {t('add_student')}
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

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text" placeholder={t('search_student')}
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-input" style={{ paddingLeft: '48px' }}
            />
          </div>
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="form-input" style={{ width: '180px' }}>
            <option value="">{t('all_classes')}</option>
            {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
          </select>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{students.length}</h3><p>{t('total_students')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{students.filter(s => s.status === 'active').length}</h3><p>{t('active')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Users size={24} /></div>
            <div className={styles.statInfo}><h3>{students.filter(s => s.status === 'inactive').length}</h3><p>{t('inactive')}</p></div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ marginTop: '24px', overflow: 'hidden' }}>
          <div className="table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: '1100px' }}>
              <thead>
                <tr>
                  <th style={{ color: '#fff' }}>{t('students')}</th>
                  <th style={{ color: '#fff' }}>{t('roll_no')}</th>
                  <th style={{ color: '#fff' }}>{t('father_name')}</th>
                  <th style={{ color: '#fff' }}>{t('class')}</th>
                  <th style={{ color: '#fff' }}>{t('section')}</th>
                  <th style={{ color: '#fff' }}>{t('age')}</th>
                  <th style={{ color: '#fff' }}>{t('phone')}</th>
                  <th style={{ color: '#fff' }}>{t('status')}</th>
                  <th style={{ color: '#fff' }}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="profile-img-container" onClick={() => handleEdit(student)}>
                          <img src={student.profileImage?.url && !student.profileImage?.isDefault ? student.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                          <div className="profile-img-overlay"><Edit size={16} /></div>
                        </div>
                        <span style={{ fontWeight: 700, color: '#fff' }}>{student.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-primary" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{student.rollNumber}</span></td>
                    <td style={{ color: '#e2e8f0' }}>{student.fatherName}</td>
                    <td style={{ color: '#e2e8f0' }}>{student.class?.name}</td>
                    <td style={{ color: '#e2e8f0' }}>{student.section}</td>
                    <td style={{ color: '#e2e8f0' }}>{student.age}</td>
                    <td style={{ color: '#e2e8f0' }}>{student.phone}</td>
                    <td>
                      <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-danger'}`} style={student.status === 'active' ? { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' } : { background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                        {t(student.status)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => { setSelectedStudent(student); setShowViewModal(true); }}><Eye size={16} /></button>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => handleEdit(student)}><Edit size={16} /></button>
                        <button className="btn btn-sm btn-danger" style={{ boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }} onClick={() => handleDelete(student._id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Showing {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-sm btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={18} /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={`btn btn-sm ${currentPage === i + 1 ? 'vibrantBtn' : 'btn-secondary'}`} style={currentPage === i + 1 ? { padding: '6px 12px !important' } : {}} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button className="btn btn-sm btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>{selectedStudent ? t('edit_student') : t('add_student')}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label className="form-label">{t('full_name')} *</label><input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('father_name')} *</label><input className="form-input" required value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('roll_no')} *</label><input className="form-input" required value={formData.rollNumber} onChange={e => setFormData({ ...formData, rollNumber: e.target.value })} /></div>
                  <div className="form-group">
                    <label className="form-label">{t('class')} *</label>
                    <select className="form-input" required value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}>
                      <option value="">{t('class')}</option>
                      {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('section')}</label>
                    <select className="form-input" value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })}>
                      <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">{t('age')}</label><input type="number" className="form-input" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('phone')}</label><input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('email')}</label><input type="email" className="form-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                </div>
                <div className="form-group"><label className="form-label">{t('address')}</label><textarea className="form-input" rows={2} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} /></div>
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
                  <button type="submit" className={styles.vibrantBtn}>{selectedStudent ? t('save') : t('add_new')}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedStudent && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h3>{t('student_details')}</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div className="profile-img-container" style={{ width: 120, height: 120, margin: '0 auto 16px', border: '4px solid #3b82f6' }}>
                    <img src={selectedStudent.profileImage?.url && !selectedStudent.profileImage?.isDefault ? selectedStudent.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="profile-img-overlay" style={{ gap: '12px' }}>
                      <label style={{ cursor: 'pointer' }} title="Upload New">
                        <Upload size={20} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            const updated = { ...selectedStudent, profileImage: { url, isDefault: false } };
                            setStudents(prev => prev.map(s => s._id === selectedStudent._id ? updated : s));
                            setSelectedStudent(updated);
                          }
                        }} />
                      </label>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete Image" onClick={() => {
                        if (confirm('Delete image?')) {
                          const updated = { ...selectedStudent, profileImage: { url: '', isDefault: true } };
                          setStudents(prev => prev.map(s => s._id === selectedStudent._id ? updated : s));
                          setSelectedStudent(updated);
                        }
                      }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>{selectedStudent.name}</h2>
                  <span className="badge badge-primary" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', marginTop: '8px' }}>{selectedStudent.rollNumber}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    [t('father_name'), selectedStudent.fatherName],
                    [t('class'), selectedStudent.class?.name],
                    [t('section'), selectedStudent.section],
                    [t('age'), selectedStudent.age],
                    [t('phone'), selectedStudent.phone],
                    [t('status'), t(selectedStudent.status)],
                  ].map(([label, val], i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</p>
                      <p style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{val}</p>
                    </div>
                  ))}
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
