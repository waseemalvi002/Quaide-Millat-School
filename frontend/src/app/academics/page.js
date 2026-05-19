'use client';

import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Award, GraduationCap, 
  Library, Microscope, PenTool, ClipboardCheck,
  ChevronRight, Calendar, Users, Cpu, FileText, Globe, Heart, Atom, FlaskConical, Binary, Languages
} from 'lucide-react';

export default function AcademicsPage() {
  const subjects = [
    { title: 'Mathematics', icon: <PenTool size={32} />, color: '#3b82f6' }, // Blue
    { title: 'Physics', icon: <Atom size={32} />, color: '#6366f1' }, // Indigo
    { title: 'Chemistry', icon: <FlaskConical size={32} />, color: '#10b981' }, // Emerald
    { title: 'Biology', icon: <Heart size={32} />, color: '#ef4444' }, // Red
    { title: 'Computer Sc.', icon: <Binary size={32} />, color: '#8b5cf6' }, // Violet
    { title: 'English', icon: <Languages size={32} />, color: '#f59e0b' }, // Amber
    { title: 'Urdu', icon: <FileText size={32} />, color: '#ec4899' }, // Pink
    { title: 'Islamiyat', icon: <GraduationCap size={32} />, color: '#fbbf24' }, // Gold
    { title: 'Tarjama-tul-Quran', icon: <BookOpen size={32} />, color: '#059669' }, // Green
    { title: 'Pak Studies', icon: <Globe size={32} />, color: '#14b8a6' }  // Teal
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
      
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
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>Academics & College</h1>
        </div>
        <div style={{ width: '100px' }}></div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        height: '450px', 
        background: 'linear-gradient(rgba(0,26,53,0.85), rgba(0,26,53,0.85)), url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600") center/cover',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', color: 'white', padding: '0 20px'
      }} className="fade-in">
        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px' }}>Academic Excellence</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', opacity: 0.9, lineHeight: 1.6 }}>
          Comprehensive education from Montessori to Higher Secondary College levels.
        </p>
      </section>

      <main style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        
        {/* Programs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', marginBottom: '100px' }}>
          <div className="pillar-card" style={{ padding: '50px', borderRadius: '40px', background: '#f1f5f9', border: '1px solid #e2e8f0', transition: '0.3s' }}>
            <div style={{ color: '#001a35', marginBottom: '25px' }}><BookOpen size={48} /></div>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', color: '#001a35' }}>Secondary School</h4>
            <p style={{ color: '#1e293b', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 500 }}>
              Matriculation program with focus on Science and Computer streams under BISE Multan Board.
            </p>
          </div>
          <div className="pillar-card" style={{ padding: '50px', borderRadius: '40px', background: '#f1f5f9', border: '1px solid #e2e8f0', transition: '0.3s' }}>
            <div style={{ color: '#001a35', marginBottom: '25px' }}><GraduationCap size={48} /></div>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', color: '#001a35' }}>Intermediate College</h4>
            <p style={{ color: '#1e293b', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 500 }}>
              College level education offering F.Sc (Pre-Eng, Pre-Med), ICS, and F.A programs.
            </p>
          </div>
        </div>

        {/* Subjects List - COLORFUL ICONS & BLUE TEXT */}
        <section style={{ marginBottom: '100px' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '50px', color: '#001a35' }}>Key Subject Areas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
            {subjects.map((sub, i) => (
              <div key={i} className="subject-item" style={{ 
                background: '#fff', 
                padding: '40px 20px', 
                borderRadius: '30px', 
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: `2px solid ${sub.color}22`,
                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <div style={{ color: sub.color, marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{sub.icon}</div>
                <h5 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#2563eb' }}>{sub.title}</h5>
              </div>
            ))}
          </div>
        </section>

        {/* Success Metrics */}
        <section style={{ background: '#001a35', borderRadius: '40px', padding: '80px 60px', color: 'white', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '50px' }}>Our Academic Record</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
            {[
              { label: 'Success Rate', val: '98%' },
              { label: 'A+ Grades', val: '150+' },
              { label: 'Experienced Staff', val: '40+' },
              { label: 'Modern Labs', val: '4' }
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '3rem', fontWeight: 950, color: '#facc15' }}>{s.val}</div>
                <div style={{ opacity: 0.8, marginTop: '10px', fontSize: '1.1rem', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer style={{ background: '#f1f5f9', padding: '50px', textAlign: 'center', color: '#475569', fontWeight: 600 }}>
        <p>&copy; {new Date().getFullYear()} Quaid-e-Millat Public Boys High School & College. All Rights Reserved.</p>
      </footer>

      <style jsx>{`
        .fade-in { animation: fadeIn 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .pillar-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); background: #fff; }
        .subject-item:hover { transform: translateY(-15px); border-color: #2563eb; }
      `}</style>
    </div>
  );
}
