'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Download, Eye, X } from 'lucide-react';
import { useState } from 'react';

const DEMO = [
  { _id: '1', examType: 'Monthly', term: 'January 2025', obtained: 420, total: 500, percentage: 84, grade: 'A', position: 2 },
  { _id: '2', examType: 'Weekly', term: 'Week 2 Jan', obtained: 198, total: 250, percentage: 79.2, grade: 'B+', position: 3 },
  { _id: '3', examType: 'Monthly', term: 'December 2024', obtained: 380, total: 500, percentage: 76, grade: 'B+', position: 4 },
];

export default function ParentResults() {
  const gradeColors = { 'A+': '#059669', 'A': '#10b981', 'B+': '#3b82f6', 'B': '#60a5fa', 'C': '#f59e0b' };
  return (
    <DashboardLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Child&apos;s Results</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Academic performance of Ali Khan (QM-05-001)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {DEMO.map(r => (
            <div key={r._id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-info">{r.examType}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{r.term}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', margin: '16px 0' }}>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: gradeColors[r.grade] }}>{r.grade}</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Grade</p></div>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: r.percentage >= 80 ? '#10b981' : '#f59e0b' }}>{r.percentage}%</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Percentage</p></div>
                  <div><p style={{ fontSize: '1.5rem', fontWeight: 800 }}>#{r.position}</p><p style={{ fontSize: '0.7rem', color: '#64748b' }}>Position</p></div>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>{r.obtained}/{r.total} marks</p>
                <div style={{ textAlign: 'right', marginTop: '12px' }}><button className="btn btn-sm btn-secondary"><Download size={14} /> PDF</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
