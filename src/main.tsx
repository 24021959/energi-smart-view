
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/useAuthContext'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/energi-smart-view/">
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </BrowserRouter>
);
