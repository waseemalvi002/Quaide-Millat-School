'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { DollarSign, Calendar, Clock } from 'lucide-react';
import styles from './staff.module.css';

export default function StaffDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p>Your dashboard</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}><DollarSign size={24} color="#10b981" /><div><h3>Rs 35,000</h3><p>Monthly Salary</p></div></div>
          <div className={styles.statCard}><Calendar size={24} color="#3b82f6" /><div><h3>26/26</h3><p>Working Days</p></div></div>
          <div className={styles.statCard}><Clock size={24} color="#f59e0b" /><div><h3>5 Years</h3><p>Service</p></div></div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Salary Details (May 2025)</h3></div>
            <div className={styles.salaryDetails}>
              <div className={styles.salaryItem}><span>Basic Salary</span><span>Rs 30,000</span></div>
              <div className={styles.salaryItem}><span>Allowances</span><span>Rs 5,000</span></div>
              <div className={styles.salaryItem}><span>Deductions</span><span>Rs 0</span></div>
              <div className={styles.salaryItem}><span>Net Salary</span><span className={styles.net}>Rs 35,000</span></div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Attendance This Month</h3></div>
            <div className={styles.attendance}>
              <div className={styles.attItem}><span>Present</span><span className={styles.present}>26 days</span></div>
              <div className={styles.attItem}><span>Absent</span><span className={styles.absent}>0 days</span></div>
              <div className={styles.attItem}><span>Leave</span><span className={styles.leave}>0 days</span></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}