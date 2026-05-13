const nodemailer = require('nodemailer');

// Create transporter (configure with actual SMTP credentials in production)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'noreply@qmschool.edu.pk',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
});

const schoolName = 'Quaid-e-Millat Public Boys High School';
const fromEmail = process.env.SMTP_FROM || `"${schoolName}" <noreply@qmschool.edu.pk>`;

// Email template wrapper
const wrapTemplate = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <div style="background:linear-gradient(135deg,#1a56db,#3b82f6);padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:20px;">📚 ${schoolName}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">School Management System</p>
    </div>
    <div style="padding:24px;">${content}</div>
    <div style="background:#1e293b;padding:16px;text-align:center;">
      <p style="color:#94a3b8;margin:0;font-size:12px;">© ${new Date().getFullYear()} ${schoolName}. All rights reserved.</p>
      <p style="color:#64748b;margin:4px 0 0;font-size:11px;">This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>`;

// Send Welcome Email
const sendWelcomeEmail = async (to, name, role, password) => {
  const html = wrapTemplate(`
    <h2 style="color:#1e293b;margin:0 0 16px;">Welcome, ${name}! 🎉</h2>
    <p style="color:#64748b;">Your account has been created for ${schoolName}.</p>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 8px;"><strong>Role:</strong> ${role}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${to}</p>
      <p style="margin:0;"><strong>Temporary Password:</strong> ${password}</p>
    </div>
    <p style="color:#64748b;">Please change your password after first login.</p>
    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
       style="display:inline-block;background:#1a56db;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:12px;">
      Login Now →
    </a>
  `);
  
  return transporter.sendMail({ from: fromEmail, to, subject: `Welcome to ${schoolName}`, html });
};

// Send Fee Reminder
const sendFeeReminder = async (to, studentName, month, amount, dueDate) => {
  const html = wrapTemplate(`
    <h2 style="color:#1e293b;margin:0 0 16px;">Fee Reminder 💰</h2>
    <p style="color:#64748b;">This is a reminder that the following fee is due:</p>
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 8px;"><strong>Student:</strong> ${studentName}</p>
      <p style="margin:0 0 8px;"><strong>Month:</strong> ${month}</p>
      <p style="margin:0 0 8px;"><strong>Amount:</strong> Rs ${amount?.toLocaleString()}</p>
      <p style="margin:0;"><strong>Due Date:</strong> ${dueDate}</p>
    </div>
    <p style="color:#ef4444;font-size:13px;">⚠️ Late fee will be applied after the due date.</p>
  `);
  
  return transporter.sendMail({ from: fromEmail, to, subject: `Fee Reminder - ${month}`, html });
};

// Send Result Notification
const sendResultNotification = async (to, studentName, examType, term, percentage, grade) => {
  const gradeColor = parseFloat(percentage) >= 80 ? '#10b981' : parseFloat(percentage) >= 60 ? '#f59e0b' : '#ef4444';
  const html = wrapTemplate(`
    <h2 style="color:#1e293b;margin:0 0 16px;">Result Published 📊</h2>
    <p style="color:#64748b;">${examType} exam results for ${term} have been published.</p>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:16px 0;text-align:center;">
      <p style="margin:0 0 8px;"><strong>${studentName}</strong></p>
      <div style="display:inline-block;margin:8px;">
        <p style="font-size:2rem;font-weight:bold;color:${gradeColor};margin:0;">${grade}</p>
        <p style="color:#64748b;font-size:12px;margin:0;">Grade</p>
      </div>
      <div style="display:inline-block;margin:8px;">
        <p style="font-size:2rem;font-weight:bold;color:${gradeColor};margin:0;">${percentage}%</p>
        <p style="color:#64748b;font-size:12px;margin:0;">Percentage</p>
      </div>
    </div>
    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
       style="display:inline-block;background:#1a56db;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">
      View Full Report →
    </a>
  `);
  
  return transporter.sendMail({ from: fromEmail, to, subject: `Result: ${examType} - ${term}`, html });
};

// Send General Notification
const sendNotificationEmail = async (to, title, message) => {
  const html = wrapTemplate(`
    <h2 style="color:#1e293b;margin:0 0 16px;">${title}</h2>
    <p style="color:#64748b;">${message}</p>
  `);
  
  return transporter.sendMail({ from: fromEmail, to, subject: title, html });
};

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendFeeReminder,
  sendResultNotification,
  sendNotificationEmail,
};
