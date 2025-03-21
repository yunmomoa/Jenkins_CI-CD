import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', // global 변수를 globalThis로 설정 - 채팅 사용
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        noEmit: false, 
        skipLibCheck: true
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://13.209.197.216/:8003',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
