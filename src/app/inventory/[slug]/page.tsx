import { notFound } from 'next/navigation'
import { getHomeBySlug } from '@/lib/sanity-queries'
import { getPreviewHomeBySlug } from '@/lib/sanity-preview'
import { SanityImage, SanityImageGallery } from '@/components/ui/SanityImage'
import { PreviewBanner } from '@/components/ui/PreviewBanner'

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

  return (
    <>
      {preview && <PreviewBanner />}
      
      <div className={`min-h-screen bg-white ${preview ? 'pt-14' : ''}`}>
        {/* Hero Section */}
        <div className="relative h-96 md:h-[600px]">
          <SanityImage
            image={home.mainImage}
            alt={home.mainImage?.alt || home.title}
            preset="hero"
            fill
            className="object-cover"
            priority
          />
          
          {/* Status Badge */}
          {home.status !== 'available' && (
            <div className="absolute top-8 left-8">
              <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
                home.status === 'pending' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {home.status.charAt(0).toUpperCase() + home.status.slice(1)}
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {home.featured && (
            <div className="absolute top-8 right-8">
              <span className="bg-primary-burgundy text-white px-4 py-2 rounded-full text-lg font-semibold">
                Featured Property
              </span>
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {home.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                {home.location.address}, {home.location.city}, {home.location.state}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Price and Key Details */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="text-4xl font-bold text-primary-burgundy mb-6">
                  {formatPrice(home.price)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {home.propertyDetails.bedrooms}
                    </div>
                    <div className="text-slate-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {home.propertyDetails.bathrooms}
                    </div>
                    <div className="text-slate-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {home.propertyDetails.squareFootage?.toLocaleString()}
                    </div>
                    <div className="text-slate-600">Sq Ft</div>
                  </div>
                  {home.propertyDetails.garageSpaces && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {home.propertyDetails.garageSpaces}
                      </div>
                      <div className="text-slate-600">Garage</div>
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
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Property Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Style</span>
                    <span className="font-medium">{home.architecturalStyle}</span>
                  </div>
                  {home.propertyDetails.yearBuilt && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Year Built</span>
                      <span className="font-medium">{home.propertyDetails.yearBuilt}</span>
                    </div>
                  )}
                  {home.propertyDetails.lotSize && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Lot Size</span>
                      <span className="font-medium">{home.propertyDetails.lotSize}</span>
                    </div>
                  )}
                  {home.mlsNumber && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">MLS #</span>
                      <span className="font-medium">{home.mlsNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
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
              <div className="bg-primary-burgundy text-white rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold mb-4">
                  Interested in This Property?
                </h3>
                <p className="mb-6">
                  Contact us today to schedule a private showing.
                </p>
                <a
                  href="/contact"
                  className="bg-white text-primary-burgundy px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-block"
                >
                  Contact Us
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
      </div>
    </>
  )
}