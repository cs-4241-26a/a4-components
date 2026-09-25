import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The React client lives in /client and builds into /dist, which server.js
// serves (behind the login check) as the main app page.
export default defineConfig({
  root: 'client',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  // `npm run dev:client` runs Vite on :5173 and forwards API calls to the
  // Express server on :3000 so sessions/cookies work the same as in production.
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
