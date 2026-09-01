import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    {
      name: 'log-port',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const addr = server.httpServer.address();
          const port = typeof addr === 'object' && addr !== null ? addr.port : 5173;
          console.log(`\n  ➜  Dev server running on http://localhost:${port}/ (HMR enabled)\n`);
        });
      },
    },
  ]
});
