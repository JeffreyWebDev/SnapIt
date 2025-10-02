// app/onboarding/content/DesiredWeightContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const DesiredWeight: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="What is your desired weight (kg)?"
      options={Array.from({ length: 5 }, (_, i) => (i + 1).toString())}
      value={value || null}
      onChange={onChange}
    />
  );
};
