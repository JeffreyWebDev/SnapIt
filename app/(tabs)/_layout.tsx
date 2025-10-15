import { SpecialTabButton } from '@/components/dashboard/SpecialTabButton';
import TabBarBackground from '@/components/dashboard/TabBarBackground.ios';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
          tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarInactiveTintColor: colorScheme === 'dark' ? '#ccc' : '#888',
        tabBarStyle: Platform.OS === 'ios' ? {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 1,
          elevation: 0,
          height: 75,
        } : {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1e' : '#fff',
          borderRadius: 20,
          position: 'absolute',
          height: 70,
          paddingTop: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 9,
        },
        tabBarBackground: TabBarBackground,
        // animation: 'fade',
         
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="custom"
        options={{
          title: 'Custom',
          tabBarLabel: 'Custom',
          tabBarButton: SpecialTabButton,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            console.log('tabPress');
          },
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="reorder-four-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
