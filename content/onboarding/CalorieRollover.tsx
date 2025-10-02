// app/onboarding/content/CalorieRolloverContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const CalorieRollover: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="Do you want unused calories to roll over?"
      options={['Yes', 'No']}
      value={value || null}
      onChange={onChange}
    />
  );
};
