// src/features/onboarding/components/ContinueButton.tsx
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ContinueButtonProps {
  onNext: () => void;
  disabled?: boolean;
  label: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ onNext, disabled, label }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onNext();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 19,
    paddingHorizontal: 8,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 52,
    marginHorizontal: 16,
  },

  disabled: {
    // opacity: 0.15,
    backgroundColor: '#f0f0f0',
  },

  disabledText: {
    color: '#000',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
