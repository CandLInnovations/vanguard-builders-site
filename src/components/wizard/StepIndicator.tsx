'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="wizard-progress">
      <div className="wizard-progress-container">
        <div className="wizard-progress-steps">
          {steps.map((step, index) => (
            <div key={step.id} className="wizard-progress-step">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                className={`wizard-step-button ${
                  step.current ? 'wizard-step-current' : 
                  step.completed ? 'wizard-step-completed' : 
                  'wizard-step-pending'
                }`}
              >
                {step.completed ? (
                  <Check className="wizard-step-icon" />
                ) : (
                  <span className="wizard-step-number">{index + 1}</span>
                )}
              </button>
              
              {index < steps.length - 1 && (
                <div className={`wizard-step-connector ${
                  steps[index + 1].completed || steps[index + 1].current ? 
                  'wizard-step-connector-active' : 
                  'wizard-step-connector-inactive'
                }`} />
              )}
              
              <div className="wizard-step-label">
                <span className={`wizard-step-title ${
                  step.current ? 'wizard-step-title-current' : 
                  step.completed ? 'wizard-step-title-completed' : 
                  'wizard-step-title-pending'
                }`}>
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}