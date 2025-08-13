'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { REMODELING_BUDGET_RANGES, CUSTOM_BUILD_BUDGET_RANGES } from '@/constants/wizard';
import OptionCard from '../OptionCard';

interface BudgetData {
  budget: string;
}

interface BudgetStepProps extends StepProps {
  wizardType: 'remodeling' | 'custom-build';
}

export default function BudgetStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors,
  wizardType 
}: BudgetStepProps) {
  const currentData = data as BudgetData;
  const budgetOptions = wizardType === 'remodeling' ? REMODELING_BUDGET_RANGES : CUSTOM_BUILD_BUDGET_RANGES;

  useEffect(() => {
    // Validate: budget range should be selected
    const hasSelection = currentData.budget && currentData.budget.length > 0;
    
    if (!hasSelection) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.budget]);

  const handleBudgetSelect = (budgetId: string) => {
    updateData({ budget: budgetId });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">What's Your Budget Range?</h2>
        <p className="wizard-step-description">
          {wizardType === 'remodeling' 
            ? 'Help us understand your remodeling budget to provide the most accurate recommendations.'
            : 'Share your custom home budget range so we can tailor our recommendations accordingly.'
          }
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="option-grid option-grid-2">
          {budgetOptions.map((budget) => (
            <OptionCard
              key={budget.id}
              option={budget}
              selected={currentData.budget === budget.id}
              onSelect={() => handleBudgetSelect(budget.id)}
            />
          ))}
        </div>

        {errors.budget && (
          <div className="wizard-error">
            {errors.budget}
          </div>
        )}

        <div className="wizard-note">
          <p>
            <strong>Note:</strong> These ranges are estimates and can be adjusted based on your specific 
            requirements. We'll provide detailed pricing during our consultation.
          </p>
        </div>
      </div>
    </div>
  );
}