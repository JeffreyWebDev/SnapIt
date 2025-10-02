// components/MealCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface MealCardProps {
    imageUrl: string; // Placeholder for future use
    title: string;
    time: string;
    calories: string;
    macros: string;
}

export const MealCard: React.FC<MealCardProps> = ({ imageUrl, title, time, calories, macros }) => {
  return (
    <View style={styles.mealCard}>
      <Image source={{ uri: imageUrl }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={styles.mealTime}>{time}</Text>
        </View>
        <View style={styles.mealMacros}>
          <Text style={styles.mealCalories}>{calories}</Text>
          <Text style={styles.mealMacroBreakdown}>{macros}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  mealImage: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  mealTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  mealTime: {
    fontSize: 12,
    color: '#666',
  },
  mealMacros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealCalories: {
    fontWeight: '700',
    fontSize: 14,
    color: '#333',
  },
  mealMacroBreakdown: {
    fontSize: 12,
    color: '#888',
  },
});
