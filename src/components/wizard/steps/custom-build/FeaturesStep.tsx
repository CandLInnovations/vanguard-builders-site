'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { HOME_FEATURES } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface FeaturesData {
  features: string[];
}

export default function FeaturesStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as FeaturesData;

  // Group features by category
  const featureCategories = {
    'Outdoor Living': ['pool', 'outdoor-kitchen', 'covered-patios'],
    'Garage & Storage': ['2-car-garage', '3-car-garage', '4-car-garage'],
    'Special Rooms': ['home-office', 'media-room', 'wine-cellar', 'gym'],
    'Luxury Features': ['smart-home', 'high-end-appliances', 'custom-millwork']
  };

  const handleFeatureSelect = (featureId: string) => {
    const current = currentData.features || [];
    let updated: string[];

    if (current.includes(featureId)) {
      // Remove if already selected
      updated = current.filter(id => id !== featureId);
    } else {
      // Add if not selected
      updated = [...current, featureId];
      
      // Handle garage exclusivity
      if (featureId.includes('garage')) {
        // Remove other garage selections
        updated = updated.filter(id => !id.includes('garage') || id === featureId);
      }
    }

    updateData({ features: updated });
  };

  const getFeaturesByCategory = (categoryFeatures: string[]) => {
    return HOME_FEATURES.filter(feature => categoryFeatures.includes(feature.id));
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Key Features & Amenities</h2>
        <p className="wizard-step-description">
          Select the features and amenities that are important for your custom home. 
          These help us understand your lifestyle and priorities.
        </p>
      </div>

      <div className="wizard-step-content">
        {Object.entries(featureCategories).map(([categoryName, categoryFeatures], index) => (
          <div key={categoryName} className="features-category">
            <h3 className="features-category-title">{categoryName}</h3>
            <div className="option-grid option-grid-3">
              {getFeaturesByCategory(categoryFeatures).map((feature) => (
                <OptionCard
                  key={feature.id}
                  option={feature}
                  selected={currentData.features?.includes(feature.id) || false}
                  onSelect={() => handleFeatureSelect(feature.id)}
                  multiSelect
                />
              ))}
            </div>
            
            {index < Object.entries(featureCategories).length - 1 && (
              <div className="features-category-divider" />
            )}
          </div>
        ))}

        {errors.features && (
          <div className="wizard-error">
            {errors.features}
          </div>
        )}

        <div className="wizard-note">
          <div className="features-guide">
            <h4 className="features-guide-title">Planning Tips:</h4>
            <ul className="features-guide-list">
              <li>
                <strong>Outdoor Living:</strong> Perfect for Texas's year-round outdoor weather. 
                Consider how you'll use these spaces for entertaining and relaxation.
              </li>
              <li>
                <strong>Garage Options:</strong> Think about your vehicles, storage needs, and potential 
                workshop space. Many Texas homes benefit from oversized garages.
              </li>
              <li>
                <strong>Special Rooms:</strong> These dedicated spaces add significant value and 
                functionality to your daily life.
              </li>
              <li>
                <strong>Luxury Features:</strong> These premium elements define the character and 
                sophistication of your home.
              </li>
            </ul>
            <p className="features-guide-note">
              <strong>Remember:</strong> You can always add or modify features during the design process. 
              These selections help us prepare initial concepts and budgeting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}