'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserCheck, Search, Plus, Edit, Trash2, Eye, X, Upload, Info } from 'lucide-react';
import { useThemeLang } from '@/context/ThemeLangContext';
import styles from '../admin.module.css';

const DEMO_STAFF = [
  { _id: '1', name: 'Rashid Peon', cnic: '35201-1234567-1', role: 'Peon', phone: '0300-1112233', salary: 20000, status: 'active', joinDate: '2019-01-15', profileImage: { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '2', name: 'Akbar Ali', cnic: '35201-2345678-2', role: 'Guard', phone: '0301-2223344', salary: 18000, status: 'active', joinDate: '2020-06-01', profileImage: { url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '3', name: 'Nasir Ahmed', cnic: '35201-3456789-3', role: 'Clerk', phone: '0302-3334455', salary: 25000, status: 'active', joinDate: '2018-03-10', profileImage: { url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop', isDefault: false } },
  { _id: '4', name: 'Shafiq Hussain', cnic: '35201-4567890-4', role: 'Lab Assistant', phone: '0303-4445566', salary: 22000, status: 'active', joinDate: '2021-09-01', profileImage: { url: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=400&h=400&fit=crop', isDefault: false } },
];

export default function AdminStaff() {
  const [staff, setStaff] = useState(DEMO_STAFF);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { t } = useThemeLang();
  const [formData, setFormData] = useState({ name: '', cnic: '', role: '', phone: '', salary: '', status: 'active' });

  const filtered = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setStaff(prev => prev.map(s => s._id === selected._id ? { ...s, ...formData } : s));
    } else {
      setStaff(prev => [...prev, { ...formData, _id: Date.now().toString(), joinDate: new Date().toISOString().split('T')[0], profileImage: { url: imageFile ? URL.createObjectURL(imageFile) : '', isDefault: true } }]);
    }
    setShowModal(false); setSelected(null); setImageFile(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (item) => {
    setSelected(item);
    setFormData({ name: item.name, cnic: item.cnic, role: item.role, phone: item.phone, salary: item.salary, status: item.status });
    setShowModal(true);
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)' }}>{t('staff_management')}</h1>
            <p>{t('manage_staff')}</p>
          </div>
          <button className={styles.vibrantBtn} onClick={() => { setSelected(null); setImageFile(null); setFormData({ name: '', cnic: '', role: '', phone: '', salary: '', status: 'active' }); setShowModal(true); }}>
            <Plus size={20} /> {t('add_staff')}
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
            <input type="text" placeholder={t('search_staff')} value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '48px' }} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><UserCheck size={24} /></div>
            <div className={styles.statInfo}><h3>{staff.length}</h3><p>{t('total_staff')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><UserCheck size={24} /></div>
            <div className={styles.statInfo}><h3>{staff.filter(s => s.status === 'active').length}</h3><p>{t('active')}</p></div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}><UserCheck size={24} /></div>
            <div className={styles.statInfo}><h3>Rs {staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}</h3><p>{t('total_salary')}</p></div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px', overflow: 'hidden' }}>
          <div className="table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: '1000px' }}>
              <thead><tr><th style={{ color: '#fff' }}>{t('staff')}</th><th style={{ color: '#fff' }}>{t('cnic')}</th><th style={{ color: '#fff' }}>{t('role')}</th><th style={{ color: '#fff' }}>{t('phone')}</th><th style={{ color: '#fff' }}>{t('salary')}</th><th style={{ color: '#fff' }}>{t('actions')}</th></tr></thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="profile-img-container" onClick={() => handleEdit(item)}>
                          <img src={item.profileImage?.url && !item.profileImage?.isDefault ? item.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="profile-img-overlay"><Edit size={16} /></div>
                        </div>
                        <div><span style={{ fontWeight: 700, color: '#fff' }}>{item.name}</span><br /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t('since')} {item.joinDate}</span></div>
                      </div>
                    </td>
                    <td style={{ color: '#e2e8f0' }}>{item.cnic}</td><td><span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{item.role}</span></td><td style={{ color: '#e2e8f0' }}>{item.phone}</td>
                    <td style={{ fontWeight: 800, color: '#facc15' }}>Rs {item.salary?.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => { setSelected(item); setShowViewModal(true); }}><Eye size={16} /></button>
                        <button className="btn btn-sm btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => handleEdit(item)}><Edit size={16} /></button>
                        <button className="btn btn-sm btn-danger" style={{ boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }} onClick={() => { if (confirm('Delete?')) setStaff(prev => prev.filter(s => s._id !== item._id)); }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '550px' }}>
              <div className={styles.modalHeader}>
                <h3>{selected ? t('edit_staff') : t('add_staff')}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group"><label className="form-label">{t('full_name')} *</label><input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('cnic')} *</label><input className="form-input" required value={formData.cnic} onChange={e => setFormData({ ...formData, cnic: e.target.value })} placeholder="35201-1234567-1" /></div>
                  <div className="form-group"><label className="form-label">{t('role')} *</label>
                    <select className="form-input" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                      <option value="">Select Role</option>
                      {['Peon', 'Guard', 'Clerk', 'Lab Assistant', 'Librarian', 'Driver', 'Sweeper', 'Electrician'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">{t('phone')}</label><input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('salary')} (Rs)</label><input type="number" className="form-input" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">{t('status')}</label>
                    <select className="form-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="active">Active</option><option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
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
                  <button type="submit" className={styles.vibrantBtn}>{selected ? t('save') : t('add_new')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showViewModal && selected && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h3>{t('staff_profile')}</h3>
                <button onClick={() => setShowViewModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div className="profile-img-container" style={{ width: 120, height: 120, margin: '0 auto 16px', border: '4px solid #3b82f6' }}>
                    <img src={selected.profileImage?.url && !selected.profileImage?.isDefault ? selected.profileImage.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="profile-img-overlay" style={{ gap: '12px' }}>
                      <label style={{ cursor: 'pointer' }} title="Upload New">
                        <Upload size={20} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            const updated = { ...selected, profileImage: { url, isDefault: false } };
                            setStaff(prev => prev.map(s => s._id === selected._id ? updated : s));
                            setSelected(updated);
                          }
                        }} />
                      </label>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete Image" onClick={() => {
                        if (confirm('Delete image?')) {
                          const updated = { ...selected, profileImage: { url: '', isDefault: true } };
                          setStaff(prev => prev.map(s => s._id === selected._id ? updated : s));
                          setSelected(updated);
                        }
                      }}><Trash2 size={20} /></button>
                    </div>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>{selected.name}</h2>
                  <p style={{ color: '#facc15', fontWeight: 700 }}>{selected.role}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[[t('cnic'), selected.cnic], [t('phone'), selected.phone], [t('salary'), `Rs ${selected.salary?.toLocaleString()}`], [t('join_date'), selected.joinDate]].map(([l, v], i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>{l}</p>
                      <p style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>{t('close')}</button>
                <button className={styles.vibrantBtn} onClick={() => { setShowViewModal(false); handleEdit(selected); }}>
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
