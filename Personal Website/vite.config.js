import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Add React plugin for React projects
  plugins: [react()],
})