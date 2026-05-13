const mongoose = require('mongoose');

const onlineClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['zoom', 'google-meet', 'custom'],
    default: 'zoom'
  },
  meetingUrl: String,
  meetingId: String,
  password: String,
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  scheduledAt: {
    type: Date,
    default: Date.now
  },
  startedAt: Date,
  endedAt: Date,
  notes: String,
  cancellationReason: String,
  materials: [{
    title: String,
    url: String,
    type: String
  }],
  attendance: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused']
    },
    joinedAt: Date,
    leftAt: Date,
    notes: String,
    markedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

// Virtual for join URL
onlineClassSchema.virtual('joinUrl').get(function() {
  return this.meetingUrl || `https://school.zoom.us/j/${this.meetingId}`;
});

onlineClassSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('OnlineClass', onlineClassSchema);