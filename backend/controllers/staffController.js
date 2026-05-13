const Staff = require('../models/Staff');
const User = require('../models/User');

exports.getStaffMembers = async (req, res) => {
  try {
    const { search, status, role, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Staff.countDocuments(query);
    const staff = await Staff.find(query)
      .populate('user', 'name email')
      .skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
    res.json({ success: true, data: staff, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('user', 'name email');
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createStaffMember = async (req, res) => {
  try {
    const { email, password, ...staffData } = req.body;
    const user = await User.create({
      name: `${staffData.firstName} ${staffData.lastName}`,
      email, password: password || 'staff123', role: 'staff'
    });
    staffData.user = user._id;
    const staff = await Staff.create(staffData);
    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
    res.json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
    await User.findByIdAndDelete(staff.user);
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Staff member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
