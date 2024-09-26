import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.APP_PORT),
      host: true,
      // origin: `${env.APP_HOST}:${env.APP_PORT}`,
      // proxy: {
      //   '/api': {
      //     target: env.VITE_BACKEND_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  };
});
