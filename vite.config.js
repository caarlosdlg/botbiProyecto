import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/botbiProyecto/', // Ensure this is the correct repository name
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
