// app/onboarding/content/GenderContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const Gender: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="What is your gender?"
      description='This helps us provide a more personalized experience.'
      options={['Male', 'Female', 'Other']}
      value={value || null}
      onChange={onChange}
    />
  );
};
