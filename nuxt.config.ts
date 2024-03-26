export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'ress/ress.css',
    // 'assets/scss/main.scss'
  ],
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  // googleFonts: {
  //   families: {
  //     'DM Sans': true,
  //   },
  //   download: false,
  //   useStylesheet: true,
  // },
});
