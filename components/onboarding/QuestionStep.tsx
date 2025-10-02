// src/features/onboarding/components/QuestionStep.tsx
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

interface QuestionStepProps {
  question: string;
  description?: string;
  options?: string[];
  customContent?: React.ReactNode;
  value?: string | null;
  onChange: (value: string) => void;
}


export const QuestionStep: React.FC<QuestionStepProps> = ({ question, description, options, customContent, value, onChange }) => {
  const handleSelect = (val: string) => {
    Haptics.selectionAsync();
    onChange(val);
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(400)} style={styles.question}>
        {question}
      </Animated.Text>
      <Animated.Text entering={FadeInDown.duration(400)} style={styles.description}>
        {description}
      </Animated.Text>
      <View style={styles.optionsContainer}>
        {customContent ? (
          customContent
        ) : (
          options?.map((option, idx) => (
            <Animated.View
              entering={FadeInDown.duration(400).delay(idx * 100)}
              key={option}
            >
              <TouchableOpacity
                style={[styles.option, value === option && styles.selected]}
                onPress={() => handleSelect(option)}
              >
                <Text style={[styles.optionText, value === option && styles.selectedText]}>{option}</Text>
              </TouchableOpacity>
            </Animated.View>
          )))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  optionsContainer: {
    marginTop: 32,
    flex: 1,
    justifyContent: 'center'
  },

  question: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000'
  },

  description: {
    fontSize: 16,
    color: '#222',
  },

  option: {
    padding: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#000',
  },

  optionText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#000'
  },

  selectedText: {
    color: '#fff',
    fontWeight: '700'
  },
});
