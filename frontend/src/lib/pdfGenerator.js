import jsPDF from 'jspdf';
import 'jspdf-autotable';

// PDF Report Card Generator
export const generateReportCard = (student, result) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(26, 86, 219);
  doc.rect(0, 0, 210, 45, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Quaid-e-Millat Public Boys High School', 105, 18, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Lahore, Punjab, Pakistan', 105, 26, { align: 'center' });
  doc.text(`${result.examType} Examination - ${result.term}`, 105, 34, { align: 'center' });

  // Student Info
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information', 14, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const info = [
    ['Name', student.name || result.student],
    ['Roll Number', student.rollNumber || result.rollNumber],
    ['Class', student.class || result.class],
    ['Father Name', student.fatherName || 'N/A'],
  ];
  
  info.forEach(([label, value], i) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${label}:`, 14, 63 + (i * 7));
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(value, 60, 63 + (i * 7));
  });

  // Subjects Table
  if (result.subjects && result.subjects.length > 0) {
    doc.autoTable({
      startY: 95,
      head: [['Subject', 'Total Marks', 'Obtained Marks', 'Percentage', 'Status']],
      body: result.subjects.map(sub => [
        sub.name,
        sub.total.toString(),
        sub.obtained.toString(),
        `${(sub.obtained / sub.total * 100).toFixed(1)}%`,
        (sub.obtained / sub.total * 100) >= 33 ? 'Pass' : 'Fail'
      ]),
      theme: 'grid',
      headStyles: { fillColor: [26, 86, 219], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: { fontSize: 9, cellPadding: 4 },
    });
  }

  // Summary
  const finalY = doc.lastAutoTable?.finalY || 140;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(14, finalY + 10, 182, 25, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${result.obtainedMarks || result.obtained}/${result.totalMarks || result.total}`, 24, finalY + 25);
  doc.text(`Percentage: ${result.percentage}%`, 90, finalY + 25);
  doc.text(`Grade: ${result.grade}`, 155, finalY + 25);
  
  if (result.position) {
    doc.text(`Position: #${result.position}`, 24, finalY + 32);
  }

  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
  doc.text('This is a computer-generated report card.', 105, 290, { align: 'center' });

  doc.save(`Report_Card_${(student.rollNumber || result.rollNumber || 'student').replace(/\s/g, '_')}_${result.term}.pdf`);
};

// PDF Fee Receipt Generator
export const generateFeeReceipt = (student, fee) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(26, 86, 219);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Quaid-e-Millat Public Boys High School', 105, 16, { align: 'center' });
  doc.setFontSize(12);
  doc.text('FEE RECEIPT', 105, 28, { align: 'center' });
  doc.setFontSize(9);
  doc.text(`Receipt #: FR-${fee._id || Date.now()}`, 105, 35, { align: 'center' });

  // Student Info
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  const details = [
    ['Student Name', student.name || fee.student],
    ['Roll Number', student.rollNumber || fee.rollNumber],
    ['Class', student.class || fee.class],
    ['Month', fee.month],
    ['Due Date', fee.dueDate],
    ['Paid Date', fee.paidDate || 'N/A'],
  ];

  details.forEach(([label, value], i) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${label}:`, 14, 52 + (i * 8));
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(String(value), 65, 52 + (i * 8));
  });

  // Fee Breakdown
  doc.autoTable({
    startY: 105,
    head: [['Description', 'Amount (Rs)']],
    body: [
      ['Monthly Tuition Fee', fee.amount?.toLocaleString() || '0'],
      ['Late Fee', fee.lateAmount?.toLocaleString() || fee.late?.toLocaleString() || '0'],
      ['Total', (fee.amount + (fee.lateAmount || fee.late || 0)).toLocaleString()],
    ],
    theme: 'grid',
    headStyles: { fillColor: [26, 86, 219] },
    styles: { fontSize: 10, cellPadding: 5 },
  });

  // Status
  const y = doc.lastAutoTable?.finalY || 140;
  doc.setFillColor(fee.status === 'paid' ? 16 : 245, fee.status === 'paid' ? 185 : 158, fee.status === 'paid' ? 129 : 11);
  doc.roundedRect(14, y + 10, 182, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Status: ${fee.status?.toUpperCase() || 'PAID'}`, 105, y + 20, { align: 'center' });

  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
  
  doc.save(`Fee_Receipt_${fee.month?.replace(/\s/g, '_') || 'receipt'}.pdf`);
};

// PDF Salary Slip Generator
export const generateSalarySlip = (employee) => {
  const doc = new jsPDF();
  
  doc.setFillColor(26, 86, 219);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Quaid-e-Millat Public Boys High School', 105, 16, { align: 'center' });
  doc.setFontSize(12);
  doc.text('SALARY SLIP', 105, 28, { align: 'center' });
  doc.setFontSize(9);
  doc.text(`${employee.month} ${employee.year}`, 105, 35, { align: 'center' });

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  [['Employee Name', employee.employee], ['Type', employee.type], ['Working Days', `${employee.presentDays}/${employee.workingDays}`]].forEach(([l, v], i) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`${l}:`, 14, 52 + (i * 8));
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(String(v), 65, 52 + (i * 8));
  });

  doc.autoTable({
    startY: 80,
    head: [['Component', 'Amount (Rs)']],
    body: [
      ['Basic Salary', employee.basic?.toLocaleString()],
      ['Allowances', `+${employee.allowances?.toLocaleString()}`],
      ['Deductions', `-${employee.deductions?.toLocaleString()}`],
      ['Net Salary', employee.netSalary?.toLocaleString() || employee.net?.toLocaleString()],
    ],
    theme: 'grid',
    headStyles: { fillColor: [26, 86, 219] },
    styles: { fontSize: 10, cellPadding: 5 },
  });

  const y = doc.lastAutoTable?.finalY || 130;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(14, y + 10, 182, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Net Payable: Rs ${(employee.netSalary || employee.net || 0).toLocaleString()}`, 105, y + 20, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' });
  
  doc.save(`Salary_Slip_${employee.employee?.replace(/\s/g, '_')}_${employee.month}.pdf`);
};
