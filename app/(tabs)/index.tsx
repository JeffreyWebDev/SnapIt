import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MealCard } from '../../components/dashboard/MealCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: WINDOW_WIDTH } = Dimensions.get('window');

type DayData = {
  label: string;
  dateStr: string;
  calories: { consumed: number; goal: number };
  macros: { label: string; value: number; goal: number; color: string; icon: string }[];
  meals: { imageUrl: string; title: string; time: string; calories: string; macros: string }[];
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const generateDayData = (index: number): DayData => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  const dateStr = date.toDateString();

  const seedBase = new Date(dateStr).getTime() / 86400000 | 0;
  const rand = mulberry32(seedBase + 9999);

  const label = index === 0 ? 'Today' : index === 1 ? 'Yesterday' : `${index} Days Ago`;

  const goal = 1900 + Math.round(rand() * 450); // what does this line do?
  // Generate consumed calories between 45% and 100% of the goal
  // (so we always have some data to show)
  // 
  const consumed = Math.round(goal * (0.45 + rand() * 0.55)); // what does this line do?
  // Generate macros
  // Protein: 60-150g (goal 150g)
  // Carbs: 140-320g (goal 300g)
  // Fat: 25-80g (goal 80g)
  // (these ranges are arbitrary for demo purposes)
  //

  const macros = [
    { label: 'Protein', value: Math.round(60 + rand() * 90), goal: 150, color: '#FF3C3C', icon: '🍗' },
    { label: 'Carbs', value: Math.round(140 + rand() * 180), goal: 300, color: '#F5E623', icon: '🍞' },
    { label: 'Fat', value: Math.round(25 + rand() * 55), goal: 80, color: '#7EC421', icon: '🥑' },
  ];

  const sampleMeals = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1705537459006-f4acbd93c5a3?q=80&w=844&auto=format&fit=crop',
      title: ['Turkey Sandwich', 'Sushi Roll', 'Porridge'][Math.floor(rand() * 3)],
      time: `${8 + Math.floor(rand() * 10)}:${rand() > 0.5 ? '00' : '30'} ${rand() > 0.5 ? 'AM' : 'PM'}`,
      calories: `🔥 ${Math.round(180 + rand() * 450)} calories`,
      macros: `🍗 ${Math.round(12 + rand() * 46)}g | 🍞 ${Math.round(18 + rand() * 72)}g | 🥑 ${Math.round(5 + rand() * 35)}g`,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1708782342368-fd224d1c0262?q=80&w=880&auto=format&fit=crop',
      title: ['Chicken Salad Bowl', 'Tuna Sandwich', 'Beef Stew'][Math.floor(rand() * 3)],
      time: `${11 + Math.floor(rand() * 6)}:${rand() > 0.5 ? '00' : '15'} ${rand() > 0.5 ? 'AM' : 'PM'}`,
      calories: `🔥 ${Math.round(220 + rand() * 380)} calories`,
      macros: `🍗 ${Math.round(18 + rand() * 50)}g | 🍞 ${Math.round(8 + rand() * 62)}g | 🥑 ${Math.round(8 + rand() * 32)}g`,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1671898295493-b8a75407dadb?q=80&w=1607&auto=format&fit=crop',
      title: ['Grilled Chicken Wrap', 'Fried Plantain', 'Rice and Beans'][Math.floor(rand() * 3)],
      time: `${13 + Math.floor(rand() * 6)}:${rand() > 0.5 ? '00' : '30'} PM`,
      calories: `🔥 ${Math.round(280 + rand() * 520)} calories`,
      macros: `🍗 ${Math.round(22 + rand() * 50)}g | 🍞 ${Math.round(22 + rand() * 74)}g | 🥑 ${Math.round(7 + rand() * 40)}g`,
    },
  ];

  const meals = sampleMeals.slice(0, 2 + (seedBase % sampleMeals.length));

  return {
    label,
    dateStr,
    calories: { consumed, goal },
    macros,
    meals,
  };
};

const DAYS_COUNT = 7;

