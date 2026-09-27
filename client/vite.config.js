import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/notes': 'http://localhost:3000',
      '/submit': 'http://localhost:3000',
      '/update': 'http://localhost:3000',
      '/delete': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    }
  }
})