import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        company: resolve(__dirname, 'company.html'),
        contact: resolve(__dirname, 'contact.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        tech: resolve(__dirname, 'tech.html')
      }
    }
  }
});
