// app/onboarding/content/WeightGoalSpeedContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const WeightGoalSpeed: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="How fast do you want to reach your weight goal?"
      options={['Slow', 'Moderate', 'Fast']}
      value={value || null}
      onChange={onChange}
    />
  );
};
