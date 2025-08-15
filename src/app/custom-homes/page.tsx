'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Home, Ruler, Palette, Shield, Clock, Award } from 'lucide-react';

export default function CustomHomesPage() {
  return (
    <div className="page-content">
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
          <div className="hero-logo">
            <Image 
              src="/vanguard-builders-logo-tp.png" 
              alt="Vanguard Builders" 
              className="hero-logo-image"
              width={180}
              height={136}
              priority
            />
          </div>
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
            <a href="/custom-build-wizard" className="hero-cta-primary">
              Start Your Custom Build
              <ArrowRight className="button-icon" />
            </a>
            <a href="/portfolio" className="hero-cta-secondary">
              View Our Portfolio
            </a>
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
                <Ruler className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Design & Planning</h3>
              <p className="text-slate-600 leading-relaxed">
                Work with our design team to create detailed plans that reflect your vision, 
                lifestyle, and budget requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Material Selection</h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from premium materials, finishes, and fixtures to create a home 
                that truly represents your personal style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
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
              <div className="image-placeholder image-placeholder-dark">
                <span>Luxury Home Interior</span>
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
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-burgundy to-primary-burgundy-hover rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 font-display text-slate-900">Modern Contemporary</h3>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Clean lines and open floor plans
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Floor-to-ceiling windows
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Minimalist design elements
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Smart home integration
                </li>
              </ul>
              <div className="text-2xl font-bold text-primary-burgundy">Starting at $450/sq ft</div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-burgundy to-primary-burgundy-hover rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 font-display text-slate-900">Traditional Colonial</h3>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Classic architectural details
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Formal living and dining spaces
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Rich hardwood throughout
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Custom millwork and trim
                </li>
              </ul>
              <div className="text-2xl font-bold text-primary-burgundy">Starting at $425/sq ft</div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-burgundy to-primary-burgundy-hover rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 font-display text-slate-900">Mediterranean Villa</h3>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Stucco and stone exteriors
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Courtyard and outdoor living
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Tile roofs and arched windows
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                  Wine cellars and entertainment areas
                </li>
              </ul>
              <div className="text-2xl font-bold text-primary-burgundy">Starting at $475/sq ft</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid-reverse">
            <div className="section-image">
              <div className="image-placeholder image-placeholder-dark">
                <span>Construction Timeline</span>
              </div>
              <div className="image-decoration image-decoration-left"></div>
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Clock className="badge-icon" />
                <span className="badge-text">Timeline</span>
              </div>
              <h2 className="section-title section-title-light">
                Custom Home
                <span className="title-accent"> Construction Timeline</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Understanding our construction timeline helps you plan for your dream home's completion.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Design & Permitting (2-4 months)</h4>
                    <p className="text-slate-300">Architectural design, engineering, and permit approval.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Foundation & Framing (6-8 weeks)</h4>
                    <p className="text-slate-300">Site preparation, foundation, and structural framing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Interior & Finishes (8-12 weeks)</h4>
                    <p className="text-slate-300">Interior systems, custom millwork, and luxury finishes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Final Inspection (1-2 weeks)</h4>
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
              <a href="/custom-build-wizard" className="section-button">
                Start Custom Build Wizard
                <ArrowRight className="button-icon" />
              </a>
              <a href="/contact" className="section-button-accent">
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