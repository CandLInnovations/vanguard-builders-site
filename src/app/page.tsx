// app/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Home, Wrench } from 'lucide-react';
import { getAvailableHomes } from '@/lib/sanity-queries';

async function checkInventory() {
  try {
    const homes = await getAvailableHomes();
    return homes.length > 0;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return false;
  }
}

export default async function HomePage() {
  // Fetch inventory on server side for better SEO
  const hasAvailableHomes = await checkInventory();
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        {/* Hero Background Image */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/custom-kitchen.jpg"
            alt="Luxury custom home kitchen"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          {/* Full Logo */}
          <div className="hero-logo">
            <Image
              src="/vanguard-builders-logo-tp.png"
              alt="Vanguard Builders Logo"
              width={211}
              height={197}
              priority
              className="hero-logo-image"
            />
          </div>
          <h1 className="hero-title">
            Crafting 
            <span className="hero-title-accent">
              Architectural Excellence
            </span>
          </h1>
          <p className="hero-subtitle">
            Where visionary design meets uncompromising craftsmanship. 
            Creating bespoke luxury homes that define generations.
          </p>
          <div className="hero-buttons">
            <Link
              href={hasAvailableHomes ? "/inventory" : "/custom-build-wizard"}
              className="hero-cta-primary"
            >
              {hasAvailableHomes ? "View Available Homes" : "Start Your Vision"}
              <ArrowRight className="button-icon" />
            </Link>
            <Link href="/remodeling-wizard" className="hero-cta-secondary">
              Start Remodeling
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* Custom New Home Construction Section */}
      <section id="custom-homes" className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Home className="badge-icon" />
                <span className="badge-text">
                  Custom New Homes
                </span>
              </div>
              <h2 className="section-title">
                Build Your 
                <span className="title-accent"> Legacy</span>
              </h2>
              <p className="section-subtitle">
                From initial concept to final walkthrough, we orchestrate every detail of your custom home construction. 
                Our architectural partnerships and premium material sourcing ensure your vision becomes an extraordinary reality.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Architectural Collaboration</h3>
                    <p className="feature-description">Partner with renowned architects to create your unique design</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Premium Materials</h3>
                    <p className="feature-description">Curated selection of the finest materials and finishes</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Master Craftsmanship</h3>
                    <p className="feature-description">Executed by Texas's most skilled artisans and tradespeople</p>
                  </div>
                </div>
              </div>
              <Link href="/custom-build-wizard" className="section-button">
                Start Your Custom Build
                <ArrowRight className="button-icon" />
              </Link>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-dr-conroe.jpg"
                  alt="Custom luxury home construction"
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

      {/* Luxury Home Remodeling Section */}
      <section id="renovations" className="section section-dark">
        <div className="container">
          <div className="section-grid section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/construction-phase.jpg"
                  alt="Luxury home remodeling and renovation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left" />
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Wrench className="badge-icon" />
                <span className="badge-text">
                  Luxury Remodeling
                </span>
              </div>
              <h2 className="section-title section-title-light">
                Transform Your 
                <span className="title-accent"> Sanctuary</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Breathe new life into your existing home with our comprehensive remodeling services. 
                From kitchen and bath transformations to whole-home renovations, we elevate every space to luxury standards.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Whole Home Renovations</h3>
                    <p className="feature-description feature-description-light">Complete transformations that honor your home's character</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Kitchen & Bath Mastery</h3>
                    <p className="feature-description feature-description-light">Luxury spaces designed for both beauty and function</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Historic Preservation</h3>
                    <p className="feature-description feature-description-light">Respectful modernization of heritage properties</p>
                  </div>
                </div>
              </div>
              <Link href="/remodeling-wizard" className="section-button section-button-accent">
                Discover Remodeling
                <ArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}