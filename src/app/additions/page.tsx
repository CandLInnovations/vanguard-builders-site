'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Home, Plus, Square, Users, Ruler, Palette } from 'lucide-react';
import { generateServiceSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/structured-data';

export default function AdditionsPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Home Additions & Expansions',
    description: 'Expand your living space with luxury home additions. Master suites, home offices, sunrooms, outdoor living spaces, and second stories. Seamless integration with your existing home.',
    url: 'https://vanguardbuilders.com/additions',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Home Additions', path: '/additions' },
  ]);

  return (
    <div className="page-content">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(serviceSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
      />

      {/* Hero Section */}
      <section className="hero">
        {/* Hero Background Image */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Luxury home addition by Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Luxury Home
            <span className="hero-title-accent">
              Additions
            </span>
          </h1>
          <p className="hero-subtitle">
            Expand your living space with sophisticated additions that seamlessly integrate 
            with your home's existing architecture and enhance your luxury lifestyle.
          </p>
          <div className="hero-buttons">
            <a href="/remodeling-wizard" className="hero-cta-primary">
              Plan Your Addition
              <ArrowRight className="button-icon" />
            </a>
            <a href="/consultation" className="hero-cta-secondary">
              Get Free Consultation
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* Master Suite Additions Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Home className="badge-icon" />
                <span className="badge-text">
                  Master Suite Additions
                </span>
              </div>
              <h2 className="section-title">
                Luxurious 
                <span className="title-accent"> Master Retreats</span>
              </h2>
              <p className="section-subtitle">
                Transform your home with a stunning master suite addition featuring spacious bedrooms, 
                spa-like bathrooms, walk-in closets, and private sitting areas designed for ultimate comfort and privacy.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Spa-Inspired Bathrooms</h3>
                    <p className="feature-description">Luxurious ensuite bathrooms with premium fixtures and finishes</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Custom Walk-In Closets</h3>
                    <p className="feature-description">Thoughtfully designed storage solutions with premium organization systems</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Private Sitting Areas</h3>
                    <p className="feature-description">Intimate spaces for relaxation with custom built-ins and luxury amenities</p>
                  </div>
                </div>
              </div>
              <a href="/remodeling-wizard" className="section-button">
                Explore Master Suites
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/master-ensuite.jpg"
                  alt="Luxury master suite addition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-right" />
            </div>
          </div>
        </div>
      </section>

      {/* Indoor-Outdoor Living Spaces Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/outdoor-kitchen.jpg"
                  alt="Seamless indoor-outdoor living space addition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left" />
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Square className="badge-icon" />
                <span className="badge-text">
                  Indoor-Outdoor Living
                </span>
              </div>
              <h2 className="section-title section-title-light">
                Seamless 
                <span className="title-accent"> Indoor-Outdoor Living</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Blur the lines between interior comfort and outdoor beauty with sophisticated additions that create 
                fluid transitions between your home and nature, perfect for Texas's year-round entertaining climate.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Retractable Glass Walls</h3>
                    <p className="feature-description feature-description-light">Floor-to-ceiling glass systems that disappear to unite indoor and outdoor spaces</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Covered Outdoor Kitchens</h3>
                    <p className="feature-description feature-description-light">Fully equipped outdoor culinary spaces with premium appliances and weather protection</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Climate-Controlled Patios</h3>
                    <p className="feature-description feature-description-light">Sophisticated heating and cooling systems for year-round outdoor comfort</p>
                  </div>
                </div>
              </div>
              <a href="/remodeling-wizard" className="section-button section-button-accent">
                Explore Outdoor Living
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen & Living Expansions Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Plus className="badge-icon" />
                <span className="badge-text">
                  Kitchen & Living Expansions
                </span>
              </div>
              <h2 className="section-title">
                Open-Concept 
                <span className="title-accent"> Living</span>
              </h2>
              <p className="section-subtitle">
                Create the heart of your home with spacious kitchen and living area additions that blend indoor and outdoor living, 
                featuring premium appliances, custom cabinetry, and seamless flow for entertaining.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Expansive Kitchen Islands & Multi-Island Kitchens</h3>
                    <p className="feature-description">Oversized islands with prep sinks, wine storage, and seating for 8+, or multi-island designs separating cooking, prep, and entertaining zones</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Great Room Additions</h3>
                    <p className="feature-description">Spacious living areas with soaring ceilings and architectural details</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Indoor-Outdoor Integration</h3>
                    <p className="feature-description">Seamless transitions to outdoor living spaces and patios</p>
                  </div>
                </div>
              </div>
              <a href="/kitchens" className="section-button">
                Explore Kitchen Designs
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/great-room.jpg"
                  alt="Luxury kitchen addition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-right" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Ruler className="badge-icon" />
              <span className="badge-text">Our Process</span>
            </div>
            <h2 className="section-title section-title-light">
              From Vision to
              <span className="title-accent"> Reality</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              Our comprehensive addition process ensures seamless integration with your existing home 
              while maintaining the highest standards of luxury and craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Design & Planning</h3>
              <p className="text-slate-300 leading-relaxed">
                Collaborative design sessions to create additions that enhance your lifestyle while maintaining architectural harmony with your existing home.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Expert Execution</h3>
              <p className="text-slate-300 leading-relaxed">
                Our master craftsmen and project managers ensure flawless construction while minimizing disruption to your daily life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Seamless Integration</h3>
              <p className="text-slate-300 leading-relaxed">
                Final walk-through and quality assurance to ensure your new addition exceeds expectations and integrates perfectly with your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title">
              Ready to Expand Your
              <span className="title-accent"> Luxury Living?</span>
            </h2>
            <p className="section-subtitle mb-8">
              Transform your home with a custom addition that enhances your lifestyle and increases your property value. 
              Schedule your consultation with our luxury home addition specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/custom-build-wizard" className="hero-cta-primary">
                Start Planning Your Addition
                <ArrowRight className="button-icon" />
              </a>
              <a href="/consultation" className="hero-cta-secondary">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}