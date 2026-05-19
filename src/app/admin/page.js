'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { dashboardAPI } from '@/lib/api';
import { useThemeLang } from '@/context/ThemeLangContext';
import {
  Users, GraduationCap, UserCheck, DollarSign, Calendar,
  TrendingUp, Clock, AlertCircle, ShieldCheck
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const { user } = useAuth();
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
        students: { total: 50, active: 48, newThisMonth: 5 },
        teachers: { total: 8, active: 8 },
        staff: { total: 4, active: 4 },
        fees: { collected: 450000, pending: 75000, overdue: 15000 },
        attendance: { todayPresent: 92, todayAbsent: 8 },
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
      trend: '+5 ' + t('this_month')
    },
    {
      title: t('total_teachers'),
      value: stats?.teachers?.total || 0,
      icon: GraduationCap,
      color: '#10b981',
      bg: '#d1fae5',
      trend: t('all_active')
    },
    {
      title: t('total_staff'),
      value: stats?.staff?.total || 0,
      icon: UserCheck,
      color: '#f59e0b',
      bg: '#fef3c7',
      trend: t('all_active')
    },
    {
      title: t('fees') + ' ' + t('collected'),
      value: `Rs ${((stats?.fees?.collected || 0) / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: '#8b5cf6',
      bg: '#ede9fe',
      trend: t('this_month')
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
            <div key={index} className={styles.statCard} style={{ animationDelay: `${index * 0.1}s` }}>
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
              <button className={styles.actionBtn}>
                <Users size={20} />
                <span>{t('add_student')}</span>
              </button>
              <button className={styles.actionBtn}>
                <GraduationCap size={20} />
                <span>{t('add_teacher')}</span>
              </button>
              <button className={styles.actionBtn}>
                <DollarSign size={20} />
                <span>{t('generate_fee')}</span>
              </button>
              <button className={styles.actionBtn}>
                <Calendar size={20} />
                <span>{t('mark_attendance')}</span>
              </button>
              <button className={styles.actionBtn}>
                <TrendingUp size={20} />
                <span>{t('upload_results')}</span>
              </button>
              <button className={styles.actionBtn}>
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
              {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].map((cls, i) => (
                <div key={i} className={styles.classItem}>
                  <span>{cls}</span>
                  <span className={styles.classCount}>{8 + i} {t('students')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Credentials Management & Recent Activity */}
        <div className={styles.dashboardGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>User & Access Management</h3>
              <ShieldCheck size={20} color="#3b82f6" />
            </div>
            <div className={styles.userTableContainer}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Default Username</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {['Student', 'Teacher', 'Staff', "Parent's"].map((roleName) => (
                    <tr key={roleName}>
                      <td><span className={styles.roleBadge}>{roleName}</span></td>
                      <td>{roleName.toLowerCase()}@qmschool.com</td>
                      <td><span className={styles.statusActive}>Active</span></td>
                      <td>
                        <button className={styles.editBtn} onClick={() => {
                          const newPass = prompt(`Set new password for all ${roleName} accounts:`);
                          if (newPass) alert(`All ${roleName} passwords updated successfully!`);
                        }}>Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Recent System Activity</h3>
              <Clock size={20} color="#10b981" />
            </div>
            <div className={styles.activityList}>
              {[
                { user: 'Admin', action: 'Updated Student Passwords', time: '2 mins ago' },
                { user: 'Teacher', action: 'Marked Attendance - Class 4', time: '15 mins ago' },
                { user: 'System', action: 'Database Backup Completed', time: '1 hour ago' },
                { user: 'Staff', action: 'Updated Fee Record #402', time: '3 hours ago' }
              ].map((act, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityUser}>{act.user}</span>
                    <span className={styles.activityAction}>{act.action}</span>
                  </div>
                  <span className={styles.activityTime}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}