import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/expenses': 'http://localhost:3000',
      '/add': 'http://localhost:3000',
      '/edit': 'http://localhost:3000',
      '/delete': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    }
  }
})