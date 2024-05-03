export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['ress/ress.css', 'assets/scss/main.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@vueuse/nuxt', '@nuxtjs/device', '@nuxtjs/robots'],
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
      getAuthorsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-authors/1/run',
      getDiariesOfAuthorUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-diaries-of-author/1/run',
      getEntriesOfDiaryUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-entries-of-diary/1/run',
      getAnnotationsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-annotations/1/run',
      getAnnotationContextUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-annotation-context/2/run',
      getEntityAnnotationsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-entity-annotations/2/run',
      getConceptAnnotationsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-concept-annotations/2/run',
      getTextUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-text/8/run',
      getLocationsPerAuthorUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-locations-per-author/2/run',
      entityBaseUri: 'http://www.wikidata.org/entity/',
      imageServerUri: 'https://images.diaries.amsterdamtimemachine.nl/iiif',
      entryBaseUri: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/',
      conceptBaseUri: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/entities/',
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
});
