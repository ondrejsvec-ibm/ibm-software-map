import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.VUE_APP_CONTEXT_PATH,
    head: {
      title: 'Product Table',
      link: [
        {rel: 'icon', type: "image/x-icon", href: process.env.VUE_APP_CONTEXT_PATH+'/favicon.ico'}
      ]
    },
  },
  css: [
    '@/assets/scss/index.scss'
  ],
  modules: [
    '@pinia/nuxt',
    '@intlify/nuxt3'
  ],
  build: {
    transpile: process.env.NODE_ENV === 'production'
    ? [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        'ts-invariant/process',
        '@apollo/client',
        '@carbon/vue',
        '@vue/apollo-composable',
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@css-render/plugin-bem',
        '@juggle/resize-observer',
        'date-fns'
      ]
    : [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        'ts-invariant/process',
        '@apollo/client',
        '@carbon/vue',
        '@vue/apollo-composable',
        '@juggle/resize-observer'
    ]
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: "en",
      allowComposition: true,
      globalInjection: true,
      fallbackLocale: "en",
      availableLocales: ["en"]
    }
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.VUE_APP_API_ENDPOINT
    }
  },
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development'
      ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
      : []
    },
    define: {
      '__DEV__': (process.env.NODE_ENV === 'development').toString()
    }
  }
})
