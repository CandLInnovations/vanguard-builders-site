'use client';

import React from 'react';
import { RemodelingWizardData } from '@/types/wizard';
import RemodelingWizard from '@/components/wizard/RemodelingWizard';

export default function RemodelingWizardPage() {
  const handleWizardComplete = (data: RemodelingWizardData) => {
    // Handle form submission - send to API, show success message, etc.
    console.log('Remodeling wizard completed with data:', data);
    
    // In a real app, you might:
    // 1. Send data to your API
    // 2. Show a success message
    // 3. Redirect to a thank you page
    // 4. Send email notifications
    
    alert('Thank you for your submission! We will contact you within 24 hours to schedule your complimentary consultation.');
  };

  return <RemodelingWizard onComplete={handleWizardComplete} />;
}