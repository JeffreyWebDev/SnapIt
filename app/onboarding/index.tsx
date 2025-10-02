import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { ProgressBar } from '../../components/onboarding/ProgressBar';
import { useOnboarding } from '../../hooks/useOnboarding';

import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

import { CalorieRollover } from '@/content/onboarding/CalorieRollover';
import { DesiredWeight } from '@/content/onboarding/DesiredWeight';
import { WeightGoalSpeed } from '@/content/onboarding/WeightGoalSpeed';
import { Activity } from '../../content/onboarding/Activity';
import { Age } from '../../content/onboarding/Age';
import { Complete } from '../../content/onboarding/Complete';
import { Gender } from '../../content/onboarding/Gender';
import { Goal } from '../../content/onboarding/Goal';
import { HeightWeight } from '../../content/onboarding/HeightWeight';
import { Welcome } from '../../content/onboarding/Welcome';

const steps = [
  { name: 'welcome', component: Welcome, buttonLabel: "Let’s get started" },
  { name: 'gender', component: Gender, buttonLabel: "Continue" },
  { name: 'age', component: Age, buttonLabel: "Continue" },
  { name: 'heightWeight', component: HeightWeight, buttonLabel: "Continue" },
  { name: 'activity', component: Activity, buttonLabel: "Continue" },
  { name: 'goal', component: Goal, buttonLabel: "Continue" },
  { name: 'DesiredWeight', component: DesiredWeight, buttonLabel: "Continue" },
  { name: 'calorieRollover', component: CalorieRollover, buttonLabel: "Continue" },
  { name: 'WeightGoalSpeed', component: WeightGoalSpeed, buttonLabel: "Continue" },
  // { name: 'WeightGoalSummary', component: WeightGoalSummary, buttonLabel: "Continue"},
  { name: 'complete', component: Complete, buttonLabel: "Finish" },

];

const OnboardingScreen: React.FC = () => {
  const { currentStep, goNext, goBack, answers, setAnswer } = useOnboarding(steps.length);

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      router.replace('/(tabs)');
    } else {
      goNext();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    router.replace('/(tabs)');
  };

  const StepComponent = steps[currentStep].component;

  return (
    <View style={styles.container}>
      {currentStep > 0 && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Haptics.selectionAsync();
              goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          )}
          </View>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                Haptics.selectionAsync();
                handleSkip();
              }}
            >
              <Text style={{ color: '#000' }}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Animated.View
        key={currentStep}
        entering={SlideInRight.duration(400)}
        exiting={SlideOutLeft.duration(400)}
        style={{ flex: 1 }}>
        <StepComponent
          value={answers[steps[currentStep].name] as { height: string; weight: string } & string | null}
          onChange={(val: string | { height: string; weight: string }) => {
            if (typeof val === 'string' || (val && typeof val.height === 'string' && typeof val.weight === 'string')) {
              setAnswer(steps[currentStep].name, typeof val === 'string' ? val : JSON.stringify(val));
            }
          }}
        />
      </Animated.View>

      <ContinueButton
        onNext={handleNext}
        disabled={currentStep !== 0 && currentStep !== steps.length - 1 && !answers[steps[currentStep].name]}
        label={steps[currentStep].buttonLabel}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 50 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    marginRight: 20,
    marginTop: -20,
  },
  progressContainer: {
    flex: 1,
  },
  skipButton: {
    // position: 'absolute',
    marginLeft: 10,
    left: 10,
    top: -10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
  },
});
