import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/add': 'http://localhost:3000', 
      '/read': 'http://localhost:3000'
    }
  }
});
