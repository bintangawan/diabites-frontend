import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: rootDir,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      injectRegister: 'script',
      // `registerType` only controls service worker update behavior, not the app install prompt.
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      manifestFilename: 'manifest.webmanifest',
      includeAssets: [
        'images/favicon.ico',
        'images/logoicon.svg',
        'images/diabiteslogo.svg',
        'images/apple-touch-icon-180x180.png',
      ],
      manifest: {
        id: '/',
        name: 'DiaBites - Scanner Label Gizi untuk Diabetes',
        short_name: 'DiaBites',
        description:
          'DiaBites membantu pengguna memindai label gizi, memahami kandungan gula dan kalori, serta mengambil keputusan konsumsi dengan lebih cepat.',
        theme_color: '#0f766e',
        background_color: '#effcf5',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'id-ID',
        dir: 'ltr',
        categories: ['health', 'medical', 'lifestyle', 'utilities'],
        prefer_related_applications: false,
        icons: [
          {
            src: 'images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Buka Scanner',
            short_name: 'Scanner',
            description: 'Mulai scan label gizi dengan kamera DiaBites.',
            url: '/scanner',
            icons: [
              {
                src: 'images/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
          {
            name: 'Riwayat Scan',
            short_name: 'Riwayat',
            description: 'Lihat riwayat hasil scan terbaru.',
            url: '/history',
            icons: [
              {
                src: 'images/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
          {
            name: 'Komunitas',
            short_name: 'Komunitas',
            description: 'Masuk ke ruang komunitas DiaBites.',
            url: '/community',
            icons: [
              {
                src: 'images/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'diabites-pages',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'diabites-images',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'diabites-fonts',
              expiration: {
                maxEntries: 8,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
