import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, '../src/data'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@parentTypes': path.resolve(__dirname, '../src/types'),
    },
  },
  assetsInclude: ['**/*.pdf', '**/*.png', '**/*.jpg', '**/*.svg'],
});
