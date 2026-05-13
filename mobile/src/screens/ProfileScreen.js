import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem('user');
        // Navigate to login - parent component will handle
      }},
    ]);
  };

  const menuItems = [
    { icon: 'person', label: 'Edit Profile', screen: 'Profile' },
    { icon: 'notifications', label: 'Notifications', screen: 'Notifications' },
    { icon: 'lock', label: 'Change Password', screen: 'Settings' },
    { icon: 'help', label: 'Help & Support', screen: 'Support' },
    { icon: 'info', label: 'About', screen: 'About' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <TouchableOpacity style={styles.editAvatar}>
            <Icon name="camera-alt" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
        <Text style={styles.userRole}>{user?.role?.toUpperCase()}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Icon name={item.icon} size={22} color="#64748b" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Icon name="chevron-right" size={22} color="#cbd5e1" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={22} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#1a56db', alignItems: 'center' },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  editAvatar: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  userRole: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  userEmail: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  menuCard: { margin: 16, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  menuLabel: { flex: 1, fontSize: 15, color: '#1e293b', marginLeft: 12 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 16, padding: 16, backgroundColor: '#fef2f2', borderRadius: 12, gap: 8 },
  logoutText: { color: '#ef4444', fontWeight: '600', fontSize: 16 },
  version: { textAlign: 'center', fontSize: 12, color: '#94a3b8', marginBottom: 30 },
});

export default ProfileScreen;