'use client'

import Image from 'next/image'
import { useState } from 'react'
import { 
  getOptimizedImageUrl, 
  getBlurDataURL, 
  generateSrcSet,
  imagePresets 
} from '@/lib/sanity-image'
import type { SanityImageAsset } from '@/types/sanity'

interface SanityImageProps {
  image: SanityImageAsset | string
  alt?: string
  preset?: keyof typeof imagePresets
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
}

export function SanityImage({
  image,
  alt = '',
  preset = 'card',
  className,
  priority = false,
  fill = false,
  sizes,
  quality,
  onLoad,
}: SanityImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Extract alt text from Sanity image if available
  const imageAlt = typeof image === 'object' && image.alt ? image.alt : alt

  // Get optimized image URL
  const imageUrl = getOptimizedImageUrl(image, preset)
  
  // Get blur placeholder
  const blurDataURL = getBlurDataURL(image)

  // Get preset dimensions
  const { width, height } = imagePresets[preset]

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={`bg-slate-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-slate-500 text-sm">Image not available</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      priority={priority}
      sizes={sizes}
      quality={quality}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

// Gallery component for multiple images
interface SanityImageGalleryProps {
  images: SanityImageAsset[]
  className?: string
}

export function SanityImageGallery({ images, className }: SanityImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main image */}
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <SanityImage
          image={images[selectedImage]}
          alt={images[selectedImage].alt || `Gallery image ${selectedImage + 1}`}
          preset="gallery"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary-burgundy'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <SanityImage
                image={image}
                alt={image.alt || `Thumbnail ${index + 1}`}
                preset="thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}