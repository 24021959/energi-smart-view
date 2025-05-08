
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/useAuthContext'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/energi-smart-view/">
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
