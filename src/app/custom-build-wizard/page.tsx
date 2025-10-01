'use client';

import React from 'react';
import { CustomBuildWizardData } from '@/types/wizard';
import CustomBuildWizard from '@/components/wizard/CustomBuildWizard';

export default function CustomBuildWizardPage() {
  const handleWizardComplete = (data: CustomBuildWizardData) => {
    // The wizard handles the success display internally
    // This just logs the completion for any additional tracking
    console.log('Custom build wizard completed with data:', data);
  };

  return <CustomBuildWizard onComplete={handleWizardComplete} />;
}