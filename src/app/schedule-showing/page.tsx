'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ScheduleShowingContent() {
  const searchParams = useSearchParams();
  const propertyTitle = searchParams?.get('property') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: propertyTitle,
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/schedule-showing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit showing request');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        'There was an error submitting your showing request. Please try again or call us directly at (281) 220-9087.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          minHeight: '100vh'
        }}
      >
        <div 
          className="max-w-lg mx-auto text-center"
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '48px',
            border: '1px solid #f1f5f9'
          }}
        >
          <div 
            className="mx-auto mb-8"
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>
            Thank You!
          </h2>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6' }}>
            We've received your request to schedule a showing. Our luxury home specialists will contact you within 24 hours to confirm your private appointment.
          </p>
          <Link
            href="/inventory"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
          >
            Explore More Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
      }}
    >
      {/* Hero Section */}
      <section style={{ padding: '80px 0 128px 0' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '24px',
                lineHeight: '1.1'
              }}
            >
              Schedule a Private{' '}
              <span style={{ display: 'block', color: '#8B1538' }}>Showing</span>
            </h1>
            <p 
              style={{
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                color: '#64748b',
                lineHeight: '1.6'
              }}
            >
              Experience luxury in person. Schedule your exclusive private tour with our home specialists.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={handleSubmit} 
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '48px',
                border: '1px solid #f1f5f9'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    required
                    value={formData.name}
                    onChange={handleChange}
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
                    placeholder="Your full name"
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
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    placeholder="your@email.com"
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
                    required
                    value={formData.phone}
                    onChange={handleChange}
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

                <div>
                  <label 
                    htmlFor="property" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}
                  >
                    Property of Interest
                  </label>
                  <input
                    type="text"
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
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
                    placeholder="Property address or name"
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
                    htmlFor="preferredDate" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
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
                    min={new Date().toISOString().split('T')[0]}
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
                    htmlFor="preferredTime" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}
                  >
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
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
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
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
                  Additional Comments
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
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
                  placeholder="Any specific questions or requirements for your showing..."
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
                ></textarea>
              </div>

              <div style={{ marginTop: '40px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting 
                      ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' 
                      : 'linear-gradient(135deg, #8B1538 0%, #a21650 100%)',
                    color: 'white',
                    padding: '20px 32px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
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
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scheduling Your Showing...
                    </>
                  ) : (
                    'Schedule My Private Showing'
                  )}
                </button>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }}>
                  By submitting this form, you agree to be contacted by our luxury home specialists regarding your showing request.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ScheduleShowingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleShowingContent />
    </Suspense>
  );
}