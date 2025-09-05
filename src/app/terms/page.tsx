'use client';

import React from 'react';
import Image from 'next/image';
import { Scale, FileText, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="page-content overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Terms and Conditions - Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Terms &
            <span className="hero-title-accent">
              Conditions
            </span>
          </h1>
          <p className="hero-subtitle">
            Clear guidelines for using our luxury construction services
          </p>
        </div>
      </section>

      {/* Terms of Service Section */}
      <section className="py-24 overflow-x-hidden" style={{ marginTop: '20px !important', paddingTop: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <div className="section-badge justify-center mb-8">
              <Scale className="badge-icon" />
              <span className="badge-text">Legal Terms</span>
            </div>
            
            <div className="text-center mb-20">
              <h2 className="section-title">
                Terms & 
                <span className="title-accent"> Conditions</span>
              </h2>
              <p className="text-slate-600 text-lg">
                Effective Date: August 19, 2025
              </p>
            </div>

            {/* Document-style content */}
            <div className="bg-white w-full max-w-full overflow-x-hidden">
              <div className="w-full max-w-none overflow-x-hidden">
                
                {/* Introduction */}
                <div className="mb-16" style={{ marginBottom: '20px !important' }}>
                  <p className="text-slate-700 text-lg leading-relaxed max-w-full overflow-wrap-anywhere">
                    Welcome to Vanguard Builders, Inc.'s website ("Site"). By accessing or using this Site, you agree to comply with and be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use our Site.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="mb-12 pt-16 border-t-0" style={{ paddingTop: '10px !important' }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    1. Use of Website
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">The content on this Site is for informational purposes only regarding residential construction, remodeling, and custom home services offered by Vanguard Builders, Inc.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">You may not use this Site for any unlawful purpose or in a way that could damage our reputation or interfere with its operation.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">All content (including text, images, logos, and designs) is the property of Vanguard Builders, Inc. and may not be reproduced, distributed, or used without written consent.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    2. Estimates & Service Information
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">Any estimates, quotes, or information provided through this Site are non-binding until confirmed in writing by Vanguard Builders, Inc.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">Final costs, timelines, and specifications for construction or remodeling projects will be established in a signed agreement separate from this Site.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    3. No Warranties
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">While we strive to keep the information on this Site accurate, Vanguard Builders, Inc. makes no warranties or guarantees about the completeness, accuracy, or reliability of the content.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">Services described on the Site are subject to availability and may change without notice.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    4. Third-Party Links
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">This Site may contain links to third-party websites. We are not responsible for the content, policies, or practices of those sites.</p>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    5. Limitation of Liability
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">Vanguard Builders, Inc. shall not be held liable for any damages arising from use of this Site, including but not limited to direct, indirect, incidental, or consequential damages.</p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    6. Governing Law
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">These Terms shall be governed by and construed in accordance with the laws of the State of Texas. Any disputes shall be resolved exclusively in the state or federal courts located in Montgomery County, Texas.</p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="mb-20 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    7. Changes to Terms
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">We reserve the right to update or modify these Terms at any time. Updates will be posted on this page with a revised effective date.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white mt-40 mb-40 overflow-x-hidden" style={{ marginTop: '60px !important', marginBottom: '60px !important', paddingTop: '60px !important', paddingBottom: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="text-center max-w-3xl mx-auto overflow-x-hidden">
            <div className="section-badge justify-center mb-8" style={{ marginTop: '24px !important' }}>
              <FileText className="badge-icon" />
              <span className="badge-text">Questions?</span>
            </div>
            <h2 className="section-title">
              Need
              <span className="title-accent"> Legal Clarification?</span>
            </h2>
            <p className="section-subtitle mb-8">
              If you have any questions about these terms or our privacy practices, 
              we're here to help clarify and ensure your comfort with our policies.
            </p>
            <a href="/contact" className="hero-cta-primary">
              Contact Our Team
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}