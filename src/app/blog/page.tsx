import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Blog post interface for type safety
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content?: string
  publishedDate: string
  readTime: string
  category: string
  author: string
  featuredImage: string
  tags: string[]
}

// Sample blog data - in production, this would come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    slug: 'smart-money-moves-montgomery-remodel',
    title: 'Financial Focus: Smart Money Moves for Your Montgomery Remodel',
    excerpt: 'Navigate the financial landscape of home remodeling with confidence. From financing options to tax benefits, discover the smartest money moves for your Montgomery area renovation project.',
    publishedDate: '2025-10-02',
    readTime: '12 min read',
    category: 'Financial Planning',
    author: 'Vanguard Builders Team',
    featuredImage: '/custom-kitchen.jpg',
    tags: ['Home Financing', 'Remodeling', 'Montgomery County', 'Tax Benefits', 'Investment Strategy']
  },
  {
    slug: 'luxury-home-trends-2024',
    title: 'Luxury Home Design Trends Shaping 2024',
    excerpt: 'Discover the latest trends in luxury home design, from sustainable materials to premium finishes, that are defining architectural excellence in 2024.',
    publishedDate: '2024-01-15',
    readTime: '5 min read',
    category: 'Design Trends',
    author: 'Vanguard Builders Team',
    featuredImage: '/luxury-patio.jpg',
    tags: ['Luxury Homes', 'Design Trends', 'Architecture', 'Premium Materials']
  },
  {
    slug: 'custom-home-building-process',
    title: 'Your Custom Home Building Journey: From Vision to Reality',
    excerpt: 'Take a detailed look at our comprehensive custom home building process, from initial consultation to final walkthrough, and learn what makes Vanguard Builders different.',
    publishedDate: '2024-01-08',
    readTime: '8 min read',
    category: 'Building Process',
    author: 'Vanguard Builders Team',
    featuredImage: '/custom-home-exterior.jpg',
    tags: ['Custom Homes', 'Building Process', 'Construction', 'Client Experience']
  }
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Featured Image Container */}
      <div className="relative overflow-hidden" style={{ borderRadius: '0.75rem 0.75rem 0 0', position: 'relative' }}>
        {/* Featured Image - Fully Clickable */}
        <Link
          href={`/blog/${post.slug}`}
          className="block aspect-[16/9] w-full bg-slate-300"
        >
          <Image
            src={post.featuredImage}
            alt={`${post.title} - Featured image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Category Badge - Outside Link for proper positioning */}
        <div
          className="absolute top-4 left-4 z-20"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 999
          }}
        >
          <span
            className="rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: '#8B1538 !important',
              color: 'white !important',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '8px 16px',
              display: 'inline-block',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 hover:text-primary-burgundy transition-colors mb-3 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-600 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap mb-6">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs"
              style={{
                marginRight: '8px',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#8B1538'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-2 text-primary-burgundy hover:text-primary-burgundy-hover font-semibold transition-colors group/link"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-half" style={{ minHeight: '45vh' }}>
        {/* Hero Background */}
        <div className="hero-background">
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content flex items-center justify-center py-12 md:py-4" style={{ minHeight: '45vh' }}>
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="hero-title text-white">
                Insights & Inspiration
                <span className="block text-accent-gold">
                  From Vanguard Builders
                </span>
              </h1>
              <p className="hero-subtitle text-slate-200">
                Explore the latest trends, insights, and stories from the world of luxury home construction and architectural excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-white py-20">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-badge justify-center mb-6">
              <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="badge-text">Latest Articles</span>
            </div>
            <h2 className="section-title">
              Stay Informed with Our
              <span className="text-primary-burgundy"> Latest Insights</span>
            </h2>
            <p className="section-description">
              From design trends to building processes, discover valuable insights that will help you make informed decisions about your luxury home project.
            </p>
          </div>

          {/* Blog Grid - Responsive and Scalable */}
          {blogPosts.length > 0 ? (
            <div
              className="max-w-5xl mx-auto"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
                gap: '1.5rem',
                backgroundColor: '#f8fafc',
                padding: '1rem',
                justifyContent: 'center'
              }}
            >
              {blogPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  More Articles Coming Soon
                </h3>
                <p className="text-lg text-slate-600 mb-8">
                  We're working on bringing you valuable insights and stories. Check back soon for the latest articles from our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="cta-button">
                    Get Project Updates
                  </a>
                  <a href="/custom-homes" className="section-button">
                    Explore Our Work
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Dream Home?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let our insights guide you through the journey of creating your perfect luxury home. Schedule a consultation to discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/consultation" className="cta-button">
              Schedule Consultation
            </a>
            <a href="/portfolio" className="section-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900">
              View Our Portfolio
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}