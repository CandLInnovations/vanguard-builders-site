'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { LAND_STATUS_OPTIONS } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface LandStatusData {
  landStatus: string;
}

export default function LandStatusStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as LandStatusData;

  useEffect(() => {
    // Validate: land status should be selected
    const hasSelection = currentData.landStatus && currentData.landStatus.length > 0;
    
    if (!hasSelection) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.landStatus]);

  const handleLandStatusSelect = (statusId: string) => {
    updateData({ landStatus: statusId });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">What's Your Land Situation?</h2>
        <p className="wizard-step-description">
          Understanding your land status helps us provide the most accurate guidance and timeline 
          for your custom home project.
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="option-grid option-grid-2">
          {LAND_STATUS_OPTIONS.map((status) => (
            <OptionCard
              key={status.id}
              option={status}
              selected={currentData.landStatus === status.id}
              onSelect={() => handleLandStatusSelect(status.id)}
            />
          ))}
        </div>

        {errors.landStatus && (
          <div className="wizard-error">
            {errors.landStatus}
          </div>
        )}

        <div className="wizard-note">
          <p>
            <strong>Don't worry if you're still exploring!</strong> We work with trusted land specialists 
            and can guide you through every step of the land acquisition process. We'll also help you 
            understand zoning requirements, utilities, and building restrictions for any property you're considering.
          </p>
        </div>
      </div>
    </div>
  );
}