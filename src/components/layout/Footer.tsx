'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    
    // Detect user's device/browser preference
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMac = /Macintosh/.test(navigator.userAgent);
    
    if (isIOS || isMac) {
      // Prefer Apple Maps on iOS/Mac
      window.open(`https://maps.apple.com/?address=${encodedAddress}`, '_blank');
    } else {
      // Use Google Maps on other devices
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Left - Company Info */}
            <div className="footer-company">
              <h2 className="footer-company-name" style={{ fontFamily: 'var(--font-bodoni-moda-sc), serif' }}>Vanguard Builders, Inc.</h2>
              <p className="footer-tagline">Crafting luxury homes with uncompromising attention to detail</p>
              <div className="footer-contact">
                <div className="contact-item">
                  <button 
                    onClick={handleAddressClick}
                    className="contact-address"
                  >
                    <MapPin className="contact-icon" />
                    <div className="contact-text">
                      <p>2300 Woodforest Pkwy N</p>
                      <p>Ste 250-442, Montgomery, TX 77316</p>
                    </div>
                  </button>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <button 
                    onClick={handlePhoneClick}
                    className="contact-phone"
                  >
                    {phoneNumber}
                  </button>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <button 
                    onClick={handleEmailClick}
                    className="contact-email"
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer',
                      textDecoration: 'inherit',
                      color: 'inherit'
                    }}
                  >
                    office@vanguardbuilders.com
                  </button>
                </div>
              </div>
              <div className="footer-icons">
                <div className="footer-icon" title="Equal Opportunity Housing">
                  <Image 
                    src="/equal-housing-opportunity.png" 
                    alt="Equal Opportunity Housing" 
                    width={28}
                    height={28}
                    className="accessibility-icon"
                  />
                </div>
                <div className="footer-icon" title="Accessibility Compliance">
                  <Image 
                    src="/accessibility-icon.png" 
                    alt="Accessibility Compliance" 
                    width={28}
                    height={28}
                    className="accessibility-icon"
                  />
                </div>
                <div className="footer-icon" title="Greater Houston Builders Association" style={{ marginLeft: '48px !important' }}>
                  <a 
                    href="https://www.ghba.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-icon-link"
                    style={{
                      display: 'inline-block !important',
                      width: '100px !important',
                      height: '60px !important'
                    }}
                  >
                    <div style={{
                      width: '100px !important',
                      height: '60px !important',
                      overflow: 'visible !important',
                      display: 'flex !important',
                      alignItems: 'center !important',
                      justifyContent: 'center !important'
                    }}>
                      <Image 
                        src="/ghba-logo.png" 
                        alt="Greater Houston Builders Association" 
                        width={100}
                        height={60}
                        className="accessibility-icon"
                        style={{ 
                          width: '100px !important', 
                          height: '60px !important', 
                          maxWidth: 'none !important',
                          maxHeight: 'none !important',
                          objectFit: 'contain' as const,
                          transform: 'scale(1.5) !important'
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Center - Services & Company */}
            <div className="footer-links-section">
              {/* Services */}
              <div className="footer-column">
                <h3 className="footer-column-title">Services</h3>
                <ul className="footer-links">
                  <li><a href="/custom-homes" className="footer-link">Custom Homes</a></li>
                  <li><a href="/renovations" className="footer-link">Renovations</a></li>
                  <li><a href="/additions" className="footer-link">Home Additions</a></li>
                  <li><a href="/kitchens" className="footer-link">Kitchen Design</a></li>
                  <li><a href="/bathrooms" className="footer-link">Bathroom Design</a></li>
                </ul>
              </div>

              {/* Company */}
              <div className="footer-column">
                <h3 className="footer-column-title">Company</h3>
                <ul className="footer-links">
                  <li><a href="/about" className="footer-link">About Us</a></li>
                  <li><a href="/portfolio" className="footer-link">Portfolio</a></li>
                  <li><a href="/process" className="footer-link">Our Process</a></li>
                  <li><a href="/team" className="footer-link">Our Team</a></li>
                  <li><a href="/testimonials" className="footer-link">Testimonials</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="footer-column">
                <h3 className="footer-column-title">Resources</h3>
                <ul className="footer-links">
                  <li><a href="/blog" className="footer-link">Blog</a></li>
                  <li><a href="/faq" className="footer-link">FAQ</a></li>
                  <li><a href="/contact" className="footer-link">Contact Us</a></li>
                  <li><a href="/consultation" className="footer-link">Free Consultation</a></li>
                  <li><a href="/financing" className="footer-link">Financing</a></li>
                  <li><a href="/warranty" className="footer-link">Warranty</a></li>
                </ul>
              </div>
            </div>

            {/* Right - Logo */}
            <div className="footer-logo-section">
              <Link href="/">
                <Image 
                  src="/vanguard-builders-logo-tp.png" 
                  alt="Vanguard Builders" 
                  className="footer-logo-image"
                  width={300}
                  height={228}
                  priority={false}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <span className="copyright">© {currentYear} Vanguard Builders, Inc. All rights reserved.</span>
              <a href="/privacy" className="legal-link">Privacy Policy</a>
              <a href="/terms" className="legal-link">Terms of Use</a>
            </div>
            <div className="footer-attribution">
              Web design by{' '}
              <a 
                href="https://candl-innovations.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="attribution-link"
              >
                C&L Innovations
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;