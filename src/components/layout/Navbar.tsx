'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Obfuscated phone number
  const phoneNumber = "512-555-0123"; // Replace with actual number
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
          {/* Left - Primary Navigation */}
          <div className="nav-left">
            <a href="/custom-homes" className="nav-link">
              Custom Homes
            </a>
            <a href="/renovations" className="nav-link">
              Renovations
            </a>
            <a href="/portfolio" className="nav-link">
              Portfolio
            </a>
          </div>

          {/* Center - Logo */}
          <div className="logo">
            <img 
              src="/logo.png" 
              alt="Vanguard Builders" 
              className="logo-image"
            />
          </div>

          {/* Right - Secondary Navigation */}
          <div className="nav-right">
            {/* More Dropdown */}
            <div className="nav-dropdown">
              <button className="dropdown-trigger">
                More
                <svg className="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="/about" className="dropdown-link">About Us</a>
                <a href="/faq" className="dropdown-link">FAQ</a>
                <a href="/blog" className="dropdown-link">Blog</a>
                <a href="/contact" className="dropdown-link">Contact</a>
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

            {/* CTA Button */}
            <button className="cta-button">
              Start Your Vision
            </button>
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
            <a href="/custom-homes" className="mobile-nav-link">
              Custom Homes
            </a>
            <a href="/renovations" className="mobile-nav-link">
              Renovations
            </a>
            <a href="/portfolio" className="mobile-nav-link">
              Portfolio
            </a>
            <button 
              onClick={handlePhoneClick}
              className="mobile-phone-button"
            >
              <Phone className="phone-icon" />
              Call Us
            </button>
            <hr className="mobile-divider" />
            <a href="/about" className="mobile-nav-link-secondary">
              About Us
            </a>
            <a href="/faq" className="mobile-nav-link-secondary">
              FAQ
            </a>
            <a href="/blog" className="mobile-nav-link-secondary">
              Blog
            </a>
            <a href="/contact" className="mobile-nav-link-secondary">
              Contact
            </a>
            <button className="mobile-cta-button">
              Start Your Vision
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;