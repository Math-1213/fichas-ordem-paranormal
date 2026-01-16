import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Isso aqui libera QUALQUER host/IP para acessar seu servidor Vite
    allowedHosts: true, 
    
    // Aproveite e garanta que o host está em 0.0.0.0 para o túnel não se perder
    host: true, 
    port: 5173
  }
})