interface ContentQualityResult {
  isAcceptable: boolean;
  reason?: string;
  score: number;
}

/**
 * Analyzes text content for gibberish and spam patterns using
 * Shannon entropy, consonant clustering, and keyword matching.
 */
export function analyzeContentQuality(text: string): ContentQualityResult {
  if (!text || text.trim().length === 0) {
    return { isAcceptable: true, score: 50 };
  }

  const cleaned = text.trim();
  let score = 100;
  const reasons: string[] = [];

  // Shannon entropy — English text is ~3.5-4.5; random gibberish is >5.5
  const entropy = calculateShannonEntropy(cleaned);
  if (entropy > 5.5) {
    score -= 40;
    reasons.push('Unusually high character randomness');
  } else if (cleaned.length > 20 && entropy < 2.0) {
    score -= 30;
    reasons.push('Unusually low character variety');
  }

  // Consonant cluster detection (e.g., "xhfjkdsj")
  const consonantClusterRatio = getConsonantClusterRatio(cleaned);
  if (consonantClusterRatio > 0.4) {
    score -= 35;
    reasons.push('Unnatural letter patterns');
  }

  // Repeated character/word patterns
  if (hasExcessiveRepetition(cleaned)) {
    score -= 25;
    reasons.push('Excessive repetition detected');
  }

  // Spam keyword density
  const spamPenalty = checkSpamKeywords(cleaned);
  score -= spamPenalty;
  if (spamPenalty > 0) {
    reasons.push('Contains spam-like keywords');
  }

  // URL density
  const urlCount = (cleaned.match(/https?:\/\/[^\s]+/gi) || []).length;
  if (urlCount > 2) {
    score -= 20 * (urlCount - 2);
    reasons.push('Too many URLs');
  }

  score = Math.max(0, Math.min(100, score));

  return {
    isAcceptable: score >= 30,
    reason: reasons.length > 0 ? reasons.join('; ') : undefined,
    score,
  };
}

/**
 * Validates a name field for quality.
 * Catches gibberish names like "SYFRxwxSpcYewlaZdaku".
 */
export function validateNameQuality(name: string): ContentQualityResult {
  if (!name || name.trim().length === 0) {
    return { isAcceptable: false, score: 0, reason: 'Name is required' };
  }

  const cleaned = name.trim();
  let score = 100;
  const reasons: string[] = [];

  // Names should contain mostly letters, spaces, hyphens, apostrophes
  const letterRatio = (cleaned.match(/[a-zA-Z\s'-]/g) || []).length / cleaned.length;
  if (letterRatio < 0.8) {
    score -= 40;
    reasons.push('Name contains unusual characters');
  }

  // Consonant cluster detection for gibberish names
  const clusterRatio = getConsonantClusterRatio(cleaned);
  if (clusterRatio > 0.5) {
    score -= 35;
    reasons.push('Name appears to be random characters');
  }

  // Names with unusual mixed-case patterns (e.g., "SYFRxwxSpcYewlaZdaku")
  if (cleaned.length > 5) {
    const caseChanges = countCaseChanges(cleaned);
    const changeRatio = caseChanges / cleaned.length;
    if (changeRatio > 0.4) {
      score -= 30;
      reasons.push('Unusual capitalization pattern');
    }
  }

  // Single character name
  if (cleaned.length < 2) {
    score -= 30;
    reasons.push('Name is too short');
  }

  score = Math.max(0, Math.min(100, score));

  return {
    isAcceptable: score >= 40,
    reason: reasons.length > 0 ? reasons.join('; ') : undefined,
    score,
  };
}

function calculateShannonEntropy(text: string): number {
  const freq: Record<string, number> = {};
  for (const char of text.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  const len = text.length;
  let entropy = 0;
  for (const count of Object.values(freq)) {
    const p = count / len;
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }
  return entropy;
}

function getConsonantClusterRatio(text: string): number {
  const letters = text.toLowerCase().replace(/[^a-z]/g, '');
  if (letters.length === 0) return 0;
  const clusters = letters.match(/[bcdfghjklmnpqrstvwxyz]{4,}/g) || [];
  const clusterLength = clusters.reduce((sum, c) => sum + c.length, 0);
  return clusterLength / letters.length;
}

function hasExcessiveRepetition(text: string): boolean {
  if (/(.)\1{5,}/.test(text)) return true;
  const words = text.toLowerCase().split(/\s+/);
  if (words.length >= 4) {
    const wordFreq: Record<string, number> = {};
    for (const word of words) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
    const maxFreq = Math.max(...Object.values(wordFreq));
    if (maxFreq / words.length > 0.6) return true;
  }
  return false;
}

function checkSpamKeywords(text: string): number {
  const lowerText = text.toLowerCase();
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'bitcoin', 'cryptocurrency', 'forex',
    'make money fast', 'work from home', 'guaranteed income', 'limited time offer',
    'click here', 'free trial', 'no obligation', 'act now', 'buy now',
    'cheap meds', 'online pharmacy', 'weight loss', 'enlargement',
  ];
  let penalty = 0;
  for (const keyword of spamKeywords) {
    if (lowerText.includes(keyword)) {
      penalty += 15;
    }
  }
  return Math.min(60, penalty);
}

function countCaseChanges(text: string): number {
  let changes = 0;
  const letters = text.replace(/[^a-zA-Z]/g, '');
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) changes++;
  }
  return changes;
}
