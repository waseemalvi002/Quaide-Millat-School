'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeLangContext = createContext();

const translations = {
  en: {
    // Sidebar nav
    'dashboard': 'Dashboard', 'students': 'Students', 'teachers': 'Teachers', 'staff': 'Staff',
    'classes': 'Classes', 'fees': 'Fees', 'salary': 'Salary', 'attendance': 'Attendance',
    'results': 'Results', 'gallery': 'Gallery', 'notifications': 'Notifications',
    'online_classes': 'Online Classes', 'online classes': 'Online Classes',
    'settings': 'Settings', 'logout': 'Logout', 'meetings': 'Meetings', 'payments': 'Payments',
    'my_students': 'My Students', 'my students': 'My Students',
    'my_results': 'My Results', 'my results': 'My Results',
    'my_fees': 'My Fees', 'my fees': 'My Fees',
    'my_child': 'My Child', 'my child': 'My Child',
    'my_salary': 'My Salary', 'my salary': 'My Salary',
    // Header
    'welcome_back': 'Welcome back', 'welcome': 'Welcome',
    'light_mode': 'Light Mode', 'dark_mode': 'Dark Mode',
    // General buttons
    'add_new': 'Add New', 'save': 'Save', 'cancel': 'Cancel', 'edit': 'Edit', 'delete': 'Delete',
    'view': 'View', 'actions': 'Actions', 'update': 'Update', 'close': 'Close',
    'add': 'Add', 'remove': 'Remove', 'search': 'Search', 'filter': 'Filter',
    'yes': 'Yes', 'no': 'No', 'confirm': 'Confirm', 'back': 'Back', 'next': 'Next',
    'submit': 'Submit', 'print': 'Print', 'download': 'Download', 'upload': 'Upload',
    'loading': 'Loading...', 'no_data': 'No data found', 'all': 'All',
    // Fields
    'name': 'Name', 'email': 'Email', 'phone': 'Phone', 'address': 'Address',
    'status': 'Status', 'active': 'Active', 'inactive': 'Inactive',
    'date': 'Date', 'day': 'Day', 'time': 'Time', 'month': 'Month', 'year': 'Year',
    'description': 'Description', 'category': 'Category', 'type': 'Type',
    'amount': 'Amount', 'total': 'Total', 'note': 'Note',
    // Students
    'student_management': 'Student Management', 'manage_students': 'Manage all students across all classes',
    'add_student': 'Add Student', 'edit_student': 'Edit Student',
    'update_student': 'Update Student', 'student_details': 'Student Details',
    'search_student': 'Search by name, roll no, father name...',
    'total_students': 'Total Students', 'roll_no': 'Roll No', 'father_name': 'Father Name',
    'class': 'Class', 'section': 'Section', 'age': 'Age', 'full_name': 'Full Name',
    'all_classes': 'All Classes', 'all_status': 'All Status',
    'date_of_birth': 'Date of Birth', 'blood_group': 'Blood Group',
    'admission_date': 'Admission Date', 'guardian': 'Guardian', 'guardian_phone': 'Guardian Phone',
    // Teachers
    'teacher_management': 'Teacher Management', 'manage_teachers': 'Manage all teaching staff',
    'add_teacher': 'Add Teacher', 'edit_teacher': 'Edit Teacher', 'update_teacher': 'Update Teacher',
    'teacher_profile': 'Teacher Profile', 'search_teacher': 'Search teachers...',
    'total_teachers': 'Total Teachers', 'subjects_covered': 'Subjects Covered',
    'active_teachers': 'Active Teachers', 'qualification': 'Qualification',
    'designation': 'Designation', 'subjects': 'Subjects', 'join_date': 'Join Date',
    // Staff
    'staff_management': 'Staff Management', 'manage_staff': 'Manage non-teaching staff members',
    'add_staff': 'Add Staff', 'edit_staff': 'Edit Staff', 'update_staff': 'Update Staff',
    'staff_profile': 'Staff Profile', 'search_staff': 'Search staff...',
    'total_staff': 'Total Staff', 'cnic': 'CNIC', 'role': 'Role', 'since': 'Since',
    // Fees
    'fee_management': 'Fee Management', 'fee_overview': 'Fee Overview',
    'collected': 'Collected', 'pending': 'Pending', 'overdue': 'Overdue',
    'fee_amount': 'Fee Amount', 'due_date': 'Due Date', 'paid_date': 'Paid Date',
    'receipt_no': 'Receipt No', 'fee_type': 'Fee Type',
    'total_fees': 'Total Fees', 'paid': 'Paid', 'unpaid': 'Unpaid',
    'generate_fee': 'Generate Fee',
    // Salary
    'salary_management': 'Salary Management', 'total_salary': 'Total Salary',
    'basic_salary': 'Basic Salary', 'allowances': 'Allowances', 'deductions': 'Deductions',
    'net_salary': 'Net Salary', 'pay_date': 'Pay Date', 'generate_salary': 'Generate Salary',
    'salary_slip': 'Salary Slip', 'payment_status': 'Payment Status',
    'salary_paid': 'Salary Paid', 'salary_pending': 'Salary Pending',
    // Results
    'result_management': 'Result Management', 'add_result': 'Add Result', 'edit_result': 'Edit Result',
    'marks': 'Marks', 'grade': 'Grade', 'percentage': 'Percentage',
    'total_marks': 'Total Marks', 'obtained_marks': 'Obtained Marks',
    'exam_type': 'Exam Type', 'term': 'Term', 'subject': 'Subject',
    'pass': 'Pass', 'fail': 'Fail',
    // Attendance
    'attendance_management': 'Attendance Management', 'mark_attendance': 'Mark Attendance',
    'present': 'Present', 'absent': 'Absent', 'late': 'Late', 'leave': 'Leave',
    'attendance_today': 'Attendance Today', 'attendance_report': 'Attendance Report',
    // Dashboard stats
    'admin_desc': 'Here is what is happening at your school today.',
    'quick_actions': 'Quick Actions', 'upload_results': 'Upload Results', 'send_notice': 'Send Notice',
    'classes_overview': 'Classes Overview', 'this_month': 'This month', 'all_active': 'All active',
    // Notifications
    'send_notification': 'Send Notification', 'notification_title': 'Notification Title',
    'notification_message': 'Message', 'send_to': 'Send To', 'all_users': 'All Users',
    // Gallery
    'add_photo': 'Add Photo', 'upload_photo': 'Upload Photo', 'photo_title': 'Photo Title',
    'upload_image': 'Upload Image', 'profile_image': 'Profile Image',
    // Settings
    'profile_settings': 'Profile Settings', 'change_password': 'Change Password',
    'language': 'Language', 'theme': 'Theme', 'save_settings': 'Save Settings',
    // Instructions / misc
    'instructions': 'Instructions',
    'instructions_desc': 'Welcome to Quaid-e-Millat School Management System. Use the sidebar to navigate through different modules.',
    'administrator': 'Administrator', 'teacher': 'Teacher', 'student': 'Student', 'parent': 'Parent',
    'online': 'Online', 'offline': 'Offline',
  },
  ur: {
    // Sidebar nav
    'dashboard': 'ڈیش بورڈ', 'students': 'طلباء', 'teachers': 'اساتذہ', 'staff': 'عملہ',
    'classes': 'کلاسز', 'fees': 'فیس', 'salary': 'تنخواہ', 'attendance': 'حاضری',
    'results': 'نتائج', 'gallery': 'گیلری', 'notifications': 'اطلاعات',
    'online_classes': 'آن لائن کلاسز', 'online classes': 'آن لائن کلاسز',
    'settings': 'ترتیبات', 'logout': 'لاگ آؤٹ', 'meetings': 'میٹنگز', 'payments': 'ادائیگیاں',
    'my_students': 'میرے طلباء', 'my students': 'میرے طلباء',
    'my_results': 'میرے نتائج', 'my results': 'میرے نتائج',
    'my_fees': 'میری فیس', 'my fees': 'میری فیس',
    'my_child': 'میرا بچہ', 'my child': 'میرا بچہ',
    'my_salary': 'میری تنخواہ', 'my salary': 'میری تنخواہ',
    // Header
    'welcome_back': 'خوش آمدید', 'welcome': 'خوش آمدید',
    'light_mode': 'لائٹ موڈ', 'dark_mode': 'ڈارک موڈ',
    // General buttons
    'add_new': 'نیا شامل کریں', 'save': 'محفوظ کریں', 'cancel': 'منسوخ کریں',
    'edit': 'ترمیم', 'delete': 'حذف کریں', 'view': 'دیکھیں', 'actions': 'اعمال',
    'update': 'اپڈیٹ کریں', 'close': 'بند کریں', 'add': 'شامل کریں', 'remove': 'ہٹائیں',
    'search': 'تلاش کریں', 'filter': 'فلٹر کریں',
    'yes': 'ہاں', 'no': 'نہیں', 'confirm': 'تصدیق کریں', 'back': 'واپس', 'next': 'آگے',
    'submit': 'جمع کریں', 'print': 'پرنٹ کریں', 'download': 'ڈاؤنلوڈ', 'upload': 'اپلوڈ',
    'loading': 'لوڈ ہو رہا ہے...', 'no_data': 'کوئی ڈیٹا نہیں ملا', 'all': 'تمام',
    // Fields
    'name': 'نام', 'email': 'ای میل', 'phone': 'فون نمبر', 'address': 'پتہ',
    'status': 'حالت', 'active': 'فعال', 'inactive': 'غیر فعال',
    'date': 'تاریخ', 'day': 'دن', 'time': 'وقت', 'month': 'مہینہ', 'year': 'سال',
    'description': 'تفصیل', 'category': 'زمرہ', 'type': 'قسم',
    'amount': 'رقم', 'total': 'کل', 'note': 'نوٹ',
    // Students
    'student_management': 'طلباء کا انتظام', 'manage_students': 'تمام کلاسز کے طلباء کا انتظام کریں',
    'add_student': 'طالب علم شامل کریں', 'edit_student': 'طالب علم میں ترمیم کریں',
    'update_student': 'طالب علم اپڈیٹ کریں', 'student_details': 'طالب علم کی تفصیلات',
    'search_student': 'نام، رول نمبر، یا والد کے نام سے تلاش کریں...',
    'total_students': 'کل طلباء', 'roll_no': 'رول نمبر', 'father_name': 'والد کا نام',
    'class': 'کلاس', 'section': 'سیکشن', 'age': 'عمر', 'full_name': 'پورا نام',
    'all_classes': 'تمام کلاسز', 'all_status': 'تمام حالتیں',
    'date_of_birth': 'تاریخ پیدائش', 'blood_group': 'خون کا گروپ',
    'admission_date': 'داخلے کی تاریخ', 'guardian': 'سرپرست', 'guardian_phone': 'سرپرست کا فون',
    // Teachers
    'teacher_management': 'اساتذہ کا انتظام', 'manage_teachers': 'تمام تدریسی عملے کا انتظام کریں',
    'add_teacher': 'استاد شامل کریں', 'edit_teacher': 'استاد میں ترمیم کریں',
    'update_teacher': 'استاد اپڈیٹ کریں', 'teacher_profile': 'استاد کی پروفائل',
    'search_teacher': 'اساتذہ تلاش کریں...',
    'total_teachers': 'کل اساتذہ', 'subjects_covered': 'پڑھائے جانے والے مضامین',
    'active_teachers': 'فعال اساتذہ', 'qualification': 'تعلیمی قابلیت',
    'designation': 'عہدہ', 'subjects': 'مضامین', 'join_date': 'تاریخ شمولیت',
    // Staff
    'staff_management': 'عملے کا انتظام', 'manage_staff': 'غیر تدریسی عملے کا انتظام کریں',
    'add_staff': 'عملہ شامل کریں', 'edit_staff': 'عملے میں ترمیم کریں',
    'update_staff': 'عملہ اپڈیٹ کریں', 'staff_profile': 'عملے کی پروفائل',
    'search_staff': 'عملہ تلاش کریں...',
    'total_staff': 'کل عملہ', 'cnic': 'شناختی کارڈ', 'role': 'کردار', 'since': 'سے',
    // Fees
    'fee_management': 'فیس کا انتظام', 'fee_overview': 'فیس کا جائزہ',
    'collected': 'جمع شدہ', 'pending': 'زیر التوا', 'overdue': 'واجب الادا',
    'fee_amount': 'فیس کی رقم', 'due_date': 'آخری تاریخ', 'paid_date': 'ادائیگی کی تاریخ',
    'receipt_no': 'رسید نمبر', 'fee_type': 'فیس کی قسم',
    'total_fees': 'کل فیس', 'paid': 'ادا شدہ', 'unpaid': 'غیر ادا شدہ',
    'generate_fee': 'فیس تیار کریں',
    // Salary
    'salary_management': 'تنخواہ کا انتظام', 'total_salary': 'کل تنخواہ',
    'basic_salary': 'بنیادی تنخواہ', 'allowances': 'الاؤنسز', 'deductions': 'کٹوتیاں',
    'net_salary': 'خالص تنخواہ', 'pay_date': 'ادائیگی کی تاریخ',
    'generate_salary': 'تنخواہ تیار کریں', 'salary_slip': 'تنخواہ کی پرچی',
    'payment_status': 'ادائیگی کی حالت',
    'salary_paid': 'تنخواہ ادا شدہ', 'salary_pending': 'تنخواہ زیر التوا',
    // Results
    'result_management': 'نتائج کا انتظام', 'add_result': 'نتیجہ شامل کریں',
    'edit_result': 'نتیجہ ترمیم کریں',
    'marks': 'نمبر', 'grade': 'درجہ', 'percentage': 'فیصد',
    'total_marks': 'کل نمبر', 'obtained_marks': 'حاصل شدہ نمبر',
    'exam_type': 'امتحان کی قسم', 'term': 'مدت', 'subject': 'مضمون',
    'pass': 'پاس', 'fail': 'فیل',
    // Attendance
    'attendance_management': 'حاضری کا انتظام', 'mark_attendance': 'حاضری لگائیں',
    'present': 'حاضر', 'absent': 'غیر حاضر', 'late': 'دیر سے', 'leave': 'چھٹی',
    'attendance_today': 'آج کی حاضری', 'attendance_report': 'حاضری کی رپورٹ',
    // Dashboard stats
    'admin_desc': 'آج آپ کے سکول کی تازہ ترین صورتحال یہ ہے۔',
    'quick_actions': 'فوری اعمال', 'upload_results': 'نتائج اپلوڈ کریں',
    'send_notice': 'نوٹس بھیجیں',
    'classes_overview': 'کلاسز کا جائزہ', 'this_month': 'اس مہینے', 'all_active': 'تمام فعال',
    // Notifications
    'send_notification': 'اطلاع بھیجیں', 'notification_title': 'اطلاع کا عنوان',
    'notification_message': 'پیغام', 'send_to': 'بھیجیں', 'all_users': 'تمام صارفین',
    // Gallery
    'add_photo': 'تصویر شامل کریں', 'upload_photo': 'تصویر اپلوڈ کریں',
    'photo_title': 'تصویر کا عنوان',
    'upload_image': 'تصویر اپلوڈ کریں', 'profile_image': 'پروفائل تصویر',
    // Settings
    'profile_settings': 'پروفائل ترتیبات', 'change_password': 'پاسورڈ تبدیل کریں',
    'language': 'زبان', 'theme': 'تھیم', 'save_settings': 'ترتیبات محفوظ کریں',
    // Instructions / misc
    'instructions': 'ہدایات',
    'instructions_desc': 'قائد ملت سکول مینجمنٹ سسٹم میں خوش آمدید۔ مختلف ماڈیولز میں جانے کے لیے سائیڈ بار استعمال کریں۔',
    'administrator': 'منتظم', 'teacher': 'استاد', 'student': 'طالب علم', 'parent': 'والدین',
    'online': 'آن لائن', 'offline': 'آف لائن',
  }
};

export function ThemeLangProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Always start in English — theme is saved, language always defaults to English
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Clear any previously saved Urdu setting so site loads in English
    localStorage.removeItem('lang');
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.dir = 'ltr';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ur' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
  };

  // Smart lookup: tries direct key, lowercase, and underscore variants
  const t = (key) => {
    if (!key) return '';
    const dict = translations[lang] || translations['en'];
    if (dict[key]) return dict[key];
    const lower = String(key).toLowerCase();
    if (dict[lower]) return dict[lower];
    const underscored = lower.replace(/ /g, '_');
    if (dict[underscored]) return dict[underscored];
    return key; // fallback: show original
  };

  return (
    <ThemeLangContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </ThemeLangContext.Provider>
  );
}

export function useThemeLang() {
  return useContext(ThemeLangContext);
}
