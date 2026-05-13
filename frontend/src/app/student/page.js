'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen, Calendar, DollarSign, Video, TrendingUp, Clock
} from 'lucide-react';
import styles from './student.module.css';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState({ present: 92, absent: 8 });
  const [fees, setFees] = useState({ paid: 4500, pending: 1500 });
  const [results, setResults] = useState(null);

  const menuItems = [
    { icon: BookOpen, label: 'View Results', href: '/student/results', color: '#3b82f6' },
    { icon: Calendar, label: 'Attendance', href: '/student/attendance', color: '#10b981' },
    { icon: DollarSign, label: 'Fee Details', href: '/student/fees', color: '#f59e0b' },
    { icon: Video, label: 'Online Classes', href: '/student/online-classes', color: '#8b5cf6' },
  ];

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p>Your academic journey at Quaid-e-Millat School</p>
          </div>
          <div className={styles.studentInfo}>
            <div className={styles.avatar}>
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <span>{user?.name?.charAt(0) || 'S'}</span>
              )}
            </div>
            <div>
              <p className={styles.rollNo}>Roll No: QM-01-001</p>
              <p className={styles.classInfo}>Class: 5 - Section A</p>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className={styles.quickAccess}>
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className={styles.accessCard} style={{ '--accent': item.color }}>
              <div className={styles.accessIcon}>
                <item.icon size={24} />
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}>
              <Calendar size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{attendance.present}%</h3>
              <p>Attendance</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <DollarSign size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>Rs {fees.pending.toLocaleString()}</h3>
              <p>Fee Pending</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#ede9fe', color: '#8b5cf6' }}>
              <TrendingUp size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>A+</h3>
              <p>Grade</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#ef4444' }}>
              <Clock size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>3</h3>
              <p>Upcoming Classes</p>
            </div>
          </div>
        </div>

        {/* Fee Status */}
        <div className={styles.sectionGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Fee Status</h3>
              <DollarSign size={20} color="#f59e0b" />
            </div>
            <div className={styles.feeDetails}>
              <div className={styles.feeItem}>
                <span>Monthly Fee</span>
                <span>Rs 1,500</span>
              </div>
              <div className={styles.feeItem}>
                <span>Paid (3 months)</span>
                <span className={styles.paid}>Rs 4,500</span>
              </div>
              <div className={styles.feeItem}>
                <span>Pending</span>
                <span className={styles.pending}>Rs 1,500</span>
              </div>
              <button className={styles.payBtn}>Pay Now</button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Recent Results</h3>
              <BookOpen size={20} color="#3b82f6" />
            </div>
            <div className={styles.resultsList}>
              {['Mathematics', 'English', 'Science', 'Urdu'].map((subject, i) => (
                <div key={i} className={styles.resultItem}>
                  <span>{subject}</span>
                  <span className={styles.marks}>85/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}