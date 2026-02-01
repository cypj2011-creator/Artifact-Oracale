import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
  // Load environment variables from the project root.
  // Explicitly importing 'process' resolves TypeScript errors where the global 'process' type might be incorrectly inferred as a browser-only shim.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Set base to the exact repository name for GitHub Pages deployment.
    // GitHub Pages URL: https://cypj2011-creator.github.io/Artifact-Oracale/
    base: '/Artifact-Oracale/',
    plugins: [react()],
    define: {
      // Safely inject the API key and polyfill process.env for browser usage.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env': {
         NODE_ENV: JSON.stringify(mode),
         API_KEY: JSON.stringify(env.API_KEY || '')
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: true
    }
  };
});
