'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { ARCHITECTURAL_STYLES } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface ArchitecturalStyleData {
  architecturalStyle: string;
}

export default function ArchitecturalStyleStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as ArchitecturalStyleData;

  useEffect(() => {
    // Validate: architectural style should be selected
    const hasSelection = currentData.architecturalStyle && currentData.architecturalStyle.length > 0;
    
    if (!hasSelection) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.architecturalStyle]);

  const handleStyleSelect = (styleId: string) => {
    updateData({ architecturalStyle: styleId });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Choose Your Architectural Style</h2>
        <p className="wizard-step-description">
          Select the architectural style that best represents your vision for your custom home. 
          This will guide our initial design direction and material selections.
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="option-grid option-grid-2">
          {ARCHITECTURAL_STYLES.map((style) => (
            <OptionCard
              key={style.id}
              option={style}
              selected={currentData.architecturalStyle === style.id}
              onSelect={() => handleStyleSelect(style.id)}
            />
          ))}
        </div>

        {errors.architecturalStyle && (
          <div className="wizard-error">
            {errors.architecturalStyle}
          </div>
        )}

        <div className="wizard-note">
          <div className="style-guide">
            <h4 className="style-guide-title">Texas Regional Considerations:</h4>
            <div className="style-guide-content">
              <p>
                <strong>Texas Hill Country:</strong> Perfect for lot locations with views and natural 
                landscape integration. Features stone, metal roofing, and covered porches.
              </p>
              <p>
                <strong>Mediterranean/Spanish:</strong> Excellent for Texas heat with thick walls, 
                tile roofs, and courtyards that provide natural cooling.
              </p>
              <p>
                <strong>Modern Contemporary:</strong> Maximizes energy efficiency with large windows 
                positioned for optimal light while minimizing heat gain.
              </p>
              <p>
                <strong>Remember:</strong> We can blend elements from multiple styles to create your 
                perfect custom home. This selection helps us start the conversation about your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}