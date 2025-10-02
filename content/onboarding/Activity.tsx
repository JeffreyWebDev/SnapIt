// app/onboarding/content/ActivityContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const Activity: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="How active are you?"
      options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']}
      value={value || null}
      onChange={onChange}
    />
  );
};
