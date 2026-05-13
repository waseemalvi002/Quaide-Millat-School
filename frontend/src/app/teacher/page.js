'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  Users, BookOpen, Calendar, Video, FileText, Clock
} from 'lucide-react';
import styles from './teacher.module.css';

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p>Manage your classes and students</p>
          </div>
          <div className={styles.teacherInfo}>
            <div className={styles.avatar}>
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <span>{user?.name?.charAt(0) || 'T'}</span>
              )}
            </div>
            <div>
              <p className={styles.designation}>Senior Teacher</p>
              <p className={styles.subject}>Mathematics</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <a href="/teacher/students" className={styles.actionCard}>
            <Users size={24} />
            <span>My Students</span>
          </a>
          <a href="/teacher/results" className={styles.actionCard}>
            <FileText size={24} />
            <span>Upload Results</span>
          </a>
          <a href="/teacher/attendance" className={styles.actionCard}>
            <Calendar size={24} />
            <span>Mark Attendance</span>
          </a>
          <a href="/teacher/online-classes" className={styles.actionCard}>
            <Video size={24} />
            <span>Start Class</span>
          </a>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <Users size={24} color="#3b82f6" />
            <div>
              <h3>48</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <BookOpen size={24} color="#10b981" />
            <div>
              <h3>5</h3>
              <p>Classes</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <Calendar size={24} color="#f59e0b" />
            <div>
              <h3>94%</h3>
              <p>Attendance</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <Video size={24} color="#8b5cf6" />
            <div>
              <h3>2</h3>
              <p>Scheduled Classes</p>
            </div>
          </div>
        </div>

        {/* Classes & Schedule */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>My Classes</h3>
            </div>
            <div className={styles.classList}>
              {['Class 5-A', 'Class 6-A', 'Class 7-A', 'Class 8-A'].map((cls, i) => (
                <div key={i} className={styles.classItem}>
                  <span>{cls}</span>
                  <span className={styles.studentCount}>12 students</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Today Schedule</h3>
              <Clock size={20} color="#f59e0b" />
            </div>
            <div className={styles.schedule}>
              <div className={styles.scheduleItem}>
                <span className={styles.time}>9:00 AM</span>
                <div className={styles.scheduleContent}>
                  <span className={styles.subjectName}>Mathematics</span>
                  <span className={styles.className}>Class 5-A</span>
                </div>
              </div>
              <div className={styles.scheduleItem}>
                <span className={styles.time}>10:30 AM</span>
                <div className={styles.scheduleContent}>
                  <span className={styles.subjectName}>Mathematics</span>
                  <span className={styles.className}>Class 6-A</span>
                </div>
              </div>
              <div className={styles.scheduleItem}>
                <span className={styles.time}>1:00 PM</span>
                <div className={styles.scheduleContent}>
                  <span className={styles.subjectName}>Mathematics</span>
                  <span className={styles.className}>Class 7-A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}