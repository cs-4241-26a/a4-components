import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // public/ already holds Express's own static assets for the login page
  // (login.html, css/main.css, js/login.js) - keep Vite out of it.
  publicDir: false,
  plugins: [react()]
})
