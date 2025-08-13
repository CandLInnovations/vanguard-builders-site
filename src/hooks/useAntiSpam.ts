import { useState, useCallback, useEffect } from 'react';
import { useBehaviorTracking } from './useBehaviorTracking';

export interface SpamProtectionConfig {
  minCompletionTime: number; // in seconds
  maxSubmissionsPerHour: number;
  maxSubmissionsPerDay: number;
  enableHoneypot: boolean;
  enableRateLimit: boolean;
  enableBehaviorAnalysis: boolean;
  trustScoreThreshold: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  requiresAdditionalVerification: boolean;
  trustScore: number;
  debugInfo?: any;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  // Honeypot fields (should remain empty)
  website?: string;
  company?: string;
  referral_source?: string;
}

interface SubmissionCount {
  hourly: number;
  daily: number;
  lastHour: number;
  lastDay: number;
}

const isDev = process.env.NODE_ENV === 'development';
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname === '::1');

// Check for testing bypasses
const hasTestingBypass = () => {
  if (typeof window === 'undefined') return false;
  
  const urlParams = new URLSearchParams(window.location.search);
  const hasUrlBypass = urlParams.get('testing') === 'true' || urlParams.get('noSpamCheck') === 'true';
  const hasStorageBypass = localStorage.getItem('spamProtectionDisabled') === 'true';
  const hasGlobalBypass = (window as any).bypassSpamProtection === true;
  
  return isDev && (hasUrlBypass || hasStorageBypass || hasGlobalBypass || isLocalhost);
};

