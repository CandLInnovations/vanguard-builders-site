'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface PortfolioItemProps {
  images: string[];
  altTexts: string[];
  location: string;
  year: string;
  title: string;
  description: string;
  features: string[];
  isDark?: boolean;
}

export default function PortfolioItem({
  images,
  altTexts,
  location,
  year,
  title,
  description,
  features,
  isDark = false
}: PortfolioItemProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const itemClass = isDark ? 'portfolio-item portfolio-item-dark' : 'portfolio-item';

  return (
    <div className={itemClass}>
      <div className="portfolio-image-gallery">
        <div className="portfolio-image">
          <Image
            src={images[currentImageIndex]}
            alt={altTexts[currentImageIndex]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="portfolio-nav-btn portfolio-nav-prev"
                aria-label="Previous image"
              >
                <ChevronLeft className="portfolio-nav-icon" />
              </button>
              <button
                onClick={nextImage}
                className="portfolio-nav-btn portfolio-nav-next"
                aria-label="Next image"
              >
                <ChevronRight className="portfolio-nav-icon" />
              </button>
              <div className="portfolio-image-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`portfolio-dot ${index === currentImageIndex ? 'active' : ''}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="portfolio-content">
        <div className="portfolio-meta">
          <div className="portfolio-meta-item">
            <MapPin className="portfolio-meta-icon" />
            <span>{location}</span>
          </div>
          <div className="portfolio-meta-item">
            <Calendar className="portfolio-meta-icon" />
            <span>{year}</span>
          </div>
        </div>
        <h3 className="portfolio-title">{title}</h3>
        <p className="portfolio-description">{description}</p>
        <div className="portfolio-features">
          {features.map((feature, index) => (
            <span key={index} className="portfolio-feature">{feature}</span>
          ))}
        </div>
      </div>
    </div>
  );
}