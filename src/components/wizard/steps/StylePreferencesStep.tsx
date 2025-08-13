'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { STYLE_PREFERENCES } from '@/constants/wizard';
import OptionCard from '../OptionCard';

interface StylePreferencesData {
  stylePreferences: string[];
}

export default function StylePreferencesStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as StylePreferencesData;

  useEffect(() => {
    // Validate: at least one style preference should be selected
    const hasSelection = currentData.stylePreferences && currentData.stylePreferences.length > 0;
    
    if (!hasSelection) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.stylePreferences]);

  const handleStyleSelect = (styleId: string) => {
    const current = currentData.stylePreferences || [];
    let updated: string[];

    if (current.includes(styleId)) {
      // Remove if already selected
      updated = current.filter(id => id !== styleId);
    } else {
      // Add if not selected (allow multiple selections)
      updated = [...current, styleId];
    }

    updateData({ stylePreferences: updated });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">What's Your Style?</h2>
        <p className="wizard-step-description">
          Select the interior design styles that resonate with you. You can choose multiple options.
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="option-grid option-grid-3">
          {STYLE_PREFERENCES.map((style) => (
            <OptionCard
              key={style.id}
              option={style}
              selected={currentData.stylePreferences?.includes(style.id) || false}
              onSelect={() => handleStyleSelect(style.id)}
              multiSelect
            />
          ))}
        </div>

        {errors.stylePreferences && (
          <div className="wizard-error">
            {errors.stylePreferences}
          </div>
        )}
      </div>
    </div>
  );
}