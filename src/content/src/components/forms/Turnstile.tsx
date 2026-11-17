import { useEffect, useRef } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => { scriptPromise = null; reject(new Error('Turnstile failed to load')); };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export const turnstileConfigured = Boolean(SITE_KEY);

/**
 * Cloudflare Turnstile widget. Adds a hidden `cf-turnstile-response` input to the surrounding form,
 * which the Pages Function verifies server-side. `resetKey` changes force a fresh token after each submit.
 */
export function Turnstile({ resetKey, action }: { resetKey: number; action: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        if (widgetId.current) window.turnstile.remove(widgetId.current);
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY, action, theme: 'light', 'response-field-name': 'cf-turnstile-response',
        });
      })
      .catch(() => { /* surfaced by the server as a verification error */ });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) { window.turnstile.remove(widgetId.current); widgetId.current = null; }
    };
  }, [resetKey, action]);

  if (!SITE_KEY) {
    return (
      <p className="small muted">
        Spam protection (Cloudflare Turnstile) has not been configured on this deployment yet.
      </p>
    );
  }
  return <div className="turnstile-slot" ref={ref} />;
}
