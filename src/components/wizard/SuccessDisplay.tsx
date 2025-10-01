'use client';

import React, { useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface SuccessDisplayProps {
  title: string;
  message: string;
  onComplete: () => void;
  redirectDelay?: number;
}

export default function SuccessDisplay({ 
  title, 
  message, 
  onComplete, 
  redirectDelay = 3000 
}: SuccessDisplayProps) {
  useEffect(() => {
    // Scroll to top when success message appears
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setTimeout(() => {
      onComplete();
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [onComplete, redirectDelay]);

  return (
    <div className="success-display">
      <div className="success-content">
        <div className="success-icon">
          <Check className="success-check" />
        </div>
        
        <h1 className="success-title">{title}</h1>
        <p className="success-message">{message}</p>
        
        <div className="success-redirect">
          <p className="success-redirect-text">
            Redirecting to our portfolio...
          </p>
          <div className="success-loading-bar">
            <div className="success-loading-fill"></div>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="success-button"
        >
          View Portfolio Now
          <ArrowRight className="success-button-icon" />
        </button>
      </div>
    </div>
  );
}