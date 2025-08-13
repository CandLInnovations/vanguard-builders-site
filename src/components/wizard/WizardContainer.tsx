'use client';

import React, { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepIndicator from './StepIndicator';

interface WizardStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

interface WizardContainerProps {
  title: string;
  subtitle: string;
  steps: WizardStep[];
  currentStep: number;
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
  onStepClick?: (stepIndex: number) => void;
  children: ReactNode;
  isLoading?: boolean;
}

export default function WizardContainer({
  title,
  subtitle,
  steps,
  currentStep,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  onStepClick,
  children,
  isLoading = false
}: WizardContainerProps) {
  const progressSteps = steps.map((step, index) => ({
    id: step.id,
    title: step.title,
    completed: index < currentStep,
    current: index === currentStep
  }));

  return (
    <div className="wizard-container">
      {/* Header */}
      <div className="wizard-header">
        <div className="container">
          <div className="wizard-header-content">
            <h1 className="wizard-title">{title}</h1>
            <p className="wizard-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <StepIndicator 
        steps={progressSteps} 
        currentStep={currentStep}
        onStepClick={onStepClick}
      />

      {/* Step Content */}
      <div className="wizard-content">
        <div className="container">
          <div className="wizard-step-container">
            {isLoading ? (
              <div className="wizard-loading">
                <div className="wizard-loading-spinner"></div>
                <p>Loading...</p>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="wizard-navigation">
        <div className="container">
          <div className="wizard-nav-buttons">
            <button
              onClick={onBack}
              disabled={!canGoBack || isLoading}
              className="wizard-btn wizard-btn-secondary"
            >
              <ArrowLeft className="wizard-btn-icon" />
              Back
            </button>

            <div className="wizard-nav-spacer" />

            {currentStep === steps.length - 1 ? (
              // Hide the navigation button on last step - let summary step handle completion
              null
            ) : (
              <button
                onClick={onNext}
                disabled={!canGoNext || isLoading}
                className="wizard-btn wizard-btn-primary"
              >
                Next
                <ArrowRight className="wizard-btn-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}