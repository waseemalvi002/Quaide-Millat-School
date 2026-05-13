import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Students API
export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  searchByRoll: (rollNumber) => api.get(`/students/search/${rollNumber}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getStats: () => api.get('/students/stats'),
};

// Teachers API
export const teacherAPI = {
  getAll: (params) => api.get('/teachers', { params }),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

// Staff API
export const staffAPI = {
  getAll: (params) => api.get('/staff', { params }),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post('/staff', data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
};

// Classes API
export const classAPI = {
  getAll: (params) => api.get('/classes', { params }),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post('/classes', data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

// Subjects API
export const subjectAPI = {
  getAll: (params) => api.get('/subjects', { params }),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// Fees API
export const feeAPI = {
  getAll: (params) => api.get('/fees', { params }),
  getById: (id) => api.get(`/fees/${id}`),
  create: (data) => api.post('/fees', data),
  update: (id, data) => api.put(`/fees/${id}`, data),
  delete: (id) => api.delete(`/fees/${id}`),
  getStudentFees: (studentId) => api.get(`/fees/student/${studentId}`),
  createBulk: (data) => api.post('/fees/bulk', data),
};

// Results API
export const resultAPI = {
  getAll: (params) => api.get('/results', { params }),
  getById: (id) => api.get(`/results/${id}`),
  create: (data) => api.post('/results', data),
  update: (id, data) => api.put(`/results/${id}`, data),
  delete: (id) => api.delete(`/results/${id}`),
  getStudentResults: (studentId) => api.get(`/results/student/${studentId}`),
  generateReportCard: (studentId, examType) => api.get(`/results/report-card/${studentId}?examType=${examType}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params) => api.get('/attendance', { params }),
  mark: (data) => api.post('/attendance', data),
  markBulk: (data) => api.post('/attendance/bulk', data),
  getStudentAttendance: (studentId) => api.get(`/attendance/student/${studentId}`),
  getClassAttendance: (classId, date) => api.get(`/attendance/class/${classId}?date=${date}`),
};

// Salary API
export const salaryAPI = {
  getAll: (params) => api.get('/salary', { params }),
  getById: (id) => api.get(`/salary/${id}`),
  create: (data) => api.post('/salary', data),
  update: (id, data) => api.put(`/salary/${id}`, data),
  approve: (id) => api.put(`/salary/${id}/approve`),
  markPaid: (id, data) => api.put(`/salary/${id}/mark-paid`, data),
  delete: (id) => api.delete(`/salary/${id}`),
  getStats: (params) => api.get('/salary/stats', { params }),
  generateBulk: (data) => api.post('/salary/generate-bulk', data),
};

// Gallery API
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post('/gallery', data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  addImage: (id, data) => api.post(`/gallery/${id}/images`, data),
  removeImage: (id, imageId) => api.delete(`/gallery/${id}/images/${imageId}`),
  getStats: () => api.get('/gallery/stats'),
};

// Notifications API
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  send: (data) => api.post('/notifications/send', data),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// Payments API
export const paymentAPI = {
  getAll: (params) => api.get('/payments', { params }),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  verify: (id, data) => api.put(`/payments/${id}/verify`, data),
  delete: (id) => api.delete(`/payments/${id}`),
  getStats: (params) => api.get('/payments/stats', { params }),
  initiateJazzCash: (data) => api.post('/payments/jazzcash', data),
  initiateEasypaisa: (data) => api.post('/payments/easypaisa', data),
  recordBankTransfer: (data) => api.post('/payments/bank-transfer', data),
};

// Online Classes API
export const onlineClassAPI = {
  getAll: (params) => api.get('/online-classes', { params }),
  getById: (id) => api.get(`/online-classes/${id}`),
  getUpcoming: () => api.get('/online-classes/upcoming'),
  create: (data) => api.post('/online-classes', data),
  update: (id, data) => api.put(`/online-classes/${id}`, data),
  start: (id) => api.put(`/online-classes/${id}/start`),
  end: (id, data) => api.put(`/online-classes/${id}/end`, data),
  cancel: (id, data) => api.put(`/online-classes/${id}/cancel`, data),
  delete: (id) => api.delete(`/online-classes/${id}`),
  recordAttendance: (id, data) => api.post(`/online-classes/${id}/attendance`, data),
  getStats: () => api.get('/online-classes/stats'),
  generateLink: (id, data) => api.post(`/online-classes/${id}/generate-link`, data),
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: () => api.get('/dashboard/admin'),
  getTeacherStats: (teacherId) => api.get(`/dashboard/teacher?teacherId=${teacherId}`),
  getStudentStats: (studentId) => api.get(`/dashboard/student?studentId=${studentId}`),
  getParentStats: (studentId) => api.get(`/dashboard/parent?studentId=${studentId}`),
};

// Upload API
export const uploadAPI = {
  uploadSingle: (formData) => api.post('/upload/single', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  uploadMultiple: (formData) => api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (publicId) => api.post('/upload/delete', { publicId }),
  updateUserImage: (formData) => api.post('/upload/user', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateStudentImage: (studentId, formData) => api.post(`/upload/student/${studentId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  resetToDefault: (type, id) => api.post('/upload/reset', { type, id }),
};

export default api;