'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Users, BookOpen, Calendar, DollarSign } from 'lucide-react';
import styles from './parent.module.css';

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Welcome, Parent!</h1>
            <p>Monitor your child&apos;s progress</p>
          </div>
        </div>

        <div className={styles.childCard}>
          <div className={styles.childAvatar}>A</div>
          <div className={styles.childInfo}>
            <h3>Ali Ahmed</h3>
            <p>Class 5-A | Roll No: QM-05-001</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}><Calendar size={24} color="#10b981" /><div><h3>94%</h3><p>Attendance</p></div></div>
          <div className={styles.statCard}><BookOpen size={24} color="#3b82f6" /><div><h3>A Grade</h3><p>Performance</p></div></div>
          <div className={styles.statCard}><DollarSign size={24} color="#f59e0b" /><div><h3>Rs 1,500</h3><p>Fee Pending</p></div></div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Latest Results</h3></div>
            <div className={styles.list}>
              {['Mathematics: 92%', 'English: 88%', 'Science: 85%'].map((r, i) => <div key={i}>{r}</div>)}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Fee Status</h3></div>
            <div className={styles.list}>
              <div>April 2025: <span className={styles.paid}>Paid</span></div>
              <div>May 2025: <span className={styles.pending}>Pending</span></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}