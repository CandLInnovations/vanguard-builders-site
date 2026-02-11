interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes': string[];
  challenge_ts?: string;
  hostname?: string;
}

interface VerificationResult {
  success: boolean;
  error?: string;
}

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<VerificationResult> {
  if (!token) {
    return {
      success: false,
      error: 'Bot verification required. Please complete the security check.',
    };
  }

  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Turnstile secret key not configured, allowing request in development');
      return { success: true };
    }
    console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY is not configured');
    return {
      success: false,
      error: 'Security verification is temporarily unavailable. Please try again later.',
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      }
    );

    if (!response.ok) {
      console.error('Turnstile API returned non-OK status:', response.status);
      return {
        success: false,
        error: 'Security verification is temporarily unavailable. Please try again in a moment.',
      };
    }

    const result: TurnstileVerifyResponse = await response.json();

    if (!result.success) {
      console.warn('Turnstile verification failed:', result['error-codes']);
      return {
        success: false,
        error: 'Bot verification failed. Please refresh the page and try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return {
      success: false,
      error: 'Security verification is temporarily unavailable. Please try again in a moment.',
    };
  }
}
