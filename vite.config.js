import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from 'vite-plugin-sitemap'

const ensureOutDirExists = () => {
  let outDir = 'dist'

  return {
    name: 'ensure-out-dir-exists',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    buildStart() {
      mkdirSync(resolve(process.cwd(), outDir), { recursive: true })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    ensureOutDirExists(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Negele Easy Ride',
        short_name: 'Easy Ride',
        description: 'Official Negele Borena Transport Authority Booking Portal',
        theme_color: '#F97316',
        background_color: '#FFFFFF',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    Sitemap({
      hostname: 'https://negele-easy-ride-clone.vercel.app/',
      generateRobotsTxt: false,
      dynamicRoutes: ['/search-results', '/booking', '/confirmation', '/driver', '/admin-dashboard']
    })
  ],
})
