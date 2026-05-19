'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Camera, Loader2, Eye, Calendar } from 'lucide-react';
import { galleryAPI } from '@/lib/api';

export default function PublicGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      const data = response.data.data || response.data || [];
      // Only show public albums
      setGallery(data.filter(album => album.isPublic));
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filtered = gallery.filter(g => !filterCategory || g.category === filterCategory);
  const categories = [...new Set(gallery.map(g => g.category))];
  
  const catColors = { 
    event: '#3b82f6', 
    academic: '#10b981', 
    sports: '#ef4444', 
    general: '#f59e0b', 
    infrastructure: '#8b5cf6' 
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#001a35', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', color: 'white' }}>
        <Loader2 className="animate-spin" size={48} color="#facc15" />
        <p style={{ fontWeight: 600, opacity: 0.8 }}>Loading Visual Memories...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      
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
          <Camera size={28} color="#facc15" />
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>School Gallery</h1>
        </div>
        <div style={{ width: '100px' }}></div>
      </header>

      {/* Hero Banner */}
      <section style={{ 
        height: '300px', 
        background: 'linear-gradient(rgba(0,26,53,0.8), rgba(0,26,53,0.8)), url("https://images.unsplash.com/photo-1523050853063-bd8012fec040?w=1600") center/cover',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', color: 'white', padding: '0 20px'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px' }}>Visual Memories</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px' }}>Capturing the moments that define our excellence and school spirit.</p>
      </section>

      <main style={{ maxWidth: '1400px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap' }}>
          <button 
            className={`filter-btn ${!filterCategory ? 'active' : ''}`}
            onClick={() => setFilterCategory('')}
          >
            All Albums
          </button>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
              style={{ textTransform: 'capitalize' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {filtered.map(album => (
            <div 
              key={album._id} 
              className="album-card"
              onClick={() => setSelectedAlbum(album)}
              style={{ 
                background: 'white', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0',
                transition: '0.3s'
              }}
            >
              <div style={{ 
                height: 220, 
                backgroundImage: album.images?.[0]?.url ? `url(${album.images[0].url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: `${catColors[album.category] || '#64748b'}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' 
              }}>
                {!album.images?.[0]?.url && <ImageIcon size={48} color={catColors[album.category] || '#64748b'} style={{ opacity: 0.5 }} />}
                <div style={{ position: 'absolute', top: 15, right: 15 }}>
                  <span style={{ 
                    padding: '6px 14px', 
                    borderRadius: '10px', 
                    background: catColors[album.category] || '#64748b', 
                    color: '#fff', 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase' 
                  }}>
                    {album.category}
                  </span>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                  opacity: 0,
                  transition: '0.3s'
                }} className="card-overlay">
                   <span style={{ color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Eye size={18} /> View Album
                   </span>
                </div>
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: '#001a35' }}>{album.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '15px', lineHeight: 1.5 }}>
                  {album.description || 'Take a look at our school moments.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>
                    <ImageIcon size={16} />
                    <span>{album.images?.length || 0} Photos</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>
                    <Calendar size={16} />
                    <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 20px' }}>
              <ImageIcon size={64} style={{ color: '#cbd5e1', marginBottom: '20px' }} />
              <h3 style={{ color: '#64748b' }}>No albums found</h3>
              <p style={{ color: '#94a3b8' }}>Check back soon for new school memories.</p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox / Album View */}
      {selectedAlbum && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 1000, 
          background: 'rgba(0,0,0,0.95)', display: 'flex', 
          flexDirection: 'column', backdropFilter: 'blur(10px)' 
        }}>
          <header style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>{selectedAlbum.title}</h3>
              <p style={{ margin: 0, opacity: 0.6 }}>{selectedAlbum.images?.length || 0} Photos</p>
            </div>
            <button 
              onClick={() => setSelectedAlbum(null)} 
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={24} />
            </button>
          </header>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '40px 5%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {selectedAlbum.images?.map((img, i) => (
                <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', height: '250px' }}>
                  <img 
                    src={img.url} 
                    alt={img.caption || selectedAlbum.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s' }}
                    className="gallery-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: '#001a35', padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
        <p>&copy; {new Date().getFullYear()} Quaid-e-Millat Public Boys High School. Excellence in Education.</p>
      </footer>

      <style jsx>{`
        .filter-btn {
          padding: 10px 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .filter-btn.active {
          background: #001a35;
          color: white;
          border-color: #001a35;
          box-shadow: 0 10px 20px rgba(0,26,53,0.2);
        }
        .album-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .album-card:hover .card-overlay {
          opacity: 1;
        }
        .gallery-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
