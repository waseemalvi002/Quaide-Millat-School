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

    // 1. Password Pre-hashing for efficiency
    console.log('🔑 Pre-hashing passwords...');
    const adminPass = await bcrypt.hash('admin123', 10);
    const teacherPass = await bcrypt.hash('teacher123', 10);
    const studentPass = await bcrypt.hash('student123', 10);
    const staffPass = await bcrypt.hash('staff123', 10);

    // 2. Create Admin
    console.log('👤 Creating admin user...');
    await User.create({
      name: 'Hamza Niaz',
      email: 'admin@qmschool.edu.pk',
      password: adminPass,
      role: 'admin',
      phone: '0300-1234567'
    });

    // 3. Create Classes (including Nursery, Classes 1-10, Class 11-12 Pre-Med and Pre-Eng)
    console.log('📚 Creating classes...');
    const classDefs = [
      { name: 'Nursery', numericLevel: 0, category: 'primary', monthlyFee: 1500, studentsCount: 60 },
      { name: 'Class 1', numericLevel: 1, category: 'primary', monthlyFee: 2000, studentsCount: 70 },
      { name: 'Class 2', numericLevel: 2, category: 'primary', monthlyFee: 2000, studentsCount: 70 },
      { name: 'Class 3', numericLevel: 3, category: 'primary', monthlyFee: 2200, studentsCount: 70 },
      { name: 'Class 4', numericLevel: 4, category: 'primary', monthlyFee: 2200, studentsCount: 70 },
      { name: 'Class 5', numericLevel: 5, category: 'primary', monthlyFee: 2500, studentsCount: 70 },
      { name: 'Class 6', numericLevel: 6, category: 'middle', monthlyFee: 2800, studentsCount: 70 },
      { name: 'Class 7', numericLevel: 7, category: 'middle', monthlyFee: 2800, studentsCount: 70 },
      { name: 'Class 8', numericLevel: 8, category: 'middle', monthlyFee: 3000, studentsCount: 70 },
      { name: 'Class 9', numericLevel: 9, category: 'high', monthlyFee: 3500, studentsCount: 70 },
      { name: 'Class 10', numericLevel: 10, category: 'high', monthlyFee: 3500, studentsCount: 70 },
      { name: 'Class 11 (Pre-Med)', numericLevel: 11, category: 'high', monthlyFee: 4500, studentsCount: 35, onlySection: 'A' },
      { name: 'Class 11 (Pre-Eng)', numericLevel: 11, category: 'high', monthlyFee: 4500, studentsCount: 35, onlySection: 'B' },
      { name: 'Class 12 (Pre-Med)', numericLevel: 12, category: 'high', monthlyFee: 5000, studentsCount: 35, onlySection: 'A' },
      { name: 'Class 12 (Pre-Eng)', numericLevel: 12, category: 'high', monthlyFee: 5000, studentsCount: 35, onlySection: 'B' },
    ];

    const subjectsByLevel = {
      primary: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'General Knowledge'],
      middle: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'Science', 'Social Studies', 'Computer'],
      high: ['English', 'Urdu', 'Mathematics', 'Islamiyat', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Pakistan Studies']
    };

    const insertedClasses = await Class.insertMany(
      classDefs.map(c => {
        const subjects = subjectsByLevel[c.category].map(s => ({ name: s, code: s.substring(0, 3).toUpperCase() }));
        const sections = c.onlySection 
          ? [{ name: c.onlySection, capacity: 40 }]
          : [{ name: 'A', capacity: 40 }, { name: 'B', capacity: 40 }];
        
        return {
          name: c.name,
          numericLevel: c.numericLevel,
          category: c.category,
          sections,
          subjects,
          monthlyFee: c.monthlyFee,
          academicYear: '2025-2026'
        };
      })
    );

    // 4. Create 25 Teachers
    console.log('👨‍🏫 Creating 25 teachers...');
    const teacherNames = [
      'Ahmed Khan', 'Muhammad Farooq', 'Sajid Ali', 'Zia-ur-Rehman', 'Asif Mahmood',
      'Noman Sheikh', 'Zeeshan Haider', 'Hafiz Muhammad', 'Tanveer Ahmed', 'Irfan Jameel',
      'Rashid Minhas', 'Mustafa Akram', 'Bilal Warraich', 'Kashif Mehmood', 'Amjad Sabri',
      'Shakeel Ahmed', 'Junaid Jamshed', 'Tahir Shah', 'Waseem Akram', 'Shoaib Akhtar',
      'Zahid Hussain', 'Nida Yasir', 'Faisal Qureshi', 'Hina Dilpazeer', 'Babar Azam'
    ];

    const teacherUserIds = Array.from({ length: 25 }, () => new mongoose.Types.ObjectId());
    const teacherUsers = teacherNames.map((name, i) => ({
      _id: teacherUserIds[i],
      name,
      email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@qmschool.edu.pk`,
      password: teacherPass,
      role: 'teacher',
      phone: `030${i % 10}-${String(i).padStart(7, '0')}`
    }));
    await User.insertMany(teacherUsers);

    const teacherDocs = teacherNames.map((name, i) => {
      const parts = name.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || 'Khan';
      return {
        user: teacherUserIds[i],
        firstName,
        lastName,
        fatherName: `Mr. ${lastName}`,
        employeeId: `TCH-${String(i + 1).padStart(4, '0')}`,
        qualification: i % 2 === 0 ? 'M.Sc Mathematics' : 'M.A English',
        specialization: i % 3 === 0 ? 'Science' : 'Arts',
        experience: 4 + (i % 8),
        subjects: [i % 2 === 0 ? 'Mathematics' : 'English'],
        designation: i === 1 ? 'Head Teacher' : 'Senior Teacher',
        department: 'Academics',
        phone: `030${i % 10}-${String(i).padStart(7, '0')}`,
        address: `Karachi, Pakistan`,
        baseSalary: 35000 + (i * 1000),
        allowances: 3000,
        profileImage: { url: '/images/default-teacher.png', isDefault: true }
      };
    });
    await Teacher.insertMany(teacherDocs);

    // 5. Create 6 Staff Members
    console.log('🧹 Creating 6 staff members...');
    const staffNames = [
      { name: 'Rashid Peon', role: 'peon', designation: 'Senior Peon', salary: 20000 },
      { name: 'Akbar Ali', role: 'guard', designation: 'Security Guard', salary: 18000 },
      { name: 'Nasir Ahmed', role: 'clerk', designation: 'Office Clerk', salary: 25000 },
      { name: 'Shafiq Hussain', role: 'lab-assistant', designation: 'Lab Assistant', salary: 22000 },
      { name: 'Zameer Librarian', role: 'librarian', designation: 'Librarian', salary: 24000 },
      { name: 'Munir Driver', role: 'driver', designation: 'Van Driver', salary: 21000 }
    ];

    const staffUserIds = Array.from({ length: 6 }, () => new mongoose.Types.ObjectId());
    const staffUsers = staffNames.map((sm, i) => ({
      _id: staffUserIds[i],
      name: sm.name,
      email: `${sm.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@qmschool.edu.pk`,
      password: staffPass,
      role: 'staff',
      phone: `032${i % 10}-${String(i).padStart(7, '0')}`
    }));
    await User.insertMany(staffUsers);

    const staffDocs = staffNames.map((sm, i) => {
      const parts = sm.name.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || 'Ali';
      return {
        user: staffUserIds[i],
        firstName,
        lastName,
        employeeId: `STF-${String(i + 1).padStart(4, '0')}`,
        designation: sm.designation,
        role: sm.role,
        phone: `032${i % 10}-${String(i).padStart(7, '0')}`,
        baseSalary: sm.salary,
        profileImage: { url: '/images/default-staff.png', isDefault: true }
      };
    });
    await Staff.insertMany(staffDocs);

    // 6. Create 900 Students
    console.log('🎓 Generating 900 student documents...');
    const firstNames = ['Ali', 'Hamza', 'Zain', 'Abdullah', 'Bilal', 'Umar', 'Hassan', 'Saad', 'Fahad', 'Owais', 'Sara', 'Ayesha', 'Fatima', 'Zainab', 'Mariam', 'Sana', 'Sidra', 'Amina', 'Hina', 'Nida'];
    const lastNames = ['Khan', 'Ahmed', 'Malik', 'Sheikh', 'Qureshi', 'Siddiqui', 'Raza', 'Iqbal', 'Hussain', 'Shah', 'Alvi', 'Lodhi', 'Mughal', 'Jatt', 'Chaudhry', 'Farooq', 'Ansari', 'Mirza', 'Dar', 'Butt'];

    const studentUsers = [];
    const studentDocs = [];
    let studentTotalCount = 0;

    for (let c = 0; c < classDefs.length; c++) {
      const def = classDefs[c];
      const mongoClass = insertedClasses.find(cl => cl.name === def.name);
      const count = def.studentsCount;

      for (let s = 0; s < count; s++) {
        studentTotalCount++;
        const userId = new mongoose.Types.ObjectId();
        
        const fn = firstNames[(c + s) % firstNames.length];
        const ln = lastNames[(c + s + 1) % lastNames.length];
        const fullName = `${fn} ${ln}`;
        
        let sectionName = 'A';
        if (def.onlySection) {
          sectionName = def.onlySection;
        } else {
          sectionName = s < (count / 2) ? 'A' : 'B';
        }

        const rollNum = `QM-${String(mongoClass.numericLevel).padStart(2, '0')}-${sectionName}-${String((s % (count / 2)) + 1).padStart(3, '0')}`;

        studentUsers.push({
          _id: userId,
          name: fullName,
          email: `student${studentTotalCount}@qmschool.edu.pk`,
          password: studentPass,
          role: 'student'
        });

        studentDocs.push({
          user: userId,
          firstName: fn,
          lastName: ln,
          fatherName: `Mr. ${ln}`,
          dateOfBirth: new Date(2018 - mongoClass.numericLevel, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          rollNumber: rollNum,
          admissionNumber: `ADM-${String(studentTotalCount).padStart(5, '0')}`,
          currentClass: mongoClass._id,
          section: sectionName,
          phone: `031${studentTotalCount % 10}-${String(studentTotalCount).padStart(7, '0')}`,
          address: `Karachi, Pakistan`,
          monthlyFee: mongoClass.monthlyFee,
          profileImage: { url: '/images/default-student.png', isDefault: true }
        });
      }
    }

    console.log(`👤 Inserting ${studentUsers.length} student users in database...`);
    await User.insertMany(studentUsers);

    console.log(`🎓 Inserting ${studentDocs.length} student profiles in database...`);
    await Student.insertMany(studentDocs);

    // 7. Create Fee Records
    console.log('💰 Creating fee records for first 100 students...');
    const students = await Student.find();
    const months = ['January 2025', 'February 2025', 'March 2025'];
    const feeDocs = [];
    for (const student of students.slice(0, 100)) {
      for (const month of months) {
        const isPaid = Math.random() > 0.3;
        feeDocs.push({
          student: student._id,
          feeType: 'monthly',
          month,
          amount: student.monthlyFee,
          dueDate: new Date(),
          status: isPaid ? 'paid' : 'unpaid',
          paidAmount: isPaid ? student.monthlyFee : 0,
          paymentDate: isPaid ? new Date() : undefined,
          paymentMethod: isPaid ? 'cash' : undefined
        });
      }
    }
    await Fee.insertMany(feeDocs);

    console.log('\n✅ Seed data created successfully!');
    console.log('📧 Admin Login: admin@qmschool.edu.pk / admin123');
    console.log('📧 Teacher Login: ahmedkhan@qmschool.edu.pk / teacher123');
    console.log('📧 Student Login: student1@qmschool.edu.pk / student123');
    console.log(`\n📊 Summary: ${await User.countDocuments()} total users, ${await Student.countDocuments()} students, ${await Teacher.countDocuments()} teachers, ${await Staff.countDocuments()} staff, ${insertedClasses.length} classes`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
