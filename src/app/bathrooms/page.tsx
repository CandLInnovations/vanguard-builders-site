'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Droplets, Sparkles, Palette, Thermometer, Crown, Zap } from 'lucide-react';
import { generateServiceSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/structured-data';

export default function BathroomsPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Luxury Bathroom Design & Remodeling',
    description: 'Create your personal spa retreat with luxury bathroom remodeling. Featuring spa-inspired features, premium fixtures, smart technology, and elegant design. Master bathrooms, powder rooms, and complete renovations.',
    url: 'https://vanguardhomes.com/bathrooms',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Bathroom Design', path: '/bathrooms' },
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
            alt="Luxury spa bathroom design by Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Luxury Bathroom
            <span className="hero-title-accent">
              Design
            </span>
          </h1>
          <p className="hero-subtitle">
            Transform your bathroom into a private spa sanctuary with exquisite fixtures, 
            premium materials, and sophisticated design that elevates your daily rituals.
          </p>
          <div className="hero-buttons">
            <a href="/custom-build-wizard" className="hero-cta-primary">
              Design Your Spa Bathroom
              <ArrowRight className="button-icon" />
            </a>
            <a href="/contact" className="hero-cta-secondary">
              Free Design Consultation
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* Master Bath Suites Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Crown className="badge-icon" />
                <span className="badge-text">
                  Master Bath Suites
                </span>
              </div>
              <h2 className="section-title">
                Private Spa 
                <span className="title-accent"> Sanctuaries</span>
              </h2>
              <p className="section-subtitle">
                Create the ultimate retreat with luxurious master bathroom suites featuring soaking tubs, 
                walk-in showers, dual vanities, and premium finishes that rival the world's finest spas.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Freestanding Soaking Tubs</h3>
                    <p className="feature-description">Sculptural tubs in premium materials with spa-quality jetted options</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Walk-In Shower Systems</h3>
                    <p className="feature-description">Frameless glass enclosures with multiple shower heads and steam options</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Custom Dual Vanities</h3>
                    <p className="feature-description">Handcrafted cabinetry with premium stone tops and designer lighting</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="section-button">
                Design Your Master Bath
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/vanguard-builders-bathroom1.jpg"
                  alt="Luxury master bathroom with freestanding tub"
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

      {/* Spa Features Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-grid section-grid-reverse">
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/construction-phase.jpg"
                  alt="Luxury spa bathroom features"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="image-decoration image-decoration-left" />
            </div>
            <div className="section-content">
              <div className="section-badge">
                <Droplets className="badge-icon" />
                <span className="badge-text">
                  Spa-Inspired Features
                </span>
              </div>
              <h2 className="section-title section-title-light">
                Wellness & 
                <span className="title-accent"> Relaxation</span>
              </h2>
              <p className="section-subtitle section-subtitle-light">
                Incorporate wellness-focused features that transform your bathroom into a therapeutic retreat, 
                featuring steam showers, heated floors, aromatherapy systems, and chromotherapy lighting.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Steam Shower Systems</h3>
                    <p className="feature-description feature-description-light">Professional-grade steam generators with aromatherapy and music integration</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Radiant Heated Floors</h3>
                    <p className="feature-description feature-description-light">Underfloor heating systems in premium stone and tile applications</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title feature-title-light">Chromotherapy Lighting</h3>
                    <p className="feature-description feature-description-light">Color-changing LED systems for mood enhancement and circadian support</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="section-button section-button-accent">
                Explore Spa Features
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Powder Room Design Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <div className="section-badge">
                <Sparkles className="badge-icon" />
                <span className="badge-text">
                  Powder Rooms & Guest Baths
                </span>
              </div>
              <h2 className="section-title">
                Sophisticated 
                <span className="title-accent"> First Impressions</span>
              </h2>
              <p className="section-subtitle">
                Make a stunning statement with elegantly designed powder rooms and guest bathrooms that showcase 
                your attention to detail through premium fixtures, artistic tile work, and dramatic lighting.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Statement Vanities</h3>
                    <p className="feature-description">Custom floating vanities with vessel sinks and artistic mirror installations</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Artistic Tile Work</h3>
                    <p className="feature-description">Hand-selected tiles in unique patterns and premium natural stones</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot" />
                  <div className="feature-content">
                    <h3 className="feature-title">Dramatic Lighting</h3>
                    <p className="feature-description">Sculptural fixtures and accent lighting creating ambiance and visual impact</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="section-button">
                Design Your Powder Room
                <ArrowRight className="button-icon" />
              </a>
            </div>
            <div className="section-image">
              <div className="section-image-enhanced">
                <Image
                  src="/custom-kitchen.jpg"
                  alt="Elegant powder room design"
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

      {/* Materials & Technology Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Palette className="badge-icon" />
              <span className="badge-text">Premium Materials & Technology</span>
            </div>
            <h2 className="section-title section-title-light">
              Luxury Meets
              <span className="title-accent"> Innovation</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              We source the finest materials and integrate cutting-edge technology to create bathrooms 
              that are both timeless and forward-thinking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Premium Materials</h3>
              <p className="text-slate-300 leading-relaxed">
                Imported marble, natural stone, handcrafted tiles, and artisan metalwork sourced from renowned suppliers worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Technology</h3>
              <p className="text-slate-300 leading-relaxed">
                Digital shower controls, smart mirrors, automated lighting, and voice-activated features for ultimate convenience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Climate Control</h3>
              <p className="text-slate-300 leading-relaxed">
                Heated floors, towel warmers, ventilation systems, and humidity control for year-round comfort and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Styles Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Palette className="badge-icon" />
              <span className="badge-text">Design Styles</span>
            </div>
            <h2 className="section-title">
              Timeless Designs for
              <span className="title-accent"> Every Taste</span>
            </h2>
            <p className="section-subtitle">
              From classic elegance to contemporary sophistication, we create bathroom designs 
              that reflect your personal style and enhance your home's architectural character.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Classic Traditional</h3>
              <p className="text-slate-600 leading-relaxed">
                Timeless elegance with marble details, classic fixtures, and sophisticated millwork.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Modern Contemporary</h3>
              <p className="text-slate-600 leading-relaxed">
                Clean lines, minimalist aesthetics, and cutting-edge fixtures for sophisticated simplicity.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Transitional Luxury</h3>
              <p className="text-slate-600 leading-relaxed">
                Perfect blend of traditional comfort and contemporary innovation for versatile appeal.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Resort-Style Spa</h3>
              <p className="text-slate-600 leading-relaxed">
                Tropical influences, natural materials, and wellness features for vacation-like luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title section-title-light">
              Ready to Create Your
              <span className="title-accent"> Spa Sanctuary?</span>
            </h2>
            <p className="section-subtitle section-subtitle-light mb-8">
              Transform your bathroom into a luxurious retreat that enhances your daily wellness routine. 
              Schedule your complimentary design consultation with our bathroom design specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/custom-build-wizard" className="hero-cta-primary">
                Start Your Bathroom Design
                <ArrowRight className="button-icon" />
              </a>
              <a href="/contact" className="hero-cta-secondary">
                Book Design Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}