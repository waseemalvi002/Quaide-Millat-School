'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Image, Plus, Trash2, X, Upload, Eye, Loader2, Edit3 } from 'lucide-react';
import styles from '../admin.module.css';
import { galleryAPI, uploadAPI } from '@/lib/api';

const DEMO_ALBUMS = [
  { _id: '1', title: 'Annual Sports Day 2024', category: 'sports', description: 'Memories from our yearly sports competition.', isPublic: true, images: [{ url: 'https://images.unsplash.com/photo-1511871893393-82e9c18b70e3?w=800', publicId: '1', caption: 'Opening Ceremony' }] },
  { _id: '2', title: 'Science Fair', category: 'academic', description: 'Innovative projects by our brilliant students.', isPublic: true, images: [{ url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800', publicId: '2', caption: 'Chemistry Lab' }] },
  { _id: '3', title: 'Cultural Festival', category: 'event', description: 'Celebrating diversity through art and music.', isPublic: true, images: [{ url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', publicId: '3', caption: 'Stage Performance' }] },
];

export default function AdminGallery() {
  const [gallery, setGallery] = useState(DEMO_ALBUMS);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [form, setForm] = useState({ title: '', category: 'event', description: '', isPublic: true });
  const [uploading, setUploading] = useState(null);
  const fileInputRef = useRef(null);

  // Manual Stats Overrides (Editable as requested)
  const [stats, setStats] = useState({
    albums: 2,
    images: 3,
    public: 2
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      if (response.data?.data?.length) setGallery(response.data.data);
    } catch (err) {
      /* Use Demo Data */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleCreateAlbum = async () => {
    if (!form.title) return alert('Title is required');
    if (selected) {
      setGallery(prev => prev.map(g => g._id === selected._id ? { ...g, ...form } : g));
      alert('Album updated successfully (Demo)');
    } else {
      const newAlbum = { ...form, _id: Date.now().toString(), images: [] };
      setGallery(prev => [...prev, newAlbum]);
      alert('Album created successfully (Demo)');
    }
    setShowModal(false);
    setSelected(null);
    setForm({ title: '', category: 'event', description: '', isPublic: true });
  };

  const handleDeleteAlbum = async (id) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    setGallery(prev => prev.filter(g => g._id !== id));
  };

  const handleUploadImages = async (albumId, files) => {
    if (!files || files.length === 0) return;
    setUploading(albumId);
    // Simulate upload delay
    setTimeout(() => {
      const newImages = Array.from(files).map((f, i) => ({
        url: URL.createObjectURL(f),
        publicId: `new-${Date.now()}-${i}`,
        caption: ''
      }));
      setGallery(prev => prev.map(album => 
        album._id === albumId ? { ...album, images: [...(album.images || []), ...newImages] } : album
      ));
      setUploading(null);
      alert('Images uploaded successfully (Demo)');
    }, 1500);
  };

  const [managingAlbum, setManagingAlbum] = useState(null);

  const handleDeleteImage = async (albumId, imagePublicId) => {
    if (!confirm('Delete this image?')) return;
    setGallery(prev => prev.map(album => {
      if (album._id === albumId) {
        const updatedImages = album.images.filter(img => img.publicId !== imagePublicId);
        if (managingAlbum && managingAlbum._id === albumId) {
          setManagingAlbum({ ...album, images: updatedImages });
        }
        return { ...album, images: updatedImages };
      }
      return album;
    }));
  };

  const handleUpdateImageCaption = async (albumId, imagePublicId, caption) => {
    setGallery(prev => prev.map(album => {
      if (album._id === albumId) {
        const updatedImages = album.images.map(img => img.publicId === imagePublicId ? { ...img, caption } : img);
        if (managingAlbum && managingAlbum._id === albumId) {
          setManagingAlbum({ ...album, images: updatedImages });
        }
        return { ...album, images: updatedImages };
      }
      return album;
    }));
  };

  const filtered = gallery.filter(g => !filterCategory || g.category === filterCategory);
  const categories = [...new Set(gallery.map(g => g.category))];
  const catColors = { 
    event: '#3b82f6', 
    academic: '#10b981', 
    sports: '#ef4444', 
    general: '#f59e0b', 
    infrastructure: '#8b5cf6' 
  };

  if (loading && gallery.length === 0) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Loader2 className="animate-spin" size={48} color="#001a35" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Gallery Management</h1><p>Manage school photo gallery</p></div>
          <button className="btn btn-primary" onClick={() => { setSelected(null); setForm({ title: '', category: 'event', description: '', isPublic: true }); setShowModal(true); }}><Plus size={18} /> Add Album</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><Image size={24} /></div>
            <div className={styles.statInfo}>
              <h3 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => setStats({...stats, albums: e.target.innerText})}
                style={{ outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
              >
                {stats.albums}
              </h3>
              <p>Albums</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}><Image size={24} /></div>
            <div className={styles.statInfo}>
              <h3 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => setStats({...stats, images: e.target.innerText})}
                style={{ outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
              >
                {stats.images}
              </h3>
              <p>Total Images</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><Eye size={24} /></div>
            <div className={styles.statInfo}>
              <h3 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => setStats({...stats, public: e.target.innerText})}
                style={{ outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
              >
                {stats.public}
              </h3>
              <p>Public Albums</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', margin: '24px 0', flexWrap: 'wrap' }}>
          <button className={`btn btn-sm ${!filterCategory ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory('')}>All</button>
          {categories.map(cat => (
            <button key={cat} className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterCategory(cat)} style={{ textTransform: 'capitalize' }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map(album => (
            <div key={album._id} className="card" style={{ overflow: 'hidden' }}>
              <div 
                onClick={() => document.getElementById(`cover-upload-${album._id}`).click()}
                style={{ 
                  height: 180, 
                  backgroundImage: album.images?.[0]?.url ? `url(${album.images[0].url})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: `${catColors[album.category] || '#64748b'}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  cursor: 'pointer'
                }}
                className="album-cover-wrapper"
              >
                {!album.images?.[0]?.url && <Image size={48} color={catColors[album.category] || '#64748b'} style={{ opacity: 0.5 }} />}
                
                {/* Upload Overlay */}
                <div className="cover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }}>
                  <Upload size={32} color="#fff" />
                </div>

                <style jsx>{`
                  .album-cover-wrapper:hover .cover-overlay { opacity: 1 !important; }
                `}</style>

                <input 
                  type="file" 
                  id={`cover-upload-${album._id}`} 
                  hidden 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setGallery(prev => prev.map(g => g._id === album._id ? { ...g, images: [{ url, publicId: `cover-${Date.now()}`, caption: '' }, ...(g.images || []).slice(1)] } : g));
                    }
                  }} 
                />

                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: '6px' }}>
                  <span className="badge" style={{ background: catColors[album.category] || '#64748b', color: '#fff', textTransform: 'capitalize' }}>{album.category}</span>
                  {!album.isPublic && <span className="badge badge-warning">Private</span>}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{album.images?.length || 0} images</span>
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <h3 
                  contentEditable 
                  suppressContentEditableWarning
                  onBlur={(e) => setGallery(prev => prev.map(g => g._id === album._id ? { ...g, title: e.target.innerText } : g))}
                  style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', outline: 'none', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
                >
                  {album.title}
                </h3>
                <p 
                  contentEditable 
                  suppressContentEditableWarning
                  onBlur={(e) => setGallery(prev => prev.map(g => g._id === album._id ? { ...g, description: e.target.innerText } : g))}
                  style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', minHeight: '2.4em', outline: 'none' }}
                >
                  {album.description || 'No description provided.'}
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => setManagingAlbum(album)} title="Manage Images"><Eye size={14} /></button>
                  <button className="btn btn-sm btn-secondary" onClick={() => { setSelected(album); setForm({ title: album.title, category: album.category, description: album.description, isPublic: album.isPublic }); setShowModal(true); }} title="Edit Album Details"><Edit3 size={14} /></button>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      style={{ display: 'none' }} 
                      id={`upload-${album._id}`}
                      onChange={(e) => handleUploadImages(album._id, e.target.files)}
                    />
                    <button 
                      className="btn btn-sm btn-secondary" 
                      onClick={() => document.getElementById(`upload-${album._id}`).click()}
                      disabled={uploading === album._id}
                      title="Upload Images"
                    >
                      {uploading === album._id ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />} 
                    </button>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAlbum(album._id)} title="Delete Album"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
              <Image size={48} style={{ color: '#94a3b8', marginBottom: '12px' }} />
              <p style={{ color: '#64748b' }}>No albums found in this category.</p>
            </div>
          )}
        </div>

        {/* Create/Edit Album Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}><h3>New Album</h3><button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button></div>
              <div className="card-body">
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Annual Sports Day 2024" /></div>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="event">Event</option>
                    <option value="academic">Academic</option>
                    <option value="sports">Sports</option>
                    <option value="general">General</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tell us more about this album..." /></div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="isPublic" checked={form.isPublic} onChange={e => setForm({ ...form, isPublic: e.target.checked })} />
                  <label htmlFor="isPublic" className="form-label" style={{ marginBottom: 0 }}>Public Album (visible to everyone)</label>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleCreateAlbum}>Create Album</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Images Modal */}
        {managingAlbum && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
            <div className="card" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3>Manage Images: {managingAlbum.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{managingAlbum.images?.length || 0} Photos in this album</p>
                </div>
                <button onClick={() => setManagingAlbum(null)} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
              </div>
              <div className="card-body" style={{ overflowY: 'auto', flex: 1, padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {managingAlbum.images?.map((img, i) => (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <div style={{ height: '140px', backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                        <button 
                          onClick={() => handleDeleteImage(managingAlbum._id, img.publicId)}
                          style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div style={{ padding: '10px' }}>
                        <input 
                          type="text" 
                          defaultValue={img.caption} 
                          onBlur={(e) => handleUpdateImageCaption(managingAlbum._id, img.publicId, e.target.value)}
                          placeholder="Add caption..."
                          style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px', fontSize: '0.8rem', outline: 'none' }}
                        />
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={() => document.getElementById(`upload-manage-${managingAlbum._id}`).click()}
                    style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '180px', cursor: 'pointer', color: '#64748b' }}
                  >
                    <Plus size={32} />
                    <span>Add More</span>
                    <input type="file" multiple id={`upload-manage-${managingAlbum._id}`} style={{ display: 'none' }} onChange={(e) => handleUploadImages(managingAlbum._id, e.target.files)} />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: 'right' }}>
                <button className="btn btn-primary" onClick={() => setManagingAlbum(null)}>Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
