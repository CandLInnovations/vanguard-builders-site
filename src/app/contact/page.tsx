'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, Home, Wrench, Calendar } from 'lucide-react';

export default function ContactPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitError(result.error || 'An error occurred while sending your message.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Unable to send your message. Please try again or call us directly at (281) 220-9087.');
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Hero Section */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/custom-home-exterior.jpg"
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
            Get in touch with our team to discuss your next luxury home project
          </p>
        </div>
      </section>

      {/* Contact Information & Map Section */}
      <section className="py-24 overflow-x-hidden" style={{ marginTop: '20px !important', paddingTop: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="max-w-6xl mx-auto overflow-x-hidden">
            
            {/* Contact Info Grid */}
            <div 
              className="mb-16"
              style={{
                display: 'grid !important',
                gap: '32px',
                gridTemplateColumns: isDesktop ? 'repeat(4, minmax(0, 1fr))' : 'repeat(1, minmax(0, 1fr))'
              }}
            >
              
              {/* Phone */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
                <button 
                  onClick={handlePhoneClick}
                  className="text-primary-burgundy font-semibold hover:text-primary-burgundy/80 transition-colors"
                  style={{ background: 'none', border: 'none', padding: '0', font: 'inherit', cursor: 'pointer' }}
                >
                  {phoneNumber}
                </button>
                <p className="text-slate-600 text-sm mt-1">Mon-Fri 8:00 AM - 6:00 PM</p>
              </div>

              {/* Email */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                <a 
                  href="mailto:office@vanguardbuilders.com"
                  className="text-primary-burgundy font-semibold hover:text-primary-burgundy/80 transition-colors"
                >
                  office@vanguardbuilders.com
                </a>
                <p className="text-slate-600 text-sm mt-1">We respond within 24 hours</p>
              </div>

              {/* Address */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Office</h3>
                <button 
                  onClick={handleAddressClick}
                  className="text-primary-burgundy font-semibold hover:text-primary-burgundy/80 transition-colors text-center"
                  style={{ background: 'none', border: 'none', padding: '0', font: 'inherit', cursor: 'pointer' }}
                >
                  2300 Woodforest Pkwy N<br />
                  Ste 250-442<br />
                  Montgomery, TX 77316
                </button>
                <p className="text-slate-600 text-sm mt-1">Click for directions</p>
              </div>

              {/* Hours */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Office Hours</h3>
                <div className="text-slate-700 text-sm">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="mb-16">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Send Us a Message</h2>
                <p className="text-lg text-slate-600">
                  Have a question about our services? Send us a message and we'll get back to you within 24 hours.
                </p>
              </div>

              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <form 
                  onSubmit={handleSubmit} 
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    padding: '48px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '24px' 
                  }}>
                    <div>
                      <label 
                        htmlFor="name" 
                        style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#1e293b',
                          marginBottom: '12px'
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px 24px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          backgroundColor: '#f8fafc',
                          fontSize: '16px',
                          color: '#1e293b',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="Your name"
                        onFocus={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = '#8B1538';
                          e.target.style.boxShadow = '0 0 0 3px rgba(139, 21, 56, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="phone" 
                        style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#1e293b',
                          marginBottom: '12px'
                        }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px 24px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          backgroundColor: '#f8fafc',
                          fontSize: '16px',
                          color: '#1e293b',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="(555) 123-4567"
                        onFocus={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = '#8B1538';
                          e.target.style.boxShadow = '0 0 0 3px rgba(139, 21, 56, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <label 
                      htmlFor="email" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '12px'
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px 24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        fontSize: '16px',
                        color: '#1e293b',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      placeholder="your.email@example.com"
                      onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#8B1538';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 21, 56, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <label 
                      htmlFor="subject" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '12px'
                      }}
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px 24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        fontSize: '16px',
                        color: '#1e293b',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#8B1538';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 21, 56, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Home">Custom Home</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Kitchen Remodel">Kitchen Remodel</option>
                      <option value="Bathroom Remodel">Bathroom Remodel</option>
                      <option value="Home Addition">Home Addition</option>
                      <option value="Schedule Consultation">Schedule Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <label 
                      htmlFor="message" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '12px'
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px 24px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        fontSize: '16px',
                        color: '#1e293b',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Tell us about your project or ask any questions you have..."
                      onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#8B1538';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 21, 56, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Success/Error Messages */}
                  {submitMessage && (
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '12px',
                      color: '#166534',
                      fontWeight: '500'
                    }}>
                      {submitMessage}
                    </div>
                  )}

                  {submitError && (
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '12px',
                      color: '#dc2626',
                      fontWeight: '500'
                    }}>
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      marginTop: '32px',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      backgroundColor: isSubmitting ? '#94a3b8' : '#8B1538',
                      fontSize: '16px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#7a1231';
                        (e.target as HTMLButtonElement).style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#8B1538';
                        (e.target as HTMLButtonElement).style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    {isSubmitting && (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                    )}
                  </button>

                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    textAlign: 'center',
                    marginTop: '16px'
                  }}>
                    We'll respond within 24 hours. For urgent matters, please call us directly.
                  </p>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                marginBottom: '64px'
              }}>
                <div style={{
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => {
                      const address = "2300 Woodforest Pkwy N, Ste 250-442, Montgomery, TX 77316";
                      const encodedAddress = encodeURIComponent(address);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      color: '#1e293b',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#8B1538';
                      (e.target as HTMLButtonElement).style.color = '#8B1538';
                      (e.target as HTMLButtonElement).style.backgroundColor = '#fef7f7';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(139, 21, 56, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#e2e8f0';
                      (e.target as HTMLButtonElement).style.color = '#1e293b';
                      (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.target as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                  >
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    Open in Google Maps
                  </button>
                  <button
                    onClick={() => {
                      const address = "2300 Woodforest Pkwy N, Ste 250-442, Montgomery, TX 77316";
                      const encodedAddress = encodeURIComponent(address);
                      window.open(`https://maps.apple.com/?address=${encodedAddress}`, '_blank');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      color: '#1e293b',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#8B1538';
                      (e.target as HTMLButtonElement).style.color = '#8B1538';
                      (e.target as HTMLButtonElement).style.backgroundColor = '#fef7f7';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(139, 21, 56, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#e2e8f0';
                      (e.target as HTMLButtonElement).style.color = '#1e293b';
                      (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.target as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                  >
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    Open in Apple Maps
                  </button>
                </div>
                <div style={{ aspectRatio: '16/10', width: '100%' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8234567890123!2d-95.4567890123456!3d30.2345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8c123456789%3A0x1234567890abcdef!2s2300%20Woodforest%20Pkwy%20N%2C%20Montgomery%2C%20TX%2077316!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%" 
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vanguard Builders Office Location"
                  />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Schedule Consultation */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Schedule Consultation</h3>
                <p className="text-slate-600 mb-6">
                  Ready to discuss your project? Schedule a free consultation with our team.
                </p>
                <a href="/consultation" className="hero-cta-primary inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Custom Homes */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Custom Home Builder</h3>
                <p className="text-slate-600 mb-6">
                  Build your dream luxury home with our custom home construction services.
                </p>
                <a href="/custom-build-wizard" className="hero-cta-secondary inline-flex items-center gap-2">
                  Start Planning
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Renovations */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wrench className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Home Renovations</h3>
                <p className="text-slate-600 mb-6">
                  Transform your existing home with our luxury renovation services.
                </p>
                <a href="/remodeling-wizard" className="hero-cta-secondary inline-flex items-center gap-2">
                  Explore Options
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-slate-900 text-white" style={{ marginTop: '80px !important' }}>
        <div className="container max-w-full px-4">
          <div className="text-center max-w-4xl mx-auto" style={{ marginBottom: '24px !important' }}>
            <div className="section-badge justify-center" style={{ marginBottom: '24px !important' }}>
              <MapPin className="badge-icon" />
              <span className="badge-text">Service Areas</span>
            </div>
            <h2 className="section-title section-title-light">
              Proudly Serving
              <span className="title-accent"> Northern Houston</span>
            </h2>
            <p className="section-subtitle section-subtitle-light" style={{ color: '#1e293b !important', marginBottom: '20px !important', fontSize: '18px !important', fontWeight: '600 !important', backgroundColor: 'rgba(255, 255, 255, 0.9) !important', padding: '16px 24px !important', borderRadius: '8px !important', display: 'inline-block !important' }}>
              We bring our luxury home building and renovation expertise to communities 
              throughout the Northern Houston area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <div className="service-area">North Houston</div>
            <div className="service-area">Spring</div>
            <div className="service-area">Cypress</div>
            <div className="service-area">The Woodlands</div>
            <div className="service-area">Tomball</div>
            <div className="service-area">Conroe</div>
            <div className="service-area">Montgomery</div>
            <div className="service-area">Willis</div>
            <div className="service-area">Kingwood</div>
            <div className="service-area">Huntsville</div>
            <div className="service-area-plus" style={{ marginBottom: '40px !important' }}>& Surrounding Areas</div>
          </div>
        </div>
      </section>
    </div>
  );
}