'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, User, Lock, Mail, ShieldCheck, CheckCircle2, ArrowRight, Send, Upload, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // login, register, feedback
  const [role, setRole] = useState('student');
  const [imageFile, setImageFile] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (token && user.role) {
      router.push(`/${user.role}`);
    }
  }, [router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const [error, setError] = useState('');
  const [showChangePass, setShowChangePass] = useState(false);
  const [newAdminPass, setNewAdminPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    if (activeTab === 'login') {
      if (formData.email === 'admin@qmschool.edu.pk') {
        const storedPass = localStorage.getItem('admin_pass') || 'admin786';
        if (formData.password === storedPass) {
          const result = await login(formData.email, formData.password);
          setLoading(false);
          if (result && !result.success) {
            setError(result.message || 'Login failed.');
          }
        } else {
          setLoading(false);
          setError('Invalid Admin Credentials');
        }
      } else {
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem('token', 'mock_token');
          localStorage.setItem('user', JSON.stringify({ name: formData.email.split('@')[0], email: formData.email, role: role, avatar: { url: imageFile ? URL.createObjectURL(imageFile) : '' } }));
          window.location.href = `/${role}`;
        }, 1000);
      }
    } else if (activeTab === 'register') {
      setTimeout(() => {
        setLoading(false);
        setSuccess('Account created successfully! Awaiting Admin Approval.');
        setTimeout(() => setActiveTab('login'), 2000);
      }, 1000);
    } else if (activeTab === 'feedback') {
      setTimeout(() => {
        setLoading(false);
        setSuccess('Thank you for your feedback!');
        setFormData({ ...formData, message: '' });
        setTimeout(() => setSuccess(''), 3000);
      }, 1000);
    }
  };

  return (
    <div className="animated-bg" style={{ 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: "'Inter', sans-serif", 
      overflow: 'hidden', 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      
      {/* Floating 3D Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {mounted && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-orb"
            style={{
              position: 'absolute',
              width: `${200 + i * 30}px`,
              height: `${200 + i * 30}px`,
              borderRadius: '40%',
              background: `radial-gradient(circle, ${['#3b82f622', '#8b5cf622', '#10b98122', '#f59e0b22'][i % 4]} 0%, rgba(0,0,0,0) 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(80px)',
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${20 + i}s`
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', alignItems: 'center' }}>
        
        {/* Left Hero Section */}
        <div className="fade-in-left">
          <div className="title-container-3d" style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '20px 28px', borderRadius: '28px', background: 'rgba(0,0,0,0.4)', position: 'relative', marginBottom: '40px', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
            <div className="rotating-border"></div>
            
            <div className="logo-3d-anim" style={{ width: 80, height: 80, borderRadius: '22px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(37,99,235,0.4)', position: 'relative', zIndex: 2 }}>
              <GraduationCap size={44} color="white" />
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: 0, background: 'linear-gradient(90deg, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>Quaid-e-Millat</h1>
              <p style={{ margin: 0, color: '#60a5fa', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '5px', textTransform: 'uppercase' }}>Management System</p>
            </div>
          </div>
          
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '32px', letterSpacing: '-4px' }}>
            The Future of <span style={{ color: '#facc15', textShadow: '0 0 40px rgba(250,204,21,0.6)' }}>Learning</span>
          </h2>
          <p style={{ fontSize: '1.3rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '48px', maxWidth: '550px', fontWeight: 500 }}>
            Empowering minds through state-of-the-art innovation and academic excellence.
          </p>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <button 
              type="button"
              onClick={() => setShowAdminModal(true)}
              className="admin-btn-3d-glow"
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', 
                background: 'linear-gradient(135deg, #059669, #10b981)', border: 'none', 
                cursor: 'pointer', padding: '16px 32px', borderRadius: '20px', transition: 'all 0.4s',
                fontWeight: 900, boxShadow: '0 10px 0 #065f46, 0 20px 40px rgba(16,185,129,0.4)',
                textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem'
              }}
            >
              <ShieldCheck size={24} /> <span>Admin Panel</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8', fontWeight: 700, background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: '16px' }}>
              <div className="pulse-dot" style={{ width: 14, height: 14, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 15px #3b82f6' }}></div>
              <span>System Online</span>
            </div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: 700, background: 'rgba(59, 130, 246, 0.1)', padding: '12px 24px', borderRadius: '16px', transition: 'all 0.3s' }} className="exit-btn-hover">
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> <span>Exit to Home</span>
            </Link>
          </div>
        </div>

        {/* Right Auth Section with Full 3D Mouse Tilt & Rotating Border */}
        <div className="perspective-container">
          <div className="auth-card-3d-interactive auth-card-floating" style={{ position: 'relative', padding: '32px', background: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(40px)', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)', maxWidth: '420px', margin: '0 auto' }}>
            <div className="rotating-border-auth"></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Tabs with Zoom */}
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.6)', borderRadius: '22px', padding: '8px', marginBottom: '40px', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6)' }}>
                {['login', 'register', 'feedback'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setSuccess(''); }}
                    className="tab-zoom-3d"
                    style={{
                      flex: 1, padding: '16px', borderRadius: '18px', border: 'none',
                      background: activeTab === tab ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
                      color: activeTab === tab ? 'white' : '#4b5563',
                      fontWeight: 900, cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px',
                      boxShadow: activeTab === tab ? '0 10px 20px rgba(37,99,235,0.4)' : 'none'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="fade-in">
                {/* Error/Success alerts */}
                {success && (
                  <div style={{ padding: '18px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', borderRadius: '18px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800 }}>
                    <CheckCircle2 size={24} /> {success}
                  </div>
                )}

                {error && (
                  <div style={{ padding: '18px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', borderRadius: '18px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800 }}>
                    <XCircle size={24} /> {error}
                  </div>
                )}

                {/* Role Selection */}
                {activeTab !== 'feedback' && (
                  <div style={{ marginBottom: '36px' }}>
                    <label style={{ display: 'block', marginBottom: '16px', color: '#4b5563', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px' }}>Select Role</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
                      {['admin', 'student', 'teacher', 'staff', "Parents"].map(r => (
                        <button
                          key={r} type="button" onClick={() => setRole(r === "Parents" ? 'parent' : r)}
                          className="role-zoom-btn-v2"
                          style={{
                            padding: '14px', borderRadius: '16px', background: (role === r || (r === "Parents" && role === 'parent')) ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                            border: `2px solid ${(role === r || (r === "Parents" && role === 'parent')) ? '#3b82f6' : 'transparent'}`,
                            color: (role === r || (r === "Parents" && role === 'parent')) ? '#fff' : '#4b5563', textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            fontWeight: 800, fontSize: '0.9rem'
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {(activeTab === 'register' || activeTab === 'feedback') && (
                    <div style={{ position: 'relative' }}>
                      <User size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
                      <input required className="input-premium-3d" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '18px 18px 18px 52px', boxSizing: 'border-box' }} />
                    </div>
                  )}

                  <div style={{ position: 'relative' }}>
                    <Mail size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
                    <input required className="input-premium-3d" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '18px 18px 18px 52px', boxSizing: 'border-box' }} />
                  </div>

                  {activeTab !== 'feedback' && (
                    <div style={{ position: 'relative' }}>
                      <Lock size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
                      <input required className="input-premium-3d" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '18px 18px 18px 52px', boxSizing: 'border-box' }} />
                    </div>
                  )}

                  {activeTab === 'feedback' && (
                    <textarea required className="input-premium-3d" name="message" placeholder="How can we help?" rows={4} value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '20px', boxSizing: 'border-box', resize: 'none' }} />
                  )}
                </div>

                <button type="submit" className="submit-btn-premium animated-pulse-v2" disabled={loading} style={{ width: '100%', padding: '22px', fontSize: '1.3rem', fontWeight: 900, letterSpacing: '3px', marginTop: '40px', background: 'linear-gradient(135deg, #3b82f6, #1e40af)', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', boxShadow: '0 10px 0 #1e3a8a, 0 20px 40px rgba(37,99,235,0.5)', transition: 'all 0.3s', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                  {loading ? 'PROCESSING...' : (
                    <>
                      <span>{activeTab === 'login' ? 'Access Portal' : (activeTab === 'register' ? 'Join Now' : 'Send Feedback')}</span>
                      <ArrowRight size={24} className="arrow-anim" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

      {/* Admin Password & Settings Modal */}
      {showAdminModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="fade-in-up" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.1)', padding: '48px', borderRadius: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 40px 100px rgba(0,0,0,1)' }}>
            {!showChangePass ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <div className="logo-3d-anim" style={{ width: 90, height: 90, borderRadius: '28px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <ShieldCheck size={48} color="#3b82f6" />
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px' }}>Admin Controls</h3>
                  <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Secure access to the core management system.</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const storedPass = localStorage.getItem('admin_pass') || 'admin786';
                  if (adminPass === storedPass) {
                    window.location.href = '/admin';
                  } else {
                    setAdminError(true);
                    setAdminPass('');
                    setTimeout(() => setAdminError(false), 2000);
                  }
                }}>
                  <input
                    autoFocus type="password" placeholder="••••••••" value={adminPass} onChange={(e) => setAdminPass(e.target.value)}
                    style={{ 
                      width: '100%', padding: '20px', borderRadius: '20px', background: 'rgba(0,0,0,0.5)', 
                      border: `2px solid ${adminError ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: 'white', fontSize: '1.4rem',
                      outline: 'none', transition: 'all 0.3s', textAlign: 'center', letterSpacing: '10px', marginBottom: '32px'
                    }}
                  />
                  
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <button type="button" onClick={() => { setShowAdminModal(false); setAdminPass(''); }} style={{ flex: 1, padding: '18px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="submit-btn-premium" style={{ flex: 1.5, padding: '18px', borderRadius: '20px', fontSize: '1rem' }}>Enter Admin</button>
                  </div>

                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button type="button" onClick={() => setShowChangePass(true)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'underline' }}>
                      Change Admin Credentials
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Update Credentials</h3>
                  <p style={{ color: '#64748b' }}>Set a new master password for the Admin Panel.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input
                    type="password" placeholder="Enter New Password" value={newAdminPass} onChange={(e) => setNewAdminPass(e.target.value)}
                    style={{ width: '100%', padding: '20px', borderRadius: '20px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.1rem' }}
                  />
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => setShowChangePass(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', fontWeight: 700 }}>Back</button>
                    <button onClick={() => {
                      if (newAdminPass.length < 4) return alert('Password too short!');
                      localStorage.setItem('admin_pass', newAdminPass);
                      setSuccess('Admin credentials updated!');
                      setShowChangePass(false);
                      setNewAdminPass('');
                      setTimeout(() => setSuccess(''), 3000);
                    }} style={{ flex: 2, padding: '16px', borderRadius: '16px', background: '#3b82f6', color: 'white', border: 'none', fontWeight: 800 }}>Save & Update</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .animated-bg {
          background: linear-gradient(-45deg, #020617, #064e3b, #0a1128, #052e16);
          background-size: 400% 400%;
          animation: gradientBG 12s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rotating-border, .rotating-border-auth {
          position: absolute;
          inset: -100%;
          background: conic-gradient(from 0deg, transparent, #3b82f6, transparent 40%, #10b981, transparent 70%);
          animation: rotateLine 6s linear infinite;
          z-index: 1;
        }
        .rotating-border-auth { animation-duration: 8s; opacity: 0.7; }
        @keyframes rotateLine {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .title-container-3d:after, .auth-card-3d-interactive:after {
          content: '';
          position: absolute;
          inset: 3px;
          background: #020617;
          border-radius: 25px;
          z-index: 1;
        }
        .auth-card-3d-interactive:after { border-radius: 45px; inset: 4px; background: rgba(2, 6, 23, 0.98); }
        .logo-3d-anim {
          animation: logoFloat 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateY(25deg) rotateX(15deg); }
        }
        .perspective-container { perspective: 3000px; }
        .auth-card-3d-interactive {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .auth-card-3d-interactive:hover {
          transform: rotateY(-18deg) rotateX(12deg) scale(1.05);
        }
        .auth-card-floating {
          animation: cardFloat 8s ease-in-out infinite;
        }
        .auth-card-floating:hover {
          animation-play-state: paused;
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-15px) rotateX(5deg) rotateY(-5deg); }
        }
        .tab-zoom-3d:hover {
          transform: scale(1.15) translateZ(20px);
          color: #fff !important;
        }
        .role-zoom-btn-v2:hover {
          transform: scale(1.25) translateZ(30px);
          background: rgba(59,130,246,0.2) !important;
          z-index: 10;
        }
        .admin-btn-3d-glow {
          position: relative;
          overflow: hidden;
          animation: adminBtn3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes adminBtn3d {
          0%, 100% { transform: perspective(500px) rotateX(0deg) translateY(0); }
          50% { transform: perspective(500px) rotateX(15deg) translateY(-5px); }
        }
        .admin-btn-3d-glow:after {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          animation: glowMove 4s linear infinite;
        }
        @keyframes glowMove {
          from { transform: translate(-30%, -30%); }
          to { transform: translate(30%, 30%); }
        }
        .animated-pulse-v2 {
          animation: buttonPulseV2 3s infinite;
        }
        @keyframes buttonPulseV2 {
          0% { box-shadow: 0 10px 0 #1e3a8a, 0 0 0 0 rgba(59,130,246,0.5); }
          70% { box-shadow: 0 10px 0 #1e3a8a, 0 0 0 30px rgba(59,130,246,0); }
          100% { box-shadow: 0 10px 0 #1e3a8a, 0 0 0 0 rgba(59,130,246,0); }
        }
        .submit-btn-premium:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 0 #1e3a8a, 0 30px 60px rgba(37,99,235,0.6);
        }
        .submit-btn-premium:hover .arrow-anim {
          transform: translateX(8px);
        }
        .arrow-anim { transition: transform 0.3s; }
        .input-premium-3d {
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          border-radius: 20px;
          transition: all 0.4s;
          outline: none;
        }
        .input-premium-3d:focus {
          border-color: #3b82f6;
          background: rgba(0,0,0,0.7);
          box-shadow: inset 0 4px 15px rgba(0,0,0,0.7), 0 0 30px rgba(59,130,246,0.4);
        }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        .fade-in-left { animation: fadeInLeft 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-200px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fade-in-up { animation: fadeInUp 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(200px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .exit-btn-hover:hover {
          background: rgba(59, 130, 246, 0.2) !important;
          transform: translateX(-5px);
        }
        .floating-orb { animation: floatOrb linear infinite; }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(50px, -80px) scale(1.3) rotate(120deg); }
          66% { transform: translate(-40px, 40px) scale(0.7) rotate(240deg); }
          100% { transform: translate(0, 0) scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}