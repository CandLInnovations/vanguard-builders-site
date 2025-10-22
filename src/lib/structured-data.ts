/**
 * Structured Data (JSON-LD) utilities for SEO
 * Generates Schema.org compliant structured data for various page types
 */

import type { LuxuryHome } from '@/types/sanity';

// Company information - centralized source of truth
export const COMPANY_INFO = {
  name: 'Vanguard Builders, Inc.',
  legalName: 'Vanguard Builders, Inc.',
  url: 'https://vanguardbuilders.com',
  logo: 'https://vanguardbuilders.com/vanguard-builders-logo-tp.png',
  description: 'Texas premier luxury home builder and remodeler. Crafting architectural excellence with custom homes, renovations, and luxury remodeling services since 2010.',
  telephone: '+1-281-220-9087',
  email: 'office@vanguardbuilders.com',
  address: {
    streetAddress: '2300 Woodforest Pkwy N, Ste 250-442',
    addressLocality: 'Montgomery',
    addressRegion: 'TX',
    postalCode: '77316',
    addressCountry: 'US',
  },
  geo: {
    latitude: 30.3879,
    longitude: -95.6955,
  },
  areaServed: [
    'Montgomery County, TX',
    'Houston, TX',
    'Conroe, TX',
    'The Woodlands, TX',
    'Austin, TX',
  ],
  foundingDate: '2010',
  priceRange: '$$$',
};

/**
 * LocalBusiness Schema
 * For the company information displayed on all pages
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${COMPANY_INFO.url}#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY_INFO.logo,
      width: 211,
      height: 197,
    },
    image: COMPANY_INFO.logo,
    description: COMPANY_INFO.description,
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.addressLocality,
      addressRegion: COMPANY_INFO.address.addressRegion,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    areaServed: COMPANY_INFO.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    foundingDate: COMPANY_INFO.foundingDate,
    priceRange: COMPANY_INFO.priceRange,
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/vanguardbuilders',
      // 'https://www.instagram.com/vanguardbuilders',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_INFO.telephone,
      contactType: 'Customer Service',
      email: COMPANY_INFO.email,
      areaServed: 'US',
      availableLanguage: 'English',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
  };
}

/**
 * WebSite Schema
 * For the homepage and site-wide search
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${COMPANY_INFO.url}#website`,
    url: COMPANY_INFO.url,
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    publisher: {
      '@id': `${COMPANY_INFO.url}#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Product Schema for Luxury Homes
 * For individual inventory listings
 */
export function generateProductSchema(home: LuxuryHome, slug: string) {
  const url = `${COMPANY_INFO.url}/inventory/${slug}`;

  // Generate image URL if available
  let imageUrl = COMPANY_INFO.logo; // Fallback to logo
  if (home.mainImage?.asset) {
    // Use a simple sanity image URL pattern
    const imageId = typeof home.mainImage.asset === 'string'
      ? home.mainImage.asset
      : (home.mainImage.asset as any)._ref || '';
    if (imageId) {
      const cleanId = imageId.replace('image-', '').replace(/-(\w+)$/, '.$1');
      imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${cleanId}`;
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: home.title,
    description: home.description,
    image: imageUrl,
    url,
    sku: home.mlsNumber || slug,
    brand: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      price: home.price,
      priceCurrency: 'USD',
      availability: home.status === 'available'
        ? 'https://schema.org/InStock'
        : home.status === 'pending'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/OutOfStock',
      url,
      seller: {
        '@id': `${COMPANY_INFO.url}#organization`,
      },
    },
    category: 'Luxury Home',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Bedrooms',
        value: home.propertyDetails.bedrooms,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: home.propertyDetails.bathrooms + (home.propertyDetails.halfBathrooms || 0) * 0.5,
      },
      {
        '@type': 'PropertyValue',
        name: 'Square Footage',
        value: home.propertyDetails.squareFootage,
      },
      ...(home.propertyDetails.garageSpaces ? [{
        '@type': 'PropertyValue',
        name: 'Garage Spaces',
        value: home.propertyDetails.garageSpaces,
      }] : []),
      ...(home.propertyDetails.yearBuilt ? [{
        '@type': 'PropertyValue',
        name: 'Year Built',
        value: home.propertyDetails.yearBuilt,
      }] : []),
    ],
  };
}

/**
 * Single Family Residence Schema (Alternative to Product)
 * More specific for real estate listings
 */
export function generateResidenceSchema(home: LuxuryHome, slug: string) {
  const url = `${COMPANY_INFO.url}/inventory/${slug}`;

  // Generate image URL if available
  let imageUrl = COMPANY_INFO.logo; // Fallback to logo
  if (home.mainImage?.asset) {
    const imageId = typeof home.mainImage.asset === 'string'
      ? home.mainImage.asset
      : (home.mainImage.asset as any)._ref || '';
    if (imageId) {
      const cleanId = imageId.replace('image-', '').replace(/-(\w+)$/, '.$1');
      imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${cleanId}`;
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    '@id': `${url}#residence`,
    name: home.title,
    description: home.description,
    image: imageUrl,
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: home.location.address,
      addressLocality: home.location.city,
      addressRegion: home.location.state,
      postalCode: home.location.zipCode,
      addressCountry: 'US',
    },
    numberOfRooms: home.propertyDetails.bedrooms + home.propertyDetails.bathrooms,
    numberOfBedrooms: home.propertyDetails.bedrooms,
    numberOfBathroomsTotal: home.propertyDetails.bathrooms + (home.propertyDetails.halfBathrooms || 0),
    floorSize: {
      '@type': 'QuantitativeValue',
      value: home.propertyDetails.squareFootage,
      unitCode: 'FTK', // Square foot
    },
    ...(home.propertyDetails.yearBuilt && {
      yearBuilt: home.propertyDetails.yearBuilt,
    }),
    ...(home.propertyDetails.lotSize && {
      lotSize: home.propertyDetails.lotSize,
    }),
  };
}

/**
 * BlogPosting Schema
 * For blog articles
 */
interface BlogPostData {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
  category?: string;
  tags?: string[];
}

export function generateBlogPostingSchema(post: BlogPostData) {
  const url = `${COMPANY_INFO.url}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author || COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    publisher: {
      '@id': `${COMPANY_INFO.url}#organization`,
    },
    image: post.image || COMPANY_INFO.logo,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    inLanguage: 'en-US',
  };
}

/**
 * BreadcrumbList Schema
 * For navigation breadcrumbs
 */
interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${COMPANY_INFO.url}${item.path}`,
    })),
  };
}

/**
 * FAQPage Schema
 * For FAQ page
 */
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Service Schema
 * For service pages (custom homes, renovations, etc.)
 */
interface ServiceData {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}

export function generateServiceSchema(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${COMPANY_INFO.url}#organization`,
    },
    areaServed: service.areaServed || COMPANY_INFO.areaServed,
    serviceType: service.name,
    url: service.url,
  };
}

/**
 * Helper function to render JSON-LD script tag
 */
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data, null, 0),
  };
}
