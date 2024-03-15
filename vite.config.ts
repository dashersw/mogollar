import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'
import pugPlugin from 'vite-plugin-pug'

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.js',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.js'),
      },
      entry: "electron/main.js",
      vite: {
        build: {
          target: 'electron-main', 
          outDir: 'dist', 
          electronBuilder: {
            externals: ['mongoose'], 
            nodeIntegration: true 
            
          }
        },
      },
    }),
    pugPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
