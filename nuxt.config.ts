export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['ress/ress.css', 'assets/scss/main.scss'],
  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@hypernym/nuxt-gsap',
    '@samk-dev/nuxt-vcalendar',
  ],
  gsap: {
    composables: true,
    extraPlugins: {
      text: true,
    },
  },
  googleFonts: {
    families: {
      'Hanken Grotesk': true,
      'Schibsted Grotesk': true,
      'Familjen Grotesk': true,
    },
  },
  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '/',
    },
  },
  imports: {
    dirs: ['helpers/**', 'data'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/mixins.scss";',
        },
      },
    },
  },
  runtimeConfig: {
    app: {
      dbHost: '',
      dbName: '',
      dbUser: '',
      dbPass: '',
      dbPort: '',
      entityBaseUri: 'http://www.wikidata.org/entity/',
      imageServerUri: 'https://images.diaries.amsterdamtimemachine.nl/iiif',
      maxBounds: [
        [52.3815, 4.9576],
        [52.328, 4.836],
      ],
    },
  },
  app: {
    head: {
      title: 'Amsterdam Diaries Time machine',
    },
  },
  compatibilityDate: '2024-09-09',
});
