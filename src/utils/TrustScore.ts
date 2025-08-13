export interface TrustFactors {
  timeSpent: number;
  behaviorScore: number;
  formValidation: number;
  honeypotClean: boolean;
  emailQuality: number;
  phoneValidity: number;
}

export class TrustScore {
  static calculate(factors: TrustFactors): number {
    let score = 0;
    
    // Time factor (20% weight)
    const timeScore = Math.min(20, Math.max(0, (factors.timeSpent / 60) * 20));
    score += timeScore;
    
    // Behavior factor (30% weight) 
    const behaviorScore = Math.min(30, Math.max(0, factors.behaviorScore * 0.3));
    score += behaviorScore;
    
    // Form validation (25% weight)
    score += Math.min(25, Math.max(0, factors.formValidation));
    
    // Honeypot (25% weight - binary)
    if (factors.honeypotClean) {
      score += 25;
    }
    
    return Math.round(Math.min(100, Math.max(0, score)));
  }
  
  static getRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score >= 70) return 'low';
    if (score >= 40) return 'medium';
    return 'high';
  }
  
  static getRecommendation(score: number): {
    allow: boolean;
    requireVerification: boolean;
    message: string;
  } {
    if (score >= 70) {
      return {
        allow: true,
        requireVerification: false,
        message: 'High trust user - allow submission'
      };
    }
    
    if (score >= 40) {
      return {
        allow: false,
        requireVerification: true,
        message: 'Medium trust - require additional verification'
      };
    }
    
    return {
      allow: false,
      requireVerification: false,
      message: 'Low trust - likely spam'
    };
  }
}