import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'
import type { SanityImageAsset } from '@/types/sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageAsset | string) {
  return builder.image(source)
}

// Common image sizes for luxury home listings
export const imagePresets = {
  hero: {
    width: 1920,
    height: 1080,
    quality: 95,
  },
  card: {
    width: 600,
    height: 400,
    quality: 85,
  },
  thumbnail: {
    width: 300,
    height: 200,
    quality: 80,
  },
  gallery: {
    width: 1200,
    height: 800,
    quality: 90,
  },
  detail: {
    width: 800,
    height: 600,
    quality: 90,
  },
} as const

// Helper function to generate optimized image URLs
export function getOptimizedImageUrl(
  image: SanityImageAsset | string,
  preset: keyof typeof imagePresets
) {
  const { width, height, quality } = imagePresets[preset]
  
  return urlFor(image)
    .width(width)
    .height(height)
    .quality(quality)
    .format('webp')
    .fit('crop')
    .crop('entropy')
    .url()
}

// Generate responsive image URLs for different screen sizes
export function getResponsiveImageUrls(image: SanityImageAsset | string) {
  return {
    mobile: urlFor(image).width(768).height(512).quality(80).format('webp').url(),
    tablet: urlFor(image).width(1024).height(683).quality(85).format('webp').url(),
    desktop: urlFor(image).width(1920).height(1080).quality(90).format('webp').url(),
  }
}

// Generate srcSet for responsive images
export function generateSrcSet(image: SanityImageAsset | string, baseWidth = 800) {
  const sizes = [0.5, 1, 1.5, 2] // For different pixel densities
  
  return sizes
    .map(multiplier => {
      const width = Math.round(baseWidth * multiplier)
      const url = urlFor(image)
        .width(width)
        .quality(85)
        .format('webp')
        .url()
      return `${url} ${multiplier}x`
    })
    .join(', ')
}

// Get blur placeholder for images
export function getBlurDataURL(image: SanityImageAsset | string) {
  return urlFor(image)
    .width(20)
    .height(20)
    .blur(10)
    .quality(20)
    .format('jpg')
    .url()
}