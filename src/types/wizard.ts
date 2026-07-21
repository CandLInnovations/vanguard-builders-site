// Shared types for both wizards
export interface BaseWizardData {
  stylePreferences: string[];
  budget: string;
  timeline: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone';
    message: string;
    // Honeypot fields for spam protection (should remain empty)
    website?: string;
    company?: string;
    referral_source?: string;
  };
}

// Remodeling wizard specific types
export interface RemodelingWizardData extends BaseWizardData {
  projectTypes: string[];
  scopes: Record<string, string>; // projectType -> scope (facelift/pull-replace/full-scale)
}

// Custom build wizard specific types
export interface CustomBuildWizardData extends BaseWizardData {
  landStatus: string;
  homeSize: {
    squareFootage: string;
    bedrooms: number;
    bathrooms: number;
    stories: string;
  };
  features: string[];
  architecturalStyle: string;
}

// Combined shape used by shared step components, which are rendered by both
// wizards and read/write whichever fields apply to the active wizard type.
export interface WizardData extends BaseWizardData {
  projectTypes?: string[];
  scopes?: Record<string, string>;
  landStatus?: string;
  homeSize?: {
    squareFootage: string;
    bedrooms: number;
    bathrooms: number;
    stories: string;
  };
  features?: string[];
  architecturalStyle?: string;
}

// Step definitions
export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
}

export interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
  errors: Record<string, string>;
}

// Progress indicator
export interface ProgressStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

// Option card for selections
export interface OptionCard {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  timeline?: string;
  features?: string[];
}