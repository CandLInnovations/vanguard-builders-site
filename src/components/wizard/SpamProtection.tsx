'use client';

import React, { useState, useCallback } from 'react';
import { useAntiSpam, SpamProtectionConfig, ContactFormData, ValidationResult } from '@/hooks/useAntiSpam';

interface SpamProtectionProps {
  children: (props: {
    validateAndSubmit: (formData: ContactFormData) => Promise<ValidationResult>;
    isProtectionReady: boolean;
    trustScore: number;
    showHoneypot: boolean;
    debugInfo?: any;
  }) => React.ReactNode;
  wizardType: 'remodeling' | 'custom-build';
  config?: Partial<SpamProtectionConfig>;
}

const defaultConfig: SpamProtectionConfig = {
  minCompletionTime: 45, // seconds
  maxSubmissionsPerHour: 2,
  maxSubmissionsPerDay: 5,
  enableHoneypot: true,
  enableRateLimit: true,
  enableBehaviorAnalysis: true,
  trustScoreThreshold: 50
};

// Adjust for different wizard types
const getWizardConfig = (wizardType: 'remodeling' | 'custom-build'): SpamProtectionConfig => {
  const config = { ...defaultConfig };
  
  if (wizardType === 'custom-build') {
    config.minCompletionTime = 90; // Custom builds should take longer
  }
  
  // Development overrides
  if (process.env.NODE_ENV === 'development') {
    config.maxSubmissionsPerHour = 50;
    config.maxSubmissionsPerDay = 100;
    config.minCompletionTime = 5; // Much shorter for testing
  }
  
  return config;
};

export default function SpamProtection({ 
  children, 
  wizardType, 
  config: userConfig = {} 
}: SpamProtectionProps) {
  const config = { ...getWizardConfig(wizardType), ...userConfig };
  const { 
    validateSubmission, 
    recordSubmission, 
    trustScore, 
    isReady, 
    debugInfo 
  } = useAntiSpam(config, wizardType);

  const validateAndSubmit = useCallback(async (formData: ContactFormData): Promise<ValidationResult> => {
    const result = await validateSubmission(formData);
    
    if (result.isValid || result.requiresAdditionalVerification) {
      recordSubmission();
    }
    
    return result;
  }, [validateSubmission, recordSubmission]);

  return (
    <>
      {children({
        validateAndSubmit,
        isProtectionReady: isReady,
        trustScore,
        showHoneypot: config.enableHoneypot,
        debugInfo
      })}
    </>
  );
}