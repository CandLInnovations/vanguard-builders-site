'use client';

import React from 'react';
import { CustomBuildWizardData } from '@/types/wizard';
import CustomBuildWizard from '@/components/wizard/CustomBuildWizard';

export default function CustomBuildWizardPage() {
  const handleWizardComplete = (data: CustomBuildWizardData) => {
    // Handle form submission - send to API, show success message, etc.
    console.log('Custom build wizard completed with data:', data);
    
    // In a real app, you might:
    // 1. Send data to your API
    // 2. Show a success message
    // 3. Redirect to a thank you page
    // 4. Send email notifications
    
    alert('Thank you for your submission! We will contact you within 24 hours to schedule your complimentary consultation.');
  };

  return <CustomBuildWizard onComplete={handleWizardComplete} />;
}