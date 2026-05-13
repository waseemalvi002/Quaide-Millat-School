import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  };

  const getStats = () => {
    if (user?.role === 'student') {
      return [
        { label: 'Attendance', value: '94%', icon: 'event-available', color: '#10b981' },
        { label: 'Fee Status', value: 'Paid', icon: 'payment', color: '#f59e0b' },
        { label: 'Grade', value: 'A+', icon: 'star', color: '#8b5cf6' },
        { label: 'Classes', value: '3 Today', icon: 'video-call', color: '#3b82f6' },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { label: 'Students', value: '48', icon: 'people', color: '#3b82f6' },
        { label: 'Classes', value: '5', icon: 'class', color: '#10b981' },
        { label: 'Attendance', value: '94%', icon: 'event-available', color: '#f59e0b' },
        { label: 'Salary', value: 'View', icon: 'payments', color: '#8b5cf6' },
      ];
    } else if (user?.role === 'parent') {
      return [
        { label: 'My Child', value: 'Ali', icon: 'child-care', color: '#3b82f6' },
        { label: 'Attendance', value: '94%', icon: 'event-available', color: '#10b981' },
        { label: 'Fee Pending', value: 'Rs 1,500', icon: 'payment', color: '#f59e0b' },
        { label: 'Results', value: 'View', icon: 'assessment', color: '#8b5cf6' },
      ];
    }
    return [];
  };

  const getQuickActions = () => {
    if (user?.role === 'student') {
      return [
        { label: 'Results', icon: 'assessment', screen: 'Results' },
        { label: 'Fees', icon: 'payment', screen: 'Fees' },
        { label: 'Classes', icon: 'video-call', screen: 'OnlineClasses' },
        { label: 'Attendance', icon: 'event-available', screen: 'Attendance' },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { label: 'Students', icon: 'people', screen: 'Dashboard' },
        { label: 'Attendance', icon: 'event-available', screen: 'Attendance' },
        { label: 'Classes', icon: 'video-call', screen: 'OnlineClasses' },
        { label: 'Results', icon: 'assessment', screen: 'Results' },
      ];
    }
    return [];
  };

  const stats = getStats();
  const actions = getQuickActions();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {user?.role === 'student' && (
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Roll Number: QM-05-001</Text>
          <Text style={styles.infoLabel}>Class: 5-A | Section A</Text>
        </View>
      )}

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionCard}>
            <Icon name={action.icon} size={28} color="#1a56db" />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.noticeCard}>
        <Icon name="campaign" size={24} color="#f59e0b" />
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>Notice Board</Text>
          <Text style={styles.noticeText}>Final exams will begin from June 15th. Parents are requested to clear all pending fees.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#1a56db' },
  welcomeText: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileBtn: { padding: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  infoCard: { margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  infoLabel: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  statCard: { width: '46%', backgroundColor: '#fff', borderRadius: 12, padding: 16, margin: '2%', elevation: 2 },
  statIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  actionCard: { width: '23%', backgroundColor: '#fff', borderRadius: 12, padding: 16, margin: '1%', alignItems: 'center', elevation: 2 },
  actionLabel: { fontSize: 11, color: '#64748b', marginTop: 8, textAlign: 'center' },
  noticeCard: { flexDirection: 'row', margin: 16, padding: 16, backgroundColor: '#fff7ed', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#f59e0b' },
  noticeContent: { marginLeft: 12, flex: 1 },
  noticeTitle: { fontSize: 14, fontWeight: 'bold', color: '#92400e', marginBottom: 4 },
  noticeText: { fontSize: 13, color: '#b45309' },
});

export default DashboardScreen;