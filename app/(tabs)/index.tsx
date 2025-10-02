import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MealCard } from '../../components/dashboard/MealCard';


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 70) / 3; // Three macro cards with spacing

const SnapItDashboardScreen: React.FC = () => {
  // Main calorie state
  const [calories, setCalories] = useState({
    consumed: 1739,
    goal: 2039,
    remaining: 300,
  });

  // Macro state
  const [macros, setMacros] = useState([
    { label: 'Protein', value: 106, goal: 150, color: '#FF3C3C', icon: '🍗' },
    { label: 'Carbs', value: 250, goal: 300, color: '#F5E623', icon: '🍞' },
    { label: 'Fat', value: 70, goal: 80, color: '#7EC421', icon: '🥑' },
  ]);

  const recentlyEaten = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1705537459006-f4acbd93c5a3?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Turkey Sandwich',
      time: '2:10 PM',
      calories: '🔥 460 calories',
      macros: '🍗 25g | 🍞 48g | 🥑 20g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1708782342368-fd224d1c0262?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Salad Bowl',
      time: '12:30 PM',
      calories: '🔥 350 calories',
      macros: '🍗 30g | 🍞 20g | 🥑 15g',
    },
  ];

  // Which problems do you detect in the code below?
  // 1. The tabs "Today" and "Yesterday" are static and do not change the displayed data.
  // 2. The calorie and macro values are hardcoded and do not update dynamically.
  // 3. The layout may not be fully responsive on all device sizes.

  // How would you improve the code below?
  // 1. Implement state management to switch between "Today" and "Yesterday" views.
  // 2. Fetch real user data for calories and macros instead of hardcoding values.
  // 3. Use responsive design techniques to ensure proper layout on various screen sizes.

  // What additional features could enhance the user experience?
  // 1. Add a date picker to allow users to select any date and view their nutrition data.
  // 2. Include progress charts to visualize calorie and macro intake over time.
  // 3. Provide meal suggestions based on remaining calories and macros for the day.

  // How would you test the functionality and usability of the code below?
  // 1. Conduct unit tests for individual components like MealCard and CircularProgress.
  // 2. Perform integration tests to ensure data flows correctly between components.
  // 3. Gather user feedback through usability testing sessions to identify pain points and areas for improvement.

  // Explain the styling choices made in the code below.
  // 1. A clean and minimalistic design with a light color palette to enhance readability.
  // 2. Use of shadows and rounded corners to create a modern and approachable look.
  // 3. Consistent spacing and alignment to ensure a balanced and organized layout.


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>SnapIt</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Today</Text>
          <Text style={styles.tabText}>Yesterday</Text>
        </View>

        {/* Main calorie card */}
        <View style={styles.mainCard}>
          <View>
          <Text style={styles.caloriesLeft}>
            {calories.consumed}
          </Text>
          <Text style={{ color: '#666'}}>calories left</Text>
          </View>
          <View style={styles.circularGraphContainer}>
            <CircularProgress
              size={100}
              width={10}
              fill={(calories.consumed / calories.goal) * 100}
              tintColor="#DDBB00"
              backgroundWidth={7}
              backgroundColor="#eee"
              rotation={0}
              lineCap="round"
            >
              {() => (
                <View style={styles.circularCenter}>
                  <Text style={styles.flameIcon}>🔥</Text>
                </View>
              )}
            </CircularProgress>
          </View>
        </View>

        {/* Macro Cards */}
        <View style={styles.macroGrid}>
          {macros.map((macro) => (
            <View key={macro.label} style={styles.macroCard}>
              <CircularProgress
                size={80}
                width={7}
                backgroundWidth={5}
                fill={(macro.value / macro.goal) * 100}
                tintColor={macro.color}
                backgroundColor="#eee"
                rotation={0}
                lineCap="round"
              >
                {() => (
                  <View style={styles.circularCenter}>
                    <Text style={styles.macroIcon}>{macro.icon}</Text>
                  </View>
                )}
              </CircularProgress>
              <Text style={styles.macroValue}>{macro.value}g</Text>
              <Text style={styles.macroLabel}>{macro.label} left</Text>
            </View>
          ))}
        </View>

        {/* Recently Eaten Section */}
        <View style={styles.recentlyEatenSection}>
          <FlatList
            scrollEnabled={false}
            data={recentlyEaten}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={<Text style={styles.sectionTitle}>Recently eaten</Text>}
            renderItem={({ item }) => (
              <MealCard
                imageUrl={item.imageUrl ?? ""}
                title={item.title}
                time={item.time}
                calories={item.calories}
                macros={item.macros}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    padding: 20,
    // paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  tabText: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    paddingHorizontal: 20,
  },
  activeTab: {  
    color: '#000',
    fontWeight: 'bold',
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  caloriesLeft: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    // marginBottom: 5,
  },
  circularGraphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  flameIcon: {
    fontSize: 28,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  macroCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  circularCenterMacro: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  macroIcon: {
    fontSize: 24,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
  },
  recentlyEatenSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  }
});

export default SnapItDashboardScreen;
