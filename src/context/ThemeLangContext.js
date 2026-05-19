'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeLangContext = createContext();

export function ThemeLangProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Load from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('lang') || 'en';
    
    setTheme(savedTheme);
    setLang(savedLang);
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('lang', savedLang);
    document.documentElement.dir = savedLang === 'ur' ? 'rtl' : 'ltr';
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

  // Basic dictionary
  const t = (key) => {
    const dictionary = {
      'en': {
        'dashboard': 'Dashboard', 'students': 'Students', 'teachers': 'Teachers', 'staff': 'Staff',
        'classes': 'Classes', 'fees': 'Fees', 'salary': 'Salary', 'attendance': 'Attendance',
        'results': 'Results', 'gallery': 'Gallery', 'notifications': 'Notifications', 'online_classes': 'Online Classes',
        'settings': 'Settings', 'logout': 'Logout', 'search': 'Search', 'welcome': 'Welcome',
        'total_students': 'Total Students', 'total_teachers': 'Total Teachers', 'total_staff': 'Total Staff',
        'add_new': 'Add New', 'save': 'Save', 'cancel': 'Cancel', 'edit': 'Edit', 'delete': 'Delete',
        'profile_image': 'Profile Image', 'upload_image': 'Upload Image', 'instructions': 'Instructions',
        'instructions_desc': 'Welcome to Quaid-e-Millat School Management System. Use the sidebar to navigate through different modules. Admin can manage all records including adding new users with their profile pictures.',
        'light_mode': 'Light Mode', 'dark_mode': 'Dark Mode',
        'student_management': 'Student Management', 'manage_students': 'Manage all students across all classes',
        'teacher_management': 'Teacher Management', 'manage_teachers': 'Manage all teaching staff',
        'staff_management': 'Staff Management', 'manage_staff': 'Manage non-teaching staff members',
        'active': 'Active', 'inactive': 'Inactive', 'search_student': 'Search by name, roll no, father name...',
        'search_teacher': 'Search teachers...', 'search_staff': 'Search staff...',
        'all_classes': 'All Classes', 'roll_no': 'Roll No', 'father_name': 'Father Name', 'class': 'Class',
        'section': 'Section', 'age': 'Age', 'phone': 'Phone', 'status': 'Status', 'actions': 'Actions',
        'full_name': 'Full Name', 'email': 'Email', 'address': 'Address', 'add_student': 'Add Student',
        'update_student': 'Update Student', 'edit_student': 'Edit Student', 'student_details': 'Student Details',
        'subjects_covered': 'Subjects Covered', 'active_teachers': 'Active Teachers', 'qualification': 'Qualification',
        'designation': 'Designation', 'subjects': 'Subjects', 'join_date': 'Join Date', 'teacher_profile': 'Teacher Profile',
        'add_teacher': 'Add Teacher', 'update_teacher': 'Update Teacher', 'edit_teacher': 'Edit Teacher',
        'total_salary': 'Total Salary', 'cnic': 'CNIC', 'role': 'Role', 'since': 'Since', 'add_staff': 'Add Staff',
        'update_staff': 'Update Staff', 'edit_staff': 'Edit Staff', 'staff_profile': 'Staff Profile',
        'welcome_back': 'Welcome back', 'admin_desc': 'Here is what is happening at your school today.',
        'this_month': 'This month', 'all_active': 'All active', 'quick_actions': 'Quick Actions',
        'generate_fee': 'Generate Fee', 'mark_attendance': 'Mark Attendance', 'upload_results': 'Upload Results',
        'send_notice': 'Send Notice', 'attendance_today': 'Attendance Today', 'present': 'Present', 'absent': 'Absent',
        'fee_overview': 'Fee Overview', 'collected': 'Collected', 'pending': 'Pending', 'overdue': 'Overdue',
        'classes_overview': 'Classes Overview'
      },
      'ur': {
        'dashboard': 'ڈیش بورڈ', 'students': 'طلباء', 'teachers': 'اساتذہ', 'staff': 'عملہ',
        'classes': 'کلاسز', 'fees': 'فیس', 'salary': 'تنخواہ', 'attendance': 'حاضری',
        'results': 'نتائج', 'gallery': 'گیلری', 'notifications': 'اطلاعات', 'online_classes': 'آن لائن کلاسز',
        'settings': 'ترتیبات', 'logout': 'لاگ آؤٹ', 'search': 'تلاش کریں', 'welcome': 'خوش آمدید',
        'total_students': 'کل طلباء', 'total_teachers': 'کل اساتذہ', 'total_staff': 'کل عملہ',
        'add_new': 'نیا شامل کریں', 'save': 'محفوظ کریں', 'cancel': 'منسوخ کریں', 'edit': 'ترمیم کریں', 'delete': 'حذف کریں',
        'profile_image': 'پروفائل تصویر', 'upload_image': 'تصویر اپلوڈ کریں', 'instructions': 'ہدایات',
        'instructions_desc': 'قائد ملت سکول مینجمنٹ سسٹم میں خوش آمدید۔ مختلف ماڈیولز میں جانے کے لیے سائیڈ بار استعمال کریں۔ ایڈمن تمام ریکارڈز کا انتظام کر سکتا ہے جس میں نئی تصاویر کے ساتھ صارفین شامل کرنا بھی ہے۔',
        'light_mode': 'لائٹ موڈ', 'dark_mode': 'ڈارک موڈ',
        'student_management': 'طلباء کا انتظام', 'manage_students': 'تمام کلاسز کے طلباء کا انتظام کریں',
        'teacher_management': 'اساتذہ کا انتظام', 'manage_teachers': 'تمام تدریسی عملے کا انتظام کریں',
        'staff_management': 'عملے کا انتظام', 'manage_staff': 'غیر تدریسی عملے کا انتظام کریں',
        'active': 'فعال', 'inactive': 'غیر فعال', 'search_student': 'نام، رول نمبر، یا والد کے نام سے تلاش کریں...',
        'search_teacher': 'اساتذہ تلاش کریں...', 'search_staff': 'عملہ تلاش کریں...',
        'all_classes': 'تمام کلاسز', 'roll_no': 'رول نمبر', 'father_name': 'والد کا نام', 'class': 'کلاس',
        'section': 'سیکشن', 'age': 'عمر', 'phone': 'فون نمبر', 'status': 'حالت', 'actions': 'اعمال',
        'full_name': 'پورا نام', 'email': 'ای میل', 'address': 'پتہ', 'add_student': 'طالب علم شامل کریں',
        'update_student': 'طالب علم اپڈیٹ کریں', 'edit_student': 'طالب علم میں ترمیم کریں', 'student_details': 'طالب علم کی تفصیلات',
        'subjects_covered': 'پڑھائے جانے والے مضامین', 'active_teachers': 'فعال اساتذہ', 'qualification': 'تعلیم',
        'designation': 'عہدہ', 'subjects': 'مضامین', 'join_date': 'تاریخ شمولیت', 'teacher_profile': 'استاد کی پروفائل',
        'add_teacher': 'استاد شامل کریں', 'update_teacher': 'استاد اپڈیٹ کریں', 'edit_teacher': 'استاد میں ترمیم کریں',
        'total_salary': 'کل تنخواہ', 'cnic': 'شناختی کارڈ', 'role': 'کردار', 'since': 'سے', 'add_staff': 'عملہ شامل کریں',
        'update_staff': 'عملہ اپڈیٹ کریں', 'edit_staff': 'عملے میں ترمیم کریں', 'staff_profile': 'عملے کی پروفائل',
        'welcome_back': 'خوش آمدید', 'admin_desc': 'آج آپ کے سکول کی تازہ ترین صورتحال یہ ہے۔',
        'this_month': 'اس مہینے', 'all_active': 'تمام فعال', 'quick_actions': 'فوری اعمال',
        'generate_fee': 'فیس تیار کریں', 'mark_attendance': 'حاضری لگائیں', 'upload_results': 'نتائج اپلوڈ کریں',
        'send_notice': 'نوٹس بھیجیں', 'attendance_today': 'آج کی حاضری', 'present': 'حاضر', 'absent': 'غیر حاضر',
        'fee_overview': 'فیس کا جائزہ', 'collected': 'جمع شدہ', 'pending': 'زیر التوا', 'overdue': 'واجب الادا',
        'classes_overview': 'کلاسز کا جائزہ'
      }
    };
    return dictionary[lang]?.[key] || key;
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
