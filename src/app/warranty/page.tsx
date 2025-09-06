'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Download, Clock, FileText, Home, Wrench, Zap } from 'lucide-react';

export default function WarrantyPage() {
  return (
    <div className="page-content overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-half">
        <div className="hero-background">
          <div className="hero-overlay" />
          <Image
            src="/custom-home-exterior.jpg"
            alt="Home Warranty - Vanguard Builders"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Home
            <span className="hero-title-accent">
              Warranty
            </span>
          </h1>
          <p className="hero-subtitle">
            Comprehensive protection for your luxury home investment
          </p>
        </div>
      </section>

      {/* Warranty Overview Section */}
      <section className="py-24 overflow-x-hidden" style={{ marginTop: '20px !important', paddingTop: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <div className="section-badge justify-center mb-8">
              <Shield className="badge-icon" />
              <span className="badge-text">Protected Investment</span>
            </div>
            
            <div className="text-center mb-20">
              <h2 className="section-title">
                TAB Express Limited
                <span className="title-accent"> Home Warranty</span>
              </h2>
              <p className="text-slate-600 text-lg">
                Texas Association of Builders B-14 Standard • Effective September 2023
              </p>
            </div>

            {/* Warranty Periods */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1 Year</h3>
                <p className="text-slate-600">Workmanship & Materials</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2 Years</h3>
                <p className="text-slate-600">Plumbing, Electrical, HVAC Systems</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-primary-burgundy" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">6 Years</h3>
                <p className="text-slate-600">Major Structural Components</p>
              </div>
            </div>

            {/* Coverage Overview */}
            <div className="bg-slate-50 rounded-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Comprehensive Coverage</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Structural & Exterior</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Foundation and concrete work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Framing, drywall, and insulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Exterior siding and roofing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Masonry and stucco work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Doors, windows, and hardware</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Interior & Systems</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Interior flooring and finishes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Plumbing fixtures and systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">HVAC systems and ductwork</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Electrical systems and fixtures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-burgundy rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">Interior trim and cabinetry</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Important Warranty Information</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">✓ Warranty Benefits</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Transferable to subsequent homeowners</li>
                    <li>• Builder repairs, replaces, or reimburses costs</li>
                    <li>• Covers construction defects and performance standards</li>
                    <li>• Professional dispute resolution process</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">⚠ Important Notes</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• $50 inspection fee applies to all warranty calls</li>
                    <li>• Homeowner maintenance responsibilities required</li>
                    <li>• Excludes damage from extreme weather or negligence</li>
                    <li>• Normal wear and tear not covered</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="text-center bg-primary-burgundy/5 rounded-lg p-8">
              <div className="w-20 h-20 bg-primary-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary-burgundy" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Complete Warranty Document</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Download the full TAB B-14 Express Limited Home Warranty document for complete terms, 
                conditions, and detailed performance standards.
              </p>
              
              <a 
                href="/B-14 Express Limited Home Warranty.pdf" 
                download="Vanguard-Builders-Home-Warranty.pdf"
                className="hero-cta-primary inline-flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Full Warranty (PDF)
              </a>
              
              <p className="text-sm text-slate-500 mt-4">
                35 pages • Texas Association of Builders Standard B-14
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-white mt-40 mb-40 overflow-x-hidden" style={{ marginTop: '60px !important', marginBottom: '60px !important', paddingTop: '60px !important', paddingBottom: '60px !important' }}>
        <div className="container max-w-full px-4">
          <div className="text-center max-w-3xl mx-auto overflow-x-hidden">
            <div className="section-badge justify-center mb-8" style={{ marginTop: '24px !important' }}>
              <Shield className="badge-icon" />
              <span className="badge-text">Warranty Support</span>
            </div>
            <h2 className="section-title">
              Warranty
              <span className="title-accent"> Questions?</span>
            </h2>
            <p className="section-subtitle mb-8">
              Our team is here to help with any warranty-related questions or to assist 
              with warranty claims and service requests.
            </p>
            <a href="/contact" className="hero-cta-primary">
              Contact Our Team
              <Zap className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}