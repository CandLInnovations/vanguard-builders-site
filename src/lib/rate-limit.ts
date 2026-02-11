/**
 * In-Memory Rate Limiting Utility
 *
 * Lightweight rate limiter using a Map with automatic cleanup.
 * Per-instance on serverless (not persistent across cold starts),
 * but sufficient as a secondary defense alongside Cloudflare Turnstile.
 */

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  prefix: string;
}

// In-memory store shared across requests within the same serverless instance
const store = new Map<string, RateLimitEntry>();

// Periodic cleanup to prevent memory leaks
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60_000; // 1 minute

function cleanupExpiredEntries(maxWindowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < maxWindowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  CONTACT_FORM: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    prefix: 'contact',
  } satisfies RateLimitConfig,

  CONSULTATION: {
    maxRequests: 2,
    windowMs: 60 * 60 * 1000,
    prefix: 'consultation',
  } satisfies RateLimitConfig,

  WIZARD: {
    maxRequests: 2,
    windowMs: 60 * 60 * 1000,
    prefix: 'wizard',
  } satisfies RateLimitConfig,

  SCHEDULE_SHOWING: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
    prefix: 'showing',
  } satisfies RateLimitConfig,
};

/**
 * Get client identifier from request headers.
 * Tries multiple headers to get the real IP address.
 */
export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  return 'anonymous';
}

/**
 * Apply rate limiting to an API endpoint.
 * Returns the same shape as before so API routes don't need changes.
 */
export async function applyRateLimit(
  request: Request,
  config: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  headers: Record<string, string>;
}> {
  cleanupExpiredEntries(config.windowMs);

  const identifier = getClientIdentifier(request);
  const key = `${config.prefix}:${identifier}`;
  const now = Date.now();

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

  const remaining = Math.max(0, config.maxRequests - entry.timestamps.length);
  const reset = entry.timestamps.length > 0
    ? entry.timestamps[0] + config.windowMs
    : now + config.windowMs;

  if (entry.timestamps.length >= config.maxRequests) {
    const retryAfter = Math.ceil((reset - now) / 1000);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset,
      headers: {
        'X-RateLimit-Limit': config.maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(reset).toISOString(),
        'Retry-After': retryAfter.toString(),
      },
    };
  }

  // Record this request
  entry.timestamps.push(now);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: remaining - 1,
    reset,
    headers: {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': (remaining - 1).toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString(),
    },
  };
}