export default function SnapItDashboardScreen() {
  const [daysData] = useState(() => Array.from({ length: DAYS_COUNT }, (_, i) => generateDayData(i)));
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const underlineX = useRef(new Animated.Value(0)).current;
  // const underlineWidth = useRef(new Animated.Value(0)).current;
  // const tabLayouts = useRef<Record<number, LayoutRectangle>>({}).current;

  // const onTabLayout = (index: number) => (event: any) => {
  //   tabLayouts[index] = event.nativeEvent.layout;
  //   if (index === 0) {
  //     underlineX.setValue(tabLayouts[0].x);
  //     underlineWidth.setValue(tabLayouts[0].width);
  //   }
  // };

  // const animateUnderlineTo = (index: number) => {
  //   const layout = tabLayouts[index];
  //   if (!layout) return;
  //   Animated.timing(underlineX, { toValue: layout.x, duration: 220, useNativeDriver: false }).start();
  //   Animated.timing(underlineWidth, { toValue: layout.width, duration: 220, useNativeDriver: false }).start();
  // };

  // useEffect(() => {
  //   setTimeout(() => animateUnderlineTo(selectedIndex), 40);
  // }, [selectedIndex]);

  const selectedDay = daysData[selectedIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SnapIt</Text>
        </View>

        <View style={styles.tabBarContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={daysData}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={styles.tabListContent}
            renderItem={({ item, index }) => {
              const isSelected = index === selectedIndex;
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedIndex(index)}
                  // onLayout={onTabLayout(index)}
                  style={styles.underlineTabButton}
                >
                  <Text style={[styles.underlineTabText, isSelected && styles.underlineTabTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* <View style={styles.underlineContainer} pointerEvents="none">
            <Animated.View
              style={[
                styles.underline,
                {
                  transform: [{ translateX: underlineX }],
                  width: underlineWidth,
                },
              ]}
            />
          </View> */}
        </View>

        <View style={styles.mainCard}>
          <View>
            <Text style={styles.caloriesLeft}>{selectedDay.calories.consumed}</Text>
            <Text style={styles.subText}>calories consumed</Text>
          </View>
          <View style={styles.circularGraphContainer}>
            <CircularProgress
              size={100}
              width={10}
              fill={(selectedDay.calories.consumed / selectedDay.calories.goal) * 100}
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

        <View style={styles.macroGrid}>
          {selectedDay.macros.map((macro) => (
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

        <View style={styles.recentlyEatenSection}>
          <FlatList
            scrollEnabled={false}
            data={selectedDay.meals}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={<Text style={styles.sectionTitle}>Recently eaten</Text>}
            renderItem={({ item }) => (
              <MealCard
                imageUrl={item.imageUrl ?? ''}
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
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f2f2f2' 
    
  },
  container: { 
    padding: 20 

  },
  header: { 
    marginBottom: 20 
  },

  headerText: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#000' 
  },

  tabBarContainer: { 
    marginBottom: 10 
  },
  tabListContent: { 
    paddingHorizontal: 6, 
    alignItems: 'center' 
  },

  underlineTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  underlineTabText: { 
    fontSize: 15, 
    color: '#666', 
    fontWeight: '400',
  },

  underlineTabTextActive: { 
    color: '#000',
    fontWeight: '600',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },

  underlineContainer: {
    position: 'absolute',
    left: 6,
    right: 6,
    bottom: 0,
    height: 3,
    justifyContent: 'center',
  },
  underline: {
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
    elevation: 3,
  },

  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#222',
    // shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  caloriesLeft: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  subText: { 
    color: '#666' 
  },

  circularGraphContainer: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  circularCenter: { 
    position: 'absolute', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    height: '100%' 
  },
  flameIcon: { 
    fontSize: 28 
  },

  macroGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },

  macroCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#555',
    shadowOffset: { width: 1, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  circularCenterMacro: { 
    position: 'absolute', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    height: '100%' 
  },
  macroIcon: { 
    fontSize: 24 
  },

  macroValue: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5 
  },

  macroLabel: { 
    fontSize: 14, 
    color: '#666' 
  },

  recentlyEatenSection: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 10 
  },
});
