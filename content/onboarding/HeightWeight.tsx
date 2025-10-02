// app/onboarding/content/HeightWeight.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

type UnitSystem = 'imperial' | 'metric';

export const HeightWeight: React.FC<{ 
  value: { height: string; weight: string } | null; 
  onChange: (val: { height: string; weight: string }) => void 
}> = ({ value, onChange }) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(7);
  const [pounds, setPounds] = useState(150);
  const [centimeters, setCentimeters] = useState(170);
  const [kilograms, setKilograms] = useState(68);

  // Picker options
  const feetOptions = Array.from({ length: 4 }, (_, i) => i + 3);
  const inchOptions = Array.from({ length: 12 }, (_, i) => i);
  const poundOptions = Array.from({ length: 401 }, (_, i) => i + 50);
  const centimeterOptions = Array.from({ length: 151 }, (_, i) => i + 100);
  const kilogramOptions = Array.from({ length: 301 }, (_, i) => i + 20);

  // Convert units when unitSystem changes
  useEffect(() => {
    if (unitSystem === 'metric') {
      const totalInches = feet * 12 + inches;
      const cm = Math.round(totalInches * 2.54);
      const kg = Math.round(pounds * 0.453592);
      setCentimeters(cm);
      setKilograms(kg);
    } else {
      const totalInches = centimeters / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inch = Math.round(totalInches % 12);
      const lbs = Math.round(kilograms * 2.20462);
      setFeet(ft);
      setInches(inch);
      setPounds(lbs);
    }
  }, [unitSystem]);

  // Update parent
  useEffect(() => {
    if (unitSystem === 'imperial') {
      onChange({ height: `${feet}'${inches}"`, weight: `${pounds} lb` });
    } else {
      onChange({ height: `${centimeters} cm`, weight: `${kilograms} kg` });
    }
  }, [unitSystem, feet, inches, pounds, centimeters, kilograms]);

  return (
    <QuestionStep
      question="Height and weight?"
      description="We use this to personalize your nutrition plan"
      value={value ? `${value.height}, ${value.weight}` : ''}
      onChange={() => {}}
      customContent={
        <View style={styles.container}>
          {/* Toggle Unit System */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, unitSystem === 'imperial' && styles.activeToggleButton]}
              onPress={() => setUnitSystem('imperial')}
            >
              <Text style={[styles.toggleText, unitSystem === 'imperial' && styles.activeToggleText]}>
                Imperial
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, unitSystem === 'metric' && styles.activeToggleButton]}
              onPress={() => setUnitSystem('metric')}
            >
              <Text style={[styles.toggleText, unitSystem === 'metric' && styles.activeToggleText]}>
                Metric
              </Text>
            </TouchableOpacity>
          </View>

          {/* Height & Weight Row */}
          <View style={styles.rowContainer}>
            {/* Height */}
            <View style={styles.heightSection}>
              <Text style={styles.label}>Height</Text>
              <View style={styles.pickerRow}>
                {unitSystem === 'imperial' ? (
                  <>
                    <View style={styles.pickerContainer}>
                      <Picker selectedValue={feet} onValueChange={setFeet} style={styles.picker} itemStyle={styles.pickerItem}>
                        {feetOptions.map(f => <Picker.Item key={f} label={`${f} ft`} value={f} />)}
                      </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                      <Picker selectedValue={inches} onValueChange={setInches} style={styles.picker} itemStyle={styles.pickerItem}>
                        {inchOptions.map(i => <Picker.Item key={i} label={`${i} in`} value={i} />)}
                      </Picker>
                    </View>
                  </>
                ) : (
                  <View style={styles.pickerContainer}>
                    <Picker selectedValue={centimeters} onValueChange={setCentimeters} style={styles.picker} itemStyle={styles.pickerItem}>
                      {centimeterOptions.map(cm => <Picker.Item key={cm} label={`${cm} cm`} value={cm} />)}
                    </Picker>
                  </View>
                )}
              </View>
            </View>

            {/* Weight */}
            <View style={styles.weightSection}>
              <Text style={styles.label}>Weight</Text>
              <View style={styles.pickerRow}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={unitSystem === 'imperial' ? pounds : kilograms}
                    onValueChange={val => unitSystem === 'imperial' ? setPounds(val) : setKilograms(val)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {(unitSystem === 'imperial' ? poundOptions : kilogramOptions).map(val => (
                      <Picker.Item key={val} label={`${val} ${unitSystem === 'imperial' ? 'lb' : 'kg'}`} value={val} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 19,
    marginTop: 20
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  activeToggleButton: {
    backgroundColor: '#000'
  },
  toggleText: {
    fontSize: 16,
    color: '#d0d0d0',
    fontWeight: 'bold'
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 2,
    marginRight: 17
  },
  heightSection: {
    flex: 2,
    marginHorizontal: 1
  },
  weightSection: {
    // flex: 1,
    marginHorizontal: 4,
    minWidth: 160
  },
  label: { 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#000' 
  },
  pickerRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  pickerContainer: { 
    height: 200, 
    flex: 1
  },
  picker: { 
    width: '100%', 
    height: '100%',
  },
  pickerItem: { 
    fontSize: 16, 
    color: '#000', 
    textAlign: 'center' 
  },
});
