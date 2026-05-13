import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeesScreen = () => {
  const fees = [
    { month: 'May 2025', amount: 1500, status: 'unpaid', dueDate: 'May 31, 2025' },
    { month: 'April 2025', amount: 1500, status: 'paid', dueDate: 'April 30, 2025', paidDate: 'April 28, 2025' },
    { month: 'March 2025', amount: 1500, status: 'paid', dueDate: 'March 31, 2025', paidDate: 'March 29, 2025' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fee Details</Text>
        <Text style={styles.subtitle}>Monthly Fee: Rs 1,500</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Paid</Text>
          <Text style={[styles.summaryValue, { color: '#10b981' }]}>Rs 3,000</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={[styles.summaryValue, { color: '#f59e0b' }]}>Rs 1,500</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Fee History</Text>
      {fees.map((fee, index) => (
        <View key={index} style={styles.feeCard}>
          <View style={styles.feeHeader}>
            <Text style={styles.monthName}>{fee.month}</Text>
            <View style={[styles.statusBadge, { backgroundColor: fee.status === 'paid' ? '#d1fae5' : '#fef3c7' }]}>
              <Text style={[styles.statusText, { color: fee.status === 'paid' ? '#065f46' : '#92400e' }]}>
                {fee.status === 'paid' ? 'Paid' : 'Unpaid'}
              </Text>
            </View>
          </View>
          <View style={styles.feeDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>Rs {fee.amount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Due Date</Text>
              <Text style={styles.detailValue}>{fee.dueDate}</Text>
            </View>
            {fee.status === 'paid' && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Paid On</Text>
                <Text style={[styles.detailValue, { color: '#10b981' }]}>{fee.paidDate}</Text>
              </View>
            )}
          </View>
          {fee.status === 'unpaid' && (
            <TouchableOpacity style={styles.payButton}>
              <Icon name="payment" size={18} color="#fff" />
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={styles.paymentMethods}>
        <Text style={styles.paymentTitle}>Payment Methods</Text>
        <View style={styles.methodsRow}>
          <TouchableOpacity style={styles.methodButton}><Icon name="account-balance" size={24} color="#1a56db" /><Text style={styles.methodText}>Bank</Text></TouchableOpacity>
          <TouchableOpacity style={styles.methodButton}><Icon name="phone-android" size={24} color="#1a56db" /><Text style={styles.methodText}>JazzCash</Text></TouchableOpacity>
          <TouchableOpacity style={styles.methodButton}><Icon name="smartphone" size={24} color="#1a56db" /><Text style={styles.methodText}>Easypaisa</Text></TouchableOpacity>
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
  summaryCard: { flexDirection: 'row', padding: 16, gap: 12 },
  summaryItem: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center' },
  summaryLabel: { fontSize: 12, color: '#64748b' },
  summaryValue: { fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  feeCard: { margin: 16, marginTop: 0, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  feeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  monthName: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  feeDetails: { marginBottom: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  detailLabel: { fontSize: 13, color: '#64748b' },
  detailValue: { fontSize: 13, color: '#1e293b', fontWeight: '500' },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a56db', padding: 12, borderRadius: 8, gap: 8 },
  payButtonText: { color: '#fff', fontWeight: '600' },
  paymentMethods: { padding: 16, marginBottom: 20 },
  paymentTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
  methodsRow: { flexDirection: 'row', gap: 12 },
  methodButton: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center' },
  methodText: { fontSize: 12, color: '#64748b', marginTop: 4 },
});

export default FeesScreen;