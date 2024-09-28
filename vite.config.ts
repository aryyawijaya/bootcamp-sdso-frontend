import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // const proxyKey = env.VITE_API || '/api'; // Default to '/api' if the env variable is not set

  return {
    plugins: [react()],
    server: {
      port: Number(env.APP_PORT),
      host: true,
      // origin: `${env.APP_HOST}:${env.APP_PORT}`,
      // proxy: {
      //   [proxyKey]: {  // Use dynamic key here
      //     target: env.VITE_API,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(new RegExp(`^${proxyKey}`), ''),  // Update rewrite to use dynamic key
      //   },
      // },
    },
  };
});
