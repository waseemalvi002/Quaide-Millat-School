'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { GraduationCap, User, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function AdmissionPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff', padding: '24px' }}>
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '60px', borderRadius: '40px', maxWidth: '600px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: '#10b981' }}>
            <CheckCircle2 size={60} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>Application Submitted!</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.6 }}>Thank you for choosing Quaid-e-Millat. Our team will review your application and contact you within 2-3 business days.</p>
          <button onClick={() => window.location.href = '/'} style={{ marginTop: '40px', padding: '16px 40px', borderRadius: '20px', background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1523050853063-bd8012fec040?w=1200") center/cover', padding: '100px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '10px' }}>Online Admission</h1>
        <p style={{ color: '#facc15', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px' }}>Join the excellence</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '-50px auto 100px', padding: '0 24px' }}>
        <div style={{ background: '#1e293b', borderRadius: '40px', padding: '60px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#94a3b8' }}>Student Full Name *</label>
                <input required style={{ width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#94a3b8' }}>Father's Name *</label>
                <input required style={{ width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#94a3b8' }}>Applying for Class *</label>
                <select required style={{ width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#94a3b8' }}>Phone Number *</label>
                <input required style={{ width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#94a3b8' }}>Address</label>
              <textarea rows={3} style={{ width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'none' }}></textarea>
            </div>

            <button type="submit" style={{ width: '100%', padding: '20px', borderRadius: '20px', background: 'linear-gradient(135deg, #3b82f6, #1e40af)', color: '#fff', border: 'none', fontWeight: 900, fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(37,99,235,0.3)' }}>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
