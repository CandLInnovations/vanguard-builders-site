import React from 'react';
import Image from 'next/image';
import { ArrowRight, Home, Wrench } from 'lucide-react';

export default function StartYourVisionPage() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-half">
        {/* Hero Background Image */}
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Start your vision with Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Start Your 
            <span className="hero-title-accent">
              Vision
            </span>
          </h1>
          <p className="hero-subtitle">
            Choose your path to creating your dream space with Vanguard Builders. 
            Our guided wizards will help you plan every detail.
          </p>
        </div>
      </section>

      {/* Wizard Selection Section */}
      <section className="section section-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Custom Home Wizard */}
              <div className="wizard-selection-card">
                <div className="wizard-card-header">
                  <div className="wizard-card-icon">
                    <Home className="w-8 h-8" />
                  </div>
                  <h2 className="wizard-card-title">Custom Home Build</h2>
                </div>
                
                <div className="wizard-card-image">
                  <Image
                    src="/vanguard-builders-bathroom2.jpg"
                    alt="Custom home build wizard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="wizard-card-content">
                  <p className="wizard-card-description">
                    Build your dream home from the ground up. Our comprehensive wizard will guide you 
                    through every decision - from land status and architectural style to luxury features 
                    and finishes.
                  </p>
                  
                  <div className="wizard-card-features">
                    <div className="wizard-feature">8 guided steps</div>
                    <div className="wizard-feature">Land & design planning</div>
                    <div className="wizard-feature">Custom features selection</div>
                    <div className="wizard-feature">Budget & timeline planning</div>
                  </div>
                  
                  <a href="/custom-build-wizard" className="wizard-card-button">
                    Start Custom Build Wizard
                    <ArrowRight className="button-icon" />
                  </a>
                </div>
              </div>

              {/* Remodeling Wizard */}
              <div className="wizard-selection-card">
                <div className="wizard-card-header">
                  <div className="wizard-card-icon">
                    <Wrench className="w-8 h-8" />
                  </div>
                  <h2 className="wizard-card-title">Home Remodeling</h2>
                </div>
                
                <div className="wizard-card-image">
                  <Image
                    src="/vanguard-builders-bathroom1.jpg"
                    alt="Home remodeling wizard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="wizard-card-content">
                  <p className="wizard-card-description">
                    Transform your existing home into your dream space. From single rooms to 
                    whole-home renovations, we'll help you plan every aspect of your remodel.
                  </p>
                  
                  <div className="wizard-card-features">
                    <div className="wizard-feature">6 guided steps</div>
                    <div className="wizard-feature">Project type selection</div>
                    <div className="wizard-feature">Scope & style planning</div>
                    <div className="wizard-feature">Budget & consultation</div>
                  </div>
                  
                  <a href="/remodeling-wizard" className="wizard-card-button">
                    Start Remodeling Wizard
                    <ArrowRight className="button-icon" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-slate-600 mb-4">
                Need help deciding? Our team is here to guide you.
              </p>
              <a href="/contact" className="section-button">
                Contact Us for Guidance
                <ArrowRight className="button-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}