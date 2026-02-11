'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useCallback, useState } from 'react';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  resetKey?: number;
}

export default function TurnstileWidget({
  onSuccess,
  onError,
  onExpire,
  resetKey,
}: TurnstileWidgetProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [hasError, setHasError] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleExpire = useCallback(() => {
    setHasError(false);
    onExpire?.();
    turnstileRef.current?.reset();
  }, [onExpire]);

  const handleSuccess = useCallback(
    (token: string) => {
      setHasError(false);
      onSuccess(token);
    },
    [onSuccess]
  );

  if (!siteKey) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div style={{
          padding: '12px',
          backgroundColor: '#fef3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#856404',
          textAlign: 'center',
        }}>
          Turnstile disabled: NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY not set
        </div>
      );
    }
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={handleSuccess}
        onError={handleError}
        onExpire={handleExpire}
        options={{
          theme: 'light',
          size: 'normal',
        }}
        key={resetKey}
      />
      {hasError && (
        <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>
          Verification failed. Please try again or refresh the page.
        </p>
      )}
    </div>
  );
}
