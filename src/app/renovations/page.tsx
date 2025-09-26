'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Wrench, Phone, Mail, Home, Palette, Plus, TreePine, Sparkles } from 'lucide-react';

export default function RenovationsPage() {
  // Obfuscated phone number
  const phoneNumber = "281-220-9087";
  const obfuscatedPhone = phoneNumber.split('').map((char, index) => 
    String.fromCharCode(char.charCodeAt(0) + (index % 2 === 0 ? 1 : -1))
  ).join('');

  const deObfuscatePhone = (obfuscated: string) => {
    return obfuscated.split('').map((char, index) => 
      String.fromCharCode(char.charCodeAt(0) + (index % 2 === 0 ? -1 : 1))
    ).join('');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${deObfuscatePhone(obfuscatedPhone)}`;
  };

  // Obfuscated email
  const emailAddress = "office@vanguardbuilders.com";
  const obfuscatedEmail = emailAddress.split('').map((char, index) => 
    String.fromCharCode(char.charCodeAt(0) + (index % 3 === 0 ? 2 : index % 3 === 1 ? -1 : 1))
  ).join('');

  const deObfuscateEmail = (obfuscated: string) => {
    return obfuscated.split('').map((char, index) => 
      String.fromCharCode(char.charCodeAt(0) + (index % 3 === 0 ? -2 : index % 3 === 1 ? 1 : -1))
    ).join('');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${deObfuscateEmail(obfuscatedEmail)}`;
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        {/* Hero Background Image */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/luxury-patio.jpg"
            alt="Luxury bathroom renovation"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Now Offering 
            <span className="hero-title-accent">
              Remodeling Services
            </span>
          </h1>
          <p className="hero-subtitle">
            Vanguard Builders Inc is excited to announce full-service remodeling 
            in addition to our new home construction! Transform your space with our skilled team.
          </p>
          <div className="hero-buttons">
            <a href="/remodeling-wizard" className="hero-cta-primary">
              Start Your Remodel
              <ArrowRight className="button-icon" />
            </a>
            <a href="/portfolio" className="hero-cta-secondary">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <MapPin className="badge-icon" />
              <span className="badge-text">
                Service Areas
              </span>
            </div>
            <h2 className="section-title">
              Proudly Serving 
              <span className="title-accent"> Greater Houston</span>
            </h2>
            <p className="section-subtitle">
              We bring our remodeling expertise to communities throughout the Houston metropolitan area.
            </p>
            <div className="grid grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4 text-lg">
              <div className="service-area">Houston</div>
              <div className="service-area">Katy</div>
              <div className="service-area">Cypress</div>
              <div className="service-area">The Woodlands</div>
              <div className="service-area">Spring</div>
              <div className="service-area">Sugar Land</div>
              <div className="service-area">Willis</div>
              <div className="service-area">Huntsville</div>
              <div className="service-area">Tomball</div>
              <div className="service-area">Conroe</div>
              <div className="service-area">Kingwood</div>
              <div className="service-area">Cleveland</div>
              <div className="service-area-plus">& Surrounding Areas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="section-badge justify-center">
              <Wrench className="badge-icon" />
              <span className="badge-text">
                Our Services
              </span>
            </div>
            <h2 className="section-title section-title-light">
              Remodeling Services 
              <span className="title-accent"> We Offer</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              From single rooms to whole-home transformations, we handle every aspect of your remodeling project.
            </p>
          </div>

          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-8">
            <div className="service-card">
              <div className="service-icon">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="service-title">Kitchen Remodels & Upgrades</h3>
              <p className="service-description">
                Transform your kitchen into a culinary masterpiece with custom cabinetry, premium appliances, and luxury finishes.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="service-title">Bathroom Renovations</h3>
              <p className="service-description">
                Create your personal spa retreat with elegant tile work, modern fixtures, and thoughtful design.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="service-title">Room Additions & Expansions</h3>
              <p className="service-description">
                Expand your living space with seamless additions that blend perfectly with your existing home.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <TreePine className="w-8 h-8" />
              </div>
              <h3 className="service-title">Outdoor Living Spaces & Patios</h3>
              <p className="service-description">
                Extend your home outdoors with beautiful patios, decks, and outdoor entertainment areas.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="service-title">Flooring, Tile & Painting</h3>
              <p className="service-description">
                Refresh your space with premium flooring options, custom tile work, and professional painting services.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="service-title">Whole-Home Makeovers</h3>
              <p className="service-description">
                Complete home transformations that reimagine every space while maintaining architectural integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title">
              Ready to Start Your 
              <span className="title-accent"> Remodel?</span>
            </h2>
            <p className="section-subtitle mb-12">
              Your dream home isn't just built—it's remodeled with excellence. Let's get started!
            </p>

            <div className="grid md-grid-cols-3 gap-8 mb-12">
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <Phone className="contact-method-icon" />
                </div>
                <h3 className="contact-method-title">Call Us</h3>
                <button 
                  onClick={handlePhoneClick} 
                  className="contact-method-link"
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    textDecoration: 'inherit',
                    color: '#8B1538'
                  }}
                >
                  281-220-9087
                </button>
              </div>

              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <Mail className="contact-method-icon" />
                </div>
                <h3 className="contact-method-title">Email Us</h3>
                <button 
                  onClick={handleEmailClick} 
                  className="contact-method-link"
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    textDecoration: 'inherit',
                    color: '#8B1538'
                  }}
                >
                  office@vanguardbuilders.com
                </button>
              </div>

              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <Wrench className="contact-method-icon" />
                </div>
                <h3 className="contact-method-title">Start Planning</h3>
                <a href="/remodeling-wizard" className="contact-method-link">
                  Start Remodeling
                </a>
              </div>
            </div>

            <a href="/consultation" className="hero-cta-primary">
              Request Free Consultation
              <ArrowRight className="button-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}