import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/battleship",
  server: {
    proxy: {
      '/play': {
        target: 'https://yippikayey.duckdns.org',
        changeOrigin: true,
        secure: true,
        ws: true
      }
    }
  }

})
