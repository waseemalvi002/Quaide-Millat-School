# Quaid-e-Millat Public Boys High School - Management System

## Project Overview

**Project Name:** Quaid-e-Millat School Management System
**Project Type:** Full-stack Web & Mobile Application
**Core Functionality:** Complete school management with student, teacher, staff, fee, attendance, results, and online class management
**Target Users:** Admin, Teachers, Students, Parents, Staff

---

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with role-based access control
- **Real-time:** Socket.io
- **File Storage:** Cloudinary
- **Email:** Nodemailer
- **PDF Generation:** PDFKit

### Frontend (Web)
- **Framework:** Next.js 16
- **UI:** Custom CSS with CSS Modules
- **Charts:** Chart.js
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Frontend (Mobile)
- **Framework:** React Native 0.73
- **Navigation:** React Navigation
- **Storage:** AsyncStorage

---

## Features Implemented

### 1. Authentication System
- JWT-based authentication
- Role-based access control (Admin, Teacher, Student, Parent, Staff)
- Password change functionality
- Profile management

### 2. Student Management
- Complete student profiles (name, father name, class, section, roll number, age, image, contact)
- Roll number based search (public access)
- Attendance tracking
- Academic history
- Fee category management

### 3. Teacher Management
- Teacher profiles with images
- Subject & class assignment
- Attendance system
- Result upload system
- Salary management integration

### 4. Staff Management
- Staff records (CNIC, role, salary)
- Attendance tracking
- Payroll integration

### 5. Result System
- Subject-wise marks
- Grades, percentage, class position
- PDF report card generation
- Weekly, monthly, exam results

### 6. Fee Management
- Monthly student fee system
- Paid/unpaid tracking
- Late fee calculation
- PDF fee receipts
- Parent dashboard for fee status

### 7. Salary Management
- Teacher & staff payroll system
- Monthly salary records
- Bonus and deductions
- Salary slips (PDF)
- Attendance-based salary calculation

### 8. Digital Payment System
- JazzCash integration
- Easypaisa integration
- Bank Transfer (IBAN)
- Manual verification via screenshot upload
- Transaction history
- Receipt generation

### 9. Online Classes
- Integration with Zoom/Google Meet
- Live class scheduling
- Join links
- Class attendance tracking

### 10. Image Management System
- Cloudinary integration
- Default placeholder images
- Admin upload/replace/delete
- isDefault flag for images

### 11. Notification System
- Real-time notifications (Socket.io)
- Email notifications
- Role-based notification distribution

### 12. Gallery Management
- Image gallery by category
- Admin image management
- Public/Private gallery items

### 13. Admin Dashboard
- Analytics (students, teachers, staff)
- Financial reports (fees, salaries)
- Attendance overview
- Performance insights

---

## Database Models

### User Model
- name, email, password, role, phone, avatar, isActive, lastLogin, branch

### Student Model
- user reference, personal info, academic info, contact, parent details, profile image, status, fee details, academic history

### Teacher Model
- user reference, personal info, employee details, qualification, subjects, designation, salary details, profile image

### Staff Model
- user reference, personal info, employee details, role, salary details, profile image

### Class Model
- name, numericLevel, category, sections, subjects, monthlyFee, academicYear

### Subject Model
- name, code, class reference, teacher, type, totalMarks, passMarks

### Attendance Model
- student/class reference, date, status, markedBy

### Result Model
- student reference, examType, term, subjects array with marks, totalMarks, percentage, grade, position

### Fee Model
- student reference, feeType, month, amount, dueDate, status, payment details

### Salary Model
- employee reference, employeeType, month, year, basicSalary, allowances, deductions, workingDays, status, payment details

### Payment Model
- student reference, amount, month, year, method, status, transaction details, receipt image

### OnlineClass Model
- title, teacher, class, subject, date, time, platform, meetingUrl, status, attendance, materials

### Gallery Model
- title, description, category, images array, uploadedBy, isPublic

### Notification Model
- recipient, sender, title, message, type, priority, isRead

---

## API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/profile
- PUT /api/auth/change-password

### Student Routes
- GET /api/students (with pagination, search)
- GET /api/students/search/:rollNumber (public)
- GET /api/students/:id
- POST /api/students (admin)
- PUT /api/students/:id
- DELETE /api/students/:id (admin)

### Teacher/Staff Routes
- CRUD operations with role-based access

### Class/Subject Routes
- Full CRUD for classes and subjects

### Fee Routes
- Fee management with bulk generation

### Result Routes
- Result upload and report card generation

### Attendance Routes
- Mark attendance, class-wise attendance

### Salary Routes
- Salary generation, approval, payment

### Payment Routes
- Payment processing, verification

### Online Class Routes
- Class scheduling, live management

### Gallery Routes
- Image management

### Notification Routes
- Send notifications, mark as read

### Dashboard Routes
- Role-specific analytics

---

## User Roles & Permissions

### Admin
- Full access to all modules
- User management
- System settings

### Teacher
- Student management
- Results upload
- Attendance marking
- Online classes

### Student
- View results
- View attendance
- View fee status
- Join online classes

### Parent
- View child progress
- Fee payments
- Notifications

### Staff
- View salary
- Attendance

---

## UI/UX Design

### Color Scheme
- Primary: #1a56db (Blue)
- Secondary: #64748b (Gray)
- Success: #10b981 (Green)
- Warning: #f59e0b (Orange)
- Danger: #ef4444 (Red)

### Typography
- Primary Font: Poppins
- Secondary Font: Inter

### Layout
- Dashboard-based with sidebar navigation
- Card-based UI system
- Fully responsive (mobile, tablet, desktop)

---

## Demo Data

### Default Credentials
- **Admin:** admin@qmschool.edu.pk / admin123
- **Teacher:** ahmed.khan@qmschool.edu.pk / teacher123
- **Student:** student1@qmschool.edu.pk / student123
- **Staff:** rashid@qmschool.edu.pk / staff123

### Sample Data
- 10 Classes (Class 1-10)
- 8 Teachers
- 50 Students
- 4 Staff Members
- Fee records
- Attendance data

---

## Deployment Instructions

### Backend
1. Navigate to backend folder
2. Run `npm install`
3. Configure .env file with MongoDB URI, JWT_SECRET, Cloudinary credentials
4. Run `npm run dev` for development
5. Run `npm run seed` to seed demo data

### Frontend (Web)
1. Navigate to frontend folder
2. Run `npm install`
3. Configure .env.local with API URL
4. Run `npm run dev`

### Mobile App
1. Navigate to mobile folder
2. Run `npm install`
3. Run `react-native run-android` or `react-native run-ios`

---

## Project Structure

```
Quaid-e-Millat School/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── ...
├── mobile/
│   ├── src/
│   │   └── screens/
│   ├── App.js
│   ├── index.js
│   └── package.json
└── SPEC.md
```

---

## Scalability Features

- Multi-branch support ready
- Class expansion to 11, 12, College ready
- Modular code structure
- Role-based access for future expansions
- Cloudinary for scalable image storage

---

**Version:** 1.0.0
**Last Updated:** May 2025
**Created for:** Quaid-e-Millat Public Boys High School