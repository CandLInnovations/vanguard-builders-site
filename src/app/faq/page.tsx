'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Minus, HelpCircle } from 'lucide-react';
import { generateFAQPageSchema, renderJsonLd } from '@/lib/structured-data';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#D4AF37';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      <button
        style={{
          width: '100%',
          padding: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #f8fafc, #f1f5f9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b',
          paddingRight: '24px',
          fontFamily: 'var(--font-bodoni-moda-sc), serif',
          lineHeight: '1.6',
          margin: 0
        }}>
          {question}
        </h3>
        <div 
          style={{
            flexShrink: 0,
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            background: isOpen 
              ? 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)' 
              : '#f1f5f9',
            color: isOpen ? 'white' : '#8B1538',
            boxShadow: isOpen ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
          }}
        >
          {isOpen ? (
            <Minus style={{ width: '24px', height: '24px' }} />
          ) : (
            <Plus style={{ width: '24px', height: '24px' }} />
          )}
        </div>
      </button>
      {isOpen && (
        <div style={{
          padding: '0 32px 32px 32px',
          color: '#64748b',
          lineHeight: '1.8',
          fontSize: '18px',
          borderTop: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <div style={{ paddingTop: '24px' }} dangerouslySetInnerHTML={{ __html: answer }}>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const customHomeFAQs = [
    {
      question: "How long does it take to build a custom home?",
      answer: "Custom home construction typically takes 8-12 months from groundbreaking to completion, depending on the size and complexity of the design. This includes 2-4 months for design and permitting, followed by 6-8 months of construction. <em>Please note that timelines may be affected by factors outside our control, including utility company schedules, municipal inspections and approvals, and weather conditions. We work diligently to minimize delays and will keep you informed throughout the process.</em>"
    },
    {
      question: "What is the typical cost per square foot for a custom home?",
      answer: "Our custom homes typically range from $425-$475+ per square foot, depending on the level of finishes, architectural complexity, and site conditions. We provide detailed estimates during the design phase to ensure transparency."
    },
    {
      question: "Do you build on our lot or do we need to find land?",
      answer: "We build on both client-owned lots and can help you find the perfect lot for your custom home. We have relationships with land developers and real estate professionals throughout the Houston area."
    },
    {
      question: "Can we make changes during construction?",
      answer: "Yes, changes can be made during construction, though they may impact timeline and budget. We encourage finalizing major decisions during the design phase, but we understand that adjustments are sometimes necessary."
    },
    {
      question: "Do you handle permits and inspections?",
      answer: "Absolutely. We handle all permits, inspections, and regulatory requirements. Our team is familiar with local building codes and maintains relationships with municipal offices throughout our service areas."
    }
  ];

  const renovationFAQs = [
    {
      question: "How long do renovation projects typically take?",
      answer: "Project timelines vary by scope: bathroom renovations typically take 3-5 weeks, kitchen remodels 6-10 weeks, and whole-home renovations 3-6 months. We provide detailed schedules during planning."
    },
    {
      question: "Can we live in our home during renovation?",
      answer: "This depends on the scope of work. For single-room renovations, you can usually remain in your home. For major renovations affecting kitchens or multiple bathrooms, temporary relocation might be more comfortable."
    },
    {
      question: "How do you protect our belongings during construction?",
      answer: "We use plastic sheeting, temporary walls, and protective coverings to isolate work areas. We also provide guidance on what items should be temporarily relocated for their protection."
    },
    {
      question: "Do renovation costs include permits and inspections?",
      answer: "Yes, our renovation estimates include all necessary permits and inspections. We handle all regulatory requirements and coordinate with local authorities throughout the project."
    },
    {
      question: "What if we discover unexpected issues during renovation?",
      answer: "We conduct thorough assessments before beginning work, but sometimes hidden issues are discovered. We immediately discuss any findings with you and provide options for addressing them before proceeding."
    }
  ];

  const generalFAQs = [
    {
      question: "Are you licensed and insured?",
      answer: "Yes, Vanguard Builders is fully licensed, bonded, and insured. We maintain all required Texas contractor licenses and comprehensive liability insurance for your protection."
    },
    {
      question: "Do you provide warranties on your work?",
      answer: "We provide comprehensive warranties on all our work, including a 10-year structural warranty on custom homes and material/workmanship warranties on renovations. Specific warranty terms are detailed in your contract."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve the greater Houston metropolitan area, including Houston, Katy, Cypress, The Woodlands, Spring, Sugar Land, Richmond, Fulshear, Tomball, Conroe, and surrounding communities."
    },
    {
      question: "How do you price your projects?",
      answer: "We provide transparent, detailed estimates based on your specific requirements. Custom homes are typically priced per square foot plus site-specific costs. Renovations are priced based on scope, materials, and labor requirements."
    },
    {
      question: "What sets Vanguard Builders apart from other contractors?",
      answer: "Our commitment to transparency, quality craftsmanship, and personalized service sets us apart. We focus exclusively on luxury construction and renovation, allowing us to deliver exceptional results that exceed expectations."
    },
    {
      question: "Do you offer financing options?",
      answer: "We work with several lending partners who specialize in construction and renovation financing. We can provide referrals and help coordinate the financing process for qualified clients."
    }
  ];

  // Combine all FAQs for structured data
  const allFAQs = [...customHomeFAQs, ...renovationFAQs, ...generalFAQs];

  // Strip HTML tags for schema (Google requires plain text)
  const faqsForSchema = allFAQs.map(faq => ({
    question: faq.question,
    answer: faq.answer.replace(/<[^>]*>/g, ''),
  }));

  const faqSchema = generateFAQPageSchema(faqsForSchema);

  return (
    <div className="page-content">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(faqSchema)}
      />

      {/* Hero Section - Half Height */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/outdoor-kitchen.jpg"
            alt="Frequently Asked Questions"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Frequently Asked
            <span className="hero-title-accent">
              Questions
            </span>
          </h1>
          <p className="hero-subtitle">
            Find answers to common questions about our custom home construction 
            and luxury renovation services.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section section-white">
        <div className="container">
          {/* Custom Homes FAQ */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-16">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">Custom Homes</span>
              </div>
              <h2 className="section-title">
                Custom Home
                <span className="title-accent"> Questions</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Everything you need to know about building your luxury custom home with Vanguard Builders.
              </p>
            </div>
            
            <div className="space-y-0">
              {customHomeFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Renovations FAQ */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-16">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">Renovations</span>
              </div>
              <h2 className="section-title">
                Renovation
                <span className="title-accent"> Questions</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Common questions about luxury home renovations and remodeling projects.
              </p>
            </div>
            
            <div className="space-y-0">
              {renovationFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* General FAQ */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">General</span>
              </div>
              <h2 className="section-title">
                General
                <span className="title-accent"> Questions</span>
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                General information about working with Vanguard Builders and our services.
              </p>
            </div>
            
            <div className="space-y-0">
              {generalFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title section-title-light">
              Still Have
              <span className="title-accent"> Questions?</span>
            </h2>
            <p className="section-subtitle section-subtitle-light mb-12">
              Our team is here to help. Contact us for personalized answers to your 
              specific project questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contact" className="section-button-accent">
                Contact Us Today
                <ArrowRight className="button-icon" />
              </a>
              <a href="/custom-build-wizard" className="hero-cta-secondary">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}