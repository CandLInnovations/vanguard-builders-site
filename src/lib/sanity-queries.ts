import { client } from './sanity'
import type { 
  LuxuryHome, 
  HomeSearchFilters, 
  HomesCountByStatus 
} from '@/types/sanity'

// GROQ queries for luxury homes
const LUXURY_HOME_QUERY = `
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
    halfBathrooms,
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
  publishedAt
`

// Get all available luxury homes
export async function getAvailableHomes(): Promise<LuxuryHome[]> {
  return client.fetch(
    `*[_type == "luxuryHome" && status == "available" && publishedAt <= now()] | order(featured desc, publishedAt desc) {
      ${LUXURY_HOME_QUERY}
    }`
  )
}

// Get all luxury homes (for admin/preview)
export async function getAllHomes(): Promise<LuxuryHome[]> {
  return client.fetch(
    `*[_type == "luxuryHome"] | order(status asc, publishedAt desc) {
      ${LUXURY_HOME_QUERY}
    }`
  )
}

// Get a single luxury home by slug
export async function getHomeBySlug(slug: string): Promise<LuxuryHome | null> {
  return client.fetch(
    `*[_type == "luxuryHome" && slug.current == $slug][0] {
      ${LUXURY_HOME_QUERY}
    }`,
    { slug }
  )
}

// Get featured homes for homepage
export async function getFeaturedHomes(): Promise<LuxuryHome[]> {
  return client.fetch(
    `*[_type == "luxuryHome" && featured == true && status == "available" && publishedAt <= now()] | order(publishedAt desc) [0...3] {
      ${LUXURY_HOME_QUERY}
    }`
  )
}

// Get homes count by status
export async function getHomesCountByStatus(): Promise<HomesCountByStatus> {
  return client.fetch(
    `{
      "available": count(*[_type == "luxuryHome" && status == "available"]),
      "pending": count(*[_type == "luxuryHome" && status == "pending"]),
      "sold": count(*[_type == "luxuryHome" && status == "sold"]),
      "total": count(*[_type == "luxuryHome"])
    }`
  )
}

// Search homes by criteria
export async function searchHomes(filters: HomeSearchFilters): Promise<LuxuryHome[]> {
  const {
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    architecturalStyle,
  } = filters
  const queryFilters = [
    '_type == "luxuryHome"',
    'status == "available"',
    'publishedAt <= now()',
  ]

  if (minPrice) queryFilters.push(`price >= ${minPrice}`)
  if (maxPrice) queryFilters.push(`price <= ${maxPrice}`)
  if (bedrooms) queryFilters.push(`propertyDetails.bedrooms >= ${bedrooms}`)
  if (bathrooms) queryFilters.push(`propertyDetails.bathrooms >= ${bathrooms}`)
  if (architecturalStyle) queryFilters.push(`architecturalStyle == "${architecturalStyle}"`)

  const query = `*[${queryFilters.join(' && ')}] | order(price desc) {
    ${LUXURY_HOME_QUERY}
  }`

  return client.fetch(query)
}