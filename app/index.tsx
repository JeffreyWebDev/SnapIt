// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        // Try to get the last step user left off
        const lastStep = await AsyncStorage.getItem('onboardingStep');
        
        if (lastStep === null) {
          // First-ever launch: go to onboarding step 0
          router.replace('/onboarding');
        } else {
          const completed = await AsyncStorage.getItem('onboardingCompleted');

          if (completed === 'true') {
            // User already finished onboarding
            router.replace('/(tabs)'); // <-- your main app route
          } else {
            // Resume from where user left off

            router.replace('/onboarding');
          }
        }
      } catch (error) {
        console.error('Error checking onboarding state:', error);
        router.replace('/onboarding'); // fallback
      } finally {
        setLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (loading) {
    // Loading indicator while we check AsyncStorage
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  // Should never render this normally
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>Welcome Back Jeffrey!</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' },
  text: { 
    fontSize: 34, 
    fontWeight: '700' 
  },
});
