import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar, Clock, ArrowLeft, CheckCircle } from 'lucide-react'
import { generateBlogPostingSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'The Custom Home Building Process: A Complete Guide | Vanguard Homes',
  description: 'Learn the complete custom home building process from design to completion. Expert insights from Texas luxury home builders.',
  alternates: {
    canonical: 'https://vanguardbuilders.com/blog/custom-home-building-process',
  },
  openGraph: {
    title: 'The Custom Home Building Process: A Complete Guide',
    description: 'Learn the complete custom home building process from design to completion. Expert insights from Texas luxury home builders.',
    url: 'https://vanguardbuilders.com/blog/custom-home-building-process',
    siteName: 'Vanguard Homes',
    type: 'article',
    publishedTime: '2024-01-10T00:00:00Z',
    images: ['/construction-phase.jpg'],
  },
}

export default function CustomHomeBuildingProcess() {
  const blogPostSchema = generateBlogPostingSchema({
    title: 'The Custom Home Building Process: A Complete Guide',
    description: 'Learn the complete custom home building process from design to completion. Expert insights from Texas luxury home builders.',
    slug: 'custom-home-building-process',
    publishedDate: '2024-01-10T00:00:00Z',
    category: 'Building Process',
    tags: ['custom homes', 'building process', 'construction', 'home design'],
    image: 'https://vanguardbuilders.com/construction-phase.jpg',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Custom Home Building Process', path: '/blog/custom-home-building-process' },
  ])

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(blogPostSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
      />
      {/* Article Header */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container">
          {/* Back Navigation */}
          <div className="mb-8" style={{ position: 'relative', zIndex: 9999, isolation: 'isolate' }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-burgundy hover:text-primary-burgundy-hover font-semibold transition-colors group"
              style={{
                position: 'relative',
                zIndex: 9999,
                display: 'inline-flex',
                pointerEvents: 'auto',
                touchAction: 'manipulation'
              }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <span
                className="bg-primary-burgundy rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{
                  color: 'white',
                  padding: '10px 24px',
                  backgroundColor: '#8B1538'
                }}
              >
                Building Process
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>January 8, 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Your Custom Home Building Journey: From Vision to Reality
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Take a detailed look at our comprehensive custom home building process, from initial consultation to final walkthrough, and learn what makes Vanguard Builders different.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap mb-8">
              {['Custom Homes', 'Building Process', 'Construction', 'Client Experience'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-sm"
                  style={{
                    marginRight: '12px',
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    color: '#8B1538'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/custom-home-exterior.jpg"
                alt="Custom Home Building Process - From Vision to Reality"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-slate-600 mb-8">
                Building a custom luxury home is one of life&apos;s most significant investments – both financially and emotionally. At Vanguard Builders, we understand that this journey should be as remarkable as the destination. Our comprehensive process is designed to guide you seamlessly from your initial vision to the moment you receive your keys.
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Phase 1: Discovery & Design (Weeks 1-8)</h2>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Initial Consultation</h3>
              <p className="text-slate-700 mb-6">
                Every great home begins with understanding our clients&apos; unique vision, lifestyle, and dreams. Our initial consultation is comprehensive, covering:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Lifestyle analysis and family needs assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Design preferences and architectural style exploration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Budget parameters and investment planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Site evaluation and feasibility analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Timeline expectations and project milestones</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Design Development</h3>
              <p className="text-slate-700 mb-6">
                Working with our in-house design team and trusted architect partners, we translate your vision into detailed plans. This collaborative process includes:
              </p>

              <div className="bg-slate-50 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">Our Design Process Highlights</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-primary-burgundy mb-2">Conceptual Design</h5>
                    <p className="text-slate-600 text-sm mb-4">Initial sketches and 3D renderings help visualize your home&apos;s overall aesthetic and flow.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary-burgundy mb-2">Schematic Design</h5>
                    <p className="text-slate-600 text-sm mb-4">Detailed floor plans, elevations, and preliminary specifications take shape.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary-burgundy mb-2">Design Development</h5>
                    <p className="text-slate-600 text-sm mb-4">Refined plans with specific materials, fixtures, and finishes selections.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary-burgundy mb-2">Final Documentation</h5>
                    <p className="text-slate-600 text-sm">Construction-ready drawings and specifications for permit submission.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Phase 2: Pre-Construction (Weeks 9-16)</h2>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Permits & Approvals</h3>
              <p className="text-slate-700 mb-6">
                Navigating the permit process can be complex, but our experienced team handles all regulatory requirements, including:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Building permit applications and submissions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">HOA and architectural review board approvals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Utility connections and service planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Environmental and soils testing coordination</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Material Selection & Procurement</h3>
              <p className="text-slate-700 mb-8">
                Our design center experience allows you to see, touch, and compare materials in person. We guide you through selections for flooring, cabinetry, countertops, fixtures, and finishes, ensuring every choice aligns with your vision and budget.
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Phase 3: Construction (Weeks 17-52)</h2>

              <p className="text-slate-700 mb-6">
                Construction begins with site preparation and follows a carefully orchestrated sequence designed to maintain quality while meeting timeline commitments.
              </p>

              <div className="bg-gradient-to-br from-primary-burgundy to-primary-burgundy-hover rounded-xl p-8 text-white mb-8">
                <h3 className="text-xl font-semibold mb-4">Construction Phases Overview</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 opacity-90">Foundation & Structure</h4>
                    <p className="text-sm opacity-75 mb-4">Site work, foundation, framing, and roofing establish your home&apos;s solid foundation.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 opacity-90">Systems Installation</h4>
                    <p className="text-sm opacity-75 mb-4">Plumbing, electrical, HVAC, and smart home systems are carefully integrated.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 opacity-90">Interior Build-Out</h4>
                    <p className="text-sm opacity-75 mb-4">Insulation, drywall, flooring, and trim work transform the structure into living spaces.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 opacity-90">Finish Work</h4>
                    <p className="text-sm opacity-75">Cabinetry, countertops, fixtures, and final details bring your vision to life.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Quality Assurance & Communication</h3>
              <p className="text-slate-700 mb-6">
                Throughout construction, we maintain the highest quality standards through:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700"><strong>Regular progress updates:</strong> Weekly reports with photos and milestone updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700"><strong>Quality checkpoints:</strong> Scheduled inspections at key construction phases</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700"><strong>Client site visits:</strong> Guided tours at safe and appropriate construction phases</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700"><strong>Change management:</strong> Clear process for any modifications with cost and timeline impacts</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Phase 4: Final Phase & Delivery (Weeks 53-56)</h2>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Pre-Delivery Inspection</h3>
              <p className="text-slate-700 mb-6">
                Before your final walkthrough, our team conducts a comprehensive pre-delivery inspection, addressing any items that don&apos;t meet our exacting standards. This includes:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Systems testing and commissioning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Finish quality verification and touch-ups</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Appliance installation and testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-burgundy mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Final cleaning and staging</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Final Walkthrough & Closing</h3>
              <p className="text-slate-700 mb-8">
                Your final walkthrough is a celebration of the journey&apos;s completion. We provide detailed orientation for all home systems, comprehensive warranty information, and ongoing support contacts. This isn&apos;t just a handover – it&apos;s the beginning of our long-term relationship as your preferred home care partner.
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Vanguard Difference</h2>

              <p className="text-slate-700 mb-6">
                What sets our process apart isn&apos;t just our attention to detail or quality craftsmanship – it&apos;s our commitment to making the journey as exceptional as the destination. Here&apos;s what you can expect when working with Vanguard Builders:
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Transparent Communication</h4>
                  <p className="text-slate-600 text-sm">
                    No surprises, no hidden costs. You&apos;ll always know exactly where your project stands, what&apos;s happening next, and why.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Fixed-Price Contracts</h4>
                  <p className="text-slate-600 text-sm">
                    Your investment is protected with detailed, fixed-price contracts that eliminate cost overruns from normal construction activities.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Dedicated Project Management</h4>
                  <p className="text-slate-600 text-sm">
                    Your dedicated project manager coordinates every aspect of construction, serving as your single point of contact throughout.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Quality Guarantee</h4>
                  <p className="text-slate-600 text-sm">
                    Comprehensive warranties and our commitment to addressing any issues quickly ensure your peace of mind long after move-in.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Ready to Begin Your Journey?</h2>

              <p className="text-slate-700 mb-8">
                Every luxury home we build represents a unique collaboration between our expertise and our clients&apos; dreams. If you&apos;re ready to begin this exciting journey, we invite you to schedule a consultation to discuss your vision, explore your options, and discover how Vanguard Builders can bring your dream home to life.
              </p>

              <p className="text-slate-700">
                Remember, the best time to start planning your custom luxury home is now – great homes require time, and the best results come from thoughtful planning and careful execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Start Your Custom Home Journey Today
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Ready to transform your vision into reality? Let&apos;s discuss your dream home project and how our proven process can bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/consultation" className="cta-button">
                Schedule Your Consultation
              </a>
              <a href="/portfolio" className="section-button">
                View Custom Home Gallery
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}