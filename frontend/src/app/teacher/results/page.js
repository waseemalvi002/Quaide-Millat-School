'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Plus, X, Trash2, Save, Search, Award } from 'lucide-react';

export default function TeacherResults() {
  const [selectedClass, setSelectedClass] = useState('Class 5-A');
  const [examType, setExamType] = useState('Monthly');
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([
    { _id: '1', name: 'Ali Khan', roll: 'QM-05-001', subjects: [{ name: 'English', total: 100, obtained: 85 }, { name: 'Urdu', total: 100, obtained: 78 }, { name: 'Math', total: 100, obtained: 92 }] },
    { _id: '2', name: 'Hassan Ahmed', roll: 'QM-05-002', subjects: [{ name: 'English', total: 100, obtained: 72 }, { name: 'Urdu', total: 100, obtained: 68 }, { name: 'Math', total: 100, obtained: 80 }] },
  ]);
  const [saved, setSaved] = useState(false);

  // Live Editor Logic
  const handleUpdate = (id, field, value) => {
    setStudents(prev => prev.map(s => s._id === id ? { ...s, [field]: value } : s));
    setSaved(false);
  };

  const updateSubjectMark = (studentId, subIdx, field, value) => {
    const student = students.find(s => s._id === studentId);
    const updatedSubjects = [...student.subjects];
    updatedSubjects[subIdx] = { ...updatedSubjects[subIdx], [field]: value };
    handleUpdate(studentId, 'subjects', updatedSubjects);
  };

  const addSubject = (id) => {
    const student = students.find(s => s._id === id);
    handleUpdate(id, 'subjects', [...student.subjects, { name: '', total: 100, obtained: 0 }]);
  };

  const removeSubject = (studentId, subIdx) => {
    const student = students.find(s => s._id === studentId);
    handleUpdate(studentId, 'subjects', student.subjects.filter((_, i) => i !== subIdx));
  };

  const addNewStudent = () => {
    const newStudent = {
      _id: Date.now().toString(),
      name: 'New Student',
      roll: 'QM-NEW-000',
      subjects: [{ name: 'English', total: 100, obtained: 0 }]
    };
    setStudents([newStudent, ...students]);
  };

  const calculateStats = (subjectsList) => {
    const total = subjectsList.reduce((acc, sub) => acc + Number(sub.total || 0), 0);
    const obtained = subjectsList.reduce((acc, sub) => acc + Number(sub.obtained || 0), 0);
    const percentage = total > 0 ? (obtained / total * 100).toFixed(1) : 0;
    return { total, obtained, percentage };
  };

  const getGrade = (pct) => pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F';

  return (
    <DashboardLayout>
      <div style={{ padding: '30px', background: '#0f172a', minHeight: '100vh', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#facc15', margin: 0 }}>Class Results Portal</h1>
            <p style={{ color: '#94a3b8' }}>Manage marks and subjects for {selectedClass}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={addNewStudent} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Plus size={18} /> Add Student
            </button>
            <button className="btn" style={{ background: saved ? '#10b981' : '#3b82f6', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', fontWeight: 800 }} onClick={() => setSaved(true)}>
              {saved ? '✓ Results Published' : 'Publish Results'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input placeholder="Filter by roll or name..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '14px 14px 14px 45px', borderRadius: '15px', outline: 'none' }} />
          </div>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '12px', borderRadius: '12px' }}>
            {['Class 5-A', 'Class 6-A', 'Class 7-A', 'Class 8-A'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={examType} onChange={e => setExamType(e.target.value)} style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '12px', borderRadius: '12px' }}>
            {['Weekly', 'Monthly', 'Final'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '25px', overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: '20px' }}>Student Profile</th>
                  <th>Subjects & Marks (Live Editor)</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase())).map((s) => {
                  const stats = calculateStats(s.subjects);
                  return (
                    <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '20px' }}>
                        <input value={s.name} onChange={e => handleUpdate(s._id, 'name', e.target.value)} style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 800, fontSize: '1.1rem', width: '100%', outline: 'none' }} />
                        <input value={s.roll} onChange={e => handleUpdate(s._id, 'roll', e.target.value)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', fontSize: '0.85rem', width: '100%', outline: 'none' }} />
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {s.subjects.map((sub, sIdx) => (
                            <div key={sIdx} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input placeholder="Sub" value={sub.name} onChange={e => updateSubjectMark(s._id, sIdx, 'name', e.target.value)} style={{ background: 'transparent', border: 'none', color: '#facc15', width: '80px', fontWeight: 700, outline: 'none' }} />
                              <input type="number" value={sub.obtained} onChange={e => updateSubjectMark(s._id, sIdx, 'obtained', e.target.value)} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: 'white', width: '40px', textAlign: 'center', borderRadius: '4px' }} />
                              <span style={{ opacity: 0.3 }}>/</span>
                              <input type="number" value={sub.total} onChange={e => updateSubjectMark(s._id, sIdx, 'total', e.target.value)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', width: '40px', textAlign: 'center' }} />
                              <X size={14} style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => removeSubject(s._id, sIdx)} />
                            </div>
                          ))}
                          <button onClick={() => addSubject(s._id)} style={{ background: 'rgba(96,165,250,0.1)', border: '1px dashed #3b82f6', color: '#60a5fa', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer' }}>+ Subject</button>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: stats.percentage >= 60 ? '#10b981' : '#ef4444' }}>{stats.percentage}%</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{stats.obtained}/{stats.total} Marks</div>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-danger" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }} onClick={() => setStudents(students.filter(std => std._id !== s._id))}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
