import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const pagesBasePath = process.env.PAGES_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? '/lembrai-site' : '')

export default defineConfig({
  base: `${pagesBasePath.replace(/\/$/, '')}/`,
  plugins: [react(), tailwindcss()],
})
