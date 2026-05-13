const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const { type, isRead, page = 1, limit = 20 } = req.query;
    const query = { recipient: req.user._id };
    if (type) query.type = type;
    if (isRead) query.isRead = isRead === 'true';

    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .populate('sender', 'name role')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, data: notifications, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ recipient: req.user._id, isRead: false });
    res.json({ success: true, data: { count } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Send notification (admin only)
exports.sendNotification = async (req, res) => {
  try {
    const { recipient, recipients, title, message, type, priority } = req.body;

    let recipientsList = [];
    if (recipients && Array.isArray(recipients)) {
      recipientsList = recipients;
    } else if (recipient) {
      recipientsList = [recipient];
    } else {
      const role = req.body.role;
      const users = await User.find({ role: role ? role : { $ne: 'admin' } }).select('_id');
      recipientsList = users.map(u => u._id);
    }

    const notifications = recipientsList.map(r => ({
      recipient: r,
      sender: req.user._id,
      title,
      message,
      type: type || 'general',
      priority: priority || 'normal'
    }));

    const created = await Notification.insertMany(notifications);

    // Emit socket event
    const io = req.app.get('io');
    created.forEach(n => {
      io.to(`user_${n.recipient}`).emit('notification', n);
    });

    res.status(201).json({ success: true, data: created, count: created.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Send email notification
exports.sendEmailNotification = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    // Email sending logic will be handled by a separate email service
    // For now, create a notification record
    const user = await User.findOne({ email });
    if (user) {
      await Notification.create({
        recipient: user._id,
        sender: req.user._id,
        title: subject,
        message,
        type: 'email'
      });
    }
    res.json({ success: true, message: 'Email notification queued' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get notification templates
exports.getTemplates = async (req, res) => {
  const templates = [
    { id: 'fee_reminder', name: 'Fee Reminder', variables: ['studentName', 'amount', 'dueDate'] },
    { id: 'result_published', name: 'Result Published', variables: ['studentName', 'examType'] },
    { id: 'attendance_alert', name: 'Attendance Alert', variables: ['studentName', 'absentDays'] },
    { id: 'general', name: 'General Notice', variables: ['title', 'message'] }
  ];
  res.json({ success: true, data: templates });
};