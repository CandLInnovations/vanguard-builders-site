'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomBuildWizardData } from '@/types/wizard';
import { useWizardState } from '@/hooks/useWizardState';
import { ContactFormData, ValidationResult } from '@/hooks/useAntiSpam';
import WizardContainer from './WizardContainer';
import LandStatusStep from './steps/custom-build/LandStatusStep';
import HomeSizeStep from './steps/custom-build/HomeSizeStep';
import FeaturesStep from './steps/custom-build/FeaturesStep';
import ArchitecturalStyleStep from './steps/custom-build/ArchitecturalStyleStep';
import StylePreferencesStep from './steps/StylePreferencesStep';
import BudgetStep from './steps/BudgetStep';
import ContactStep from './steps/ContactStep';
import SummaryStep from './steps/SummaryStep';
import SuccessDisplay from './SuccessDisplay';
import SpamProtection from './SpamProtection';
import VerificationChallenge from './VerificationChallenge';

const initialData: CustomBuildWizardData = {
  landStatus: '',
  homeSize: {
    squareFootage: '',
    bedrooms: 3,
    bathrooms: 2,
    stories: ''
  },
  features: [],
  architecturalStyle: '',
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
  { id: 'land-status', title: 'Land Status', component: LandStatusStep },
  { id: 'home-size', title: 'Home Size', component: HomeSizeStep },
  { id: 'features', title: 'Features & Amenities', component: FeaturesStep },
  { id: 'architectural-style', title: 'Architectural Style', component: ArchitecturalStyleStep },
  { id: 'style', title: 'Interior Style', component: StylePreferencesStep },
  { id: 'budget', title: 'Budget Range', component: BudgetStep },
  { id: 'contact', title: 'Contact & Timeline', component: ContactStep },
  { id: 'summary', title: 'Review & Submit', component: SummaryStep }
];

interface CustomBuildWizardProps {
  onComplete?: (data: CustomBuildWizardData) => void;
}

export default function CustomBuildWizard({ onComplete }: CustomBuildWizardProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [spamValidationError, setSpamValidationError] = useState<string>('');
  const router = useRouter();
  const wizard = useWizardState(initialData, wizardSteps.length, 'custom-build-wizard');

  const validateCurrentStep = useCallback(() => {
    const errors: Record<string, string> = {};
    const currentStepId = wizardSteps[wizard.currentStep].id;

    switch (currentStepId) {
      case 'land-status':
        if (!wizard.data.landStatus) {
          errors.landStatus = 'Please select your land status';
        }
        break;

      case 'home-size':
        if (!wizard.data.homeSize?.squareFootage) {
          errors.squareFootage = 'Please select a square footage range';
        }
        if (!wizard.data.homeSize?.bedrooms || wizard.data.homeSize.bedrooms < 2) {
          errors.bedrooms = 'Please select number of bedrooms';
        }
        if (!wizard.data.homeSize?.bathrooms || wizard.data.homeSize.bathrooms < 2) {
          errors.bathrooms = 'Please select number of bathrooms';
        }
        if (!wizard.data.homeSize?.stories) {
          errors.stories = 'Please select home layout';
        }
        break;

      case 'architectural-style':
        if (!wizard.data.architecturalStyle) {
          errors.architecturalStyle = 'Please select an architectural style';
        }
        break;

      case 'style':
        if (!wizard.data.stylePreferences || wizard.data.stylePreferences.length === 0) {
          errors.stylePreferences = 'Please select at least one interior style preference';
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
        message="We've received your custom home details and our design team will be in touch within 24 hours to schedule your consultation."
        onComplete={handleSuccessComplete}
      />
    );
  }

  return (
    <SpamProtection wizardType="custom-build">
      {({ validateAndSubmit, isProtectionReady, trustScore, showHoneypot, debugInfo }) => (
        <>
          <WizardContainer
            title="Custom Home Build Wizard"
            subtitle="Design your dream custom home with our step-by-step planning process"
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
              wizardType="custom-build"
              onRequestConsultation={() => handleRequestConsultation(validateAndSubmit)}
            />
            
            {/* Development Debug Info - Only render after hydration */}
            {typeof window !== 'undefined' && debugInfo && process.env.NODE_ENV === 'development' && (
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