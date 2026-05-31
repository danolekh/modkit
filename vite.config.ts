import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/  (defineConfig from vitest/config adds the `test` field type)
export default defineConfig({
  plugins: [
    react(),
    // Dev-only bundle report; `stats.html` is gitignored. Open it after `npm run build`.
    visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }),
  ],
  build: {
    target: 'es2022',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
