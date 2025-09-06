'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RemodelingWizardData } from '@/types/wizard';
import { useWizardState } from '@/hooks/useWizardState';
import { ContactFormData, ValidationResult } from '@/hooks/useAntiSpam';
import WizardContainer from './WizardContainer';
import ProjectTypeStep from './steps/remodeling/ProjectTypeStep';
import ScopeSelectionStep from './steps/remodeling/ScopeSelectionStep';
import StylePreferencesStep from './steps/StylePreferencesStep';
import BudgetStep from './steps/BudgetStep';
import ContactStep from './steps/ContactStep';
import SummaryStep from './steps/SummaryStep';
import SuccessDisplay from './SuccessDisplay';
import SpamProtection from './SpamProtection';
import VerificationChallenge from './VerificationChallenge';

const initialData: RemodelingWizardData = {
  projectTypes: [],
  scopes: {},
  stylePreferences: [],
  budget: '',
  timeline: '',
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: ''
  }
};

const wizardSteps = [
  { id: 'project-type', title: 'Project Type', component: ProjectTypeStep },
  { id: 'scope', title: 'Scope Selection', component: ScopeSelectionStep },
  { id: 'style', title: 'Style Preferences', component: StylePreferencesStep },
  { id: 'budget', title: 'Budget Range', component: BudgetStep },
  { id: 'contact', title: 'Contact & Timeline', component: ContactStep },
  { id: 'summary', title: 'Review & Submit', component: SummaryStep }
];

interface RemodelingWizardProps {
  onComplete?: (data: RemodelingWizardData) => void;
}

