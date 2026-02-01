import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from the project root.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    // Set base to the repository name for correct asset loading on GitHub Pages
    base: '/Artifact-Oracale/',
    plugins: [react()],
    define: {
      // Ensure the API key is always a string
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