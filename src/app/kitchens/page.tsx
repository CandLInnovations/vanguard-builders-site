'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ChefHat, Lightbulb, Palette, Zap, Crown, Gem } from 'lucide-react';
import { generateServiceSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/structured-data';

export default function KitchensPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Luxury Kitchen Design & Remodeling',
    description: 'Transform your kitchen with custom cabinetry, premium appliances, and sophisticated design. Expert kitchen remodeling services in Texas featuring smart technology integration and gourmet features.',
    url: 'https://vanguardhomes.com/kitchens',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Kitchen Design', path: '/kitchens' },
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
            src="/custom-kitchen3.jpg"
            alt="Luxury custom kitchen design by Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Luxury Kitchen
            <span className="hero-title-accent">
              Design
            </span>
          </h1>
          <p className="hero-subtitle">
            Transform the heart of your home with exquisite custom kitchen designs featuring 
            premium appliances, handcrafted cabinetry, and sophisticated finishes.
          </p>
          <div className="hero-buttons">
            <a href="/remodeling-wizard" className="hero-cta-primary">
              Design Your Kitchen
              <ArrowRight className="button-icon" />
            </a>
            <a href="/consultation" className="hero-cta-secondary">
              Free Design Consultation
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* Gourmet Kitchen Design Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <ChefHat className="badge-icon" />
                <span className="badge-text">
                  Gourmet Kitchen Design
                </span>
              </div>
              <h2 className="section-title">
                Culinary 
                <span className="title-accent"> Excellence</span>
              </h2>
              <p className="section-subtitle">
                Create the ultimate culinary workspace with professional-grade appliances, premium materials, 
                and thoughtful layouts designed for both everyday cooking and elegant entertaining.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Professional Appliances</h3>
                    <p className="feature-description">Commercial-grade ranges, refrigeration, and ventilation systems</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Custom Cabinetry</h3>
                    <p className="feature-description">Handcrafted cabinets with premium wood and hardware selections</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Premium Countertops</h3>
                    <p className="feature-description">Exotic stone, quartz, and specialty surfaces with expert fabrication</p>
                  </div>
                </div>
              </div>
              <a href="/remodeling-wizard" className="section-button">
                Start Your Kitchen Design
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-kitchen2.jpg"
                  alt="Luxury gourmet kitchen with custom cabinetry"
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

      {/* Modern Kitchen Innovation Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/custom-kitchen2.jpg"
                  alt="Modern luxury kitchen with smart technology"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left" />
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Zap className="badge-icon" />
                <span className="badge-text">
                  Smart Kitchen Technology
                </span>
              </div>
              <h2 className="section-title section-title-light">
                Innovation Meets 
                <span className="title-accent"> Luxury</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Integrate cutting-edge smart home technology with timeless design elements to create 
                kitchens that anticipate your needs and elevate your culinary experience.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Smart Appliance Integration</h3>
                    <p className="feature-description feature-description-light">Connected ovens, refrigerators, and lighting systems for effortless control</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Automated Storage Solutions</h3>
                    <p className="feature-description feature-description-light">Motorized cabinets, pop-up storage, and hidden pantry systems</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Advanced Lighting Design</h3>
                    <p className="feature-description feature-description-light">Programmable LED systems with scene control and circadian rhythm support</p>
                  </div>
                </div>
              </div>
              <a href="/remodeling-wizard" className="section-button section-button-accent">
                Explore Smart Kitchen Features
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Island Design Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Crown className="badge-icon" />
                <span className="badge-text">
                  Kitchen Islands & Bars
                </span>
              </div>
              <h2 className="section-title">
                The Heart of 
                <span className="title-accent"> Entertainment</span>
              </h2>
              <p className="section-subtitle">
                Design stunning kitchen islands and breakfast bars that serve as both functional workspace 
                and elegant gathering place for family meals and sophisticated entertaining.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Multi-Level Islands</h3>
                    <p className="feature-description">Tiered designs separating prep areas from dining and entertaining spaces</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Integrated Appliances</h3>
                    <p className="feature-description">Built-in wine storage, warming drawers, and specialty prep sinks</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Statement Materials</h3>
                    <p className="feature-description">Waterfall edges, exotic stones, and custom metalwork details</p>
                  </div>
                </div>
              </div>
              <a href="/remodeling-wizard" className="section-button">
                Design Your Kitchen Island
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/old-hickory-kitchen.jpg"
                  alt="Luxury kitchen island with custom finishes"
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

      {/* Design Process Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Palette className="badge-icon" />
              <span className="badge-text">Design Process</span>
            </div>
            <h2 className="section-title section-title-light">
              From Inspiration to
              <span className="title-accent"> Installation</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              Our comprehensive kitchen design process ensures every detail reflects your personal style 
              while maximizing functionality and luxury.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Discovery</h3>
              <p className="text-slate-300 leading-relaxed">
                Understanding your lifestyle, cooking habits, and design preferences to create a personalized vision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Design</h3>
              <p className="text-slate-300 leading-relaxed">
                3D renderings and material selections bringing your dream kitchen to life before construction begins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Gem className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Selection</h3>
              <p className="text-slate-300 leading-relaxed">
                Curated visits to our premium showrooms for hands-on selection of materials, appliances, and finishes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Installation</h3>
              <p className="text-slate-300 leading-relaxed">
                Expert craftsmanship and project management ensuring flawless execution of your luxury kitchen design.
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
              Ready to Create Your
              <span className="title-accent"> Dream Kitchen?</span>
            </h2>
            <p className="section-subtitle mb-8">
              Partner with Texas's premier luxury kitchen designers to create a culinary masterpiece that enhances 
              your lifestyle and adds significant value to your home. Schedule your complimentary design consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/remodeling-wizard" className="hero-cta-primary">
                Start Your Kitchen Design
                <ArrowRight className="button-icon" />
              </a>
              <a href="/consultation" className="hero-cta-secondary">
                Book Design Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}