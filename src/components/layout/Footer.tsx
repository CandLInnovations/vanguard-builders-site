'use client';

import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Obfuscated phone number (same as navbar)
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
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-company">
              <div className="footer-logo">
                VANGUARD
                <span className="footer-logo-accent">HOMES</span>
              </div>
              <p className="footer-description">
                Texas's premier luxury home builder and remodeler. 
                Crafting architectural excellence since 2010.
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div className="contact-text">
                    <p>1234 Executive Blvd, Suite 100</p>
                    <p>Austin, TX 78731</p>
                  </div>
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
                  <a 
                    href="mailto:info@vanguardhomes.com"
                    className="contact-email"
                  >
                    info@vanguardhomes.com
                  </a>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Linkedin className="social-icon" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="footer-column">
              <h3 className="footer-column-title">Services</h3>
              <ul className="footer-links">
                <li><a href="/custom-homes" className="footer-link">Custom Homes</a></li>
                <li><a href="/renovations" className="footer-link">Renovations</a></li>
                <li><a href="/remodeling" className="footer-link">Remodeling</a></li>
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
                <li><a href="/careers" className="footer-link">Careers</a></li>
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
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <span className="copyright">© {currentYear} Vanguard Homes. All rights reserved.</span>
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