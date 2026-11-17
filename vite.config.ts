import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // The SSR build writes to dist-ssr; keep the client build intact.
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  ssr: {
    noExternal: ['marked'],
  },
});
