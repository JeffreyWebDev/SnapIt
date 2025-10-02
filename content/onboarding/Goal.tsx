// app/onboarding/content/GoalContent.tsx
import React from 'react';
import { QuestionStep } from '../../components/onboarding/QuestionStep';

export const Goal: React.FC<{ value: string | null; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <QuestionStep
      question="What is your main goal?"
      options={['Lose Weight', 'Gain Weight', 'Maintain Weight']}
      value={value || null}
      onChange={onChange}
    />
  );
};
