'use client';

import React from 'react';
import Image from 'next/image';
import { Home, ArrowRight } from 'lucide-react';
import PortfolioItem from '@/components/portfolio/PortfolioItem';

export default function PortfolioPage() {
  // const [activeSection, setActiveSection] = useState<'custom' | 'renovations'>('custom'); // COMMENTED OUT WHEN RENOVATIONS HIDDEN

  return (
    <div className="page-content">
      {/* Hero Section - Half Height */}
      <section className="hero-half">
        {/* Hero Background Image */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Luxury home portfolio showcase"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Our
            <span className="hero-title-accent">
              Portfolio
            </span>
          </h1>
          <p className="hero-subtitle">
            Discover the exceptional craftsmanship and architectural excellence that defines
            every Vanguard Builders project. From luxury custom homes to stunning renovations.
          </p>
        </div>
      </section>

      {/* Toggle Section - RENOVATIONS HIDDEN FOR NOW
      <section className="py-4">
        <div className="container">
          <div className="flex justify-center mb-2">
            <div className="portfolio-toggle">
              <button
                onClick={() => setActiveSection('custom')}
                className={`portfolio-toggle-btn ${activeSection === 'custom' ? 'active' : ''}`}
              >
                <Home className="portfolio-toggle-icon" />
                Custom Homes
              </button>
              <button
                onClick={() => setActiveSection('renovations')}
                className={`portfolio-toggle-btn ${activeSection === 'renovations' ? 'active' : ''}`}
              >
                <Wrench className="portfolio-toggle-icon" />
                Renovations
              </button>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Custom Homes Portfolio Section - ALWAYS SHOW WHEN RENOVATIONS HIDDEN */}
      <section className="section-white pt-0 pb-16">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <div className="section-badge justify-center">
              <Home className="badge-icon" />
              <span className="badge-text">
                Custom Homes
              </span>
            </div>
            <h2 className="section-title">
              Luxury Custom 
              <span className="title-accent"> Home Portfolio</span>
            </h2>
            <p className="section-subtitle">
              Each custom home we build is a unique masterpiece, designed to reflect our clients' 
              individual style and crafted with uncompromising attention to detail.
            </p>
          </div>

          <div className="portfolio-grid">
            <PortfolioItem
              images={[
                '/old-hickory-dr-conroe.jpg',
                '/old-hickory-kitchen.jpg',
                '/old-hickory-kitchen2.jpg',
                '/Old-Hickory-great-room.jpg',
                '/Old-Hickory-master-suite.jpg',
                '/old-hickory-bathroom.jpg',
                '/old-hickory-outdoor-kitchen.jpg'
              ]}
              altTexts={[
                'Transitional luxury custom home exterior',
                'Luxury kitchen interior',
                'Luxury kitchen interior second perspective',
                'Expansive great room',
                'Expansive master suite',
                'Posh master ensuite',
                'Outdoor kitchen'
              ]}
              location="The Woodlands, TX"
              year="2024"
              title="Hill Country Estate"
              description="6,500 sq ft contemporary masterpiece featuring soaring ceilings, floor-to-ceiling windows, and seamless indoor-outdoor living."
              features={['5 Bedrooms', '6 Bathrooms', 'Pool & Spa', '3-Car Garage']}
            />
            
            <PortfolioItem
              images={[
                '/custom-home-exterior.jpg',
                '/custom-kitchen.jpg',
                '/custom-kitchen2.jpg',
                '/great-room.jpg',
                '/master-ensuite.jpg',
                '/luxury-shower.jpg',
                '/luxury-patio.jpg',
                '/outdoor-kitchen.jpg'
              ]}
              altTexts={[
                'Traditional luxury custom home',
                'Gourmet custom kitchen',
                'Gourmet custom kitchen second perspective',
                'Capacious great room',
                'Luxury master ensuite',
                'Master ensuite shower',
                'Lavish outdoor entertainment',
                'Custom outdoor kitchen'
              ]}
              location="Katy, TX"
              year="2024"
              title="Classic Transitional Manor"
              description="8,200 sq ft traditional estate with timeless elegance, featuring custom millwork and premium finishes throughout."
              features={['6 Bedrooms', '7 Bathrooms', 'Wine Cellar', 'Home Theater']}
            />
            
            <PortfolioItem
              images={[
                '/lorna-unfinished-exterior.jpg',
                '/lorna-kitchen1.jpg',
                '/lorna-patio-under-construction.jpg',
                '/lorna-front-porch-under-construction.jpg'
              ]}
              altTexts={[
                'Luxury custom home under construction',
                'Beautiful custom kitchen',
                'Back patio details',
                'Front porch details'
              ]}
              location="Montgomery, TX"
              year="2025"
              title="Building Masterpieces"
              description="Explore the meticulous journey from blueprint to bespoke luxury, where every detail is sculpted with unwavering expertise."
              features={['4 Bedrooms', '6 Bathrooms', '3 Car Garage', 'Outdoor Kitchen']}
            />
          </div>

          <div className="text-center mt-12">
            <a href="/custom-build-wizard" className="section-button">
              Start Your Custom Home Journey
              <ArrowRight className="button-icon" />
            </a>
          </div>
        </div>
      </section>
      {/* When renovations are restored, add closing: ) and } */}

      {/* Renovations Portfolio Section - HIDDEN FOR NOW */}
      {/* Commented out: {activeSection === 'renovations' && (
      <section className="section-dark pt-0 pb-16">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <div className="section-badge justify-center">
              <Wrench className="badge-icon" />
              <span className="badge-text">
                Renovations
              </span>
            </div>
            <h2 className="section-title section-title-light">
              Luxury Home 
              <span className="title-accent"> Renovations</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              Transform your existing home into a luxury masterpiece with our comprehensive 
              remodeling and renovation services.
            </p>
          </div>

          <div className="portfolio-grid">
            <PortfolioItem
              images={[
                '/custom-kitchen2.jpg',
                '/custom-kitchen3.jpg',
                '/outdoor-kitchen.jpg'
              ]}
              altTexts={[
                'Luxury kitchen renovation',
                'Luxury bathroom interior',
                'Luxury bathroom details'
              ]}
              location="Houston, TX"
              year="2024"
              title="Gourmet Kitchen Transformation"
              description="Complete kitchen renovation featuring custom cabinetry, premium appliances, and stunning natural stone surfaces."
              features={['Custom Cabinetry', 'Quartz Counters', 'Premium Appliances', "Butler's Pantry"]}
              isDark={true}
            />
            
            <PortfolioItem
              images={[
                '/luxury-shower.jpg',
                '/vanguard-builders-bathroom1.jpg'
              ]}
              altTexts={[
                'Master bathroom renovation',
                'Luxury bathroom details'
              ]}
              location="Cypress, TX"
              year="2024"
              title="Spa-Inspired Master Bath"
              description="Luxurious master bathroom renovation with freestanding tub, walk-in shower, and premium marble finishes."
              features={['Marble Tile', 'Freestanding Tub', 'Walk-in Shower', 'Heated Floors']}
              isDark={true}
            />
            
            <PortfolioItem
              images={[
                '/luxury-patio.jpg',
                '/construction-phase.jpg'
              ]}
              altTexts={[
                'Whole home renovation exterior',
                'Luxury bathroom interior'
              ]}
              location="Spring, TX"
              year="2023"
              title="Complete Home Transformation"
              description="Full-scale renovation transforming a 1980s home into a modern luxury residence with open-concept design."
              features={['Open Concept', 'New Addition', 'Luxury Finishes', 'Landscaping']}
              isDark={true}
            />
          </div>

          <div className="text-center mt-12">
            <a href="/remodeling-wizard" className="section-button section-button-accent">
              Start Your Renovation Journey
              <ArrowRight className="button-icon" />
            </a>
          </div>
        </div>
      </section>
      )} */}

      {/* Gradient transition spacer - only show when renovations section is active */}
      {/* Commented out: {activeSection === 'renovations' && (
        <div className="gradient-transition"></div>
      )} */}
    </div>
  );
}