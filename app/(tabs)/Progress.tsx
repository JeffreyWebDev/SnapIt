import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 70;
const chartHeight = 250;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
  style: {
    borderRadius: 40,
    paddingRight: 48, // Adjust right padding to prevent label cutoff
  },
  propsForDots: {
    r: "4", // Make dots tappable
    // strokeWidth: "2",
    // stroke: "#1166ac", // Match progress line color
  },
  propsForBackgroundLines: {
    stroke: '#ddd', // Lighter grid lines
    strokeDasharray: '', // Solid lines
  },
  propsForVerticalLabels: { 
    fontSize: 12,
    fontWeight: '600',
    // Adjust label rotation and position if needed
    // rotation: 20, // Rotate vertical labels for better fit
    // yOffset: 4, // Adjust vertical position if needed
  },
  propsForHorizontalLabels: { 
    fontSize: 12,
    fontWeight: '600',
  },
  fillShadowGradient: '#f0f0f0', // Shadow for area under the progress line
  fillShadowGradientOpacity: 0.2,
};

interface DataPointClickData {
  datasetIndex: number;
  value: number;
  index: number;
  labels: string[];
  x: number;
  y: number;
}

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

export default function ProgressScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Progress </Text>
      <Text style={styles.text}>Have a look at your progress.</Text>

      <View style={styles.chartWrapper}>
        <View style={styles.chartTextContainer}>
          <Text style={[styles.text, styles.boldText]}>Goal Progress</Text>
          <View style={{ backgroundColor: '#f0f0f0', padding: 6, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>80% of the goal</Text>
          </View>
        </View>
        <LineChart
          data={data}
          width={chartWidth} 
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          withVerticalLines={false} // Remove vertical grid lines for a cleaner look
          withInnerLines={true}    // Keep horizontal grid lines for reading weight
          withHorizontalLabels={true}
          // Setting the decorator (the custom element on top of the chart)
          // decorator={() => <Tooltip />} 
        />
        <View style={{ padding: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: 10 }}>
          <Text style={[styles.text, styles.boldText]}>You have lost 3kg since last week</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#666',
    // marginBottom: 15,
  },
  chartWrapper: {
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 28,
    paddingTop: 17,
    paddingBottom: 17,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 9,
  },
  boldText: {
    fontWeight: '800',
    fontSize: 15,
    color: '#000',
  },
  chartTextContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: chartWidth,
    paddingLeft: 32,
    marginBottom: 10,
  },
});