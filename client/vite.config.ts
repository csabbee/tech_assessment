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
      '@utils': resolve(__dirname, './src/utils'),
      '@designTokens': resolve(__dirname, '../design-tokens'),
      '@src': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})
