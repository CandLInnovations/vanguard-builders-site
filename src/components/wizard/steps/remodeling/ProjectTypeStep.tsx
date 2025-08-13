'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { REMODELING_PROJECT_TYPES } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface ProjectTypeData {
  projectTypes: string[];
}

export default function ProjectTypeStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as ProjectTypeData;

  useEffect(() => {
    // Validate: at least one project type should be selected
    const hasSelection = currentData.projectTypes && currentData.projectTypes.length > 0;
    
    if (!hasSelection) {
      // Set validation error - this would typically be handled by parent component
    } else {
      // Clear validation error
    }
  }, [currentData.projectTypes]);

  const handleProjectTypeSelect = (projectTypeId: string) => {
    const current = currentData.projectTypes || [];
    let updated: string[];

    if (current.includes(projectTypeId)) {
      // Remove if already selected
      updated = current.filter(id => id !== projectTypeId);
    } else {
      // Add if not selected
      updated = [...current, projectTypeId];
    }

    updateData({ projectTypes: updated });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">What Would You Like to Remodel?</h2>
        <p className="wizard-step-description">
          Select all areas of your home that you'd like to include in your remodeling project. 
          You can choose multiple options.
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="option-grid option-grid-3">
          {REMODELING_PROJECT_TYPES.map((projectType) => (
            <OptionCard
              key={projectType.id}
              option={projectType}
              selected={currentData.projectTypes?.includes(projectType.id) || false}
              onSelect={() => handleProjectTypeSelect(projectType.id)}
              multiSelect
            />
          ))}
        </div>

        {errors.projectTypes && (
          <div className="wizard-error">
            {errors.projectTypes}
          </div>
        )}

        <div className="wizard-note">
          <p>
            <strong>Not sure what you want?</strong> No problem! Our design consultants can help you 
            explore possibilities during your complimentary consultation.
          </p>
        </div>
      </div>
    </div>
  );
}