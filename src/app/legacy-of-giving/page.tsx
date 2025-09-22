'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Home, Users, ArrowRight, ExternalLink } from 'lucide-react';

export default function LegacyOfGivingPage() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/great-room.jpg"
            alt="Luxury home interior representing hope and stability"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Legacy of
            <span className="hero-title-accent">
              Giving
            </span>
          </h1>
          <p className="hero-subtitle">
            Building homes. Changing lives. Creating hope for families in need.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Heart className="badge-icon" />
              <span className="badge-text">Our Commitment</span>
            </div>
            <h2 className="section-title">
              Building More Than
              <span className="title-accent"> Luxury Homes</span>
            </h2>
            <p className="section-subtitle">
              At Vanguard Builders, we believe that everyone deserves the stability and security
              that comes with having a home. That's why we're proud to donate a portion of the
              profit from every home we build to Family Promise of Montgomery County.
            </p>
          </div>

          <div className="section-grid">
            <div className="section-content">
              <div className="w-16 h-16 bg-primary-burgundy rounded-full flex items-center justify-center mb-6">
                <Home className="w-8 h-8" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-2xl font-semibold mb-6 font-display">Every Home Makes a Difference</h3>
              <p className="text-slate-600 leading-relaxed mb-12">
                When you choose Vanguard Builders for your luxury home, you're not just investing
                in exceptional craftsmanship—you're helping families in our community move from
                homelessness to independence.
              </p>
              <div className="bg-accent-gold/10 rounded-lg p-6">
                <h4 className="text-accent-gold font-display font-semibold text-2xl mb-4">
                  Our Promise
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  A portion of profits from every Vanguard Builders home directly supports
                  Family Promise of Montgomery County's mission to help homeless families
                  achieve sustainable independence.
                </p>
              </div>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/custom-home-exterior.jpg"
                  alt="Beautiful custom home representing hope and stability"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Family Promise Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-kitchen.jpg"
                  alt="Warm, welcoming home environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left"></div>
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Users className="badge-icon" />
                <span className="badge-text">About Family Promise</span>
              </div>
              <h2 className="section-title section-title-light">
                Transforming Lives in
                <span className="title-accent"> Montgomery County</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Family Promise of Montgomery County is dedicated to helping homeless families
                achieve sustainable independence through a community-based response.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Emergency Shelter</h4>
                    <p className="feature-description feature-description-light">
                      Providing safe, temporary housing for families experiencing homelessness.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Support Services</h4>
                    <p className="feature-description feature-description-light">
                      Case management, life skills training, and job placement assistance.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Sustainable Housing</h4>
                    <p className="feature-description feature-description-light">
                      Helping families secure permanent housing and achieve long-term stability.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div className="feature-content">
                    <h4 className="feature-title feature-title-light">Community Network</h4>
                    <p className="feature-description feature-description-light">
                      Building partnerships with local congregations and volunteers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Heart className="badge-icon" />
              <span className="badge-text">Making an Impact</span>
            </div>
            <h2 className="section-title">
              Your Home, Their
              <span className="title-accent"> Hope</span>
            </h2>
            <p className="section-subtitle">
              Every luxury home we build represents more than exceptional craftsmanship—it's
              an investment in our community's most vulnerable families.
            </p>
          </div>

          <div className="grid md-grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Shelter & Safety</h3>
              <p className="text-slate-600 leading-relaxed">
                Your investment helps provide immediate shelter and safety for families
                experiencing homelessness in Montgomery County.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Family Stability</h3>
              <p className="text-slate-600 leading-relaxed">
                Support services help families develop the skills and resources needed
                to achieve long-term housing stability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10" style={{ color: 'white !important' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4 font-display">Community Hope</h3>
              <p className="text-slate-600 leading-relaxed">
                Together, we're building a stronger community where every family
                has the opportunity to thrive.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 font-display">Learn More About Family Promise</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Discover how Family Promise of Montgomery County is making a difference
              in our community and how you can get involved beyond your home purchase.
            </p>
            <a
              href="https://www.familypromiseofmc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="section-button inline-flex items-center gap-3"
            >
              Visit Family Promise Website
              <ExternalLink className="button-icon" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title section-title-light">
              Build Your Legacy While
              <span className="title-accent"> Building Hope</span>
            </h2>
            <p className="section-subtitle section-subtitle-light mb-12">
              Start your luxury home journey with Vanguard Builders and make a lasting
              impact on families in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/custom-build-wizard" className="section-button">
                Start Your Custom Home
                <ArrowRight className="button-icon" />
              </a>
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