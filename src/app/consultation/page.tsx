'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageSquare, Home, Wrench } from 'lucide-react';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      const response = await fetch('/api/consultation', {
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
          projectType: '',
          timeline: '',
          budget: '',
          message: ''
        });
      } else {
        setSubmitError(result.error || 'An error occurred while submitting your request.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Unable to submit your request. Please try again or call us directly at (281) 220-9087.');
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
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {/* Hero Section - Half Height */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/luxury-shower.jpg"
            alt="Contact Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Free
            <span className="hero-title-accent">
              Consultation
            </span>
          </h1>
          <p className="hero-subtitle">
            Ready to start your luxury home or renovation project? Let's discuss your vision 
            and create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section section-white" style={{ paddingTop: '120px' }}>
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

              <form 
                onSubmit={handleSubmit} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  padding: '40px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div className="grid grid-cols-2 gap-6">
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
                    htmlFor="projectType" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}
                  >
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
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

                <div className="grid grid-cols-2 gap-6" style={{ marginTop: '24px' }}>
                  <div>
                    <label 
                      htmlFor="timeline" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '12px'
                      }}
                    >
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
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
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                      <option value="1-year">Within 1 year</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label 
                      htmlFor="budget" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '12px'
                      }}
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
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
                      <option value="">Select budget range</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-250k">$100K - $250K</option>
                      <option value="250k-500k">$250K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-plus">$1M+</option>
                    </select>
                  </div>
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
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
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
                    placeholder="Tell us about your project vision, specific requirements, or any questions you have..."
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
                    fontSize: '16px',
                    fontWeight: '600'
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
                    fontSize: '16px',
                    fontWeight: '600'
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
                    background: isSubmitting 
                      ? 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)'
                      : 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '20px 32px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight className="w-6 h-6" />}
                  {isSubmitting && (
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  )}
                </button>

                <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: '24px' }}>
                  We'll respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8" style={{ marginTop: '80px' }}>
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

              <div 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  padding: '32px',
                  border: '1px solid #f1f5f9',
                  marginBottom: '32px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 10px 25px -5px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <Phone className="w-7 h-7" style={{ color: 'white !important' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px', fontSize: '18px' }}>Phone</h3>
                      <button 
                        onClick={handlePhoneClick}
                        style={{
                          color: '#8B1538',
                          fontWeight: '600',
                          fontSize: '16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#a21650'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#8B1538'}
                      >
                        {phoneNumber}
                      </button>
                      <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Mon-Fri 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 10px 25px -5px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <Mail className="w-7 h-7" style={{ color: 'white !important' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px', fontSize: '18px' }}>Email</h3>
                      <button 
                        onClick={handleEmailClick}
                        style={{
                          border: 'none',
                          background: 'none',
                          padding: 0,
                          color: '#8B1538',
                          fontWeight: '600',
                          fontSize: '16px',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#a21650'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#8B1538'}
                      >
                        office@vanguardbuilders.com
                      </button>
                      <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>We respond within 24 hours</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 10px 25px -5px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <MapPin className="w-7 h-7" style={{ color: 'white !important' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px', fontSize: '18px' }}>Office</h3>
                      <button 
                        onClick={handleAddressClick}
                        style={{
                          color: '#8B1538',
                          fontWeight: '600',
                          fontSize: '16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          textAlign: 'left',
                          lineHeight: '1.5'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#a21650'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#8B1538'}
                      >
                        2300 Woodforest Pkwy N<br />
                        Ste 250-442<br />
                        Montgomery, TX 77316
                      </button>
                      <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Click for directions</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 10px 25px -5px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <Clock className="w-7 h-7" style={{ color: 'white !important' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px', fontSize: '18px' }}>Office Hours</h3>
                      <div style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: By appointment only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Start Options */}
              <div 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  padding: '32px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '24px', fontSize: '20px' }}>
                  Quick Start Options
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a 
                    href="/custom-build-wizard" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '16px',
                      border: '2px solid #e2e8f0',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8B1538';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 8px 20px -4px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <Home className="w-6 h-6" style={{ color: 'white !important' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px', marginBottom: '4px' }}>
                        Custom Build Wizard
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>
                        Start planning your custom home
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6" style={{ color: '#94a3b8', transition: 'color 0.3s ease' }} />
                  </a>
                  
                  <a 
                    href="/remodeling-wizard" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '16px',
                      border: '2px solid #e2e8f0',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8B1538';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 8px 20px -4px rgba(139, 21, 56, 0.3)'
                      }}
                    >
                      <Wrench className="w-6 h-6" style={{ color: 'white !important' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px', marginBottom: '4px' }}>
                        Start Remodeling
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>
                        Plan your renovation project
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6" style={{ color: '#94a3b8', transition: 'color 0.3s ease' }} />
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
              <span className="title-accent"> Northern Houston</span>
            </h2>
            <p className="section-subtitle section-subtitle-light">
              We bring our luxury home building and renovation expertise to communities 
              throughout the Northern Houston area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <div className="service-area-plus">& Surrounding Areas</div>
          </div>
        </div>
      </section>
    </div>
  );
}