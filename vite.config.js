import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/botbiProyecto/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Permissions-Policy': 'interest-cohort=()',
      'Cache-Control': 'max-age=600'
    }
  }
});