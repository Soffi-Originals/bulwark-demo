import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    host: true,
    allowedHosts: ['.soffi.ai', 'localhost'],
  },
  preview: {
    host: true,
    allowedHosts: ['.soffi.ai', 'localhost'],
  },
})
