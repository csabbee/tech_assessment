import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
      '@types': resolve(__dirname, './src/types.ts'),
      '@designTokens': resolve(__dirname, '../design-tokens'),
    },
  },
  plugins: [react()],
})
