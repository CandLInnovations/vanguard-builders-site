import { Suspense } from 'react'
import { getAvailableHomes } from '@/lib/sanity-queries'
import { getPreviewHomes } from '@/lib/sanity-preview'
import type { LuxuryHome } from '@/types/sanity'
import { PreviewBanner } from '@/components/ui/PreviewBanner'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity-image'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-slate-200 aspect-[4/3] rounded-2xl mb-6"></div>
          <div className="space-y-3">
            <div className="bg-slate-200 h-7 rounded w-3/4"></div>
            <div className="bg-slate-200 h-6 rounded w-1/2"></div>
            <div className="bg-slate-200 h-5 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function InventoryGrid({ preview = false }: { preview?: boolean }) {
  let homes: LuxuryHome[] = []
  let error: string | null = null

  try {
    homes = preview ? await getPreviewHomes(true) : await getAvailableHomes()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load inventory'
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            CMS Configuration Required
          </h3>
          <p className="text-slate-600 mb-6">
            The Content Management System needs to be configured to display your luxury inventory.
          </p>
          <a
            href="/admin"
            className="cta-button inline-block"
          >
            Configure CMS
          </a>
        </div>
      </div>
    )
  }

  if (!homes || homes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-4 4 4" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Inventory Coming Soon
          </h3>
          <p className="text-xl text-slate-600 mb-8">
            We're curating an exclusive collection of luxury properties. Check back soon for extraordinary homes that define architectural excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/custom-homes" className="cta-button">
              Explore Custom Homes
            </a>
            <a href="/contact" className="section-button">
              Get Notified
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home: LuxuryHome) => (
        <div key={home._id} className="group">
          <div className="inventory-card bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-300">
            {/* Status and Featured Badges */}
            <div className="relative">
              {home.status !== 'available' && (
                <div className="absolute top-6 left-6 z-10">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                    home.status === 'pending' 
                      ? 'bg-yellow-500 text-white shadow-lg' 
                      : 'bg-red-500 text-white shadow-lg'
                  }`}>
                    {home.status}
                  </span>
                </div>
              )}

              {home.featured && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="bg-gradient-to-r from-primary-burgundy to-primary-burgundy-hover text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                    Featured
                  </span>
                </div>
              )}

              {/* Main Image - Clickable */}
              <Link 
                href={`/inventory/${home.slug.current}${preview ? '?preview=true' : ''}`}
                className="relative aspect-[3/2] aspect-ratio-32 overflow-hidden block cursor-pointer"
              >
                {home.mainImage ? (
                  <Image
                    src={urlFor(home.mainImage).width(800).height(600).quality(90).url()}
                    alt={home.mainImage?.alt || home.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-4 4 4" />
                    </svg>
                  </div>
                )}
              </Link>
            </div>

            {/* Content */}
            <div className="p-8">
              <Link 
                href={`/inventory/${home.slug.current}${preview ? '?preview=true' : ''}`}
                className="block mb-4"
              >
                <h3 className="text-xl font-bold text-slate-900 hover:text-primary-burgundy transition-colors line-clamp-2">
                  {home.title}
                </h3>
              </Link>
              
              <div className="text-2xl font-bold text-primary-burgundy mb-4">
                {formatPrice(home.price)}
              </div>

              <div className="grid grid-cols-3 gap-4 text-slate-600 mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">{home.propertyDetails.bedrooms}</div>
                    <div className="text-xs">Beds</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M9 7l3-3 3 3M9 3h6v4H9V3z" />
                  </svg>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">{home.propertyDetails.bathrooms}</div>
                    <div className="text-xs">Baths</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">{home.propertyDetails.squareFootage?.toLocaleString()}</div>
                    <div className="text-xs">Sq Ft</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-slate-500 text-sm mb-6">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{home.location.city}, {home.location.state}</span>
              </div>

              {/* Additional Property Details */}
              <div className="space-y-1 text-sm text-slate-600 mb-4">
                {home.architecturalStyle && (
                  <div className="flex justify-between">
                    <span>Style:</span>
                    <span className="font-medium text-slate-900 ml-2">{home.architecturalStyle.charAt(0).toUpperCase() + home.architecturalStyle.slice(1)}</span>
                  </div>
                )}
                {home.propertyDetails.yearBuilt && (
                  <div className="flex justify-between">
                    <span>Built:</span>
                    <span className="font-medium text-slate-900 ml-2">{home.propertyDetails.yearBuilt}</span>
                  </div>
                )}
                {home.propertyDetails.lotSize && (
                  <div className="flex justify-between">
                    <span>Lot Size:</span>
                    <span className="font-medium text-slate-900 ml-2">{home.propertyDetails.lotSize}</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {home.virtualTourUrl && (
                  <a
                    href={home.virtualTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary-burgundy text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-primary-burgundy-hover transition-colors inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Tour This Home
                  </a>
                )}
                <Link 
                  href={`/inventory/${home.slug.current}${preview ? '?preview=true' : ''}`}
                  className="flex items-center justify-between text-slate-900 hover:text-primary-burgundy transition-colors no-underline"
                >
                  <span className="font-semibold">
                    View Full Details
                  </span>
                  <svg className="w-4 h-4 transition-transform hover:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {preview && (
                <div className="mt-4 text-xs text-yellow-600 font-medium bg-yellow-50 px-3 py-2 rounded-lg">
                  Preview Mode - Last updated: {home._updatedAt ? new Date(home._updatedAt).toLocaleDateString() : 'Unknown'}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const preview = resolvedSearchParams.preview === 'true'

  return (
    <>
      {preview && <PreviewBanner />}
      
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-white ${preview ? 'pt-14' : ''}`}>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Luxury Home 
                <span className="block text-primary-burgundy">Inventory</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                Discover our exclusive collection of luxury homes, each crafted with 
                uncompromising attention to detail and exceptional quality.
              </p>
              {preview && (
                <div className="mt-6 bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-3 rounded-xl inline-block">
                  <strong>Preview Mode:</strong> Showing all content including unpublished homes
                </div>
              )}
            </div>

            <Suspense fallback={<LoadingSkeleton />}>
              <InventoryGrid preview={preview} />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Our luxury home specialists are ready to help you discover the perfect property that matches your vision and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="cta-button bg-primary-burgundy hover:bg-primary-burgundy-hover">
                Schedule Consultation
              </a>
              <a href="/custom-homes" className="section-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900">
                Explore Custom Homes
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}