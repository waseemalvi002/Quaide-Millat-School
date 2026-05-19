'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ArrowLeft, Mail, User, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001a35', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        background: 'rgba(255, 255, 255, 0.03)', 
        backdropFilter: 'blur(10px)', 
        padding: '50px', 
        borderRadius: '30px', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/images/logo.png" alt="Logo" style={{ height: '80px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 10px', color: '#60a5fa' }}>School Feedback</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>We value your feedback and suggestions to improve our school.</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', border: '1px solid #10b981' }}>
            <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Thank You!</h2>
            <p style={{ color: '#e2e8f0' }}>Your feedback has been submitted successfully to the school administration.</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#10b981', padding: '12px 30px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#60a5fa' }} />
                <input 
                  required
                  type="text" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px 15px 15px 45px', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '1rem' }} 
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#60a5fa' }} />
                <input 
                  required
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px 15px 15px 45px', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '1rem' }} 
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>YOUR FEEDBACK</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '15px', top: '20px', color: '#60a5fa' }} />
                <textarea 
                  required
                  rows={5} 
                  placeholder="Tell us what you think..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px 15px 15px 45px', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '1rem', resize: 'none' }} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                color: 'white', 
                border: 'none', 
                padding: '18px', 
                borderRadius: '15px', 
                fontSize: '1.1rem', 
                fontWeight: 800, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                marginTop: '10px',
                boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {loading ? 'Submitting...' : <><Send size={20} /> Send Feedback</>}
            </button>

            <Link href="/" style={{ textAlign: 'center', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginTop: '10px' }}>
              Back to Home
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
