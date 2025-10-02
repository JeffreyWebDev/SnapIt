// app/onboarding/content/CompleteContent.tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props { 
  value?: string | null; 
}

export const Complete: React.FC<Props> = () => {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      <Text style={styles.title}>All Done!</Text>
      <Text style={styles.text}>You're ready to start tracking your calories with SnapIt.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 12 },
  text: { fontSize: 18, color: '#333' },
});
