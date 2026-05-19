'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Upload, Edit3, Trash2, Camera, 
  BookOpen, Target, Heart, Award, ShieldCheck, 
  Plus, X, Save, Image as ImageIcon, Sparkles, CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  // Gallery State
  const [images, setImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', title: 'Main Building' },
    { id: 2, url: 'https://images.unsplash.com/photo-1564066341310-59d5dc334f47?w=800', title: 'Science Lab' },
    { id: 3, url: 'https://images.unsplash.com/photo-1523050853063-bd8012fec040?w=800', title: 'School Library' }
  ]);

  // Core Values State
  const [coreValues, setCoreValues] = useState([
    { 
      id: 1,
      title: "Academic Excellence", 
      desc: "We strive for the highest standards in education, encouraging our students to excel in every subject.",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"
    },
    { 
      id: 2,
      title: "Islamic Discipline", 
      desc: "Character building and religious values are at the heart of our teaching methodology.",
      img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400"
    },
    { 
      id: 3,
      title: "Future Leadership", 
      desc: "We prepare our boys to be responsible leaders of tomorrow, serving the nation with pride.",
      img: "https://images.unsplash.com/photo-1524178232363-1fb28f74b671?w=400"
    },
    { 
      id: 4,
      title: "Modern Skills", 
      desc: "Equipping students with 21st-century skills like coding, robotics, and critical thinking.",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400"
    }
  ]);

  // Editing State
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editingValueId, setEditingValueId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  
  // Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('gallery');
  const [targetValueId, setTargetValueId] = useState(null);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Close editing when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editingGalleryId || editingValueId) {
        const isClickOnEditUI = event.target.closest('.edit-box') || 
                               event.target.closest('button') || 
                               event.target.closest('input') || 
                               event.target.closest('textarea');
        if (!isClickOnEditUI) {
          setEditingGalleryId(null);
          setEditingValueId(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingGalleryId, editingValueId]);

  // Gallery Handlers (With Toggle Logic)
  const handleDeleteGallery = (id) => {
    if (confirm('Delete this image?')) setImages(images.filter(img => img.id !== id));
  };

  const toggleEditGallery = (img) => {
    if (editingGalleryId === img.id) {
      setEditingGalleryId(null); // Deselect if already selected
    } else {
      setEditingGalleryId(img.id);
      setEditTitle(img.title);
    }
  };

  const saveEditGallery = (id) => {
    setImages(images.map(img => img.id === id ? { ...img, title: editTitle } : img));
    setEditingGalleryId(null);
  };

  // Core Value Handlers (With Toggle Logic)
  const toggleEditValue = (v) => {
    if (editingValueId === v.id) {
      setEditingValueId(null); // Deselect if already selected
    } else {
      setEditingValueId(v.id);
      setEditTitle(v.title);
      setEditDesc(v.desc);
    }
  };

  const saveEditValue = (id) => {
    setCoreValues(coreValues.map(v => v.id === id ? { ...v, title: editTitle, desc: editDesc } : v));
    setEditingValueId(null);
  };

  const openValueUpload = (id) => {
    setUploadType('coreValue');
    setTargetValueId(id);
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!previewUrl) return;
    if (uploadType === 'gallery') {
      const newImg = { id: Date.now(), url: previewUrl, title: newImageTitle || 'New Image' };
      setImages([newImg, ...images]);
    } else {
      setCoreValues(coreValues.map(v => v.id === targetValueId ? { ...v, img: previewUrl } : v));
    }
    setShowUploadModal(false);
    setPreviewUrl(null);
    setNewImageTitle('');
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      
      {/* Header */}
      <header style={{ 
        background: '#001a35', color: 'white', padding: '20px 5%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/images/logo.png" alt="Logo" style={{ height: '40px' }} />
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>About Quaid-e-Millat</h1>
        </div>
        <div style={{ width: '100px' }}></div>
      </header>

      {/* Hero Banner - Balanced Height & Responsive Crop */}
      <section className="about-hero-banner">
      </section>

      <style jsx>{`
        .about-hero-banner {
          background-image: url("/images/home-bg.jpg");
          background-size: 100% auto;
          background-position: 0% 22%;
          background-repeat: no-repeat;
          height: 400px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 2;
          background-color: #001a35;
        }
        @media (max-width: 767px) {
          .about-hero-banner {
            height: 250px !important;
            background-size: 360% auto !important;
            background-position: 88% 14% !important;
          }
        }
      `}</style>

      <main style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* Mission & Vision - Spacing Balanced */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <div style={{ background: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ color: '#1e3a8a', marginBottom: '25px' }}><Target size={48} /></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', color: '#1e3a8a' }}>Our Mission</h3>
            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem' }}>
              To provide a nurturing environment where every student can achieve their full potential academically, socially, and spiritually. We aim to foster critical thinking and ethical values.
            </p>
          </div>
          <div style={{ background: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ color: '#facc15', marginBottom: '25px' }}><BookOpen size={48} /></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', color: '#1e3a8a' }}>Our Vision</h3>
            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem' }}>
              To be a leading educational institution that produces responsible citizens and future leaders who contribute positively to the society and uphold Islamic values.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 950, color: '#1e3a8a', margin: 0, fontFamily: "'Outfit', sans-serif" }}>Our Core Values</h3>
            <div style={{ width: '100px', height: '6px', background: 'linear-gradient(90deg, #facc15, #fbbf24)', margin: '20px auto', borderRadius: '10px' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {coreValues.map((v) => (
              <div key={v.id} style={{ background: 'white', borderRadius: '35px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <div style={{ height: '220px', backgroundImage: `url(${v.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <button onClick={() => openValueUpload(v.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', backdropFilter: 'blur(5px)' }}><Camera size={18} /></button>
                </div>
                <div className="edit-box" style={{ padding: '35px' }}>
                  {editingValueId === v.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '2px solid #3b82f6', fontSize: '1rem', outline: 'none' }} />
                      <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '2px solid #3b82f6', height: '100px', fontSize: '0.9rem', outline: 'none' }} />
                      <button onClick={() => saveEditValue(v.id)} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><Save size={18} /> Save Changes</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#1e3a8a' }}>{v.title}</h4>
                        <button onClick={() => toggleEditValue(v)} style={{ background: '#f1f5f9', border: 'none', color: '#1e3a8a', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><Edit3 size={18} /></button>
                      </div>
                      <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1rem', margin: 0, opacity: 0.8 }}>{v.desc}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section - TEXT VISIBILITY FIXED */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e3a8a', margin: 0 }}>School Memories</h3>
            <button onClick={() => { setUploadType('gallery'); setShowUploadModal(true); }} style={{ background: '#1e3a8a', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plus size={20} /> Add Memory
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {images.map((img) => (
              <div key={img.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                <div style={{ height: '250px', backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="edit-box" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                  {editingGalleryId === img.id ? (
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '2px solid #3b82f6', outline: 'none' }} />
                      <button onClick={() => saveEditGallery(img.id)} style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Save size={18} /></button>
                    </div>
                  ) : (
                    <>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a' }}>{img.title}</h4>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => toggleEditGallery(img)} style={{ background: '#fff', color: '#1e3a8a', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Edit3 size={18} /></button>
                        <button onClick={() => handleDeleteGallery(img.id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '35px', width: '90%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#1e3a8a' }}>{uploadType === 'gallery' ? 'Add School Memory' : 'Change Image'}</h3>
              <button onClick={() => setShowUploadModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={28} color="#64748b" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {uploadType === 'gallery' && (
                <input type="text" placeholder="Title" value={newImageTitle} onChange={(e) => setNewImageTitle(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '15px', border: '1px solid #e2e8f0', outline: 'none' }} />
              )}
              <div style={{ border: '3px dashed #e2e8f0', borderRadius: '25px', padding: '50px', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' }} onClick={() => fileInputRef.current.click()}>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                {previewUrl ? <img src={previewUrl} style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '15px' }} /> : <p style={{ fontWeight: 600, color: '#94a3b8' }}>Select Photo</p>}
              </div>
              <button onClick={handleUpload} style={{ background: '#1e3a8a', color: 'white', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 800, cursor: 'pointer', fontSize: '1.1rem' }}>Upload to Page</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: '#001a35', color: 'rgba(255,255,255,0.4)', padding: '50px', textAlign: 'center', marginTop: '100px', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} Quaid-e-Millat Public Boys High School. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
