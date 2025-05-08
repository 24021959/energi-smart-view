
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/energi-smart-view/', // questo è il nome del tuo repo
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: ['1df53166-26c0-4851-ac01-243a6176645c.lovableproject.com']
  }
})
