import path from "path";
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
      '@': path.resolve(__dirname, "./src"),
      '@components': '/src/components',
      '@config': '/src/config',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@utils': '/src/utils',
      types: '/src/types'
    }
  }
})
