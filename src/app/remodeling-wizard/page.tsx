'use client';

import React from 'react';
import { RemodelingWizardData } from '@/types/wizard';
import RemodelingWizard from '@/components/wizard/RemodelingWizard';

export default function RemodelingWizardPage() {
  const handleWizardComplete = (data: RemodelingWizardData) => {
    // The wizard handles the success display internally
    // This just logs the completion for any additional tracking
    console.log('Remodeling wizard completed with data:', data);
  };

  return <RemodelingWizard onComplete={handleWizardComplete} />;
}