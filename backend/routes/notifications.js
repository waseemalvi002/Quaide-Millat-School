const express = require('express');
const router = express.Router();
const {
  getNotifications, getUnreadCount, markAsRead, markAllAsRead,
  sendNotification, deleteNotification, sendEmailNotification, getTemplates
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.get('/templates', getTemplates);
router.put('/mark-all-read', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

// Admin routes
router.post('/send', authorize('admin'), sendNotification);
router.post('/email', authorize('admin'), sendEmailNotification);

module.exports = router;