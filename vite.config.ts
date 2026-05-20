import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Soffi's deployment proxy targets container port 3000. PORT env var
    // wins locally so devs can still run on another port if 3000 is busy.
    port: Number(process.env.PORT) || 3000,
    host: true,
    strictPort: false,
    allowedHosts: true,
  },
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    allowedHosts: true,
  },
})
