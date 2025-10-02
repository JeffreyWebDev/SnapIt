// app/onboarding/content/WelcomeContent.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
  value?: string | null;
  onChange?: (val: string) => void;
}

export const Welcome: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(400)} style={styles.title}>
        Welcome to SnapIt!
      </Animated.Text>
      <Animated.Text entering={FadeInDown.duration(400).delay(100)} style={styles.description}>
        Let's start your journey to track your calories and health goals.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
     paddingHorizontal: 20 

  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#000', marginBottom: 12 

  },
  description: { 
    fontSize: 18, 
    color: '#333', 
    lineHeight: 26 

  },
});
