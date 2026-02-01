
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Cast process to any to solve "Property 'cwd' does not exist on type 'Process'" error in certain environments.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    // Exact repository name for GitHub Pages
    base: '/Artifact-Oracale/',
    plugins: [react()],
    define: {
      // Direct string replacement is the most reliable way to handle env vars in Vite
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Polyfill process.env for third-party libraries that might expect it
      'process.env': {
         NODE_ENV: JSON.stringify(mode),
         API_KEY: JSON.stringify(env.API_KEY || '')
      }
    },
    build: {
      outDir: 'dist',
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
