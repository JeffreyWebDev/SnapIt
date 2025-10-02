// src/features/onboarding/components/ProgressBar.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep + 1) / totalSteps;

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
});
