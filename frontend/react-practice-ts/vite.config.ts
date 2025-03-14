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
        noEmit: true, // 타입 오류 무시하고 빌드
        skipLibCheck: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
