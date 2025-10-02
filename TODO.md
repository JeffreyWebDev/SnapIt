# TODO: Update DesiredWeight Component with RulerPicker

- [x] Add required imports: useState, useMemo, StyleSheet, Text, View, Dimensions from 'react-native', and RulerPicker from 'react-native-ruler-picker'
- [x] Define MOCK constants: MOCK_UNIT, MOCK_CURRENT_WEIGHT, MOCK_GOAL_TYPE, MOCK_GOAL_WEIGHT
- [x] Create getConfig(unit) helper function returning min, max, step, fractionDigits based on unit
- [x] Initialize tempValue state with value prop or MOCK_CURRENT_WEIGHT
- [x] Define onValueChangeEnd callback to call onChange with final value
- [x] Define RulerContent constant with header, value display, and RulerPicker component
- [x] Update QuestionStep to use options={undefined} and customContent={RulerContent}
- [x] Define pickerStyles with styles for header, large text, ruler container
