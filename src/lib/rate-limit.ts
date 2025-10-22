/**
 * Rate Limiting Utility using Redis
 *
 * Protects API endpoints from abuse with serverless-friendly rate limiting.
 * Uses Redis (via Vercel) for persistence across deployments and serverless instances.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Parse the REDIS_URL to extract connection details
// Format: redis://default:password@host:port
function parseRedisUrl(url: string) {
  const match = url.match(/redis:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/);
  if (!match) {
    throw new Error('Invalid REDIS_URL format');
  }
  const [, username, password, host, port] = match;

  // Construct REST API URL for Upstash
  // Upstash REST format: https://host
  const restUrl = `https://${host}`;
  const token = password;

  return { url: restUrl, token };
}

// Initialize Redis client
const { url, token } = parseRedisUrl(process.env.REDIS_URL!);
const redis = new Redis({
  url,
  token,
});

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // Contact form - 3 submissions per hour per IP
  CONTACT_FORM: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: 'ratelimit:contact',
  }),

  // Consultation requests - 2 per hour per IP
  CONSULTATION: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, '1 h'),
    analytics: true,
    prefix: 'ratelimit:consultation',
  }),

  // Wizard submissions - 2 per hour per IP
  WIZARD: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, '1 h'),
    analytics: true,
    prefix: 'ratelimit:wizard',
  }),

  // Schedule showing - 3 per hour per IP
  SCHEDULE_SHOWING: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: 'ratelimit:showing',
  }),

  // General API - 30 requests per minute per IP (for future endpoints)
  GENERAL: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    analytics: true,
    prefix: 'ratelimit:general',
  }),
};

/**
 * Get client identifier from request headers
 * Tries multiple headers to get the real IP address
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback for development or when IP can't be determined
  return 'anonymous';
}

/**
 * Apply rate limiting to an API endpoint
 *
 * @example
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await applyRateLimit(request, RATE_LIMITS.CONTACT_FORM);
 *
 *   if (!rateLimitResult.success) {
 *     return NextResponse.json(
 *       { error: 'Too many requests. Please try again later.' },
 *       {
 *         status: 429,
 *         headers: rateLimitResult.headers
 *       }
 *     );
 *   }
 *
 *   // Process request...
 * }
 * ```
 */
export async function applyRateLimit(
  request: Request,
  limiter: Ratelimit
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  headers: Record<string, string>;
}> {
  const identifier = getClientIdentifier(request);
  const result = await limiter.limit(identifier);

  // Standard rate limit headers
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };

  if (!result.success) {
    // Add Retry-After header when rate limited
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
    headers['Retry-After'] = retryAfter.toString();
  }

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
    headers,
  };
}

/**
 * Higher-order function to wrap API handlers with rate limiting
 *
 * @example
 * ```ts
 * export const POST = withRateLimit(
 *   RATE_LIMITS.CONTACT_FORM,
 *   async (request: NextRequest) => {
 *     // Your handler logic
 *     return NextResponse.json({ success: true });
 *   }
 * );
 * ```
 */
export function withRateLimit(
  limiter: Ratelimit,
  handler: (request: Request) => Promise<Response>,
  options: {
    errorMessage?: string;
    onRateLimitExceeded?: (identifier: string) => void;
  } = {}
) {
  return async (request: Request): Promise<Response> => {
    const rateLimitResult = await applyRateLimit(request, limiter);

    if (!rateLimitResult.success) {
      // Optional callback for monitoring/logging
      if (options.onRateLimitExceeded) {
        const identifier = getClientIdentifier(request);
        options.onRateLimitExceeded(identifier);
      }

      return new Response(
        JSON.stringify({
          error: options.errorMessage || 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.headers['Retry-After'],
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...rateLimitResult.headers,
          },
        }
      );
    }

    // Call the original handler
    const response = await handler(request);

    // Add rate limit headers to response
    const newHeaders = new Headers(response.headers);
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  };
}
