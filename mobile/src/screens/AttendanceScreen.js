import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AttendanceScreen = () => {
  const attendanceData = [
    { month: 'May 2025', present: 26, absent: 0, leave: 0, percentage: 100 },
    { month: 'April 2025', present: 24, absent: 2, leave: 0, percentage: 92 },
    { month: 'March 2025', present: 25, absent: 1, leave: 1, percentage: 96 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <View style={styles.overallCard}>
          <Icon name="event-available" size={32} color="#10b981" />
          <View>
            <Text style={styles.overallText}>Overall Attendance</Text>
            <Text style={styles.overallValue}>94%</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statNumber}>52</Text><Text style={styles.statLabel}>Present</Text></View>
        <View style={styles.statBox}><Text style={[styles.statNumber, { color: '#ef4444' }]}>3</Text><Text style={styles.statLabel}>Absent</Text></View>
        <View style={styles.statBox}><Text style={[styles.statNumber, { color: '#f59e0b' }]}>1</Text><Text style={styles.statLabel}>Leave</Text></View>
      </View>

      {attendanceData.map((item, index) => (
        <View key={index} style={styles.monthCard}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthName}>{item.month}</Text>
            <Text style={[styles.percentage, { color: item.percentage >= 90 ? '#10b981' : '#ef4444' }]}>{item.percentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: item.percentage + '%', backgroundColor: item.percentage >= 90 ? '#10b981' : '#ef4444' }]} />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Present: {item.present}</Text>
            <Text style={styles.detailText}>Absent: {item.absent}</Text>
            <Text style={styles.detailText}>Leave: {item.leave}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#1a56db' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  overallCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  overallText: { fontSize: 14, color: '#64748b', marginLeft: 12 },
  overallValue: { fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginLeft: 12 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 12 },
  statBox: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#10b981' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  monthCard: { margin: 16, marginTop: 0, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  monthName: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  percentage: { fontSize: 16, fontWeight: 'bold' },
  progressBar: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 12 },
  progress: { height: '100%', borderRadius: 4 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailText: { fontSize: 12, color: '#64748b' },
});

export default AttendanceScreen;