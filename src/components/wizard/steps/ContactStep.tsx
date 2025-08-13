'use client';

import React, { useEffect } from 'react';
import { StepProps } from '@/types/wizard';
import { TIMELINE_OPTIONS } from '@/constants/wizard';
import OptionCard from '../OptionCard';

interface ContactData {
  timeline: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone';
    message: string;
  };
}

export default function ContactStep({ 
  data, 
  updateData, 
  onNext, 
  onBack, 
  isValid, 
  errors 
}: StepProps) {
  const currentData = data as ContactData;

  useEffect(() => {
    // Validation logic
    const newErrors: Record<string, string> = {};
    
    if (!currentData.timeline) {
      newErrors.timeline = 'Please select your preferred timeline';
    }
    
    if (!currentData.contactInfo?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!currentData.contactInfo?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!currentData.contactInfo?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(currentData.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!currentData.contactInfo?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(currentData.contactInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Set errors (this would typically be handled by the parent)
  }, [currentData]);

  const handleTimelineSelect = (timelineId: string) => {
    updateData({ timeline: timelineId });
  };

  const handleContactInfoUpdate = (field: string, value: string) => {
    updateData({
      contactInfo: {
        ...currentData.contactInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="wizard-step">
      <div className="wizard-step-header">
        <h2 className="wizard-step-title">Timeline & Contact Information</h2>
        <p className="wizard-step-description">
          When would you like to start your project, and how can we reach you?
        </p>
      </div>

      <div className="wizard-step-content">
        {/* Timeline Selection */}
        <div className="wizard-section">
          <h3 className="wizard-section-title">Project Timeline</h3>
          <div className="option-grid option-grid-2">
            {TIMELINE_OPTIONS.map((timeline) => (
              <OptionCard
                key={timeline.id}
                option={timeline}
                selected={currentData.timeline === timeline.id}
                onSelect={() => handleTimelineSelect(timeline.id)}
              />
            ))}
          </div>
          {errors.timeline && (
            <div className="wizard-error">{errors.timeline}</div>
          )}
        </div>

        {/* Contact Information Form */}
        <div className="wizard-section">
          <h3 className="wizard-section-title">Contact Information</h3>
          <div className="wizard-form">
            <div className="wizard-form-row">
              <div className="wizard-form-group">
                <label className="wizard-label" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`wizard-input ${errors.firstName ? 'wizard-input-error' : ''}`}
                  value={currentData.contactInfo?.firstName || ''}
                  onChange={(e) => handleContactInfoUpdate('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <div className="wizard-field-error">{errors.firstName}</div>
                )}
              </div>

              <div className="wizard-form-group">
                <label className="wizard-label" htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`wizard-input ${errors.lastName ? 'wizard-input-error' : ''}`}
                  value={currentData.contactInfo?.lastName || ''}
                  onChange={(e) => handleContactInfoUpdate('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <div className="wizard-field-error">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="wizard-form-row">
              <div className="wizard-form-group">
                <label className="wizard-label" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className={`wizard-input ${errors.email ? 'wizard-input-error' : ''}`}
                  value={currentData.contactInfo?.email || ''}
                  onChange={(e) => handleContactInfoUpdate('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <div className="wizard-field-error">{errors.email}</div>
                )}
              </div>

              <div className="wizard-form-group">
                <label className="wizard-label" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`wizard-input ${errors.phone ? 'wizard-input-error' : ''}`}
                  value={currentData.contactInfo?.phone || ''}
                  onChange={(e) => handleContactInfoUpdate('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <div className="wizard-field-error">{errors.phone}</div>
                )}
              </div>
            </div>

            <div className="wizard-form-group">
              <label className="wizard-label">Preferred Contact Method</label>
              <div className="wizard-radio-group">
                <label className="wizard-radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={currentData.contactInfo?.preferredContact === 'email'}
                    onChange={(e) => handleContactInfoUpdate('preferredContact', e.target.value)}
                    className="wizard-radio"
                  />
                  Email
                </label>
                <label className="wizard-radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={currentData.contactInfo?.preferredContact === 'phone'}
                    onChange={(e) => handleContactInfoUpdate('preferredContact', e.target.value)}
                    className="wizard-radio"
                  />
                  Phone
                </label>
              </div>
            </div>

            <div className="wizard-form-group">
              <label className="wizard-label" htmlFor="message">
                Additional Comments or Questions
              </label>
              <textarea
                id="message"
                rows={4}
                className="wizard-textarea"
                value={currentData.contactInfo?.message || ''}
                onChange={(e) => handleContactInfoUpdate('message', e.target.value)}
                placeholder="Tell us more about your project vision, specific requirements, or any questions you have..."
              />
            </div>

            {/* Honeypot fields - hidden from view but accessible to screen readers */}
            <div className="honeypot-field">
              <label htmlFor="website">
                Website (please leave empty)
              </label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={(currentData.contactInfo as any)?.website || ''}
                onChange={(e) => handleContactInfoUpdate('website', e.target.value)}
              />
            </div>

            <div className="honeypot-field">
              <label htmlFor="company">
                Company (please leave empty)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={(currentData.contactInfo as any)?.company || ''}
                onChange={(e) => handleContactInfoUpdate('company', e.target.value)}
              />
            </div>

            <div className="honeypot-field">
              <label htmlFor="referral_source">
                How did you hear about us? (please leave empty)
              </label>
              <input
                type="text"
                id="referral_source"
                name="referral_source"
                tabIndex={-1}
                autoComplete="off"
                value={(currentData.contactInfo as any)?.referral_source || ''}
                onChange={(e) => handleContactInfoUpdate('referral_source', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}