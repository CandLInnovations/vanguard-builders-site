'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full py-8 flex justify-between items-center text-left hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-25 px-8 -mx-8 rounded-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-slate-900 pr-6 font-display">{question}</h3>
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full transition-all duration-300 hover:bg-primary-burgundy hover:text-white">
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary-burgundy" />
          ) : (
            <Plus className="w-5 h-5 text-primary-burgundy" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pb-8 px-8 -mx-8 text-slate-600 leading-relaxed text-lg">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const customHomeFAQs = [
    {
      question: "How long does it take to build a custom home?",
      answer: "Custom home construction typically takes 8-12 months from groundbreaking to completion, depending on the size and complexity of the design. This includes 2-4 months for design and permitting, followed by 6-8 months of construction."
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

  return (
    <div className="page-content">
      {/* Hero Section - Half Height */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom2.jpg"
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
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">Custom Homes</span>
              </div>
              <h2 className="section-title">
                Custom Home
                <span className="title-accent"> Questions</span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 p-12">
              <div className="space-y-0">
                {customHomeFAQs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>

          {/* Renovations FAQ */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">Renovations</span>
              </div>
              <h2 className="section-title">
                Renovation
                <span className="title-accent"> Questions</span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 p-12">
              <div className="space-y-0">
                {renovationFAQs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>

          {/* General FAQ */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="section-badge justify-center">
                <HelpCircle className="badge-icon" />
                <span className="badge-text">General</span>
              </div>
              <h2 className="section-title">
                General
                <span className="title-accent"> Questions</span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 p-12">
              <div className="space-y-0">
                {generalFAQs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
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