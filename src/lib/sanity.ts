import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_AUTH_TOKEN, // Only needed for mutations
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Helper function to get optimized image URLs
export const getImageUrl = (source: any, width?: number, height?: number) => {
  let imageUrl = urlFor(source)
  
  if (width) {
    imageUrl = imageUrl.width(width)
  }
  
  if (height) {
    imageUrl = imageUrl.height(height)
  }
  
  return imageUrl.format('webp').quality(85).url()
}