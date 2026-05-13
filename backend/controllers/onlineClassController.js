const OnlineClass = require('../models/OnlineClass');

// @desc Get all online classes
exports.getOnlineClasses = async (req, res) => {
  try {
    const { status, date, teacherId, class: classId, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (date) query.date = { $gte: new Date(date), $lt: new Date(date + 'T23:59:59') };
    if (teacherId) query.teacher = teacherId;
    if (classId) query.class = classId;

    const total = await OnlineClass.countDocuments(query);
    const classes = await OnlineClass.find(query)
      .populate('teacher', 'name')
      .populate('class', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: 1, startTime: 1 });

    res.json({ success: true, data: classes, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single online class
exports.getOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findById(req.params.id)
      .populate('teacher', 'name email')
      .populate('class', 'name numericLevel')
      .populate('students', 'firstName lastName rollNumber');
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });
    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get upcoming classes for student
exports.getStudentUpcomingClasses = async (req, res) => {
  try {
    const now = new Date();
    const classes = await OnlineClass.find({
      status: 'scheduled',
      date: { $gte: now }
    }).populate('teacher', 'name').populate('class', 'name');
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create online class
exports.createOnlineClass = async (req, res) => {
  try {
    const classData = {
      ...req.body,
      createdBy: req.user._id
    };
    const onlineClass = await OnlineClass.create(classData);

    // Emit notification to students
    const io = req.app.get('io');
    io.emit('newClassScheduled', onlineClass);

    res.status(201).json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update online class
exports.updateOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });
    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Start class (teacher)
exports.startClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findByIdAndUpdate(
      req.params.id,
      { status: 'live', startedAt: Date.now() },
      { new: true }
    );
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });

    const io = req.app.get('io');
    io.emit('classStarted', { classId: onlineClass._id, joinUrl: onlineClass.joinUrl });

    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc End class (teacher)
exports.endClass = async (req, res) => {
  try {
    const { notes } = req.body;
    const onlineClass = await OnlineClass.findByIdAndUpdate(
      req.params.id,
      { status: 'completed', endedAt: Date.now(), notes },
      { new: true }
    );
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });

    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Cancel class
exports.cancelClass = async (req, res) => {
  try {
    const { reason } = req.body;
    const onlineClass = await OnlineClass.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', cancellationReason: reason },
      { new: true }
    );
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });

    const io = req.app.get('io');
    io.emit('classCancelled', { classId: onlineClass._id, reason });

    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete online class
exports.deleteOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findByIdAndDelete(req.params.id);
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });
    res.json({ success: true, message: 'Online class deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Record attendance for class
exports.recordAttendance = async (req, res) => {
  try {
    const { studentId, status, notes } = req.body;
    const onlineClass = await OnlineClass.findById(req.params.id);
    if (!onlineClass) return res.status(404).json({ success: false, message: 'Online class not found' });

    const existingIndex = onlineClass.attendance.findIndex(a => a.student.toString() === studentId);
    if (existingIndex > -1) {
      onlineClass.attendance[existingIndex] = { student: studentId, status, notes, markedAt: Date.now() };
    } else {
      onlineClass.attendance.push({ student: studentId, status, notes, markedAt: Date.now() });
    }

    await onlineClass.save();
    res.json({ success: true, data: onlineClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get class statistics
exports.getClassStats = async (req, res) => {
  try {
    const total = await OnlineClass.countDocuments();
    const scheduled = await OnlineClass.countDocuments({ status: 'scheduled' });
    const live = await OnlineClass.countDocuments({ status: 'live' });
    const completed = await OnlineClass.countDocuments({ status: 'completed' });

    const thisWeek = await OnlineClass.countDocuments({
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
    });

    res.json({
      success: true,
      data: { total, scheduled, live, completed, thisWeek }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Generate Zoom/Meet link
exports.generateMeetingLink = async (req, res) => {
  try {
    const { platform } = req.body;
    // Integration with Zoom/Google Meet API would go here
    const meetingId = `${Date.now()}`;
    const joinUrl = platform === 'zoom'
      ? `https://zoom.us/j/${meetingId}`
      : `https://meet.google.com/abc-${meetingId}`;

    const onlineClass = await OnlineClass.findByIdAndUpdate(
      req.params.id,
      { meetingUrl: joinUrl, platform },
      { new: true }
    );

    res.json({ success: true, data: { meetingUrl: joinUrl, platform } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};