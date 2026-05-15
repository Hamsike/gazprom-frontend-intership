import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Theme preset={presetGpnDefault}>
    <StrictMode>
      <App />
    </StrictMode>
  </Theme>
)
