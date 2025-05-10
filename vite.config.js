import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Hapus plugin React kalau nggak pakai JSX
  plugins: [],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/yearbook-2025-v2/', // Tambah ini untuk GitHub Pages
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        profile: fileURLToPath(new URL('./profile.html', import.meta.url)),
        gallery: fileURLToPath(new URL('./gallery.html', import.meta.url)),
        memories: fileURLToPath(new URL('./memories.html', import.meta.url)),
      },
    },
  },
});
