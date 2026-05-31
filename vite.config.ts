import { defineConfig, type PluginOption } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/  (defineConfig from vitest/config adds the `test` field type)
export default defineConfig({
  plugins: [
    react(),
    // Dev-only bundle report; `stats.html` is gitignored. Open it after `npm run build`.
    // Cast: rollup-plugin-visualizer returns a rollup Plugin whose type doesn't line up with
    // vite's Plugin under exactOptionalPropertyTypes; it is a valid Vite plugin at runtime.
    visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption,
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
