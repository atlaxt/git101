import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    '@vercel/analytics',
  ],

  css: ['assets/css/main.css'],
  colorMode: { classSuffix: '' },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
    ],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            dark: 'github-dark',
            default: 'github-light',
          },
        },
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-02-19',

  vite: {
    plugins: [tailwindcss()],
  },
})
