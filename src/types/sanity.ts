// TypeScript interfaces for Sanity CMS content

export interface SanityImage {
  _id: string
  url: string
}

export interface SanityImageAsset {
  asset: SanityImage
  alt?: string
  caption?: string
}

export interface PropertyDetails {
  squareFootage: number
  bedrooms: number
  bathrooms: number
  halfBathrooms?: number
  lotSize?: string
  garageSpaces?: number
  yearBuilt?: number
}

export interface Location {
  address: string
  city: string
  state: string
  zipCode: string
  neighborhood?: string
}

export interface LuxuryHome {
  _id: string
  title: string
  slug: {
    current: string
  }
  status: 'available' | 'pending' | 'sold'
  price: number
  description: string
  mainImage: SanityImageAsset
  gallery?: SanityImageAsset[]
  propertyDetails: PropertyDetails
  location: Location
  keyFeatures: string[]
  architecturalStyle: string
  virtualTourUrl?: string
  mlsNumber?: string
  featured: boolean
  publishedAt: string
  _updatedAt?: string
}

export interface HomeSearchFilters {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  architecturalStyle?: string
}

export interface HomesCountByStatus {
  available: number
  pending: number
  sold: number
  total: number
}

export interface InventoryApiResponse {
  homes: LuxuryHome[]
  total: number
}

export interface FeaturedHomesApiResponse {
  homes: LuxuryHome[]
  total: number
}

// Utility type for when we need just the basic home info (like for cards)
export interface BasicHomeInfo {
  _id: string
  title: string
  slug: {
    current: string
  }
  price: number
  mainImage: SanityImageAsset
  propertyDetails: {
    squareFootage: number
    bedrooms: number
    bathrooms: number
    halfBathrooms?: number
  }
  location: {
    city: string
    state: string
  }
  status: 'available' | 'pending' | 'sold'
}