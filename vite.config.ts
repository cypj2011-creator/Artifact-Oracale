import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from the project root.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    // Set base to the exact repository name for GitHub Pages
    base: '/Artifact-Oracale/',
    plugins: [react()],
    define: {
      // Safely stringify the API key to prevent build-time errors
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    server: {
      port: 3000,
      host: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});