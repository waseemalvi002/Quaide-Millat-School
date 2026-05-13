import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OnlineClassesScreen = () => {
  const classes = [
    { id: 1, title: 'Mathematics', teacher: 'Mr. Ahmed Khan', class: 'Class 5-A', time: '9:00 AM', date: 'Today', status: 'live' },
    { id: 2, title: 'English', teacher: 'Mr. Muhammad Ali', class: 'Class 5-A', time: '11:00 AM', date: 'Today', status: 'upcoming' },
    { id: 3, title: 'Science', teacher: 'Mr. Bilal Ahmad', class: 'Class 5-A', time: '2:00 PM', date: 'Tomorrow', status: 'upcoming' },
  ];

  const getStatusColor = (status) => {
    if (status === 'live') return '#ef4444';
    return '#64748b';
  };

  const getStatusBg = (status) => {
    if (status === 'live') return '#fee2e2';
    return '#f1f5f9';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Online Classes</Text>
        <Text style={styles.subtitle}>Live and scheduled classes</Text>
      </View>

      <View style={styles.ongoingCard}>
        <View style={styles.ongoingHeader}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE NOW</Text>
        </View>
        <Text style={styles.ongoingTitle}>Mathematics - Class 5-A</Text>
        <Text style={styles.ongoingTime}>Started at 9:00 AM</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Icon name="video-call" size={20} color="#fff" />
          <Text style={styles.joinText}>Join Class</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Upcoming Classes</Text>
      {classes.filter(c => c.status !== 'live').map((cls, index) => (
        <View key={index} style={styles.classCard}>
          <View style={styles.classHeader}>
            <Text style={styles.classTitle}>{cls.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusBg(cls.status) }]}>
              <Text style={[styles.statusText, { color: getStatusColor(cls.status) }]}>{cls.status}</Text>
            </View>
          </View>
          <View style={styles.classDetails}>
            <View style={styles.detailRow}><Icon name="person" size={16} color="#64748b" /><Text style={styles.detailText}>{cls.teacher}</Text></View>
            <View style={styles.detailRow}><Icon name="school" size={16} color="#64748b" /><Text style={styles.detailText}>{cls.class}</Text></View>
            <View style={styles.detailRow}><Icon name="schedule" size={16} color="#64748b" /><Text style={styles.detailText}>{cls.time} - {cls.date}</Text></View>
          </View>
          <TouchableOpacity style={styles.remindButton}>
            <Icon name="notifications" size={18} color="#1a56db" />
            <Text style={styles.remindText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.helpCard}>
        <Icon name="help-outline" size={24} color="#64748b" />
        <Text style={styles.helpText}>Having trouble joining? Contact your teacher</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#1a56db' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  ongoingCard: { margin: 16, backgroundColor: '#fee2e2', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#ef4444' },
  ongoingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  liveIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', marginRight: 8 },
  liveText: { fontSize: 12, fontWeight: 'bold', color: '#ef4444' },
  ongoingTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  ongoingTime: { fontSize: 14, color: '#64748b', marginBottom: 12 },
  joinButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ef4444', padding: 12, borderRadius: 8, gap: 8 },
  joinText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  classCard: { margin: 16, marginTop: 0, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  classHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  classTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  classDetails: { marginBottom: 12 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  detailText: { fontSize: 13, color: '#64748b' },
  remindButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff6ff', padding: 10, borderRadius: 8, gap: 8 },
  remindText: { color: '#1a56db', fontWeight: '600', fontSize: 13 },
  helpCard: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, gap: 12 },
  helpText: { flex: 1, fontSize: 13, color: '#64748b' },
});

export default OnlineClassesScreen;