// app/onboarding/content/Age.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

export const Age: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({
  value,
  onChange,
}) => {
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const [year, setYear] = useState(currentYear - 25); // default 25 years old

  // Generate arrays for pickers
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  // Get days in selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  // Adjust day if month/year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(year, month);
    if (day > daysInMonth) setDay(daysInMonth);
  }, [month, year]);

  // Update parent value whenever month/day/year changes
  useEffect(() => {
    onChange(`${month}/${day}/${year}`);
  }, [month, day, year]);

  return (
    <QuestionStep
      question="When were you born?"
      description="We use this to calculate your daily calorie needs"
      value={value}
      onChange={onChange}
      customContent={
        <View style={styles.pickerRow}>
          {/* Month */}
          <View style={[styles.pickerContainer, { width: 120 }]}>
            <Text style={styles.pickerLabel}>Month</Text>
            <Picker
              selectedValue={month}
              onValueChange={setMonth}
              style={[styles.picker, styles.monthPicker]}
              itemStyle={styles.pickerItem}
            >
              {months.map((m) => (
                <Picker.Item
                  key={m}
                  label={new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                  value={m}
                />
              ))}
            </Picker>
          </View>

          {/* Day */}
          <View style={[styles.pickerContainer, { width: 80 }]}>
            <Text style={styles.pickerLabel}>Day</Text>
            <Picker
              selectedValue={day}
              onValueChange={setDay}
              style={[styles.picker, styles.dayPicker]}
              itemStyle={styles.pickerItem}
            >
              {days.map((d) => (
                <Picker.Item key={d} label={d.toString().padStart(2, '0')} value={d} />
              ))}
            </Picker>
          </View>

          {/* Year */}
          <View style={[styles.pickerContainer, { width: 100 }]}>
            <Text style={styles.pickerLabel}>Year</Text>
            <Picker
              selectedValue={year}
              onValueChange={setYear}
              style={[styles.picker, styles.yearPicker]}
              itemStyle={styles.pickerItem}
            >
              {years.map((y) => (
                <Picker.Item key={y} label={y.toString()} value={y} />
              ))}
            </Picker>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  pickerContainer: {
    height: 200,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  monthPicker: { width: 139, height: '100%' },
  dayPicker: { width: 80, height: '100%' },
  yearPicker: { width: 100, height: '100%' },
  picker: { width: '100%', height: '100%' },
  pickerItem: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  pickerLabel: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});
