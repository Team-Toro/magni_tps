import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://backend:3001'

  return {
    plugins: [react()],
    server: {
      allowedHosts: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/webhooks': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/login': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/participantes': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
