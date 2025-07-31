import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'

// Make Buffer available globally for packages that expect it
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer
}

createRoot(document.getElementById("root")!).render(<App />);
