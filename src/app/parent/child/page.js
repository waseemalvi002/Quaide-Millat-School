'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, FileText, Calendar, DollarSign } from 'lucide-react';

export default function ParentChild() {
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>My Child</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>View your child&apos;s profile and progress</p>
        <div className="card" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>AK</div>
              <h2 style={{ fontSize: '1.2rem' }}>Ali Khan</h2>
              <span className="badge badge-primary">QM-05-001</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['Father Name', 'Imran Khan'], ['Class', 'Class 5-A'], ['Age', '11 years'], ['Phone', '0300-1234567'], ['Attendance', '94%'], ['Last Grade', 'A']].map(([l, v], i) => (
                <div key={i} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px' }}>{l}</p>
                  <p style={{ fontWeight: 600 }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
              <a href="/parent/results" className="btn btn-primary" style={{ justifyContent: 'center' }}><FileText size={16} /> Results</a>
              <a href="/parent/attendance" className="btn btn-secondary" style={{ justifyContent: 'center' }}><Calendar size={16} /> Attendance</a>
              <a href="/parent/fees" className="btn btn-secondary" style={{ justifyContent: 'center' }}><DollarSign size={16} /> Fees</a>
              <a href="/parent/notifications" className="btn btn-secondary" style={{ justifyContent: 'center' }}>🔔 Notices</a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
