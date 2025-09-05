'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Mail, FileText, Phone, MapPin } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="page-content overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/vanguard-builders-bathroom1.jpg"
            alt="Privacy Policy - Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Privacy
            <span className="hero-title-accent">
              Policy
            </span>
          </h1>
          <p className="hero-subtitle">
            Your privacy is important to us at Vanguard Builders, Inc.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-24 overflow-x-hidden" style={{ marginTop: '20px !important', paddingTop: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <div className="section-badge justify-center mb-8">
              <Shield className="badge-icon" />
              <span className="badge-text">Privacy Protection</span>
            </div>
            
            <div className="text-center mb-20">
              <h2 className="section-title">
                Privacy
                <span className="title-accent"> Policy</span>
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
                    Your privacy is important to us at Vanguard Builders, Inc. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="mb-12 pt-16 border-t-0" style={{ paddingTop: '10px !important' }}>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    1. Information We Collect
                  </h3>
                  <p className="text-slate-700 mb-4 max-w-full overflow-wrap-anywhere">
                    We may collect the following information when you use our Site:
                  </p>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">
                        <strong>Personal Information</strong> (such as name, email address, phone number) that you provide through contact forms or inquiries.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words max-w-full overflow-wrap-anywhere">
                        <strong>Non-Personal Information</strong> such as browser type, device information, and how you interact with our Site.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    2. How We Use Your Information
                  </h3>
                  <p className="text-slate-700 mb-4">
                    We may use the information we collect to:
                  </p>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Respond to inquiries about our services (construction, remodeling, and custom homes).</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Provide quotes or schedule consultations.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Improve our website's content and functionality.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Send occasional updates, promotions, or newsletters (only if you have opted in).</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    3. Sharing of Information
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">We do not sell, rent, or trade your personal information to third parties.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">We may share information with trusted service providers (such as IT or marketing support) who assist in operating our Site, provided they agree to keep your information confidential.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">We may disclose information if required by Texas law or to protect our rights and property.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    4. Cookies & Tracking
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Our Site may use cookies and similar technologies to improve user experience, track website performance, and gather analytics.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">You can adjust your browser settings to refuse cookies, but some features may not function properly.</p>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    5. Data Security
                  </h3>
                  <div className="ml-6 space-y-3">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">We use reasonable administrative, technical, and physical safeguards to protect your personal information.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">However, no online system can be guaranteed 100% secure, so we cannot ensure or warrant absolute security of information transmitted through the Site.</p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    6. Children's Privacy
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">Our Site is not directed to individuals under 13 years old, and we do not knowingly collect personal information from children.</p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="mb-12 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    7. Your Rights
                  </h3>
                  <p className="text-slate-700 mb-4">
                    You may request to access, correct, or delete your personal information by contacting us at:
                  </p>
                  
                  <div className="ml-6 space-y-2 mb-4 mt-4">
                    <p className="text-slate-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-burgundy" />
                      <a href={`mailto:${'office'}${'@'}${'vanguardbuilders'}${'.'}${'com'}`} className="text-primary-burgundy hover:underline">office@vanguardbuilders.com</a>
                    </p>
                    <p className="text-slate-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary-burgundy" />
                      <a href={`tel:${'281'}${'220'}${'9087'}`} className="text-primary-burgundy hover:underline">281-220-9087</a>
                    </p>
                    <p className="text-slate-700 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary-burgundy mt-0.5 flex-shrink-0" />
                      <span>
                        <a 
                          href="https://maps.apple.com/?q=Vanguard+Builders+Inc,2300+Woodforest+Pkwy+N,+Ste+250-442,+Montgomery,+TX+77316" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-burgundy hover:underline"
                          onClick={(e) => {
                            // Detect if user is on iOS/Mac for Apple Maps, otherwise use Google Maps
                            const isApple = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
                            const address = encodeURIComponent('Vanguard Builders Inc, 2300 Woodforest Pkwy N, Ste 250-442, Montgomery, TX 77316');
                            
                            if (isApple) {
                              window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
                            } else {
                              window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                            }
                            e.preventDefault();
                          }}
                        >
                          Vanguard Builders, Inc.<br />
                          2300 Woodforest Pkwy N, Ste 250-442<br />
                          Montgomery, TX 77316
                        </a>
                      </span>
                    </p>
                  </div>

                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">If you no longer wish to receive marketing emails, you may opt out using the unsubscribe link in our communications.</p>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="mb-20 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    8. Changes to this Privacy Policy
                  </h3>
                  <div className="ml-6">
                    <div className="flex gap-2">
                      <span className="text-slate-700 flex-shrink-0">•</span>
                      <p className="text-slate-700 break-words">We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.</p>
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
              Privacy
              <span className="title-accent"> Questions?</span>
            </h2>
            <p className="section-subtitle mb-8">
              If you have any questions about our privacy practices or would like to exercise your privacy rights, we're here to help.
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