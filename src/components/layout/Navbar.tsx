'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useInventory } from '@/hooks/useInventory';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCtaOpen, setMobileCtaOpen] = useState(false);
  const { hasAvailableHomes, loading } = useInventory();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Obfuscated phone number
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

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Left - Logo */}
          <div className="logo">
            <Link href="/">
              <Image
    src="/vanguard-builders-text-logo.png"
    alt="Vanguard Builders"
    className="logo-image"
    width={312}
    height={235}
    priority
  />
            </Link>
          </div>

          {/* Right - All Navigation */}
          <div className="nav-right">
            <Link href="/custom-homes" className="nav-link">
              Custom Homes
            </Link>
            {!loading && hasAvailableHomes && (
              <Link href="/inventory" className="nav-link">
                Available Homes
              </Link>
            )}
            <Link href="/portfolio" className="nav-link">
              Portfolio
            </Link>
            <Link href="/renovations" className="nav-link">
              Renovations
            </Link>
            {/* More Dropdown */}
            <div className="nav-dropdown">
              <button className="dropdown-trigger">
                More
                <svg className="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="dropdown-menu">
                <Link href="/about" className="dropdown-link">About Us</Link>
                <Link href="/faq" className="dropdown-link">FAQ</Link>
                <Link href="/blog" className="dropdown-link">Blog</Link>
                <Link href="/contact" className="dropdown-link">Contact</Link>
              </div>
            </div>

            {/* Phone */}
            <button 
              onClick={handlePhoneClick}
              className="nav-phone"
            >
              <Phone className="phone-icon" />
              Call Us
            </button>

            {/* CTA Dropdown */}
            <div className="nav-dropdown cta-dropdown">
              <button className="cta-button cta-dropdown-trigger">
                Start Your Vision
              </button>
              <div className="dropdown-menu cta-dropdown-menu">
                <Link href="/custom-build-wizard" className="dropdown-link cta-dropdown-link">
                  <div className="cta-option">
                    <div className="cta-option-title">Custom Build</div>
                    <div className="cta-option-desc">Design your dream home</div>
                  </div>
                </Link>
                <Link href="/remodeling-wizard" className="dropdown-link cta-dropdown-link">
                  <div className="cta-option">
                    <div className="cta-option-title">Remodeling</div>
                    <div className="cta-option-desc">Transform your current home</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hamburger"
            >
              <div className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line-1-active' : ''}`} />
              <div className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line-2-active' : ''}`} />
              <div className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line-3-active' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <Link href="/custom-homes" className="mobile-nav-link">
              Custom Homes
            </Link>
            {!loading && hasAvailableHomes && (
              <Link href="/inventory" className="mobile-nav-link">
                Available Homes
              </Link>
            )}
            <Link href="/portfolio" className="mobile-nav-link">
              Portfolio
            </Link>
            <Link href="/renovations" className="mobile-nav-link">
              Renovations
            </Link>
            <button 
              onClick={handlePhoneClick}
              className="mobile-phone-button"
            >
              <Phone className="phone-icon" />
              Call Us
            </button>
            <hr className="mobile-divider" />
            <Link href="/about" className="mobile-nav-link-secondary">
              About Us
            </Link>
            <Link href="/faq" className="mobile-nav-link-secondary">
              FAQ
            </Link>
            <Link href="/blog" className="mobile-nav-link-secondary">
              Blog
            </Link>
            <Link href="/contact" className="mobile-nav-link-secondary">
              Contact
            </Link>
            
            {/* Mobile CTA Section */}
            <div className="mobile-cta-section">
              <button 
                onClick={() => setMobileCtaOpen(!mobileCtaOpen)}
                className="mobile-cta-button mobile-cta-toggle"
              >
                Start Your Vision
                <svg 
                  className={`dropdown-arrow ${mobileCtaOpen ? 'dropdown-arrow-open' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {mobileCtaOpen && (
                <div className="mobile-cta-options">
                  <Link href="/custom-build-wizard" className="mobile-cta-option">
                    <div className="mobile-cta-option-title">Custom Build</div>
                    <div className="mobile-cta-option-desc">Design your dream home</div>
                  </Link>
                  <Link href="/remodeling-wizard" className="mobile-cta-option">
                    <div className="mobile-cta-option-title">Remodeling</div>
                    <div className="mobile-cta-option-desc">Transform your current home</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;