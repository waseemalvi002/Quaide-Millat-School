'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Video, Plus, Edit, Trash2, X, Clock, ExternalLink, Users } from 'lucide-react';
import styles from '../admin.module.css';

const DEMO = [
  { _id: '1', title: 'Math - Chapter 5', teacher: 'Muhammad Farooq', class: 'Class 5', subject: 'Math', date: '2025-01-20', time: '10:00', duration: '45 min', platform: 'Zoom', url: 'https://zoom.us/j/123', status: 'scheduled', attendees: 0 },
  { _id: '2', title: 'English Grammar', teacher: 'Sajid Ali', class: 'Class 3', subject: 'English', date: '2025-01-20', time: '11:00', duration: '40 min', platform: 'Google Meet', url: 'https://meet.google.com/abc', status: 'live', attendees: 15 },
  { _id: '3', title: 'Science - Solar System', teacher: 'Kashif Iqbal', class: 'Class 7', subject: 'Science', date: '2025-01-19', time: '09:00', duration: '50 min', platform: 'Zoom', url: 'https://zoom.us/j/789', status: 'completed', attendees: 22 },
  { _id: '4', title: 'Physics - Motion', teacher: 'Kashif Iqbal', class: 'Class 9', subject: 'Physics', date: '2025-01-21', time: '14:00', duration: '55 min', platform: 'Zoom', url: 'https://zoom.us/j/345', status: 'scheduled', attendees: 0 },
];

export default function AdminOnlineClasses() {
  const [classes, setClasses] = useState(DEMO);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title:'', teacher:'', class:'', subject:'', date:'', time:'', platform:'Zoom', url:'' });

  const colors = { scheduled: { bg:'#dbeafe', c:'#1d4ed8' }, live: { bg:'#fee2e2', c:'#dc2626' }, completed: { bg:'#d1fae5', c:'#065f46' } };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) setClasses(p => p.map(c => c._id === selected._id ? { ...c, ...form } : c));
    else setClasses(p => [...p, { ...form, _id: Date.now().toString(), status:'scheduled', attendees:0, duration:'45 min' }]);
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Online Classes</h1><p>Schedule and manage virtual classes</p></div>
          <button className="btn btn-primary" onClick={() => { setSelected(null); setForm({ title:'', teacher:'', class:'', subject:'', date:'', time:'', platform:'Zoom', url:'' }); setShowModal(true); }}><Plus size={18} /> Schedule Class</button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background:'#fee2e2', color:'#dc2626' }}><Video size={24} /></div><div className={styles.statInfo}><h3>{classes.filter(c=>c.status==='live').length}</h3><p>Live Now</p></div></div>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background:'#dbeafe', color:'#3b82f6' }}><Clock size={24} /></div><div className={styles.statInfo}><h3>{classes.filter(c=>c.status==='scheduled').length}</h3><p>Upcoming</p></div></div>
          <div className={styles.statCard}><div className={styles.statIcon} style={{ background:'#d1fae5', color:'#10b981' }}><Video size={24} /></div><div className={styles.statInfo}><h3>{classes.filter(c=>c.status==='completed').length}</h3><p>Completed</p></div></div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'20px', marginTop:'24px' }}>
          {classes.map(cls => (
            <div key={cls._id} className="card">
              <div className="card-body">
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
                  <h3 style={{ fontSize:'1rem', fontWeight:700 }}>{cls.title}</h3>
                  <span className="badge" style={{ background:colors[cls.status]?.bg, color:colors[cls.status]?.c }}>{cls.status==='live'?'🔴 ':''}{cls.status}</span>
                </div>
                <p style={{ fontSize:'0.85rem', color:'#64748b', marginBottom:'4px' }}>👨‍🏫 {cls.teacher} | 📚 {cls.class}</p>
                <p style={{ fontSize:'0.85rem', color:'#64748b', marginBottom:'12px' }}>📅 {cls.date} ⏰ {cls.time} ({cls.duration})</p>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                  <span className="badge badge-info">{cls.platform}</span>
                  {cls.status==='completed' && <span style={{ fontSize:'0.8rem', color:'#64748b' }}>{cls.attendees} attended</span>}
                </div>
                <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                  {cls.status==='scheduled' && <button className="btn btn-sm btn-success" style={{ background:'#10b981', color:'#fff' }} onClick={()=>setClasses(p=>p.map(c=>c._id===cls._id?{...c,status:'live'}:c))}>Start</button>}
                  {cls.status==='live' && <><a href={cls.url} target="_blank" className="btn btn-sm btn-primary"><ExternalLink size={14}/> Join</a><button className="btn btn-sm btn-danger" onClick={()=>setClasses(p=>p.map(c=>c._id===cls._id?{...c,status:'completed',attendees:Math.floor(Math.random()*20)+5}:c))}>End</button></>}
                  <button className="btn btn-sm btn-secondary" onClick={()=>{setSelected(cls);setForm({title:cls.title,teacher:cls.teacher,class:cls.class,subject:cls.subject,date:cls.date,time:cls.time,platform:cls.platform,url:cls.url});setShowModal(true);}}><Edit size={14}/></button>
                  <button className="btn btn-sm btn-danger" onClick={()=>{if(confirm('Delete?'))setClasses(p=>p.filter(c=>c._id!==cls._id));}}><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px' }}>
            <div className="card" style={{ width:'100%', maxWidth:'500px' }}>
              <div className="card-header" style={{ display:'flex', justifyContent:'space-between' }}><h3>{selected?'Edit':'Schedule'} Class</h3><button onClick={()=>setShowModal(false)} style={{ background:'none', border:'none' }}><X size={20}/></button></div>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                  <div className="form-group"><label className="form-label">Teacher</label><input className="form-input" value={form.teacher} onChange={e=>setForm({...form,teacher:e.target.value})}/></div>
                  <div className="form-group"><label className="form-label">Class</label><select className="form-input" value={form.class} onChange={e=>setForm({...form,class:e.target.value})}><option value="">Select</option>{[...Array(10)].map((_,i)=><option key={i} value={`Class ${i+1}`}>Class {i+1}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
                  <div className="form-group"><label className="form-label">Time</label><input type="time" className="form-input" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
                </div>
                <div className="form-group"><label className="form-label">Meeting URL</label><input className="form-input" value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://zoom.us/j/..."/></div>
                <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end', marginTop:'16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{selected?'Update':'Schedule'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
