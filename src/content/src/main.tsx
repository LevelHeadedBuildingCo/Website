import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>
);

// Pages are pre-rendered at build time; hydrate them. In `npm run dev` the root is empty, so render.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
