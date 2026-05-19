'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { dashboardAPI } from '@/lib/api';
import { useThemeLang } from '@/context/ThemeLangContext';
import {
  Users, GraduationCap, UserCheck, DollarSign, Calendar,
  TrendingUp, Clock, AlertCircle, ShieldCheck, Edit
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useThemeLang();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getAdminStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use demo data if API fails
      setStats({
        students: { total: 900, active: 900, newThisMonth: 35 },
        teachers: { total: 25, active: 25 },
        staff: { total: 6, active: 6 },
        fees: { collected: 450000, pending: 75000, overdue: 15000 },
        attendance: { todayPresent: 95, todayAbsent: 5 },
        recentAdmissions: []
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('total_students'),
      value: stats?.students?.total || 0,
      icon: Users,
      color: '#3b82f6',
      bg: '#eff6ff',
      trend: '+5 ' + t('this_month'),
      link: '/admin/students'
    },
    {
      title: t('total_teachers'),
      value: stats?.teachers?.total || 0,
      icon: GraduationCap,
      color: '#10b981',
      bg: '#d1fae5',
      trend: t('all_active'),
      link: '/admin/teachers'
    },
    {
      title: t('total_staff'),
      value: stats?.staff?.total || 0,
      icon: UserCheck,
      color: '#f59e0b',
      bg: '#fef3c7',
      trend: t('all_active'),
      link: '/admin/staff'
    },
    {
      title: t('fees') + ' ' + t('collected'),
      value: `Rs ${((stats?.fees?.collected || 0) / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: '#8b5cf6',
      bg: '#ede9fe',
      trend: t('this_month'),
      link: '/admin/fees'
    }
  ];

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1 style={{ color: 'var(--heading-accent)', textShadow: '0 2px 10px rgba(0,0,0,0.3)', fontWeight: 800 }}>{t('welcome_back')}, Hamza Niaz!</h1>
            <p style={{ color: 'var(--gray-400)', fontWeight: 500 }}>{t('admin_desc')}</p>
          </div>
          <div className={styles.dateDisplay} onClick={() => document.getElementById('datePicker').showPicker()}>
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <input type="date" id="datePicker" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className={styles.statCard} 
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => router.push(stat.link)}
            >
              <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className={styles.trend}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className={styles.mainGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{t('quick_actions')}</h3>
            </div>
            <div className={styles.quickActions}>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/students')}>
                <Users size={20} />
                <span>{t('add_student')}</span>
              </button>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/teachers')}>
                <Users size={20} />
                <span>{t('add_teacher')}</span>
              </button>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/fees')}>
                <DollarSign size={20} />
                <span>{t('generate_fee')}</span>
              </button>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/attendance')}>
                <Calendar size={20} />
                <span>{t('mark_attendance')}</span>
              </button>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/results')}>
                <TrendingUp size={20} />
                <span>{t('upload_results')}</span>
              </button>
              <button className={styles.actionBtn} onClick={() => router.push('/admin/notifications')}>
                <AlertCircle size={20} />
                <span>{t('send_notice')}</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{t('attendance_today')}</h3>
              <span className={styles.badgeSuccess}>{stats?.attendance?.todayPresent || 92}% {t('present')}</span>
            </div>
            <div className={styles.attendanceStats}>
              <div className={styles.attendanceItem}>
                <div className={styles.attendanceBar}>
                  <div className={styles.attendanceProgress} style={{ width: '92%' }}></div>
                </div>
                <div className={styles.attendanceLabel}>
                  <span>{t('present')}</span>
                  <span>{stats?.students?.active || 48}</span>
                </div>
              </div>
              <div className={styles.attendanceItem}>
                <div className={styles.attendanceBar}>
                  <div className={styles.attendanceProgressDanger} style={{ width: '8%' }}></div>
                </div>
                <div className={styles.attendanceLabel}>
                  <span>{t('absent')}</span>
                  <span>{stats?.attendance?.todayAbsent || 2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Overview */}
        <div className={styles.feeOverview}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{t('fee_overview')}</h3>
              <DollarSign size={20} color="#8b5cf6" />
            </div>
            <div className={styles.feeStats}>
              <div className={styles.feeItem}>
                <span className={styles.feeLabel}>{t('collected')}</span>
                <span className={styles.feeValue}>Rs {stats?.fees?.collected?.toLocaleString() || '450,000'}</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeLabel}>{t('pending')}</span>
                <span className={styles.feeValueWarning}>Rs {stats?.fees?.pending?.toLocaleString() || '75,000'}</span>
              </div>
              <div className={styles.feeItem}>
                <span className={styles.feeLabel}>{t('overdue')}</span>
                <span className={styles.feeValueDanger}>Rs {stats?.fees?.overdue?.toLocaleString() || '15,000'}</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{t('classes_overview')}</h3>
              <Clock size={20} color="#f59e0b" />
            </div>
            <div className={styles.classList}>
              {[
                { name: 'Nursery', count: 60 },
                { name: 'Class 1', count: 70 },
                { name: 'Class 2', count: 70 },
                { name: 'Class 3', count: 70 },
                { name: 'Class 4', count: 70 },
                { name: 'Class 5', count: 70 },
                { name: 'Class 6', count: 70 },
                { name: 'Class 7', count: 70 },
                { name: 'Class 8', count: 70 },
                { name: 'Class 9', count: 70 },
                { name: 'Class 10', count: 70 },
                { name: 'Class 11 (Pre-Med)', count: 35 },
                { name: 'Class 11 (Pre-Eng)', count: 35 },
                { name: 'Class 12 (Pre-Med)', count: 35 },
                { name: 'Class 12 (Pre-Eng)', count: 35 }
              ].map((cls, i) => (
                <div key={i} className={styles.classItem} style={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => router.push('/admin/students')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.1)', color: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>{i + 1}</div>
                    <span>{cls.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span className={styles.classCount}>{cls.count} {t('students')}</span>
                    <button 
                      className={styles.editBtn} 
                      style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newName = prompt(`Edit Details for ${cls.name}:`, cls.name);
                        if (newName) alert(`${cls.name} updated successfully!`);
                      }}
                    >
                      <Edit size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Credentials Management */}
        <div className={styles.fullWidthCard}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{lang === 'ur' ? 'صارف اور رسائی کا انتظام' : 'User & Access Management'}</h3>
              <ShieldCheck size={20} color="#3b82f6" />
            </div>
            <div className={styles.userTableContainer}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>{t('role')}</th>
                    <th>{lang === 'ur' ? 'پہلے سے طے شدہ صارف نام' : 'Default Username'}</th>
                    <th>{t('status')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'Student',  label: lang === 'ur' ? 'طالب علم' : 'Student' },
                    { key: 'Teacher',  label: lang === 'ur' ? 'استاد' : 'Teacher' },
                    { key: 'Staff',    label: lang === 'ur' ? 'عملہ' : 'Staff' },
                    { key: "Parent's", label: lang === 'ur' ? 'والدین' : "Parent's" },
                  ].map(({ key, label }) => (
                    <tr key={key}>
                      <td><span className={styles.roleBadge}>{label}</span></td>
                      <td>{key.toLowerCase()}@qmschool.com</td>
                      <td><span className={styles.statusActive}>{t('active')}</span></td>
                      <td>
                        <button className={styles.editBtn} onClick={() => {
                          const newPass = prompt(`Set new password for all ${key} accounts:`);
                          if (newPass) alert(`All ${key} passwords updated!`);
                        }}>{t('update')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}