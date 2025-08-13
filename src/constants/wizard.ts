import { OptionCard } from '@/types/wizard';

// Project types for remodeling
export const REMODELING_PROJECT_TYPES: OptionCard[] = [
  {
    id: 'kitchen',
    title: 'Kitchen Remodeling',
    description: 'Transform your kitchen into a culinary masterpiece',
    image: '/wizard/kitchen-remodel.jpg'
  },
  {
    id: 'bathroom',
    title: 'Bathroom Remodeling',
    description: 'Create a luxurious spa-like retreat',
    image: '/wizard/bathroom-remodel.jpg'
  },
  {
    id: 'living-room',
    title: 'Living Room Renovation',
    description: 'Redesign your main living space',
    image: '/wizard/living-room-renovation.jpg'
  },
  {
    id: 'master-suite',
    title: 'Master Suite Addition',
    description: 'Add a luxurious master bedroom suite',
    image: '/wizard/master-suite.jpg'
  },
  {
    id: 'whole-home',
    title: 'Whole Home Renovation',
    description: 'Complete home transformation',
    image: '/wizard/whole-home.jpg'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Living Addition',
    description: 'Extend your living space outdoors',
    image: '/wizard/outdoor-living.jpg'
  }
];

// Remodeling scopes
export const REMODELING_SCOPES: Record<string, OptionCard[]> = {
  default: [
    {
      id: 'facelift',
      title: 'Facelift',
      description: 'Cosmetic updates and refreshes',
      price: '$',
      timeline: '2-4 weeks',
      features: [
        'Paint and fixture updates',
        'Hardware refreshes',
        'Minimal structural changes',
        'Quick transformation'
      ]
    },
    {
      id: 'pull-replace',
      title: 'Pull and Replace',
      description: 'Complete replacement of major elements',
      price: '$$',
      timeline: '4-8 weeks',
      features: [
        'New cabinets and countertops',
        'Flooring replacement',
        'Some layout modifications',
        'Modern upgrades'
      ]
    },
    {
      id: 'full-scale',
      title: 'Full-Scale Remodeling',
      description: 'Complete transformation',
      price: '$$$',
      timeline: '8-16 weeks',
      features: [
        'Structural changes',
        'High-end custom finishes',
        'Complete redesign',
        'Luxury appointments'
      ]
    }
  ]
};

// Style preferences (shared)
export const STYLE_PREFERENCES: OptionCard[] = [
  {
    id: 'modern',
    title: 'Modern Contemporary',
    description: 'Clean lines, minimalist aesthetic',
    image: '/wizard/style-modern.jpg'
  },
  {
    id: 'traditional',
    title: 'Traditional',
    description: 'Timeless elegance and classic details',
    image: '/wizard/style-traditional.jpg'
  },
  {
    id: 'transitional',
    title: 'Transitional',
    description: 'Perfect blend of modern and traditional',
    image: '/wizard/style-transitional.jpg'
  },
  {
    id: 'farmhouse',
    title: 'Farmhouse',
    description: 'Rustic charm with modern comfort',
    image: '/wizard/style-farmhouse.jpg'
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    description: 'Warm, inviting Mediterranean influence',
    image: '/wizard/style-mediterranean.jpg'
  },
  {
    id: 'industrial',
    title: 'Industrial',
    description: 'Urban loft aesthetic with exposed elements',
    image: '/wizard/style-industrial.jpg'
  }
];

// Budget ranges
export const REMODELING_BUDGET_RANGES: OptionCard[] = [
  {
    id: '25k-50k',
    title: '$25,000 - $50,000',
    description: 'Focused updates and improvements'
  },
  {
    id: '50k-100k',
    title: '$50,000 - $100,000',
    description: 'Substantial renovations'
  },
  {
    id: '100k-200k',
    title: '$100,000 - $200,000',
    description: 'Major remodeling projects'
  },
  {
    id: '200k-500k',
    title: '$200,000 - $500,000',
    description: 'Luxury transformations'
  },
  {
    id: '500k-plus',
    title: '$500,000+',
    description: 'Ultra-luxury complete renovations'
  }
];

export const CUSTOM_BUILD_BUDGET_RANGES: OptionCard[] = [
  {
    id: '300k-500k',
    title: '$300,000 - $500,000',
    description: 'Quality custom home construction'
  },
  {
    id: '500k-750k',
    title: '$500,000 - $750,000',
    description: 'Premium custom homes'
  },
  {
    id: '750k-1m',
    title: '$750,000 - $1,000,000',
    description: 'Luxury custom residences'
  },
  {
    id: '1m-1.5m',
    title: '$1,000,000 - $1,500,000',
    description: 'High-end luxury homes'
  },
  {
    id: '1.5m-plus',
    title: '$1,500,000+',
    description: 'Ultra-luxury estate homes'
  },
  {
    id: 'help-determine',
    title: 'I need help determining my budget',
    description: 'Let us guide you through budget planning'
  }
];

