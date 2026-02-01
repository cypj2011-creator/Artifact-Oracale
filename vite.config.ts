
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Import process to resolve TypeScript errors with process.cwd()
import process from 'process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Using relative base for easier deployment across different environments
    base: './',
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
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
