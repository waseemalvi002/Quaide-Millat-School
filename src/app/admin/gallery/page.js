'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Image, Plus, Trash2, X, Upload, Eye } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO_GALLERY = [
  { _id: '1', title: 'Annual Sports Day 2024', category: 'Events', description: 'Students participating in annual sports day.', images: [{ id: 'img1', url: '', isDefault: true }, { id: 'img2', url: '', isDefault: true }], isPublic: true },
  { _id: '2', title: 'Science Exhibition', category: 'Academic', description: 'Students showcasing science projects.', images: [{ id: 'img3', url: '', isDefault: true }], isPublic: true },
  { _id: '3', title: 'Independence Day Ceremony', category: 'Events', description: 'Pakistan Independence Day celebration.', images: [{ id: 'img4', url: '', isDefault: true }, { id: 'img5', url: '', isDefault: true }, { id: 'img6', url: '', isDefault: true }], isPublic: true },
  { _id: '4', title: 'Classroom Activities', category: 'Academic', description: 'Daily classroom activities and learning.', images: [{ id: 'img7', url: '', isDefault: true }], isPublic: true },
  { _id: '5', title: 'School Building', category: 'Campus', description: 'School campus and facilities.', images: [{ id: 'img8', url: '', isDefault: true }, { id: 'img9', url: '', isDefault: true }], isPublic: true },
  { _id: '6', title: 'Teacher Training Workshop', category: 'Staff', description: 'Professional development workshop.', images: [{ id: 'img10', url: '', isDefault: true }], isPublic: false },
];

export default function AdminGallery() {
  const [gallery, setGallery] = useState(DEMO_GALLERY);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [form, setForm] = useState({ title: '', category: 'Events', description: '', isPublic: true });

  const filtered = gallery.filter(g => !filterCategory || g.category === filterCategory);
  const categories = [...new Set(gallery.map(g => g.category))];
  const catColors = { Events: '#3b82f6', Academic: '#10b981', Campus: '#f59e0b', Staff: '#8b5cf6' };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Gallery Management</h1><p>Manage school photo gallery</p></div>
          <button className="btn btn-primary" onClick={() => { setSelected(null); setForm({ title: '', category: 'Events', description: '', isPublic: true }); setShowModal(true); }}><Plus size={18} /> Add Album</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><Image size={24} /></div><div className={styles.statInfo}><h3>{gallery.length}</h3><p>Albums</p></div></div>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><Image size={24} /></div><div className={styles.statInfo}><h3>{gallery.reduce((s, g) => s + g.images.length, 0)}</h3><p>Total Images</p></div></div>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><Eye size={24} /></div><div className={styles.statInfo}><h3>{gallery.filter(g => g.isPublic).length}</h3><p>Public Albums</p></div></div>
        </div>

        <div style={{ display: 'flex', gap: '8px', margin: '24px 0', flexWrap: 'wrap' }}>
          <button className={`btn btn-sm ${!filterCategory ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory('')}>All</button>
          {categories.map(cat => (
            <button key={cat} className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filtered.map(album => (
            <div key={album._id} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ height: 180, background: `linear-gradient(135deg, ${catColors[album.category] || '#64748b'}22, ${catColors[album.category] || '#64748b'}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Image size={48} color={catColors[album.category] || '#64748b'} style={{ opacity: 0.5 }} />
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '6px' }}>
                  <span className="badge" style={{ background: catColors[album.category], color: '#fff' }}>{album.category}</span>
                  {!album.isPublic && <span className="badge badge-warning">Private</span>}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{album.images.length} images</span>
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{album.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>{album.description}</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-sm btn-secondary"><Upload size={14} /> Add Images</button>
                  <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Delete album?')) setGallery(prev => prev.filter(g => g._id !== album._id)); }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}><h3>New Album</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button></div>
              <div className="card-body">
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="Events">Events</option><option value="Academic">Academic</option><option value="Campus">Campus</option><option value="Staff">Staff</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                <div className="form-group">
                  <label className="form-label">Upload Images</label>
                  <div style={{ border: '2px dashed #e2e8f0', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
                    <Upload size={32} style={{ color: '#94a3b8', marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Drag & drop or click to upload</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { setGallery(prev => [...prev, { ...form, _id: Date.now().toString(), images: [{ id: 'new', url: '', isDefault: true }] }]); setShowModal(false); }}>Create Album</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
