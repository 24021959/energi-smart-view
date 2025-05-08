
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ConfigEnv, Plugin, UserConfig, ResolvedConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const baseUrl = '/energi-smart-view';
  
  return {
    base: baseUrl,
    plugins: [
      react(),
      // Conditional dynamic plugin for development mode
      mode === 'development' && {
        name: 'dynamic-lovable-tagger',
        configResolved: async (config: ResolvedConfig): Promise<void> => {
          try {
            const module = await import('lovable-tagger');
            if (module && typeof module.componentTagger === 'function') {
              const plugin = module.componentTagger();
              // Call the plugin's hooks manually if needed
              return;
            }
          } catch (e) {
            console.warn('Failed to load lovable-tagger:', e);
          }
        }
      },
    ].filter(Boolean) as Plugin[],
    server: {
      port: 8080,
      allowedHosts: ['1df53166-26c0-4851-ac01-243a6176645c.lovableproject.com']
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  };
});