export default function RemodelingWizard({ onComplete }: RemodelingWizardProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [spamValidationError, setSpamValidationError] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const wizard = useWizardState(initialData, wizardSteps.length, 'remodeling-wizard');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateCurrentStep = useCallback(() => {
    const errors: Record<string, string> = {};
    const currentStepId = wizardSteps[wizard.currentStep].id;

    switch (currentStepId) {
      case 'project-type':
        if (!wizard.data.projectTypes || wizard.data.projectTypes.length === 0) {
          errors.projectTypes = 'Please select at least one project type';
        }
        break;

      case 'scope':
        if (wizard.data.projectTypes && wizard.data.projectTypes.length > 0) {
          const missingScopeTypes = wizard.data.projectTypes.filter(
            type => !wizard.data.scopes || !wizard.data.scopes[type]
          );
          if (missingScopeTypes.length > 0) {
            errors.scopes = 'Please select a scope for each project type';
          }
        }
        break;

      case 'style':
        if (!wizard.data.stylePreferences || wizard.data.stylePreferences.length === 0) {
          errors.stylePreferences = 'Please select at least one style preference';
        }
        break;

      case 'budget':
        if (!wizard.data.budget) {
          errors.budget = 'Please select a budget range';
        }
        break;

      case 'contact':
        if (!wizard.data.timeline) {
          errors.timeline = 'Please select your preferred timeline';
        }
        if (!wizard.data.contactInfo?.firstName?.trim()) {
          errors.firstName = 'First name is required';
        }
        if (!wizard.data.contactInfo?.lastName?.trim()) {
          errors.lastName = 'Last name is required';
        }
        if (!wizard.data.contactInfo?.email?.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(wizard.data.contactInfo.email)) {
          errors.email = 'Please enter a valid email address';
        }
        if (!wizard.data.contactInfo?.phone?.trim()) {
          errors.phone = 'Phone number is required';
        }
        break;
    }

    wizard.setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [wizard]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      if (wizard.currentStep === wizardSteps.length - 1) {
        // Final step - handle completion
        onComplete?.(wizard.data);
      } else {
        wizard.nextStep();
      }
    }
  }, [validateCurrentStep, wizard, onComplete]);

  const handleRequestConsultation = useCallback(async (validateAndSubmit: (formData: ContactFormData) => Promise<ValidationResult>) => {
    setSpamValidationError('');
    
    // Convert wizard data to contact form format
    const formData: ContactFormData = {
      firstName: wizard.data.contactInfo?.firstName || '',
      lastName: wizard.data.contactInfo?.lastName || '',
      email: wizard.data.contactInfo?.email || '',
      phone: wizard.data.contactInfo?.phone || '',
      message: wizard.data.contactInfo?.message || '',
      // Include honeypot fields if they exist
      website: (wizard.data.contactInfo as any)?.website,
      company: (wizard.data.contactInfo as any)?.company,
      referral_source: (wizard.data.contactInfo as any)?.referral_source
    };

    try {
      const result = await validateAndSubmit(formData);
      
      if (result.isValid) {
        // Passed validation, show success
        console.log('Consultation request validated and submitted:', wizard.data);
        setShowSuccess(true);
        onComplete?.(wizard.data);
      } else if (result.requiresAdditionalVerification) {
        // Show verification challenge
        setShowVerification(true);
      } else {
        // Show validation errors
        const errorMessage = result.errors.length > 0 ? result.errors[0] : 'Please complete all required fields correctly.';
        setSpamValidationError(errorMessage);
      }
    } catch (error) {
      console.error('Spam validation error:', error);
      setSpamValidationError('There was an error processing your request. Please try again.');
    }
  }, [wizard.data, onComplete]);

  const handleSuccessComplete = useCallback(() => {
    wizard.resetWizard();
    router.push('/portfolio');
  }, [wizard, router]);

  const handleVerificationComplete = useCallback(() => {
    setShowVerification(false);
    setShowSuccess(true);
    onComplete?.(wizard.data);
  }, [wizard.data, onComplete]);

  const handleVerificationCancel = useCallback(() => {
    setShowVerification(false);
    setSpamValidationError('Verification was cancelled. Please try again.');
  }, []);

  const CurrentStepComponent = wizardSteps[wizard.currentStep].component;

  if (showSuccess) {
    return (
      <SuccessDisplay
        title="Thank You!"
        message="We've received your remodeling project details and our design team will be in touch within 24 hours to schedule your consultation."
        onComplete={handleSuccessComplete}
      />
    );
  }

  return (
    <SpamProtection wizardType="remodeling">
      {({ validateAndSubmit, isProtectionReady, trustScore, debugInfo }) => (
        <>
          <WizardContainer
            title="Remodeling Project Wizard"
            subtitle="Tell us about your remodeling vision and we'll connect you with our design team"
            steps={wizardSteps}
            currentStep={wizard.currentStep}
            canGoNext={wizard.canGoNext()}
            canGoBack={wizard.canGoBack()}
            onNext={handleNext}
            onBack={wizard.prevStep}
            onStepClick={wizard.goToStep}
          >
            <CurrentStepComponent
              data={wizard.data}
              updateData={wizard.updateData}
              onNext={handleNext}
              onBack={wizard.prevStep}
              isValid={wizard.isValid}
              errors={{...wizard.errors, spamValidation: spamValidationError}}
              wizardType="remodeling"
              onRequestConsultation={() => handleRequestConsultation(validateAndSubmit)}
            />
            
            {/* Development Debug Info - Only render after hydration */}
            {isClient && debugInfo && process.env.NODE_ENV === 'development' && (
              <div style={{ 
                position: 'fixed', 
                top: 10, 
                right: 10, 
                background: 'rgba(0,0,0,0.8)', 
                color: 'white', 
                padding: '10px', 
                fontSize: '12px',
                borderRadius: '4px',
                maxWidth: '300px',
                zIndex: 9999
              }}>
                <div>Trust Score: {trustScore}</div>
                <div>Ready: {isProtectionReady ? 'Yes' : 'No'}</div>
                <div>Time: {Math.round(debugInfo.timeSpent / 1000)}s</div>
                <div>Bypass: {debugInfo.hasTestingBypass ? 'Yes' : 'No'}</div>
              </div>
            )}
          </WizardContainer>

          {showVerification && (
            <VerificationChallenge
              onVerified={handleVerificationComplete}
              onCancel={handleVerificationCancel}
            />
          )}
        </>
      )}
    </SpamProtection>
  );
}