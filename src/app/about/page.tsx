'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Home, Users, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-content">
      {/* Hero Section - Half Height */}
      <section className="hero-half">
        {/* Hero Background */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/great-room.jpg"
            alt="About Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            About
            <span className="hero-title-accent">
              Vanguard Builders
            </span>
          </h1>
          <p className="hero-subtitle">
            Crafting luxury homes with uncompromising attention to detail, 
            integrity, and a passion for excellence.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Home className="badge-icon" />
                <span className="badge-text">Our Story</span>
              </div>
              <h2 className="section-title">
                From Vision to
                <span className="title-accent"> Reality</span>
              </h2>
              <div className="section-subtitle">
                <p style={{ marginBottom: '1.5rem' }}>
                  At Vanguard Builders, our journey began with a passion for craftsmanship and a commitment to quality. What started as a focus on building spec and entry-level homes quickly evolved as we recognized a growing demand among clients for something more — more attention to detail, more personalized design, and more luxurious finishes.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  As our experience deepened and our reputation grew, so did our vision. We made a deliberate shift toward custom and luxury homebuilding — not just because it aligned with our strengths, but because it allowed us to create spaces that are truly exceptional. Our clients weren't looking for cookie-cutter designs; they were looking for homes that reflected their lifestyle, values, and dreams.
                </p>
                <p>
                  Today, Vanguard Builders specializes in high-end residential construction and remodeling, combining timeless design with modern luxury. We're proud to build homes that are not only beautiful and functional, but also uniquely tailored to each family we serve.
                </p>
              </div>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-dr-conroe.jpg"
                  alt="Custom home construction by Vanguard Builders"
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

      {/* Values Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-kitchen.jpg"
                  alt="Luxury interior design by Vanguard Builders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left"></div>
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Award className="badge-icon" />
                <span className="badge-text">Our Values</span>
              </div>
              <h2 className="section-title section-title-light">
                Built on
                <span className="title-accent"> Trust & Excellence</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                At the heart of every project is our belief in transparency, integrity, and craftsmanship — because a luxury home isn't just about finishes and fixtures. It's about trust, collaboration, and delivering a result that exceeds expectations.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Transparency</h4>
                    <p className="feature-description feature-description-light">
                      Clear communication and honest pricing throughout every phase of your project.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Integrity</h4>
                    <p className="feature-description feature-description-light">
                      We stand behind our work with unwavering commitment to quality and ethics.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Craftsmanship</h4>
                    <p className="feature-description feature-description-light">
                      Meticulous attention to detail in every aspect of construction and design.
                    </p>
                  </div>
                </div>
              </div>
              <a href="/custom-build-wizard" className="section-button-accent">
                Start Your Project
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Users className="badge-icon" />
              <span className="badge-text">Our Impact</span>
            </div>
            <h2 className="section-title">
              Years of Excellence in
              <span className="title-accent"> Luxury Construction</span>
            </h2>
            <p className="section-subtitle">
              Our commitment to quality and client satisfaction is reflected in every home we build.
            </p>
          </div>

          <div className="grid grid-cols-2 md-grid-cols-2 lg-grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-burgundy mb-2">50+</div>
              <div className="text-slate-600 font-medium">Luxury Homes Built</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-burgundy mb-2">100+</div>
              <div className="text-slate-600 font-medium">Renovations Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-burgundy mb-2">15+</div>
              <div className="text-slate-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-burgundy mb-2">98%</div>
              <div className="text-slate-600 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title section-title-light">
              Ready to Build Your
              <span className="title-accent"> Dream Home?</span>
            </h2>
            <p className="section-subtitle section-subtitle-light mb-12">
              Let's discuss your vision and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/custom-build-wizard" className="section-button-accent">
                Start Custom Build
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