'use client';

import React from 'react';
import { StepProps } from '@/types/wizard';
import { 
  REMODELING_PROJECT_TYPES, 
  STYLE_PREFERENCES, 
  REMODELING_BUDGET_RANGES,
  CUSTOM_BUILD_BUDGET_RANGES,
  TIMELINE_OPTIONS,
  LAND_STATUS_OPTIONS,
  SQUARE_FOOTAGE_OPTIONS,
  ARCHITECTURAL_STYLES,
  HOME_FEATURES
} from '@/constants/wizard';

interface SummaryStepProps extends StepProps {
  wizardType: 'remodeling' | 'custom-build';
  onRequestConsultation?: () => void;
}

export default function SummaryStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  errors,
  wizardType,
  onRequestConsultation 
}: SummaryStepProps) {

  const getOptionTitle = (options: any[], id: string) => {
    return options.find(option => option.id === id)?.title || id;
  };

  const getSelectedProjectTypes = () => {
    if (!data.projectTypes) return [];
    return data.projectTypes.map((id: string) => 
      getOptionTitle(REMODELING_PROJECT_TYPES, id)
    );
  };

  const getSelectedStyles = () => {
    if (!data.stylePreferences) return [];
    return data.stylePreferences.map((id: string) => 
      getOptionTitle(STYLE_PREFERENCES, id)
    );
  };

  const getSelectedFeatures = () => {
    if (!data.features) return [];
    return data.features.map((id: string) => 
      getOptionTitle(HOME_FEATURES, id)
    );
  };

  const budgetRanges = wizardType === 'remodeling' ? REMODELING_BUDGET_RANGES : CUSTOM_BUILD_BUDGET_RANGES;

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Project Summary</h2>
        <p className="wizard-step-description">
          Review your project details before we connect you with our team.
        </p>
      </div>

      <div className="wizard-step-content">
        <div className="summary-container">
          
          {/* Contact Information */}
          <div className="summary-section">
            <h3 className="summary-section-title">Contact Information</h3>
            <div className="summary-details">
              <div className="summary-detail">
                <span className="summary-label">Name:</span>
                <span className="summary-value">
                  {data.contactInfo?.firstName} {data.contactInfo?.lastName}
                </span>
              </div>
              <div className="summary-detail">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{data.contactInfo?.email}</span>
              </div>
              <div className="summary-detail">
                <span className="summary-label">Phone:</span>
                <span className="summary-value">{data.contactInfo?.phone}</span>
              </div>
              <div className="summary-detail">
                <span className="summary-label">Preferred Contact:</span>
                <span className="summary-value">{data.contactInfo?.preferredContact}</span>
              </div>
            </div>
          </div>

          {/* Project Type (Remodeling) */}
          {wizardType === 'remodeling' && data.projectTypes && (
            <div className="summary-section">
              <h3 className="summary-section-title">Project Types</h3>
              <div className="summary-list">
                {getSelectedProjectTypes().map((type: string, index: number) => (
                  <div key={index} className="summary-list-item">{type}</div>
                ))}
              </div>
              
              {/* Scopes for each project type */}
              {data.scopes && Object.keys(data.scopes).length > 0 && (
                <div className="summary-subsection">
                  <h4 className="summary-subsection-title">Scope Selections</h4>
                  {Object.entries(data.scopes).map(([projectType, scope]: [string, any]) => (
                    <div key={projectType} className="summary-detail">
                      <span className="summary-label">
                        {getOptionTitle(REMODELING_PROJECT_TYPES, projectType)}:
                      </span>
                      <span className="summary-value">{scope}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Build Specific */}
          {wizardType === 'custom-build' && (
            <>
              {/* Land Status */}
              {data.landStatus && (
                <div className="summary-section">
                  <h3 className="summary-section-title">Land Status</h3>
                  <div className="summary-value">
                    {getOptionTitle(LAND_STATUS_OPTIONS, data.landStatus)}
                  </div>
                </div>
              )}

              {/* Home Size */}
              {data.homeSize && (
                <div className="summary-section">
                  <h3 className="summary-section-title">Home Specifications</h3>
                  <div className="summary-details">
                    <div className="summary-detail">
                      <span className="summary-label">Square Footage:</span>
                      <span className="summary-value">
                        {getOptionTitle(SQUARE_FOOTAGE_OPTIONS, data.homeSize.squareFootage)}
                      </span>
                    </div>
                    <div className="summary-detail">
                      <span className="summary-label">Bedrooms:</span>
                      <span className="summary-value">{data.homeSize.bedrooms}</span>
                    </div>
                    <div className="summary-detail">
                      <span className="summary-label">Bathrooms:</span>
                      <span className="summary-value">{data.homeSize.bathrooms}</span>
                    </div>
                    <div className="summary-detail">
                      <span className="summary-label">Stories:</span>
                      <span className="summary-value">{data.homeSize.stories}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {data.features && data.features.length > 0 && (
                <div className="summary-section">
                  <h3 className="summary-section-title">Selected Features</h3>
                  <div className="summary-list">
                    {getSelectedFeatures().map((feature: string, index: number) => (
                      <div key={index} className="summary-list-item">{feature}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Style */}
              {data.architecturalStyle && (
                <div className="summary-section">
                  <h3 className="summary-section-title">Architectural Style</h3>
                  <div className="summary-value">
                    {getOptionTitle(ARCHITECTURAL_STYLES, data.architecturalStyle)}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Style Preferences */}
          {data.stylePreferences && data.stylePreferences.length > 0 && (
            <div className="summary-section">
              <h3 className="summary-section-title">Style Preferences</h3>
              <div className="summary-list">
                {getSelectedStyles().map((style: string, index: number) => (
                  <div key={index} className="summary-list-item">{style}</div>
                ))}
              </div>
            </div>
          )}

          {/* Budget */}
          {data.budget && (
            <div className="summary-section">
              <h3 className="summary-section-title">Budget Range</h3>
              <div className="summary-value">
                {getOptionTitle(budgetRanges, data.budget)}
              </div>
            </div>
          )}

          {/* Timeline */}
          {data.timeline && (
            <div className="summary-section">
              <h3 className="summary-section-title">Project Timeline</h3>
              <div className="summary-value">
                {getOptionTitle(TIMELINE_OPTIONS, data.timeline)}
              </div>
            </div>
          )}

          {/* Additional Message */}
          {data.contactInfo?.message && (
            <div className="summary-section">
              <h3 className="summary-section-title">Additional Comments</h3>
              <div className="summary-message">
                {data.contactInfo.message}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="summary-cta">
          <div className="summary-cta-content">
            <h3 className="summary-cta-title">Ready to Begin Your Journey?</h3>
            <p className="summary-cta-description">
              Our team will review your project details and contact you within 24 hours to schedule 
              your complimentary consultation.
            </p>
            {errors.spamValidation && (
              <div className="wizard-error" style={{ marginBottom: '1rem' }}>
                {errors.spamValidation}
              </div>
            )}
            <button 
              onClick={onRequestConsultation}
              className="summary-cta-button"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}