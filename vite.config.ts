import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import ViteRestart from 'vite-plugin-restart'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    ViteRestart({
      restart: ['.env.development', 'vite.config.ts']
    })
  ],
  server: {
    port: 5178,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