export function useAntiSpam(config: SpamProtectionConfig, wizardType: 'remodeling' | 'custom-build') {
  const { metrics, isHuman, isHighlyTrusted } = useBehaviorTracking();
  const [startTime] = useState(() => typeof window !== 'undefined' ? Date.now() : 0);
  
  // Rate limiting state
  const [submissionCount, setSubmissionCount] = useState(() => {
    if (typeof window === 'undefined') return { hourly: 0, daily: 0, lastHour: 0, lastDay: 0 };
    
    const stored = localStorage.getItem(`spam_limit_${wizardType}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { hourly: 0, daily: 0, lastHour: Date.now(), lastDay: Date.now() };
      }
    }
    return { hourly: 0, daily: 0, lastHour: Date.now(), lastDay: Date.now() };
  });

  const updateRateLimits = useCallback(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    
    setSubmissionCount((prev: SubmissionCount) => {
      const newCount = {
        hourly: now - prev.lastHour > oneHour ? 1 : prev.hourly + 1,
        daily: now - prev.lastDay > oneDay ? 1 : prev.daily + 1,
        lastHour: now - prev.lastHour > oneHour ? now : prev.lastHour,
        lastDay: now - prev.lastDay > oneDay ? now : prev.lastDay
      };
      
      localStorage.setItem(`spam_limit_${wizardType}`, JSON.stringify(newCount));
      return newCount;
    });
  }, [wizardType]);

  const validateEmail = useCallback((email: string): { isValid: boolean; error?: string } => {
    if (!email.trim()) return { isValid: false, error: 'Email is required' };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    // Check for suspicious domains
    const suspiciousDomains = [
      '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 
      'tempmail.org', 'throwaway.email', '33mail.com', 'trashmail.com',
      'yopmail.com', 'temp-mail.org', 'getairmail.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && suspiciousDomains.includes(domain)) {
      return { isValid: false, error: 'Please use a permanent email address' };
    }
    
    return { isValid: true };
  }, []);

  const validatePhone = useCallback((phone: string): { isValid: boolean; error?: string } => {
    if (!phone.trim()) return { isValid: false, error: 'Phone number is required' };
    
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Check for obviously fake numbers
    const fakePatterns = [
      /^(\d)\1{9,}$/, // All same digits
      /^1234567890$/, // Sequential
      /^1111111111$/, // All ones
      /^0000000000$/  // All zeros
    ];
    
    if (fakePatterns.some(pattern => pattern.test(cleaned))) {
      return { isValid: false, error: 'Please enter a valid phone number' };
    }
    
    // US phone number validation (10 or 11 digits)
    if (cleaned.length < 10 || cleaned.length > 11) {
      return { isValid: false, error: 'Please enter a valid US phone number' };
    }
    
    return { isValid: true };
  }, []);

  const validateContent = useCallback((text: string): { isValid: boolean; error?: string } => {
    if (!text?.trim()) return { isValid: true }; // Optional field
    
    // Check for spam keywords
    const spamKeywords = [
      'viagra', 'casino', 'loan', 'credit', 'debt', 'mortgage', 'insurance',
      'investment', 'bitcoin', 'cryptocurrency', 'make money', 'work from home',
      'guaranteed', 'limited time', 'act now', 'click here', 'free trial'
    ];
    
    const lowerText = text.toLowerCase();
    const foundSpam = spamKeywords.filter(keyword => lowerText.includes(keyword));
    
    if (foundSpam.length > 0) {
      return { isValid: false, error: 'Message contains inappropriate content' };
    }
    
    // Check for excessive URLs
    const urlCount = (text.match(/https?:\/\/[^\s]+/gi) || []).length;
    if (urlCount > 2) {
      return { isValid: false, error: 'Too many links in message' };
    }
    
    return { isValid: true };
  }, []);

  const calculateTrustScore = useCallback((formData: ContactFormData): number => {
    let score = 0;
    
    // Time-based validation (20 points)
    const timeSpent = (Date.now() - startTime) / 1000;
    if (timeSpent >= config.minCompletionTime) {
      score += Math.min(20, (timeSpent / config.minCompletionTime) * 10);
    }
    
    // Behavior score (30 points)
    score += Math.min(30, metrics.humanScore * 0.3);
    
    // Form validation (25 points)
    const emailValid = validateEmail(formData.email).isValid;
    const phoneValid = validatePhone(formData.phone).isValid;
    const contentValid = validateContent(formData.message || '').isValid;
    
    if (emailValid) score += 10;
    if (phoneValid) score += 10;
    if (contentValid) score += 5;
    
    // Honeypot validation (25 points)
    const honeypotClean = !formData.website && !formData.company && !formData.referral_source;
    if (honeypotClean) score += 25;
    
    return Math.min(100, Math.max(0, score));
  }, [config.minCompletionTime, metrics.humanScore, startTime, validateEmail, validatePhone, validateContent]);

  const validateSubmission = useCallback(async (formData: ContactFormData): Promise<ValidationResult> => {
    const errors: string[] = [];
    let requiresAdditionalVerification = false;
    
    // Always allow bypass in development/testing
    if (hasTestingBypass()) {
      return {
        isValid: true,
        errors: [],
        requiresAdditionalVerification: false,
        trustScore: 100,
        debugInfo: { bypass: true, reason: 'Testing bypass enabled' }
      };
    }
    
    // Honeypot validation
    if (config.enableHoneypot) {
      if (formData.website || formData.company || formData.referral_source) {
        errors.push('Form validation failed');
        return {
          isValid: false,
          errors,
          requiresAdditionalVerification: false,
          trustScore: 0,
          debugInfo: { honeypot: 'failed' }
        };
      }
    }
    
    // Rate limiting
    if (config.enableRateLimit && !isDev) {
      if (submissionCount.hourly >= config.maxSubmissionsPerHour) {
        errors.push('Too many submissions. Please wait before trying again.');
      }
      if (submissionCount.daily >= config.maxSubmissionsPerDay) {
        errors.push('Daily submission limit reached. Please try again tomorrow.');
      }
      if (errors.length > 0) {
        return {
          isValid: false,
          errors,
          requiresAdditionalVerification: false,
          trustScore: 0,
          debugInfo: { rateLimit: submissionCount }
        };
      }
    }
    
    // Time validation
    const timeSpent = (Date.now() - startTime) / 1000;
    if (timeSpent < config.minCompletionTime) {
      errors.push('Please take more time to complete the form');
      return {
        isValid: false,
        errors,
        requiresAdditionalVerification: false,
        trustScore: 0,
        debugInfo: { timeSpent, minRequired: config.minCompletionTime }
      };
    }
    
    // Form field validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error!);
    }
    
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.push(phoneValidation.error!);
    }
    
    const contentValidation = validateContent(formData.message || '');
    if (!contentValidation.isValid) {
      errors.push(contentValidation.error!);
    }
    
    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
        requiresAdditionalVerification: false,
        trustScore: calculateTrustScore(formData),
        debugInfo: { fieldValidation: 'failed' }
      };
    }
    
    // Calculate trust score
    const trustScore = calculateTrustScore(formData);
    
    // Determine if additional verification is needed
    if (config.enableBehaviorAnalysis && trustScore < config.trustScoreThreshold) {
      requiresAdditionalVerification = true;
    }
    
    return {
      isValid: !requiresAdditionalVerification,
      errors: [],
      requiresAdditionalVerification,
      trustScore,
      debugInfo: {
        timeSpent,
        behaviorScore: metrics.humanScore,
        trustScore,
        isHuman,
        isHighlyTrusted
      }
    };
  }, [
    config,
    submissionCount,
    startTime,
    metrics.humanScore,
    isHuman,
    isHighlyTrusted,
    calculateTrustScore,
    validateEmail,
    validatePhone,
    validateContent
  ]);

  const recordSubmission = useCallback(() => {
    if (!hasTestingBypass()) {
      updateRateLimits();
    }
  }, [updateRateLimits]);

  return {
    validateSubmission,
    recordSubmission,
    metrics,
    trustScore: calculateTrustScore({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }),
    isReady: metrics.timeSpent > 5000, // 5 seconds minimum
    debugInfo: isDev ? {
      startTime,
      timeSpent: Date.now() - startTime,
      submissionCount,
      hasTestingBypass: hasTestingBypass(),
      behaviorMetrics: metrics
    } : undefined
  };
}