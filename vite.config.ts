
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/energi-smart-view/', // questo è il nome del tuo repo
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    port: 8080,
    allowedHosts: ['1df53166-26c0-4851-ac01-243a6176645c.lovableproject.com']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}))
