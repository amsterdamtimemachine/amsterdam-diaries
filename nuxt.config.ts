export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['ress/ress.css', 'assets/scss/main.scss'],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
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
      getAuthorsUri: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-authors/run',
      getAllDiaries: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-all-diaries/run',
      // + ?entry=entryURL
      getText: 'https://api.lod.uba.uva.nl/queries/ATM/atm-diaries-get-text/run',
      // TODO: Optimize this
      bookBaseUri: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/',
      entryBaseUri: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/',
    },
  },
});
