require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000', methods: ['GET', 'POST'] }
});

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

// Static files
app.use('/images', express.static('public/images'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/results', require('./routes/results'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/salary', require('./routes/salary'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/online-classes', require('./routes/onlineClasses'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quaid-e-Millat School API is running', timestamp: new Date() });
});

// Socket.io connections
io.on('connection', (socket) => {
  console.log('📡 Client connected:', socket.id);
  socket.on('join-room', (room) => socket.join(room));
  socket.on('notification', (data) => io.to(data.room).emit('notification', data));
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Make io accessible in routes
app.set('io', io);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🏫 Quaid-e-Millat School Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
