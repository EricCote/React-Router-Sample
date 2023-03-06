import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() /* eslint()*/],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
});
