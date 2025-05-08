import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {properties} from "./properties.js";

  export default defineConfig({
    plugins: [react()],
    base: "/battleship",
    server: {
      proxy: {
        '/api': {
          target: properties.baseURL,
          changeOrigin: true,
          secure: true,
        },
        '/play': {
          target: properties.webSocketURL,
          changeOrigin: true,
          secure: true,
          wss: true
        }
      }
    }
  })
