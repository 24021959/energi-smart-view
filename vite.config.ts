
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/energi-smart-view/', // questo è il nome del tuo repo
  plugins: [
    react(),
    // Modified to handle ESM module correctly
    mode === 'development' && {
      name: 'dynamic-lovable-tagger',
      async configResolved(config) {
        if (mode === 'development') {
          try {
            const module = await import('lovable-tagger');
            const plugin = module.componentTagger();
            return plugin;
          } catch (e) {
            console.warn('Failed to load lovable-tagger:', e);
          }
        }
      }
    },
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
