'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { SQUARE_FOOTAGE_OPTIONS, STORY_OPTIONS } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface HomeSizeData {
  homeSize: {
    squareFootage: string;
    bedrooms: number;
    bathrooms: number;
    stories: string;
  };
}

export default function HomeSizeStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as HomeSizeData;

  useEffect(() => {
    // Validate: all fields should be filled
    const homeSize = currentData.homeSize;
    const isValid = homeSize && 
                   homeSize.squareFootage && 
                   homeSize.bedrooms > 0 && 
                   homeSize.bathrooms > 0 && 
                   homeSize.stories;
    
    if (!isValid) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.homeSize]);

  const updateHomeSize = (field: string, value: string | number) => {
    updateData({
      homeSize: {
        ...currentData.homeSize,
        [field]: value
      }
    });
  };

  const bedroomOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i + 2,
    label: i === 4 ? '6+' : `${i + 2}`
  }));

  const bathroomOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i + 2,
    label: i === 6 ? '8+' : `${i + 2}`
  }));

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Tell Us About Your Dream Home</h2>
        <p className="wizard-step-description">
          Help us understand the size and layout preferences for your custom home.
        </p>
      </div>

      <div className="wizard-step-content">
        {/* Square Footage */}
        <div className="wizard-section">
          <h3 className="wizard-section-title">Square Footage Range</h3>
          <div className="option-grid option-grid-3">
            {SQUARE_FOOTAGE_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={currentData.homeSize?.squareFootage === option.id}
                onSelect={() => updateHomeSize('squareFootage', option.id)}
              />
            ))}
          </div>
          {errors.squareFootage && (
            <div className="wizard-error">{errors.squareFootage}</div>
          )}
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="wizard-section">
          <h3 className="wizard-section-title">Rooms</h3>
          <div className="wizard-form-row">
            <div className="wizard-form-group">
              <label className="wizard-label">Bedrooms</label>
              <div className="wizard-select-grid">
                {bedroomOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateHomeSize('bedrooms', option.value)}
                    className={`wizard-select-button ${
                      currentData.homeSize?.bedrooms === option.value ? 'selected' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.bedrooms && (
                <div className="wizard-field-error">{errors.bedrooms}</div>
              )}
            </div>

            <div className="wizard-form-group">
              <label className="wizard-label">Bathrooms</label>
              <div className="wizard-select-grid">
                {bathroomOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateHomeSize('bathrooms', option.value)}
                    className={`wizard-select-button ${
                      currentData.homeSize?.bathrooms === option.value ? 'selected' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.bathrooms && (
                <div className="wizard-field-error">{errors.bathrooms}</div>
              )}
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="wizard-section">
          <h3 className="wizard-section-title">Home Layout</h3>
          <div className="option-grid option-grid-3">
            {STORY_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={currentData.homeSize?.stories === option.id}
                onSelect={() => updateHomeSize('stories', option.id)}
              />
            ))}
          </div>
          {errors.stories && (
            <div className="wizard-error">{errors.stories}</div>
          )}
        </div>

        <div className="wizard-note">
          <p>
            <strong>These are starting points!</strong> During your consultation, we'll refine these 
            specifications based on your lifestyle, lot characteristics, and budget considerations.
          </p>
        </div>
      </div>
    </div>
  );
}