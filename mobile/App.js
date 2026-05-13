import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import FeesScreen from './src/screens/FeesScreen';
import OnlineClassesScreen from './src/screens/OnlineClassesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Role-based screens
const getDashboardForRole = (role) => {
  return DashboardScreen;
};

const TabNavigator = ({ role }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Attendance') iconName = 'event-available';
        else if (route.name === 'Results') iconName = 'assessment';
        else if (route.name === 'Fees') iconName = 'payment';
        else if (route.name === 'Classes') iconName = 'video-call';
        else if (route.name === 'Profile') iconName = 'person';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1a56db',
      tabBarInactiveTintColor: '#64748b',
      tabBarStyle: { paddingBottom: 5, height: 60 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      headerShown: false,
    })}
  >
    {role === 'student' && (
      <>
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Results" component={ResultsScreen} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Classes" component={OnlineClassesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </>
    )}
    {role === 'parent' && (
      <>
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Results" component={ResultsScreen} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </>
    )}
    {(role === 'teacher' || role === 'staff') && (
      <>
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Classes" component={OnlineClassesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </>
    )}
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {() => <TabNavigator role={user.role} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;