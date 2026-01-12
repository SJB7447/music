/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 가이드라인에 따라 process.env.API_KEY를 브라우저 환경에서 사용할 수 있도록 주입합니다.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});