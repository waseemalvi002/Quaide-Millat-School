'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useThemeLang } from '@/context/ThemeLangContext';
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, DollarSign,
  FileText, Calendar, Image, Bell, Settings, LogOut, Menu, X,
  BookOpen, Clock, CreditCard, Video, ChevronDown, Sun, Moon, Globe
} from 'lucide-react';
import styles from './DashboardLayout.module.css';

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Students', href: '/admin/students' },
    { icon: GraduationCap, label: 'Teachers', href: '/admin/teachers' },
    { icon: UserCheck, label: 'Staff', href: '/admin/staff' },
    { icon: BookOpen, label: 'Classes', href: '/admin/classes' },
    { icon: FileText, label: 'Results', href: '/admin/results' },
    { icon: DollarSign, label: 'Fees', href: '/admin/fees' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: Clock, label: 'Salary', href: '/admin/salary' },
    { icon: Video, label: 'Online Classes', href: '/admin/online-classes' },
    { icon: Calendar, label: 'Attendance', href: '/admin/attendance' },
    { icon: Users, label: 'Meetings', href: '/admin/meetings' },
    { icon: Image, label: 'Gallery', href: '/admin/gallery' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher' },
    { icon: Users, label: 'My Students', href: '/teacher/students' },
    { icon: FileText, label: 'Results', href: '/teacher/results' },
    { icon: Calendar, label: 'Attendance', href: '/teacher/attendance' },
    { icon: Video, label: 'Online Classes', href: '/teacher/online-classes' },
    { icon: Users, label: 'Meetings', href: '/teacher/meetings' },
    { icon: Bell, label: 'Notifications', href: '/teacher/notifications' },
  ],
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
    { icon: FileText, label: 'My Results', href: '/student/results' },
    { icon: Calendar, label: 'Attendance', href: '/student/attendance' },
    { icon: DollarSign, label: 'My Fees', href: '/student/fees' },
    { icon: Video, label: 'Online Classes', href: '/student/online-classes' },
    { icon: Bell, label: 'Notifications', href: '/student/notifications' },
  ],
  parent: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/parent' },
    { icon: Users, label: 'My Child', href: '/parent/child' },
    { icon: FileText, label: 'Results', href: '/parent/results' },
    { icon: Calendar, label: 'Attendance', href: '/parent/attendance' },
    { icon: DollarSign, label: 'Fees', href: '/parent/fees' },
    { icon: Bell, label: 'Notifications', href: '/parent/notifications' },
  ],
  staff: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/staff' },
    { icon: DollarSign, label: 'My Salary', href: '/staff/salary' },
    { icon: Calendar, label: 'Attendance', href: '/staff/attendance' },
    { icon: Bell, label: 'Notifications', href: '/staff/notifications' },
  ],
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme, lang, toggleLang, t } = useThemeLang();

  const role = user?.role || 'admin';
  const items = menuItems[role] || menuItems.admin;

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logo3d} style={{ background: 'transparent', padding: 0 }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div>
              <h2>QM School</h2>
              <p>Management System</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{t(item.label.toLowerCase().replace(' ', '_'))}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={18} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className={styles.headerTitle}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--heading-accent)' }}>
                {t('welcome_back')}, {user?.role === 'admin' ? 'Hamza Niaz' : (user?.name || 'User')}!
              </h1>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.langBtn} onClick={toggleLang} title={lang === 'en' ? 'Switch to Urdu' : 'Switch to English'}>
              <Globe size={18} />
              <span>{lang === 'en' ? 'UR' : 'EN'}</span>
            </button>
            
            <button className={styles.themeBtn} onClick={toggleTheme} title={theme === 'light' ? t('dark_mode') : t('light_mode')}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link href="/notifications" className={styles.notificationBtn}>
              <Bell size={18} />
              <span className={styles.notificationBadge}>3</span>
            </Link>

            <div className={styles.profile}>
              <div className={styles.avatar}>
                {user?.avatar?.url ? (
                  <img src={user.avatar.url} alt={user.name} />
                ) : (
                  <span>{(user?.role === 'admin' ? 'Hamza Niaz' : (user?.name || 'U')).charAt(0)}</span>
                )}
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>{user?.role === 'admin' ? 'Hamza Niaz' : (user?.name || 'User')}</span>
                <span className={styles.profileRole}>{t(user?.role || 'administrator')}</span>
              </div>
            </div>

            <button onClick={logout} className={styles.headerLogoutBtn}>
              <LogOut size={16} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}