'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import styles from './login.module.css';

// Demo users for testing
const DEMO_USERS = {
  'admin@qmschool.edu.pk': { id: '1', name: 'Admin User', role: 'admin', email: 'admin@qmschool.edu.pk', password: 'admin123' },
  'ahmed.khan@qmschool.edu.pk': { id: '2', name: 'Ahmed Khan', role: 'teacher', email: 'ahmed.khan@qmschool.edu.pk', password: 'teacher123' },
  'student1@qmschool.edu.pk': { id: '3', name: 'Ali Khan', role: 'student', email: 'student1@qmschool.edu.pk', password: 'student123', rollNumber: 'QM-05-001' },
  'rashid@qmschool.edu.pk': { id: '4', name: 'Rashid Peon', role: 'staff', email: 'rashid@qmschool.edu.pk', password: 'staff123' },
  'parent@qmschool.edu.pk': { id: '5', name: 'Parent Guardian', role: 'parent', email: 'parent@qmschool.edu.pk', password: 'parent123' }
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check demo credentials first
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      const token = 'demo-token-' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id: demoUser.id, name: demoUser.name, email: demoUser.email, role: demoUser.role }));
      router.push(`/${demoUser.role}`);
      setLoading(false);
      return;
    }

    // Try API login
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        router.push(`/${user.role}`);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError('Invalid credentials. Try demo accounts below!');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}>
        <div className={styles.pattern}></div>
      </div>

      <div className={styles.loginBox}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <GraduationCap size={48} />
          </div>
          <h1>Quaid-e-Millat</h1>
          <p>Public Boys High School</p>
          <span className={styles.systemTag}>Management System</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.title}>
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your dashboard</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className={styles.demoAccounts}>
            <p>Demo Accounts:</p>
            <div className={styles.accounts}>
              <span>Admin: admin@qmschool.edu.pk</span>
              <span>Teacher: ahmed.khan@qmschool.edu.pk</span>
              <span>Student: student1@qmschool.edu.pk</span>
              <span>Password: admin123 / teacher123 / student123</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}