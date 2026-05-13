import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResultsScreen = () => {
  const results = [
    { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
    { subject: 'English', marks: 88, total: 100, grade: 'A' },
    { subject: 'Science', marks: 85, total: 100, grade: 'A' },
    { subject: 'Urdu', marks: 90, total: 100, grade: 'A+' },
    { subject: 'Islamiyat', marks: 95, total: 100, grade: 'A+' },
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A+')) return '#10b981';
    if (grade.startsWith('A')) return '#3b82f6';
    if (grade.startsWith('B')) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Results</Text>
        <Text style={styles.subtitle}>Annual Exam 2025</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Marks</Text>
          <Text style={styles.summaryValue}>450/500</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Percentage</Text>
          <Text style={styles.summaryValue}>90%</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Grade</Text>
          <Text style={[styles.summaryValue, { color: '#10b981' }]}>A+</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Position</Text>
          <Text style={styles.summaryValue}>2nd</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Subject-wise Marks</Text>
      {results.map((result, index) => (
        <View key={index} style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.subjectName}>{result.subject}</Text>
            <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(result.grade) + '20' }]}>
              <Text style={[styles.gradeText, { color: getGradeColor(result.grade) }]}>{result.grade}</Text>
            </View>
          </View>
          <View style={styles.marksBar}>
            <View style={[styles.marksFill, { width: (result.marks / result.total * 100) + '%', backgroundColor: getGradeColor(result.grade) }]} />
          </View>
          <Text style={styles.marksText}>{result.marks}/{result.total} marks</Text>
        </View>
      ))}

      <View style={styles.reportCard}>
        <Icon name="picture-as-pdf" size={24} color="#ef4444" />
        <View style={styles.reportContent}>
          <Text style={styles.reportTitle}>Download Report Card</Text>
          <Text style={styles.reportText}>Get your complete report in PDF format</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#1a56db' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  summaryCard: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 8 },
  summaryItem: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center' },
  summaryLabel: { fontSize: 12, color: '#64748b' },
  summaryValue: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  resultCard: { margin: 16, marginTop: 0, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  subjectName: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  gradeBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  gradeText: { fontSize: 14, fontWeight: 'bold' },
  marksBar: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 8 },
  marksFill: { height: '100%', borderRadius: 4 },
  marksText: { fontSize: 12, color: '#64748b' },
  reportCard: { flexDirection: 'row', margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center' },
  reportContent: { marginLeft: 12 },
  reportTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  reportText: { fontSize: 12, color: '#64748b' },
});

export default ResultsScreen;