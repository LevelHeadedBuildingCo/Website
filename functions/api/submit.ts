/**
 * Cloudflare Pages Function: POST /api/submit
 *
 * 1. Validates the form type, required fields, consent and a hidden honeypot.
 * 2. Verifies the Cloudflare Turnstile token server-side.
 * 3. Stores uploads in a private R2 bucket (if bound) or attaches them to the email.
 * 4. Delivers the submission by email via Resend (https://resend.com).
 *
 * It only returns { ok: true } after the email provider confirms it accepted the message.
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and Secrets):
 *   TURNSTILE_SECRET_KEY  (secret)  Turnstile secret key
 *   RESEND_API_KEY        (secret)  Resend API key
 *   FORM_FROM_EMAIL                 e.g. "Level Headed Website <website@yourdomain.ca>" (verified domain in Resend)
 *   FORM_TO_EMAIL                   default inbox for all submissions
 *   FORM_TO_EMAIL_QUOTE, _CONSULTING, _CREW, _TRAINING, _PARTNERSHIP, _GENERAL, _NEWSLETTER, _FOUNDING   optional per-type inboxes
 * Optional binding:
 *   UPLOADS  (R2 bucket)  private bucket for resumes, plans and photos
 */

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  FORM_FROM_EMAIL?: string;
  FORM_TO_EMAIL?: string;
  UPLOADS?: R2Bucket;
  [key: string]: unknown;
}

const FORM_TYPES = {
  quote: { label: 'Construction quote request', required: ['name', 'email', 'project_type', 'project_location', 'description'] },
  consulting: { label: 'Construction management / consulting inquiry', required: ['name', 'email', 'description'] },
  crew: { label: 'Join the Crew: employment interest', required: ['name', 'email', 'area', 'years_experience'] },
  training: { label: 'Academy / workshop interest', required: ['name', 'email'] },
  partnership: { label: 'Partnership inquiry', required: ['name', 'organization', 'organization_type', 'email', 'message'] },
  general: { label: 'General inquiry', required: ['name', 'email', 'message'] },
  newsletter: { label: 'Newsletter signup', required: ['email'] },
  founding: { label: 'Founding Circle feedback', required: ['name', 'email'] },
} as const;
type FormType = keyof typeof FORM_TYPES;

const FIELD_LABELS: Record<string, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', location: 'Town / city', organization: 'Organization', role: 'Role',
  organization_type: 'Organization type', project_type: 'Project type', project_location: 'Project location',
  budget: 'Budget', timeline: 'Timeline', description: 'Description', preferred_contact: 'Preferred contact',
  services: 'Services needed', area: 'Area of experience / interest', years_experience: 'Years of experience',
  certifications: 'Certifications', preference: 'Interested in', message: 'Message', subject: 'Subject',
  programs: 'Programs', workshops: 'Workshop topics', experience: 'Experience level', availability: 'Availability',
  interests: 'Areas of interest', page: 'Submitted from', expertise: 'Main area', what_you_bring: 'What they bring',
  what_excites_you: 'What excites them', what_you_need_to_know: 'What they need to know', feedback: 'Ideas / feedback', next_step: 'Next step',
};
const SKIP = new Set(['form_type', 'consent', 'company_website', 'cf-turnstile-response']);

const MAX_FILE = 10 * 1024 * 1024;
const MAX_TOTAL = 20 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED_EXT = /\.(pdf|docx?|jpe?g|png|heic|webp)$/i;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

