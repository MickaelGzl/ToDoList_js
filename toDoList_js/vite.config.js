import { defineConfig } from 'vite'

import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({ registerType: 'autoUpdate' },{includeAssets: ['public/assets/Picto_APP_512.png', 'public/assets/Picto_APP_144.png']})
  ]
})