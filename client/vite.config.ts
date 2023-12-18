import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [react()],
})
