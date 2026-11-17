import { useId, type ReactNode } from 'react';
import { Link } from '../../lib/router';

interface Base { label: string; name: string; required?: boolean; hint?: string; full?: boolean }

const Req = ({ required }: { required?: boolean }) =>
  required ? <span className="req" aria-hidden="true">*</span> : <span className="small muted"> (optional)</span>;

export function TextField({ label, name, required, hint, full, type = 'text', autoComplete, defaultValue }: Base & {
  type?: 'text' | 'email' | 'tel'; autoComplete?: string; defaultValue?: string;
}) {
  const id = useId();
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}<Req required={required} /></label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} defaultValue={defaultValue}
        aria-describedby={hint ? `${id}-hint` : undefined} maxLength={300} />
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function SelectField({ label, name, required, hint, full, options, defaultValue }: Base & { options: string[]; defaultValue?: string }) {
  const id = useId();
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}<Req required={required} /></label>
      <select id={id} name={name} required={required} defaultValue={defaultValue ?? ''} aria-describedby={hint ? `${id}-hint` : undefined}>
        <option value="" disabled>Choose one…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function TextArea({ label, name, required, hint, full = true, rows = 6 }: Base & { rows?: number }) {
  const id = useId();
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}<Req required={required} /></label>
      <textarea id={id} name={name} required={required} rows={rows} maxLength={5000} aria-describedby={hint ? `${id}-hint` : undefined} />
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function CheckboxGroup({ label, name, options, hint, full = true, defaultChecked = [] }: Base & { options: string[]; defaultChecked?: string[] }) {
  const id = useId();
  return (
    <fieldset className={`field${full ? ' full' : ''}`} aria-describedby={hint ? `${id}-hint` : undefined}>
      <legend>{label}</legend>
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
      <div className="options">
        {options.map((o) => (
          <label className="option" key={o}>
            <input type="checkbox" name={name} value={o} defaultChecked={defaultChecked.includes(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export const MAX_FILE_MB = 10;
export const MAX_TOTAL_MB = 20;
export const ACCEPTED_FILES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp';

export function FileField({ label, name, hint, multiple, accept = ACCEPTED_FILES }: Base & { multiple?: boolean; accept?: string }) {
  const id = useId();
  return (
    <div className="field full">
      <label htmlFor={id}>{label}<Req /></label>
      <input id={id} name={name} type="file" multiple={multiple} accept={accept} aria-describedby={`${id}-hint`} />
      <span className="hint" id={`${id}-hint`}>
        {hint ?? `PDF, Word or image files. Up to ${MAX_FILE_MB} MB each, ${MAX_TOTAL_MB} MB in total.`}
      </span>
    </div>
  );
}

export function Consent({ children }: { children?: ReactNode }) {
  return (
    <div className="field full consent">
      <label className="option">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          {children ?? (
            <>I agree that Level Headed Building Co. may use the information I provide to respond to this inquiry, as described in
              the <Link to="/privacy">privacy policy</Link>.</>
          )}
          <span className="req" aria-hidden="true">*</span>
        </span>
      </label>
    </div>
  );
}

/** Hidden from people; bots tend to fill it. Submissions with a value are discarded server-side. */
export function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label>Leave this field empty<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
