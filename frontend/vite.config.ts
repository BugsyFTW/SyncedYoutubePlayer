import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@player': '/src/player',
      '@utils': '/src/utils',
      '@config': '/src/config',
      types: '/src/types'
    }
  }
})
