import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The React app lives in client/ and is built into dist/, which Express
// serves (behind the login check) at /app. In development, `npm run dev`
// starts Vite on :5173 and proxies API/auth calls to Express on :3000.
export default defineConfig({
  root: 'client',
  base: '/app/',
  plugins: [ react() ],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/cars': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/css': 'http://localhost:3000'
    }
  }
})
