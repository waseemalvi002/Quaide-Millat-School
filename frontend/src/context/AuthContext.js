'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      loading: false,
      login: () => ({ success: false, message: 'Auth not initialized' }),
      logout: () => {},
      updateUser: () => {},
      checkAuth: () => {}
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        try {
          const response = await authAPI.getMe();
          setUser(response.data.data);
        } catch (e) {
          // token invalid
        }
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, data } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      if (typeof window !== 'undefined') {
        window.location.href = `/${data.role}/dashboard`;
      }
      return { success: true };
    } catch (error) {
      // Demo Mode Fallback for client presentation
      if (error.code === 'ERR_NETWORK' || !error.response) {
        let role = 'student';
        if (email.includes('admin')) role = 'admin';
        if (email.includes('teacher')) role = 'teacher';
        if (email.includes('parent')) role = 'parent';
        if (email.includes('staff')) role = 'staff';

        const demoUser = {
          name: role === 'admin' ? 'Hamza Niaz' : email.split('@')[0].toUpperCase(),
          email: email,
          role: role,
          phone: role === 'admin' ? '+923016031213' : '',
          avatar: { url: '' }
        };
        
        localStorage.setItem('token', 'demo_token');
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        if (typeof window !== 'undefined') {
          window.location.href = `/${role}/dashboard`;
        }
        return { success: true };
      }
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = { user, loading, login, logout, updateUser, checkAuth };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;