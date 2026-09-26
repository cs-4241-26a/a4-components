import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/login': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/session': 'http://localhost:3000',
      '/data': 'http://localhost:3000',
      '/submit': 'http://localhost:3000',
      '/update': 'http://localhost:3000',
      '/delete': 'http://localhost:3000'
    }
  },
  build: {
    outDir: 'dist'
  }
})
