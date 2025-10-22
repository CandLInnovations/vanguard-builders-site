import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getHomeBySlug } from '@/lib/sanity-queries'
import { getPreviewHomeBySlug } from '@/lib/sanity-preview'
import { SanityImageGallery } from '@/components/ui/SanityImage'
import { PreviewBanner } from '@/components/ui/PreviewBanner'
import { urlFor } from '@/lib/sanity-image'
import {
  generateProductSchema,
  generateResidenceSchema,
  generateBreadcrumbSchema,
  renderJsonLd,
} from '@/lib/structured-data'

interface HomeDetailPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: HomeDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const home = await getHomeBySlug(resolvedParams.slug)

  if (!home) {
    return {
      title: 'Property Not Found',
    }
  }

  const title = `${home.title} - ${home.location.city}, TX | Vanguard Homes`
  const description = home.description
    ? home.description.substring(0, 160)
    : `${home.propertyDetails.bedrooms} bed, ${home.propertyDetails.bathrooms} bath luxury home in ${home.location.city}, TX. ${formatPrice(home.price)}`

  const imageUrl = home.mainImage?.asset
    ? urlFor(home.mainImage).width(1200).height(630).quality(90).url()
    : 'https://vanguardbuilders.com/vanguard-builders-logo-tp.png'

  const url = `https://vanguardbuilders.com/inventory/${resolvedParams.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vanguard Homes',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function HomeDetailPage({
  params,
  searchParams
}: HomeDetailPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const preview = resolvedSearchParams.preview === 'true'
  const home = preview
    ? await getPreviewHomeBySlug(resolvedParams.slug, true)
    : await getHomeBySlug(resolvedParams.slug)

  if (!home) {
    notFound()
  }

  // Generate structured data
  const productSchema = generateProductSchema(home, resolvedParams.slug)
  const residenceSchema = generateResidenceSchema(home, resolvedParams.slug)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Available Homes', path: '/inventory' },
    { name: home.title, path: `/inventory/${resolvedParams.slug}` },
  ])

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(productSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(residenceSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
      />

      {preview && <PreviewBanner />}
      
      <div className={`min-h-screen bg-white ${preview ? 'pt-14' : ''}`}>
        {/* Hero Image Only - No Overlays */}
        <div className="relative w-full h-64 md:h-96 bg-slate-200 overflow-hidden">
          {home.mainImage ? (
            <Image
              src={urlFor(home.mainImage).width(1200).height(600).quality(90).url()}
              alt={home.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-slate-500 text-lg">Property Image Coming Soon</span>
            </div>
          )}
          
          {/* Only Badges on Image - NO TITLE */}
          {home.status !== 'available' && (
            <div className="absolute top-6 left-6 z-30">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                home.status === 'pending' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {home.status.charAt(0).toUpperCase() + home.status.slice(1)}
              </span>
            </div>
          )}

        </div>

        {/* Title Section - Completely Separate from Hero Image */}
        <div className="bg-white border-b border-slate-200 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
              {home.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600">
              {home.location.address}, {home.location.city}, {home.location.state}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price and Key Details */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="text-3xl font-bold text-primary-burgundy mb-4">
                  {formatPrice(home.price)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {home.propertyDetails.bedrooms}
                    </div>
                    <div className="text-slate-600 font-medium">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {home.propertyDetails.bathrooms}
                      {home.propertyDetails.halfBathrooms && home.propertyDetails.halfBathrooms > 0 &&
                        <span className="text-xl">+{home.propertyDetails.halfBathrooms}</span>
                      }
                    </div>
                    <div className="text-slate-600 font-medium">
                      {home.propertyDetails.halfBathrooms && home.propertyDetails.halfBathrooms > 0
                        ? 'Full+Half Baths'
                        : 'Bathrooms'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {home.propertyDetails.squareFootage?.toLocaleString()}
                    </div>
                    <div className="text-slate-600 font-medium">Sq Ft</div>
                  </div>
                  {home.propertyDetails.garageSpaces && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">
                        {home.propertyDetails.garageSpaces}
                      </div>
                      <div className="text-slate-600 font-medium">Garage</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {home.description && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    About This Property
                  </h2>
                  <div className="prose prose-lg max-w-none text-slate-700">
                    {home.description.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {home.keyFeatures && home.keyFeatures.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {home.keyFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-burgundy rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              {home.gallery && home.gallery.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Photo Gallery
                  </h2>
                  <SanityImageGallery images={home.gallery} />
                </div>
              )}

              {/* Virtual Tour */}
              {home.virtualTourUrl && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Virtual Tour
                  </h2>
                  <a
                    href={home.virtualTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button inline-block"
                  >
                    Take Virtual Tour
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Property Details */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Property Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-600 font-medium">Style: </span>
                    <span className="font-semibold text-slate-900">{home.architecturalStyle?.charAt(0).toUpperCase() + home.architecturalStyle?.slice(1)}</span>
                  </div>
                  {home.propertyDetails.yearBuilt && (
                    <div>
                      <span className="text-slate-600 font-medium">Year Built: </span>
                      <span className="font-semibold text-slate-900">{home.propertyDetails.yearBuilt}</span>
                    </div>
                  )}
                  {home.propertyDetails.lotSize && (
                    <div>
                      <span className="text-slate-600 font-medium">Lot Size: </span>
                      <span className="font-semibold text-slate-900">{home.propertyDetails.lotSize}</span>
                    </div>
                  )}
                  {home.mlsNumber && (
                    <div>
                      <span className="text-slate-600 font-medium">MLS #: </span>
                      <span className="font-semibold text-slate-900">{home.mlsNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Location
                </h3>
                <div className="space-y-2">
                  <div>{home.location.address}</div>
                  <div>{home.location.city}, {home.location.state} {home.location.zipCode}</div>
                  {home.location.neighborhood && (
                    <div className="text-slate-600">{home.location.neighborhood}</div>
                  )}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-primary-burgundy rounded-2xl p-6 text-center" style={{ color: 'white' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'white' }}>
                  Interested in This Property?
                </h3>
                <p className="mb-6" style={{ color: 'white' }}>
                  Contact us today to schedule a private showing.
                </p>
                <a
                  href={`/schedule-showing?property=${encodeURIComponent(home.title)}`}
                  className="px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-block mb-4"
                  style={{ display: 'inline-block', backgroundColor: 'white', color: '#8B1538', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', marginBottom: '16px' }}
                >
                  Schedule Showing
                </a>
              </div>

              {preview && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg">
                  <div className="font-semibold mb-2">Preview Mode</div>
                  <div className="text-sm">
                    Last updated: {home._updatedAt ? new Date(home._updatedAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional spacing before footer */}
        <div className="py-8 bg-white">
          <span className="text-white select-none">.</span>
        </div>
      </div>
    </>
  )
}