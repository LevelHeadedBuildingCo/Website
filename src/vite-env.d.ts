/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_SHOW_DRAFTS?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  turnstile?: {
    render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    reset: (id?: string) => void;
    remove: (id?: string) => void;
  };
}
