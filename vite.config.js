// File: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ✅ Tambahkan ini
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()], // ✅ Tambahkan ini agar Vite tahu kamu pakai JSX
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        profile: 'profile.html',
        gallery: 'gallery.html',
        memories: 'memories.html'
      }
    }
  }
})
