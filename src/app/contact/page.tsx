'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageSquare, Home, Wrench } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  // Obfuscated phone number (same as navbar)
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

  const handleAddressClick = () => {
    const address = "2300 Woodforest Pkwy N, Ste 250-442, Montgomery, TX 77316";
    const encodedAddress = encodeURIComponent(address);
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMac = /Macintosh/.test(navigator.userAgent);
    
    if (isIOS || isMac) {
      window.open(`https://maps.apple.com/?address=${encodedAddress}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="page-content">
      {/* Hero Section - Half Height */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Contact Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Contact
            <span className="hero-title-accent">
              Vanguard Builders
            </span>
          </h1>
          <p className="hero-subtitle">
            Ready to start your luxury home or renovation project? Let's discuss your vision 
            and create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section section-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="section-badge">
                  <MessageSquare className="badge-icon" />
                  <span className="badge-text">Get Started</span>
                </div>
                <h2 className="section-title">
                  Tell Us About Your
                  <span className="title-accent"> Project</span>
                </h2>
                <p className="section-subtitle">
                  Complete the form below and we'll get back to you within 24 hours to discuss your project.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-slate-900 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="custom-home">Custom Home</option>
                    <option value="renovation">Home Renovation</option>
                    <option value="kitchen-remodel">Kitchen Remodel</option>
                    <option value="bathroom-remodel">Bathroom Remodel</option>
                    <option value="addition">Home Addition</option>
                    <option value="whole-home">Whole Home Remodel</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-semibold text-slate-900 mb-2">
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                      <option value="1-year">Within 1 year</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-250k">$100K - $250K</option>
                      <option value="250k-500k">$250K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-plus">$1M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-primary-burgundy transition-colors resize-vertical"
                    placeholder="Tell us about your project vision, specific requirements, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-burgundy hover:bg-primary-burgundy-hover text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-sm text-slate-600 text-center">
                  We'll respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <div className="section-badge">
                  <Phone className="badge-icon" />
                  <span className="badge-text">Get In Touch</span>
                </div>
                <h2 className="section-title">
                  Ready to
                  <span className="title-accent"> Connect?</span>
                </h2>
                <p className="section-subtitle">
                  Contact us directly for immediate assistance or to schedule a consultation.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <button 
                      onClick={handlePhoneClick}
                      className="text-primary-burgundy hover:text-primary-burgundy-hover font-medium transition-colors"
                    >
                      {phoneNumber}
                    </button>
                    <p className="text-sm text-slate-600">Mon-Fri 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a 
                      href="mailto:office@vanguardbuilders.com"
                      className="text-primary-burgundy hover:text-primary-burgundy-hover font-medium transition-colors"
                    >
                      office@vanguardbuilders.com
                    </a>
                    <p className="text-sm text-slate-600">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                    <button 
                      onClick={handleAddressClick}
                      className="text-primary-burgundy hover:text-primary-burgundy-hover font-medium transition-colors block"
                    >
                      2300 Woodforest Pkwy N<br />
                      Ste 250-442<br />
                      Montgomery, TX 77316
                    </button>
                    <p className="text-sm text-slate-600">Click for directions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <div className="text-slate-700">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Start Options */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Start Options</h3>
                <div className="space-y-3">
                  <a 
                    href="/custom-build-wizard" 
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-burgundy transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary-burgundy rounded-lg flex items-center justify-center group-hover:bg-primary-burgundy-hover transition-colors">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Custom Build Wizard</div>
                      <div className="text-sm text-slate-600">Start planning your custom home</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-burgundy ml-auto transition-colors" />
                  </a>
                  
                  <a 
                    href="/remodeling-wizard" 
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-burgundy transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary-burgundy rounded-lg flex items-center justify-center group-hover:bg-primary-burgundy-hover transition-colors">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Remodeling Wizard</div>
                      <div className="text-sm text-slate-600">Plan your renovation project</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-burgundy ml-auto transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="section-badge justify-center">
              <MapPin className="badge-icon" />
              <span className="badge-text">Service Areas</span>
            </div>
            <h2 className="section-title section-title-light">
              Proudly Serving
              <span className="title-accent"> Greater Houston</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              We bring our luxury home building and renovation expertise to communities 
              throughout the Houston metropolitan area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="service-area">Houston</div>
            <div className="service-area">Katy</div>
            <div className="service-area">Cypress</div>
            <div className="service-area">The Woodlands</div>
            <div className="service-area">Spring</div>
            <div className="service-area">Sugar Land</div>
            <div className="service-area">Richmond</div>
            <div className="service-area">Fulshear</div>
            <div className="service-area">Tomball</div>
            <div className="service-area">Conroe</div>
            <div className="service-area">Pearland</div>
            <div className="service-area-plus">& Surrounding Areas</div>
          </div>
        </div>
      </section>
    </div>
  );
}