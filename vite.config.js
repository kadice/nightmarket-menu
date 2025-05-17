import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/nightmarket-menu/', // 👈 這行超重要！
  plugins: [
    vue(),
    tailwindcss(),
  ],
})