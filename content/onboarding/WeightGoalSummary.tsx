// app/onboarding/content/WeightGoalSummaryContent.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props { 
  value?: string | null; 
  onChange?: (val: string) => void; 
}

export const WeightGoalSummary: React.FC<Props> = () => {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      {/* <Text style={styles.text}>{value ? `Your goal: ${value}` : 'No data yet.'}</Text> */}
      <Text style={styles.text}>You're all set! Let's get started on your journey to a healthier you.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 20 

  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#000', 
    marginBottom: 12 
  },
  text: { 
    fontSize: 18, 
    color: '#333' 
  },
});

