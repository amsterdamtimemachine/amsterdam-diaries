export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['ress/ress.css', 'assets/scss/main.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@vueuse/nuxt', '@nuxtjs/device'],
  googleFonts: {
    families: {
      'Hanken Grotesk': true,
      'Schibsted Grotesk': true,
      'Familjen Grotesk': true,
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
      getAuthorsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-authors/1/run',
      getDiariesOfAuthorUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-diaries-of-author/1/run',
      getEntriesOfDiaryUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-entries-of-diary/1/run',
      getAnnotationsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-annotations/1/run',
      getTextUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-text/8/run',
      getLocationsPerAuthorUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-locations-per-author/2/run',
      personBaseUri: 'http://www.wikidata.org/entity/',
      imageServerUri: 'https://images.diaries.amsterdamtimemachine.nl/iiif',
    },
  },
  app: {
    head: {
      title: 'Amsterdam Diaries Time machine',
    },
  },
});