function toBase64(buf: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // ---- Configuration check: never pretend to deliver --------------------------------------
  const defaultTo = env.FORM_TO_EMAIL;
  if (!env.RESEND_API_KEY || !env.FORM_FROM_EMAIL || !defaultTo || !env.TURNSTILE_SECRET_KEY) {
    return json(503, { ok: false, code: 'not_configured', message: 'Online forms are not set up on this website yet, so your message was not sent.' });
  }

  const ctype = request.headers.get('content-type') || '';
  if (!ctype.includes('multipart/form-data') && !ctype.includes('application/x-www-form-urlencoded')) {
    return json(415, { ok: false, message: 'Unsupported request.' });
  }
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_TOTAL + 1024 * 1024) return json(413, { ok: false, message: 'Attachments are too large. Please send up to 20 MB in total.' });

  let form: FormData;
  try { form = await request.formData(); } catch { return json(400, { ok: false, message: 'We couldn’t read the form. Please try again.' }); }

  const type = String(form.get('form_type') || '') as FormType;
  const def = FORM_TYPES[type];
  if (!def) return json(400, { ok: false, message: 'Unknown form.' });

  // ---- Spam checks --------------------------------------------------------------------------
  if (String(form.get('company_website') || '').trim()) {
    return json(200, { ok: true }); // honeypot filled: silently drop, give bots nothing to learn from
  }
  const token = String(form.get('cf-turnstile-response') || '');
  if (!token) return json(400, { ok: false, message: 'Please complete the spam check and try again.' });
  const human = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!human) return json(400, { ok: false, message: 'The spam check didn’t pass. Please refresh the page and try again.' });

  // ---- Validation ---------------------------------------------------------------------------
  if (form.get('consent') !== 'yes') return json(400, { ok: false, message: 'Please confirm your consent to send this form.' });
  const missing = def.required.filter((k) => !String(form.get(k) || '').trim());
  if (missing.length) {
    return json(400, { ok: false, message: `Please fill in: ${missing.map((m) => FIELD_LABELS[m] || m).join(', ')}.` });
  }
  const email = String(form.get('email')).trim();
  if (!isEmail(email)) return json(400, { ok: false, message: 'Please enter a valid email address.' });

  // ---- Collect fields -----------------------------------------------------------------------
  const fields = new Map<string, string[]>();
  const files: File[] = [];
  for (const [key, value] of form.entries()) {
    if (SKIP.has(key)) continue;
    if (typeof value === 'string') {
      const v = value.trim().slice(0, 5000);
      if (!v) continue;
      fields.set(key, [...(fields.get(key) || []), v]);
    } else if (value && (value as File).size > 0) {
      files.push(value as File);
    }
  }

  // ---- Files --------------------------------------------------------------------------------
  if (files.length > MAX_FILES) return json(400, { ok: false, message: `Please attach no more than ${MAX_FILES} files.` });
  let total = 0;
  for (const f of files) {
    if (!ALLOWED_EXT.test(f.name)) return json(400, { ok: false, message: `“${f.name}” isn’t an accepted file type.` });
    if (f.size > MAX_FILE) return json(400, { ok: false, message: `“${f.name}” is larger than 10 MB.` });
    total += f.size;
  }
  if (total > MAX_TOTAL) return json(400, { ok: false, message: 'Attachments are too large. Please send up to 20 MB in total.' });

  const submissionId = crypto.randomUUID();
  const stored: string[] = [];
  const attachments: { filename: string; content: string }[] = [];
  for (const f of files) {
    const safeName = f.name.replace(/[^\w.\- ]+/g, '_').slice(0, 120);
    const buf = await f.arrayBuffer();
    if (env.UPLOADS) {
      const key = `submissions/${new Date().toISOString().slice(0, 10)}/${type}/${submissionId}/${safeName}`;
      await env.UPLOADS.put(key, buf, { httpMetadata: { contentType: f.type || 'application/octet-stream' } });
      stored.push(key);
    } else {
      attachments.push({ filename: safeName, content: toBase64(buf) });
    }
  }

  // ---- Compose email ------------------------------------------------------------------------
  const rows = [...fields.entries()].map(([k, v]) =>
    `<tr><th align="left" valign="top" style="padding:6px 12px 6px 0;color:#4a5566;font:600 13px sans-serif;white-space:nowrap">${escapeHtml(FIELD_LABELS[k] || k)}</th>` +
    `<td style="padding:6px 0;font:14px/1.5 sans-serif;color:#172437">${escapeHtml(v.join(', ')).replace(/\n/g, '<br>')}</td></tr>`).join('');
  const fileNote = stored.length
    ? `<p style="font:14px sans-serif">Files saved privately in R2 (bucket bound as UPLOADS):<br>${stored.map(escapeHtml).join('<br>')}</p>`
    : attachments.length ? `<p style="font:14px sans-serif">${attachments.length} file(s) attached.</p>` : '';
  const html = `<div style="max-width:640px"><h2 style="font:700 20px sans-serif;color:#172437;border-bottom:3px solid #b8734e;padding-bottom:8px">${escapeHtml(def.label)}</h2>` +
    `<table cellspacing="0" cellpadding="0">${rows}</table>${fileNote}` +
    `<p style="font:12px sans-serif;color:#4a5566">Consent to data collection: given · Reference ${submissionId}</p></div>`;
  const text = `${def.label}\n\n${[...fields.entries()].map(([k, v]) => `${FIELD_LABELS[k] || k}: ${v.join(', ')}`).join('\n')}\n\n` +
    (stored.length ? `Files (R2): ${stored.join(', ')}\n` : '') + `Reference: ${submissionId}`;

  const to = String(env[`FORM_TO_EMAIL_${type.toUpperCase()}`] || defaultTo).split(',').map((s) => s.trim()).filter(Boolean);
  const name = String(form.get('name') || '').trim();
  const subjectBits = [def.label, name, String(form.get('organization') || '').trim()].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.FORM_FROM_EMAIL,
      to,
      reply_to: email,
      subject: subjectBits.join(' — ').slice(0, 180),
      html,
      text,
      ...(attachments.length ? { attachments } : {}),
    }),
  });

  if (!res.ok) {
    console.error('Email delivery failed', res.status, await res.text().catch(() => ''));
    // Remove stored files if we couldn't notify anyone about them.
    if (env.UPLOADS && stored.length) await Promise.all(stored.map((k) => env.UPLOADS!.delete(k))).catch(() => {});
    return json(502, { ok: false, message: 'Sorry, we couldn’t send your message just now. Please try again in a few minutes.' });
  }

  return json(200, { ok: true, reference: submissionId });
};
