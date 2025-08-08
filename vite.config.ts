import { resolve } from 'path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  preview: { host: '0.0.0.0', port: 3000, open: 'http://localhost:3000' },
  server: { host: '0.0.0.0', port: 3000, open: 'http://localhost:3000' },
  plugins: [vue(), tailwindcss()],
})
