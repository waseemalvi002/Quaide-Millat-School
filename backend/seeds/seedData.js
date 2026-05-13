require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Staff = require('../models/Staff');
const Class = require('../models/Class');
const Fee = require('../models/Fee');

const seedData = async () => {
  try {
    await connectDB();
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany(), Student.deleteMany(), Teacher.deleteMany(),
      Staff.deleteMany(), Class.deleteMany(), Fee.deleteMany()
    ]);

    // 1. Create Admin
    console.log('👤 Creating admin...');
    const admin = await User.create({
      name: 'Admin User', email: 'admin@qmschool.edu.pk',
      password: 'admin123', role: 'admin', phone: '0300-1234567'
    });

    // 2. Create Classes (1-10)
    console.log('📚 Creating classes...');
    const classData = [];
    const categories = { 1: 'primary', 2: 'primary', 3: 'primary', 4: 'primary', 5: 'primary',
      6: 'middle', 7: 'middle', 8: 'middle', 9: 'secondary', 10: 'secondary' };
    const subjectsByLevel = {
      primary: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'General Knowledge'],
      middle: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'Science', 'Social Studies', 'Computer'],
      secondary: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Pakistan Studies']
    };
    for (let i = 1; i <= 10; i++) {
      const cat = categories[i];
      const subjects = subjectsByLevel[cat].map(s => ({ name: s, code: s.substring(0, 3).toUpperCase() }));
      classData.push({
        name: `Class ${i}`, numericLevel: i, category: cat,
        sections: [{ name: 'A', capacity: 40 }, { name: 'B', capacity: 40 }],
        subjects, monthlyFee: 1500 + (i * 200), academicYear: '2024-2025'
      });
    }
    const classes = await Class.insertMany(classData);

    // 3. Create Teachers
    console.log('👨‍🏫 Creating teachers...');
    const teacherNames = [
      { f: 'Ahmed', l: 'Khan', sub: ['Mathematics'] },
      { f: 'Muhammad', l: 'Ali', sub: ['English'] },
      { f: 'Usman', l: 'Sheikh', sub: ['Urdu'] },
      { f: 'Bilal', l: 'Ahmad', sub: ['Science', 'Physics'] },
      { f: 'Hassan', l: 'Raza', sub: ['Islamiyat'] },
      { f: 'Kashif', l: 'Mehmood', sub: ['Computer Science'] },
      { f: 'Farhan', l: 'Siddiqui', sub: ['Chemistry'] },
      { f: 'Imran', l: 'Qureshi', sub: ['Biology'] },
    ];
    const teachers = [];
    for (let i = 0; i < teacherNames.length; i++) {
      const t = teacherNames[i];
      const user = await User.create({
        name: `${t.f} ${t.l}`, email: `${t.f.toLowerCase()}.${t.l.toLowerCase()}@qmschool.edu.pk`,
        password: 'teacher123', role: 'teacher', phone: `030${i}-1234567`
      });
      const teacher = await Teacher.create({
        user: user._id, firstName: t.f, lastName: t.l,
        fatherName: `Mr. ${t.l}`, employeeId: `TCH-${String(i + 1).padStart(4, '0')}`,
        qualification: 'M.Ed', specialization: t.sub[0], experience: 3 + i,
        subjects: t.sub, designation: 'Senior Teacher', department: 'Academics',
        phone: `030${i}-1234567`, address: `House ${i + 1}, Block ${i + 1}, Karachi`,
        baseSalary: 35000 + (i * 5000), allowances: 5000,
        profileImage: { url: '/images/default-teacher.png', isDefault: true }
      });
      teachers.push(teacher);
    }

    // 4. Create Students (5 per class = 50 students)
    console.log('🎓 Creating students...');
    const firstNames = ['Ali', 'Hamza', 'Zain', 'Abdullah', 'Bilal', 'Umar', 'Hassan', 'Saad', 'Fahad', 'Owais'];
    const lastNames = ['Khan', 'Ahmed', 'Malik', 'Sheikh', 'Qureshi', 'Siddiqui', 'Raza', 'Iqbal', 'Hussain', 'Shah'];
    let studentCount = 0;
    for (let c = 0; c < classes.length; c++) {
      for (let s = 0; s < 5; s++) {
        studentCount++;
        const fn = firstNames[(c + s) % firstNames.length];
        const ln = lastNames[(c + s + 1) % lastNames.length];
        const rollNum = `QM-${String(classes[c].numericLevel).padStart(2, '0')}-${String(s + 1).padStart(3, '0')}`;
        const user = await User.create({
          name: `${fn} ${ln}`, email: `student${studentCount}@qmschool.edu.pk`,
          password: 'student123', role: 'student'
        });
        await Student.create({
          user: user._id, firstName: fn, lastName: ln, fatherName: `Mr. ${ln}`,
          dateOfBirth: new Date(2015 - c, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          rollNumber: rollNum, admissionNumber: `ADM-${String(studentCount).padStart(4, '0')}`,
          currentClass: classes[c]._id, section: s < 3 ? 'A' : 'B',
          phone: `031${studentCount}-0000000`, address: `Street ${studentCount}, Karachi`,
          monthlyFee: classes[c].monthlyFee,
          profileImage: { url: '/images/default-student.png', isDefault: true }
        });
      }
    }

    // 5. Create Staff
    console.log('🧹 Creating staff...');
    const staffMembers = [
      { f: 'Rashid', l: 'Peon', role: 'peon', designation: 'Senior Peon', salary: 18000 },
      { f: 'Aslam', l: 'Guard', role: 'guard', designation: 'Security Guard', salary: 20000 },
      { f: 'Khalid', l: 'Clerk', role: 'clerk', designation: 'Office Clerk', salary: 25000 },
      { f: 'Naveed', l: 'Driver', role: 'driver', designation: 'School Van Driver', salary: 22000 },
    ];
    for (let i = 0; i < staffMembers.length; i++) {
      const sm = staffMembers[i];
      const user = await User.create({
        name: `${sm.f} ${sm.l}`, email: `${sm.f.toLowerCase()}@qmschool.edu.pk`,
        password: 'staff123', role: 'staff'
      });
      await Staff.create({
        user: user._id, firstName: sm.f, lastName: sm.l,
        employeeId: `STF-${String(i + 1).padStart(4, '0')}`,
        designation: sm.designation, role: sm.role,
        phone: `032${i}-0000000`, baseSalary: sm.salary,
        profileImage: { url: '/images/default-staff.png', isDefault: true }
      });
    }

    // 6. Create Fee Records
    console.log('💰 Creating fee records...');
    const students = await Student.find();
    const months = ['January 2025', 'February 2025', 'March 2025'];
    for (const student of students.slice(0, 20)) {
      for (const month of months) {
        const isPaid = Math.random() > 0.3;
        await Fee.create({
          student: student._id, feeType: 'monthly', month,
          amount: student.monthlyFee, dueDate: new Date(),
          status: isPaid ? 'paid' : 'unpaid',
          paidAmount: isPaid ? student.monthlyFee : 0,
          paymentDate: isPaid ? new Date() : undefined,
          paymentMethod: isPaid ? 'cash' : undefined
        });
      }
    }

    console.log('\n✅ Seed data created successfully!');
    console.log('📧 Admin Login: admin@qmschool.edu.pk / admin123');
    console.log('📧 Teacher Login: ahmed.khan@qmschool.edu.pk / teacher123');
    console.log('📧 Student Login: student1@qmschool.edu.pk / student123');
    console.log(`\n📊 Summary: ${await User.countDocuments()} users, ${await Student.countDocuments()} students, ${await Teacher.countDocuments()} teachers, ${await Staff.countDocuments()} staff, ${classes.length} classes`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
