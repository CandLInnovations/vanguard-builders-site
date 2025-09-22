'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { OptionCard as OptionCardType } from '@/types/wizard';

interface OptionCardProps {
  option: OptionCardType;
  selected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
}

export default function OptionCard({ option, selected, onSelect, multiSelect = false }: OptionCardProps) {
  return (
    <div 
      className={`option-card ${selected ? 'option-card-selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Selection indicator */}
      <div className={`option-card-indicator ${selected ? 'option-card-indicator-selected' : ''}`}>
        {selected && <Check className="option-card-check" />}
      </div>


      {/* Content */}
      <div className="option-card-content">
        <div className="option-card-header">
          <h3 className="option-card-title">{option.title}</h3>
          {option.price && (
            <span className="option-card-price">{option.price}</span>
          )}
        </div>

        <p className="option-card-description">{option.description}</p>

        {option.timeline && (
          <div className="option-card-meta">
            <span className="option-card-timeline">Timeline: {option.timeline}</span>
          </div>
        )}

        {option.features && option.features.length > 0 && (
          <ul className="option-card-features">
            {option.features.map((feature, index) => (
              <li key={index} className="option-card-feature">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}