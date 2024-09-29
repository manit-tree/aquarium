import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'script',
    minify: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Aquarium',
      short_name: 'Aquarium',
      description: 'Beautiful aquarium on your mobile',
      background_color: "#121212",
      theme_color: '#121212',
      orientation: "any",
      display: "fullscreen",
      id:"auarium.8columns.com",
      "icons": [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose":"any"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      screenshots: [
        {
          "src": "./screenshot-ios-01.jpg",
          "sizes": "1080x1920",
          "type": "image/jpg",
          "platform": "ios",
          "form_factor":"narrow"
        },
        {
          "src": "./screenshot-ios-02.jpg",
          "sizes": "1080x1920",
          "type": "image/jpg",
          "platform": "ios",
          "form_factor":"narrow"
        },
        {
          "src": "./screenshot-android-01.jpg",
          "sizes": "1080x1920",
          "type": "image/jpg",
          "platform": "android",
          "form_factor":"narrow"
        },
        {
          "src": "./screenshot-android-02.jpg",
          "sizes": "1080x1920",
          "type": "image/jpg",
          "platform": "android",
          "form_factor":"narrow"
        }  
      ],
      "launch_handler": {
        "client_mode":"auto" 
      },
      "categories": [
        "entertainment","kids"
      ],
      "dir":"auto",
      "prefer_related_applications": true,
      "handle_links": "preferred",
      "edge_side_panel": {
        "preferred_width": 480
      }
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    includeAssets: [
      "**/*"
    ],

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})