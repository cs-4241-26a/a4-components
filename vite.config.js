import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({

  plugins: [svelte()],
  publicDir: false,
  build: {

    outDir: 'public/dist',
    emptyOutDir: true,
    rollupOptions: {

      input: 'src/main.js',
      output: {

        entryFileNames: 'bundle.js',
        assetFileNames: 'bundle.css'
      }
    }
  }
});