import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Turnstile } from './Turnstile';
import { Honeypot, MAX_FILE_MB, MAX_TOTAL_MB } from './fields';
import { Check } from '../Icons';
import { site } from '../../content';

export type FormType = 'quote' | 'consulting' | 'crew' | 'training' | 'partnership' | 'general' | 'newsletter' | 'founding';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

const fallbackContact = () =>
  site.contact.email ? ` You can also email us directly at ${site.contact.email}.` : '';

/**
 * Wraps every form on the site. It posts to the Cloudflare Pages Function at /api/submit and only
 * shows a success message when the server confirms the message was delivered.
 */
export function FormShell({ formType, children, submitLabel = 'Send', successTitle, successText, compact }: {
  formType: FormType; children: ReactNode; submitLabel?: string; successTitle: string; successText: string; compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [resetKey, setResetKey] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('form_type', formType);
    data.set('page', window.location.pathname + window.location.search);

    // Client-side file limits (also enforced on the server)
    let total = 0;
    for (const [, v] of data.entries()) {
      if (v instanceof File && v.size > 0) {
        if (v.size > MAX_FILE_MB * 1024 * 1024) return fail(`“${v.name}” is larger than ${MAX_FILE_MB} MB. Please choose a smaller file.`);
        total += v.size;
      }
    }
    if (total > MAX_TOTAL_MB * 1024 * 1024) return fail(`Attachments add up to more than ${MAX_TOTAL_MB} MB. Please send fewer or smaller files.`);

    setStatus({ state: 'submitting' });
    try {
      const res = await fetch('/api/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      let body: { ok?: boolean; message?: string } = {};
      try { body = await res.json(); } catch { /* non-JSON response */ }
      if (res.ok && body.ok) {
        setStatus({ state: 'success' });
        form.reset();
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      fail((body.message || 'Sorry, your message could not be sent.') + fallbackContact());
    } catch {
      fail('We couldn’t reach our server. Please check your connection and try again.' + fallbackContact());
    } finally {
      setResetKey((k) => k + 1); // Turnstile tokens are single-use
    }
  }

  function fail(message: string) {
    setStatus({ state: 'error', message });
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.state === 'success') {
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <div className="tick"><Check /></div>
        <h3>{successTitle}</h3>
        <p className="muted">{successText}</p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus({ state: 'idle' })}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" aria-busy={status.state === 'submitting'}>
      <div className={compact ? '' : 'form-grid'}>{children}</div>
      <Honeypot />
      <div className="form-actions">
        <Turnstile resetKey={resetKey} action={formType} />
        <button type="submit" className="btn btn-primary" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending…' : submitLabel}
        </button>
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {status.state === 'error' && <div className="form-status error" role="alert">{status.message}</div>}
      </div>
    </form>
  );
}
