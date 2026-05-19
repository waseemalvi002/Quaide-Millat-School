'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Download, Printer, CheckCircle2, ArrowLeft, Trophy, Percent, Star, Pencil, Plus, X, Save } from 'lucide-react';

export default function PublicResultsPage() {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Data State for the Card
  const [resultData, setResultData] = useState({
    name: 'Muhammad Zaid',
    class: '9th - Science',
    rollNo: '2124',
    session: '2024-25',
    status: 'PASSED',
    subjects: [
      { name: 'Mathematics', total: 100, obtained: 92, grade: 'A+' },
      { name: 'Physics', total: 100, obtained: 88, grade: 'A' },
      { name: 'Chemistry', total: 100, obtained: 85, grade: 'A' },
      { name: 'English', total: 100, obtained: 78, grade: 'B' },
      { name: 'Urdu', total: 100, obtained: 82, grade: 'A' }
    ]
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  // Editing Functions
  const updateField = (field, value) => setResultData({ ...resultData, [field]: value });
  
  const updateSubject = (idx, field, value) => {
    const updated = [...resultData.subjects];
    updated[idx][field] = value;
    // Auto Grade Logic
    if (field === 'obtained' || field === 'total') {
      const pct = (updated[idx].obtained / updated[idx].total) * 100;
      updated[idx].grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : 'C';
    }
    setResultData({ ...resultData, subjects: updated });
  };

  const addSubject = () => {
    setResultData({
      ...resultData,
      subjects: [...resultData.subjects, { name: 'New Subject', total: 100, obtained: 0, grade: 'F' }]
    });
  };

  const removeSubject = (idx) => {
    setResultData({
      ...resultData,
      subjects: resultData.subjects.filter((_, i) => i !== idx)
    });
  };

  const totalObtained = resultData.subjects.reduce((acc, s) => acc + Number(s.obtained || 0), 0);
  const totalMarks = resultData.subjects.reduce((acc, s) => acc + Number(s.total || 0), 0);
  const totalPercentage = totalMarks > 0 ? (totalObtained / totalMarks * 100).toFixed(1) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#001a35', color: 'white', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {step === 1 ? (
          <div style={{ maxWidth: '600px', margin: '100px auto', background: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <img src="/images/logo.png" alt="Logo" style={{ height: '70px', marginBottom: '20px' }} />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px', color: '#facc15' }}>Examination Results</h1>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Enter Roll Number to view Digital Report Card</p>
            <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input 
                required type="text" placeholder="Roll Number (e.g. 2124)" value={studentId} onChange={(e) => setStudentId(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', color: 'white', fontSize: '1.2rem', textAlign: 'center', outline: 'none' }} 
              />
              <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '20px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}>
                {loading ? 'Searching...' : 'View Result Card'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* Control Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowLeft size={18} /> Back to Search</button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => setIsEditMode(!isEditMode)} 
                  style={{ background: isEditMode ? '#ef4444' : '#facc15', color: '#000', border: 'none', padding: '10px 25px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {isEditMode ? <><X size={18} /> Cancel Edit</> : <><Pencil size={18} /> Edit Result</>}
                </button>
                {!isEditMode && <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Download PDF</button>}
              </div>
            </div>

            {/* Premium Result Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
              {/* Card Header */}
              <div style={{ background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent)', padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {isEditMode ? (
                    <input value={resultData.name} onChange={e => updateField('name', e.target.value)} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #3b82f6', color: 'white', fontSize: '2rem', fontWeight: 900, borderRadius: '8px', padding: '5px 15px', width: '100%' }} />
                  ) : (
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>{resultData.name}</h2>
                  )}
                  <div style={{ display: 'flex', gap: '20px', marginTop: '10px', color: '#94a3b8' }}>
                    <span>Class: {isEditMode ? <input value={resultData.class} onChange={e => updateField('class', e.target.value)} style={{ background: '#001a35', border: '1px solid #334155', color: 'white' }} /> : <strong style={{color: 'white'}}>{resultData.class}</strong>}</span>
                    <span>Roll No: {isEditMode ? <input value={resultData.rollNo} onChange={e => updateField('rollNo', e.target.value)} style={{ background: '#001a35', border: '1px solid #334155', color: 'white' }} /> : <strong style={{color: 'white'}}>{resultData.rollNo}</strong>}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ background: '#10b981', color: 'white', padding: '10px 25px', borderRadius: '50px', fontWeight: 800 }}>{resultData.status}</div>
                  <p style={{ marginTop: '10px', color: '#94a3b8', fontSize: '0.9rem' }}>Academic Session: {resultData.session}</p>
                </div>
              </div>

              {/* Card Body (Subjects) */}
              <div style={{ padding: '40px' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                  <thead>
                    <tr style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <th style={{ textAlign: 'left', padding: '0 15px' }}>Subject</th>
                      <th style={{ textAlign: 'center' }}>Total</th>
                      <th style={{ textAlign: 'center' }}>Obtained</th>
                      <th style={{ textAlign: 'center' }}>Grade</th>
                      {isEditMode && <th style={{ textAlign: 'center' }}>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.subjects.map((sub, idx) => (
                      <tr key={idx} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                        <td style={{ padding: '20px', borderRadius: '15px 0 0 15px', fontWeight: 700 }}>
                          {isEditMode ? <input value={sub.name} onChange={e => updateSubject(idx, 'name', e.target.value)} style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 700 }} /> : sub.name}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {isEditMode ? <input type="number" value={sub.total} onChange={e => updateSubject(idx, 'total', e.target.value)} style={{ width: '60px', background: 'transparent', border: 'none', color: 'white', textAlign: 'center' }} /> : sub.total}
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: 900, color: '#3b82f6' }}>
                          {isEditMode ? <input type="number" value={sub.obtained} onChange={e => updateSubject(idx, 'obtained', e.target.value)} style={{ width: '60px', background: 'rgba(59, 130, 246, 0.1)', border: 'none', color: '#3b82f6', textAlign: 'center', fontWeight: 900, borderRadius: '5px' }} /> : sub.obtained}
                        </td>
                        <td style={{ textAlign: 'center', borderRadius: isEditMode ? '0' : '0 15px 15px 0' }}>
                          <span style={{ color: sub.grade.includes('A') ? '#10b981' : '#facc15', fontWeight: 900 }}>{sub.grade}</span>
                        </td>
                        {isEditMode && (
                          <td style={{ textAlign: 'center', borderRadius: '0 15px 15px 0' }}>
                            <button onClick={() => removeSubject(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={18} /></button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isEditMode && (
                  <button onClick={addSubject} style={{ width: '100%', marginTop: '10px', background: 'rgba(255,255,255,0.05)', border: '1px dashed #334155', color: '#94a3b8', padding: '15px', borderRadius: '15px', cursor: 'pointer' }}>+ Add New Subject Row</button>
                )}
              </div>

              {/* Card Footer (Stats) */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ textAlign: 'center', background: 'rgba(59, 130, 246, 0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                  <Trophy size={24} color="#3b82f6" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{totalObtained} / {totalMarks}</div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>Total Marks</p>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(250, 204, 21, 0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(250, 204, 21, 0.1)' }}>
                  <Percent size={24} color="#facc15" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{totalPercentage}%</div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>Percentage</p>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <Star size={24} color="#10b981" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>Grade A</div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>Final Status</p>
                </div>
              </div>
            </div>
            
            {isEditMode && (
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                  onClick={() => { setIsEditMode(false); alert('Result Card Updated Successfully!'); }} 
                  style={{ background: '#10b981', color: 'white', border: 'none', padding: '15px 60px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)' }}
                >
                  <Save size={20} /> Save All Changes Permanently
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input:focus { outline: none; background: rgba(255,255,255,0.1) !important; border-radius: 5px; }
      `}</style>
    </div>
  );
}
