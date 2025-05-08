import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/energi-smart-view/', // questo è il nome del tuo repo
  plugins: [react()]
})