// Land status options
export const LAND_STATUS_OPTIONS: OptionCard[] = [
  {
    id: 'own-specific',
    title: 'I own land and have a specific lot',
    description: 'Ready to build on your existing property'
  },
  {
    id: 'own-need-help',
    title: 'I own land but need help with lot selection',
    description: 'You own land but need guidance on the best building site'
  },
  {
    id: 'need-help-find',
    title: 'I need help finding and purchasing land',
    description: 'Let us help you find the perfect property'
  },
  {
    id: 'exploring',
    title: 'I\'m still exploring land options',
    description: 'Early stages of land selection process'
  }
];

// Square footage options
export const SQUARE_FOOTAGE_OPTIONS: OptionCard[] = [
  {
    id: '2000-3000',
    title: '2,000 - 3,000 sq ft',
    description: 'Comfortable family living'
  },
  {
    id: '3000-4500',
    title: '3,000 - 4,500 sq ft',
    description: 'Spacious luxury living'
  },
  {
    id: '4500-6000',
    title: '4,500 - 6,000 sq ft',
    description: 'Grand luxury residence'
  },
  {
    id: '6000-8000',
    title: '6,000 - 8,000 sq ft',
    description: 'Estate-level luxury'
  },
  {
    id: '8000-plus',
    title: '8,000+ sq ft',
    description: 'Ultra-luxury estate'
  }
];

// Story options
export const STORY_OPTIONS: OptionCard[] = [
  {
    id: 'single',
    title: 'Single Story',
    description: 'All living on one level'
  },
  {
    id: 'two-story',
    title: 'Two Story',
    description: 'Traditional two-level design'
  },
  {
    id: 'split-level',
    title: 'Split Level',
    description: 'Multi-level living spaces'
  }
];

// Home features
export const HOME_FEATURES: OptionCard[] = [
  {
    id: 'pool',
    title: 'Swimming Pool',
    description: 'Custom pool and spa design'
  },
  {
    id: 'outdoor-kitchen',
    title: 'Outdoor Kitchen',
    description: 'Complete outdoor cooking space'
  },
  {
    id: 'covered-patios',
    title: 'Covered Patios',
    description: 'Extended outdoor living areas'
  },
  {
    id: '2-car-garage',
    title: '2-Car Garage',
    description: 'Standard two-car garage'
  },
  {
    id: '3-car-garage',
    title: '3-Car Garage',
    description: 'Three-car garage with storage'
  },
  {
    id: '4-car-garage',
    title: '4-Car+ Garage',
    description: 'Multi-car garage with workshop'
  },
  {
    id: 'home-office',
    title: 'Home Office',
    description: 'Dedicated workspace'
  },
  {
    id: 'media-room',
    title: 'Media Room',
    description: 'Home theater experience'
  },
  {
    id: 'wine-cellar',
    title: 'Wine Cellar',
    description: 'Climate-controlled wine storage'
  },
  {
    id: 'gym',
    title: 'Home Gym',
    description: 'Private fitness space'
  },
  {
    id: 'smart-home',
    title: 'Smart Home Integration',
    description: 'Advanced home automation'
  },
  {
    id: 'high-end-appliances',
    title: 'High-End Appliances',
    description: 'Premium kitchen and laundry appliances'
  },
  {
    id: 'custom-millwork',
    title: 'Custom Millwork',
    description: 'Bespoke cabinetry and trim'
  }
];

// Architectural styles for custom builds
export const ARCHITECTURAL_STYLES: OptionCard[] = [
  {
    id: 'modern-contemporary',
    title: 'Modern Contemporary',
    description: 'Clean lines and open spaces',
    image: '/wizard/arch-modern.jpg'
  },
  {
    id: 'traditional-colonial',
    title: 'Traditional Colonial',
    description: 'Classic American architecture',
    image: '/wizard/arch-colonial.jpg'
  },
  {
    id: 'texas-hill-country',
    title: 'Texas Hill Country',
    description: 'Regional Texas charm',
    image: '/wizard/arch-hill-country.jpg'
  },
  {
    id: 'mediterranean-spanish',
    title: 'Mediterranean/Spanish',
    description: 'European-inspired elegance',
    image: '/wizard/arch-mediterranean.jpg'
  },
  {
    id: 'farmhouse-ranch',
    title: 'Farmhouse/Ranch',
    description: 'Rustic American farmhouse',
    image: '/wizard/arch-farmhouse.jpg'
  },
  {
    id: 'transitional',
    title: 'Transitional',
    description: 'Blend of traditional and contemporary',
    image: '/wizard/arch-transitional.jpg'
  }
];

// Timeline options
export const TIMELINE_OPTIONS: OptionCard[] = [
  {
    id: 'asap',
    title: 'As soon as possible',
    description: 'Ready to start immediately'
  },
  {
    id: '1-3-months',
    title: '1-3 months',
    description: 'Planning to start within the quarter'
  },
  {
    id: '3-6-months',
    title: '3-6 months',
    description: 'Mid-term planning horizon'
  },
  {
    id: '6-12-months',
    title: '6-12 months',
    description: 'Long-term planning'
  },
  {
    id: 'over-year',
    title: 'Over a year',
    description: 'Early planning stages'
  },
  {
    id: 'just-exploring',
    title: 'Just exploring options',
    description: 'Gathering information'
  }
];