import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      // Demo credentials check - in production, call API
      const demoUsers = {
        'admin@qmschool.edu.pk': { name: 'Admin User', role: 'admin', email: 'admin@qmschool.edu.pk' },
        'ahmed.khan@qmschool.edu.pk': { name: 'Ahmed Khan', role: 'teacher', email: 'ahmed.khan@qmschool.edu.pk' },
        'student1@qmschool.edu.pk': { name: 'Ali Khan', role: 'student', email: 'student1@qmschool.edu.pk', rollNumber: 'QM-01-001' },
      };

      const user = demoUsers[email.toLowerCase()];
      if (user && (password === 'admin123' || password === 'teacher123' || password === 'student123')) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="school" size={48} color="#fff" />
        </View>
        <Text style={styles.title}>Quaid-e-Millat</Text>
        <Text style={styles.subtitle}>School Management</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.welcomeSubtext}>Sign in to continue</Text>

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.demoSection}>
          <Text style={styles.demoText}>Demo Accounts:</Text>
          <Text style={styles.demoCredentials}>Admin: admin@qmschool.edu.pk / admin123</Text>
          <Text style={styles.demoCredentials}>Teacher: ahmed.khan@qmschool.edu.pk / teacher123</Text>
          <Text style={styles.demoCredentials}>Student: student1@qmschool.edu.pk / student123</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a56db' },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 40 },
  logoContainer: { width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  form: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 4, textAlign: 'center' },
  welcomeSubtext: { fontSize: 14, color: '#64748b', marginBottom: 32, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12, marginBottom: 16, paddingHorizontal: 12 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: '#1e293b' },
  eyeIcon: { padding: 8 },
  loginButton: { backgroundColor: '#1a56db', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  demoSection: { marginTop: 32, padding: 16, backgroundColor: '#f8fafc', borderRadius: 12 },
  demoText: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  demoCredentials: { fontSize: 11, color: '#94a3b8', marginBottom: 2, fontFamily: 'monospace' },
});

export default LoginScreen;