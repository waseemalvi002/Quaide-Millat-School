'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Save, Upload, Shield, Database, Bell, Globe, Palette, Facebook, Twitter, Youtube, Instagram, Share2 } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    schoolName: 'Quaid-e-Millat Public Boys High School',
    address: 'Lahore, Punjab, Pakistan',
    phone: '+923016031213',
    email: 'info@qmschool.edu.pk',
    website: 'www.qmschool.edu.pk',
    principal: 'Hamza Niaz',
    academicYear: '2024-2025',
    lateFeeAmount: 200,
    lateFeeAfterDays: 15,
    workingDays: 26,
    notifyEmail: true,
    notifySms: false,
    notifyWhatsapp: false,
    notifyPush: true,
    primaryColor: '#1a56db',
    darkMode: false,
    facebook: 'https://facebook.com/qmpbhs',
    twitter: 'https://twitter.com/qmpbhs',
    youtube: 'https://youtube.com/qmpbhs',
    instagram: 'https://instagram.com/qmpbhs',
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'social', label: 'Social Media', icon: <Share2 size={18} /> },
    { id: 'fees', label: 'Fee Settings', icon: <Database size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div><h1>Settings</h1><p>Configure system settings</p></div>
          <button className={`btn ${saved ? 'btn-success' : 'btn-primary'}`} onClick={handleSave} style={saved ? { background: '#10b981', color: '#fff' } : {}}>
            {saved ? <><Save size={18} /> Saved!</> : <><Save size={18} /> Save Changes</>}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
          {/* Sidebar Tabs */}
          <div style={{ width: '220px', flexShrink: 0 }}>
            <div className="card">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 16px', border: 'none', background: activeTab === tab.id ? '#eff6ff' : 'transparent', color: activeTab === tab.id ? '#1a56db' : '#64748b', fontWeight: activeTab === tab.id ? 600 : 400, fontSize: '0.9rem', cursor: 'pointer', borderLeft: activeTab === tab.id ? '3px solid #1a56db' : '3px solid transparent', transition: 'all 0.2s' }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            {activeTab === 'general' && (
              <div className="card">
                <div className="card-header"><h3>School Information</h3></div>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #1a56db, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 700 }}>QM</div>
                    <div>
                      <h3 style={{ marginBottom: '4px' }}>{settings.schoolName}</h3>
                      <button className="btn btn-sm btn-secondary"><Upload size={14} /> Change Logo</button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group"><label className="form-label">School Name</label><input className="form-input" value={settings.schoolName} onChange={e => setSettings({ ...settings, schoolName: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Principal</label><input className="form-input" value={settings.principal} onChange={e => setSettings({ ...settings, principal: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Website</label><input className="form-input" value={settings.website} onChange={e => setSettings({ ...settings, website: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Academic Year</label><input className="form-input" value={settings.academicYear} onChange={e => setSettings({ ...settings, academicYear: e.target.value })} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" rows={2} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} /></div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="card">
                <div className="card-header"><h3>Social Media Profiles</h3></div>
                <div className="card-body">
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>These links will be displayed on the homepage footer and contact page.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Facebook size={18} color="#1877F2" /> Facebook URL</label>
                      <input className="form-input" value={settings.facebook} onChange={e => setSettings({ ...settings, facebook: e.target.value })} placeholder="https://facebook.com/your-school" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Twitter size={18} color="#1DA1F2" /> Twitter URL</label>
                      <input className="form-input" value={settings.twitter} onChange={e => setSettings({ ...settings, twitter: e.target.value })} placeholder="https://twitter.com/your-school" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Youtube size={18} color="#FF0000" /> YouTube Channel</label>
                      <input className="form-input" value={settings.youtube} onChange={e => setSettings({ ...settings, youtube: e.target.value })} placeholder="https://youtube.com/c/your-channel" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Instagram size={18} color="#E4405F" /> Instagram Profile</label>
                      <input className="form-input" value={settings.instagram} onChange={e => setSettings({ ...settings, instagram: e.target.value })} placeholder="https://instagram.com/your-school" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="card">
                <div className="card-header"><h3>Fee Configuration</h3></div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group"><label className="form-label">Late Fee Amount (Rs)</label><input type="number" className="form-input" value={settings.lateFeeAmount} onChange={e => setSettings({ ...settings, lateFeeAmount: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Late Fee After (Days)</label><input type="number" className="form-input" value={settings.lateFeeAfterDays} onChange={e => setSettings({ ...settings, lateFeeAfterDays: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Working Days/Month</label><input type="number" className="form-input" value={settings.workingDays} onChange={e => setSettings({ ...settings, workingDays: e.target.value })} /></div>
                  </div>
                  <div style={{ marginTop: '20px', padding: '16px', background: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-100)' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Payment Methods</h4>
                    {['JazzCash', 'Easypaisa', 'Bank Transfer (IBAN)', 'Cash'].map(m => (
                      <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#1a56db' }} /> <span style={{ fontSize: '0.9rem' }}>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card">
                <div className="card-header"><h3>Notification Settings</h3></div>
                <div className="card-body">
                  {[{ key: 'notifyEmail', label: 'Email Notifications', desc: 'Send notifications via email' }, { key: 'notifySms', label: 'SMS Alerts', desc: 'Send SMS alerts to parents' }, { key: 'notifyWhatsapp', label: 'WhatsApp', desc: 'WhatsApp integration' }, { key: 'notifyPush', label: 'Push Notifications', desc: 'Mobile push notifications' }].map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <div><p style={{ fontWeight: 600 }}>{item.label}</p><p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{item.desc}</p></div>
                      <button onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        style={{ width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', position: 'relative', background: settings[item.key] ? '#1a56db' : '#e2e8f0', transition: 'all 0.2s' }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: settings[item.key] ? 25 : 3, transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="card">
                <div className="card-header"><h3>Appearance</h3></div>
                <div className="card-body">
                  <div className="form-group"><label className="form-label">Primary Color</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input type="color" value={settings.primaryColor} onChange={e => setSettings({ ...settings, primaryColor: e.target.value })} style={{ width: 48, height: 48, border: 'none', cursor: 'pointer', borderRadius: '8px' }} />
                      <input className="form-input" style={{ width: 150 }} value={settings.primaryColor} onChange={e => setSettings({ ...settings, primaryColor: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    {['#1a56db', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'].map(c => (
                      <button key={c} onClick={() => setSettings({ ...settings, primaryColor: c })}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: c, border: settings.primaryColor === c ? '3px solid #1e293b' : '3px solid transparent', cursor: 'pointer' }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card">
                <div className="card-header"><h3>Security Settings</h3></div>
                <div className="card-body">
                  <div style={{ padding: '20px', background: 'var(--gray-50)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--gray-100)' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Password Policy</h4>
                    {['Minimum 8 characters', 'At least one uppercase letter', 'At least one number', 'At least one special character'].map((r, i) => (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <input type="checkbox" defaultChecked={i < 2} style={{ accentColor: '#1a56db' }} /> <span style={{ fontSize: '0.85rem' }}>{r}</span>
                      </label>
                    ))}
                  </div>
                  <div className="form-group"><label className="form-label">Session Timeout (minutes)</label><input type="number" className="form-input" defaultValue={30} style={{ width: '200px' }} /></div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="card">
                <div className="card-header"><h3>Backup & Restore</h3></div>
                <div className="card-body">
                  <div style={{ padding: '24px', background: 'var(--primary-50)', borderRadius: '12px', textAlign: 'center', marginBottom: '20px', border: '1px solid var(--primary-100)' }}>
                    <Database size={48} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
                    <h3 style={{ marginBottom: '8px' }}>Database Backup</h3>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '16px' }}>Last backup: January 20, 2025 at 2:00 AM</p>
                    <button className="btn btn-primary">Create Backup Now</button>
                  </div>
                  <div style={{ padding: '24px', background: 'var(--warning-light)', borderRadius: '12px', textAlign: 'center', border: '1px solid #fde68a' }}>
                    <Upload size={48} style={{ color: 'var(--warning)', marginBottom: '12px' }} />
                    <h3 style={{ marginBottom: '8px', color: '#92400e' }}>Restore from Backup</h3>
                    <p style={{ color: '#b45309', fontSize: '0.85rem', marginBottom: '16px' }}>Upload a backup file to restore the system</p>
                    <button className="btn btn-secondary"><Upload size={16} /> Upload Backup File</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
