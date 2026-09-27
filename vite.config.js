import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [ react() ],
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/data': 'http://localhost:3000',
      '/submit': 'http://localhost:3000',
      '/edit': 'http://localhost:3000',
      '/delete': 'http://localhost:3000',
      '/auth': 'http://localhost:3000'
    }
  }
})
