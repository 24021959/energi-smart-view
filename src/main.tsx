
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/useAuthContext'
import { Toaster } from 'sonner'
import { APP_CONFIG } from './lib/config'

console.log("Application initializing with base path:", APP_CONFIG.basePath);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={APP_CONFIG.basePath}>
    <AuthProvider>
      <App />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  </BrowserRouter>
);
