'use client';

import React, { useState, useCallback } from 'react';

interface VerificationChallengeProps {
  onVerified: () => void;
  onCancel?: () => void;
}

export default function VerificationChallenge({ onVerified, onCancel }: VerificationChallengeProps) {
  const [challenge] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  });
  
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = useCallback(() => {
    const answer = parseInt(userAnswer.trim());
    
    if (isNaN(answer)) {
      setError('Please enter a number');
      return;
    }
    
    if (answer !== challenge.answer) {
      setError('Incorrect answer, please try again');
      setUserAnswer('');
      return;
    }
    
    setIsVerified(true);
    setError('');
    onVerified();
  }, [userAnswer, challenge.answer, onVerified]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  }, [handleVerify]);

  if (isVerified) {
    return (
      <div className="verification-success">
        <div className="verification-success-content">
          <div className="verification-check">✓</div>
          <p>Verification complete! Thank you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-challenge">
      <div className="verification-content">
        <h3 className="verification-title">Quick Verification</h3>
        <p className="verification-description">
          To help us prevent spam, please solve this simple math problem:
        </p>
        
        <div className="verification-math">
          <span className="math-problem">
            {challenge.num1} + {challenge.num2} = ?
          </span>
        </div>
        
        <div className="verification-input-group">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="verification-input"
            placeholder="Your answer"
            min="0"
            max="20"
          />
          <button 
            onClick={handleVerify}
            className="verification-button"
            disabled={!userAnswer.trim()}
          >
            Verify
          </button>
        </div>
        
        {error && (
          <div className="verification-error">
            {error}
          </div>
        )}
        
        <div className="verification-help">
          <p>Having trouble? This helps us ensure you're a real person.</p>
          {onCancel && (
            <button onClick={onCancel} className="verification-cancel">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}