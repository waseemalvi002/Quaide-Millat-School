'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Wallet, Landmark, CheckCircle2, ArrowLeft, Search, ShieldCheck } from 'lucide-react';

export default function PublicPaymentPage() {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
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
        maxWidth: '700px', 
        width: '100%', 
        background: 'rgba(255, 255, 255, 0.03)', 
        backdropFilter: 'blur(15px)', 
        padding: '50px', 
        borderRadius: '35px', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/images/logo.png" alt="Logo" style={{ height: '70px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 10px', color: '#facc15' }}>Online Fee Payment</h1>
          <p style={{ color: '#94a3b8' }}>Securely pay your school fees online from anywhere.</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <label style={{ display: 'block', marginBottom: '15px', fontWeight: 700, color: '#60a5fa' }}>ENTER STUDENT ID / ROLL NUMBER</label>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. QM-2024-101"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '18px 18px 18px 50px', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '1.1rem' }} 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '20px', borderRadius: '18px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}
            >
              {loading ? 'Searching...' : 'Find Fee Record'}
            </button>
          </form>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                <span style={{ color: '#94a3b8' }}>Student Name:</span>
                <span style={{ fontWeight: 700 }}>Muhammad Ali</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                <span style={{ color: '#94a3b8' }}>Class:</span>
                <span style={{ fontWeight: 700 }}>Class 10-A</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <span style={{ color: '#facc15', fontWeight: 800 }}>Amount Due:</span>
                <span style={{ color: '#facc15', fontWeight: 900 }}>Rs. 4,500</span>
              </div>
            </div>

            <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 700 }}>Select Payment Method:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '2px solid #3b82f6', cursor: 'pointer', textAlign: 'center' }}>
                <Wallet color="#3b82f6" style={{ marginBottom: '10px' }} />
                <div style={{ fontWeight: 700 }}>JazzCash</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'center' }}>
                <Wallet color="#10b981" style={{ marginBottom: '10px' }} />
                <div style={{ fontWeight: 700 }}>Easypaisa</div>
              </div>
            </div>

            <button 
              onClick={handlePay}
              disabled={loading}
              style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '20px', borderRadius: '18px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '25px', border: '1px solid #10b981' }}>
            <CheckCircle2 size={70} color="#10b981" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Payment Successful!</h2>
            <p style={{ color: '#e2e8f0' }}>Your fee has been received. Transaction ID: #QM-9928172</p>
            <Link href="/" style={{ marginTop: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#3b82f6', padding: '12px 30px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontWeight: 600 }}>
              <ArrowLeft size={18} /> Return Home
            </Link>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ShieldCheck size={14} /> Secured by SSL Encryption
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
