'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Home, Ruler, Palette, Shield, Clock, Award } from 'lucide-react';
import { useInventory } from '@/hooks/useInventory';
import { generateServiceSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/structured-data';

export default function CustomHomesPage() {
  const { hasAvailableHomes, loading } = useInventory();

  const serviceSchema = generateServiceSchema({
    name: 'Custom Luxury Home Building',
    description: 'Expert custom home building services in Texas. We create bespoke luxury homes with premium materials, architectural excellence, and master craftsmanship.',
    url: 'https://vanguardhomes.com/custom-homes',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Custom Homes', path: '/custom-homes' },
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
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Custom luxury home construction"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Custom
            <span className="hero-title-accent">
              Luxury Homes
            </span>
          </h1>
          <p className="hero-subtitle">
            Build the home of your dreams with unparalleled craftsmanship, 
            personalized design, and luxury finishes that reflect your unique lifestyle.
          </p>
          <div className="hero-buttons">
            {!loading && (
              <>
                <a 
                  href={hasAvailableHomes ? "/inventory" : "/custom-build-wizard"} 
                  className="hero-cta-primary"
                >
                  {hasAvailableHomes ? "View Available Homes" : "Start Your Custom Build"}
                  <ArrowRight className="button-icon" />
                </a>
                <a href="/portfolio" className="hero-cta-secondary">
                  View Our Portfolio
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Home className="badge-icon" />
              <span className="badge-text">Our Process</span>
            </div>
            <h2 className="section-title">
              Your Dream Home
              <span className="title-accent"> Journey</span>
            </h2>
            <p className="section-subtitle">
              From initial consultation to final walkthrough, we guide you through every step 
              of creating your perfect custom home.
            </p>
          </div>

          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Ruler className="w-8 h-8" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Design & Planning</h3>
              <p className="text-slate-600 leading-relaxed">
                Work with our design team to create detailed plans that reflect your vision, 
                lifestyle, and budget requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Material Selection</h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from premium materials, finishes, and fixtures to create a home 
                that truly represents your personal style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Expert Construction</h3>
              <p className="text-slate-600 leading-relaxed">
                Our skilled craftsmen bring your vision to life with meticulous attention 
                to detail and uncompromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Award className="badge-icon" />
                <span className="badge-text">Why Choose Us</span>
              </div>
              <h2 className="section-title section-title-light">
                Luxury Custom Homes
                <span className="title-accent"> Built to Last</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Every custom home we build is a testament to our commitment to excellence, 
                featuring the finest materials and most innovative construction techniques.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Personalized Design</h4>
                    <p className="feature-description feature-description-light">
                      Every detail tailored to your lifestyle, from floor plans to finish selections.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Premium Materials</h4>
                    <p className="feature-description feature-description-light">
                      Only the highest quality materials and fixtures from trusted luxury brands.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Master Craftsmanship</h4>
                    <p className="feature-description feature-description-light">
                      Skilled artisans who take pride in every detail of your home's construction.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">White-Glove Service</h4>
                    <p className="feature-description feature-description-light">
                      Dedicated project management ensuring a seamless building experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-kitchen.jpg"
                  alt="Luxury custom home interior with premium finishes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-right"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Palette className="badge-icon" />
              <span className="badge-text">Architectural Styles</span>
            </div>
            <h2 className="section-title">
              Diverse
              <span className="title-accent"> Design Options</span>
            </h2>
            <p className="section-subtitle">
              From contemporary minimalism to classic elegance, we build custom homes 
              in every architectural style.
            </p>
          </div>

          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 font-display">Modern Contemporary</h3>
              <ul className="space-y-2 text-slate-600 mb-6 text-left">
                <li>Clean lines and open floor plans</li>
                <li>Floor-to-ceiling windows</li>
                <li>Minimalist design elements</li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 font-display">Traditional Colonial</h3>
              <ul className="space-y-2 text-slate-600 mb-6 text-left">
                <li>Classic architectural details</li>
                <li>Formal living and dining spaces</li>
                <li>Rich hardwood throughout</li>
                <li>Custom millwork and trim</li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 font-display">Farmhouse</h3>
              <ul className="space-y-2 text-slate-600 mb-6 text-left">
                <li>Stone, brick, and siding exteriors</li>
                <li>Courtyard and outdoor living</li>
                <li>Metal roofs and arched windows</li>
                <li>Wine cellars and entertainment areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-bathroom.jpg"
                  alt="Custom home construction process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left"></div>
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Clock className="badge-icon" />
                <span className="badge-text">Process</span>
              </div>
              <h2 className="section-title section-title-light">
                Custom Home
                <span className="title-accent"> Construction Process</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Understanding our construction process helps you plan for your dream home's completion.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Design & Permitting</h4>
                    <p className="text-slate-300">Architectural design, engineering, and permit approval.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Foundation & Framing</h4>
                    <p className="text-slate-300">Site preparation, foundation, and structural framing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Interior & Finishes</h4>
                    <p className="text-slate-300">Interior systems, custom millwork, and luxury finishes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Final Inspection</h4>
                    <p className="text-slate-300">Quality inspection, walkthrough, and move-in preparation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title">
              Ready to Start Your
              <span className="title-accent"> Custom Home?</span>
            </h2>
            <p className="section-subtitle mb-12">
              Let's discuss your vision and create a personalized plan for your dream home.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!loading && (
                <a 
                  href={hasAvailableHomes ? "/inventory" : "/custom-build-wizard"} 
                  className="section-button"
                >
                  {hasAvailableHomes ? "View Available Homes" : "Start Custom Build Wizard"}
                  <ArrowRight className="button-icon" />
                </a>
              )}
              <a href="/consultation" className="section-button-accent">
                Schedule Consultation
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}