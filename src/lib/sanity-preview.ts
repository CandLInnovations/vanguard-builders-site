import { createClient } from 'next-sanity'
import { client } from './sanity'

// Preview client that can read drafts
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Don't use CDN for preview
  token: process.env.SANITY_API_READ_TOKEN, // Read token with access to drafts
  perspective: 'previewDrafts',
})

// Check if we're in preview mode
export function isPreviewMode() {
  return typeof window !== 'undefined' && window.location.search.includes('preview=true')
}

// Get the appropriate client based on preview mode
export function getClient(preview = false) {
  return preview ? previewClient : client
}

// Preview-aware query functions
export async function getPreviewHomeBySlug(slug: string, preview = false) {
  const query = `*[_type == "luxuryHome" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    price,
    description,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    gallery[] {
      asset-> {
        _id,
        url
      },
      alt,
      caption
    },
    propertyDetails {
      squareFootage,
      bedrooms,
      bathrooms,
      lotSize,
      garageSpaces,
      yearBuilt
    },
    location {
      address,
      city,
      state,
      zipCode,
      neighborhood
    },
    keyFeatures,
    architecturalStyle,
    virtualTourUrl,
    mlsNumber,
    featured,
    publishedAt,
    _updatedAt
  }`
  
  const clientToUse = getClient(preview)
  return clientToUse.fetch(query, { slug })
}

export async function getPreviewHomes(preview = false) {
  const query = `*[_type == "luxuryHome"] | order(status asc, _updatedAt desc) {
    _id,
    title,
    slug,
    status,
    price,
    description,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    propertyDetails {
      squareFootage,
      bedrooms,
      bathrooms
    },
    location {
      city,
      state
    },
    featured,
    publishedAt,
    _updatedAt
  }`
  
  const clientToUse = getClient(preview)
  return clientToUse.fetch(query)
}