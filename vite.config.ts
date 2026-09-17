import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1600,
  },
  server: {
    watch: {
      // Ignore files with spaces in their names (causes EBUSY on Windows)
      ignored: ['**/* *'],
    },
  },
});
