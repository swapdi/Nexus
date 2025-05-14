// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: true,
  build: {
    transpile: ['trpc-nuxt']
  },
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  imports: {
    dirs: ['./stores']
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Nexus',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  runtimeConfig: {
    openAIKey: process.env.OPENAI_API_KEY,
    public: {
      debugMode: true,
      siteRootUrl: process.env.URL || 'http://localhost:3000' // URL env variable is provided by netlify by default
    }
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/signin',
      callback: '/confirm'
    }
  }
});
