'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { REMODELING_SCOPES, REMODELING_PROJECT_TYPES } from '@/constants/wizard';
import OptionCard from '../../OptionCard';

interface ScopeSelectionData {
  projectTypes: string[];
  scopes: Record<string, string>; // projectType -> scope
}

export default function ScopeSelectionStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as ScopeSelectionData;
  const selectedProjectTypes = currentData.projectTypes || [];

  useEffect(() => {
    // Validate: each selected project type should have a scope selected
    const allScopesSelected = selectedProjectTypes.every(projectType => 
      currentData.scopes && currentData.scopes[projectType]
    );
    
    if (!allScopesSelected && selectedProjectTypes.length > 0) {
      // Set validation error
    } else {
      // Clear validation error
    }
  }, [currentData.scopes, selectedProjectTypes]);

  const handleScopeSelect = (projectTypeId: string, scopeId: string) => {
    const updatedScopes = {
      ...currentData.scopes,
      [projectTypeId]: scopeId
    };

    updateData({ scopes: updatedScopes });
  };

  const getProjectTypeName = (projectTypeId: string) => {
    return REMODELING_PROJECT_TYPES.find(type => type.id === projectTypeId)?.title || projectTypeId;
  };

  if (selectedProjectTypes.length === 0) {
    return (
      <div className="wizard-step">
        <div className="wizard-step-header">
          <h2 className="wizard-step-title">No Project Types Selected</h2>
          <p className="wizard-step-description">
            Please go back and select at least one project type to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Choose Your Remodeling Scope</h2>
        <p className="wizard-step-description">
          For each area you selected, choose the level of remodeling that fits your vision and budget.
        </p>
      </div>

      <div className="wizard-step-content">
        {selectedProjectTypes.map((projectTypeId, index) => (
          <div key={projectTypeId} className="scope-section">
            <h3 className="scope-section-title">
              {getProjectTypeName(projectTypeId)}
            </h3>
            
            <div className="option-grid option-grid-3">
              {REMODELING_SCOPES.default.map((scope) => (
                <OptionCard
                  key={`${projectTypeId}-${scope.id}`}
                  option={scope}
                  selected={currentData.scopes?.[projectTypeId] === scope.id}
                  onSelect={() => handleScopeSelect(projectTypeId, scope.id)}
                />
              ))}
            </div>

            {index < selectedProjectTypes.length - 1 && (
              <div className="scope-section-divider" />
            )}
          </div>
        ))}

        {errors.scopes && (
          <div className="wizard-error">
            {errors.scopes}
          </div>
        )}

        <div className="wizard-note">
          <div className="scope-guide">
            <h4 className="scope-guide-title">Remodeling Scope Guide:</h4>
            <div className="scope-guide-items">
              <div className="scope-guide-item">
                <strong>Facelift ($)</strong> - Perfect for refreshing your space with new paint, fixtures, 
                and hardware while keeping the existing layout.
              </div>
              <div className="scope-guide-item">
                <strong>Pull and Replace ($$)</strong> - Complete renovation with new major elements like 
                cabinets, countertops, and flooring, with some layout changes.
              </div>
              <div className="scope-guide-item">
                <strong>Full-Scale Remodeling ($$$)</strong> - Complete transformation including structural 
                changes, luxury finishes, and custom design elements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}