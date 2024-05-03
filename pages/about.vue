<template>
  <BasePage class="about">
    <h2 class="font-h2">{{ atmTitle }}</h2>
    <p
      v-for="(paragraph, idx) in atmParagraphs"
      :key="idx"
      v-html="paragraph" />
    <h2 class="font-h2">{{ adTitle }}</h2>
    <p
      v-for="(paragraph, idx) in adParagraphs"
      :key="idx"
      v-html="paragraph" />
    <div class="logos">
      <NuxtLink
        v-for="logo of logos"
        :key="logo.name"
        class="logo"
        :to="logo.url"
        target="_blank">
        <Image
          :src="logo.src"
          :alt="logo.name" />
      </NuxtLink>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
/*
 * Metadata
 */
definePageMeta({
  layout: 'about',
});

const atmTitle = ref<string>('Amsterdam Time Machine');
const atmParagraphs = ref<string[]>([
  `<a href="https://www.amsterdamtimemachine.nl/" target="_blank">De Amsterdam Time Machine (ATM)</a> is een open
  onderzoeksinfrastructuur over de geschiedenis van Amsterdam. In deze ‘Google Earth van het verleden’ zullen gebruikers uiteindelijk
  terug in de tijd kunnen reizen en door de stad navigeren op het niveau van buurten, straten en huizen. Onder leiding van de UvA wordt
  samengewerkt met partners uit het veld van onderzoek, erfgoed, de creatieve industrie en met maatschappelijke organisaties.
  Het doel is alle digitale historische data van de stad en haar inwoners met elkaar te verbinden en te koppelen aan historische kaarten
  en 3D modellen. Daarnaast wil de ATM bijdragen aan de toekomstige inrichting van de stad onder het motto
  ‘Understanding the past to help shape the future’.`,
]);

const adTitle = ref<string>('Amsterdam Diaries');
const adParagraphs = ref<string[]>([
  `Amsterdam Diaries is een samenwerkingsproject onder leiding van de UvA en VU dat persoonlijke verhalen van Amsterdammers
  verzamelt en bestudeert om tot een beter begrip te komen van het leven in de stad door de eeuwen heen. Doel van dit project
  is om met onderzoek naar dagboeken en andere egodocumenten bij te dragen aan de lange geschiedenis van Amsterdam van diversiteit
  door de verhalen van stadsbewoners met een verschillende culturele en socio-economische achtergrond bijeen te brengen.`,
  `Voor de nieuwe applicatie is een selectie gemaakt van een aantal dagboeken uit het Amsterdam Diaries-project.
  De dagboeken komen uit de collecties van het Stadsarchief, Atria, het Joods Cultureel Kwartier en het Verzetsmuseum.
  Het betreft dagboeken die alle gaan over de periode van de Tweede Wereldoorlog.
  Door het combineren van de dagboekfragmenten van deze bijzondere vrouwen ontstaat een persoonlijke blik op een
  roerige periode in de Amsterdamse geschiedenis.`,
  `We zijn geïnteresseerd in aanvullend materiaal en andere verhalen van vrouwen in Amsterdam tijdens de Tweede Wereldoorlog.
  Contact opnemen kan via het e-mailadres <a href="mailto:m.j.m.rensen@uva.nl">m.j.m.rensen@uva.nl</a>.`,
  `De applicatie is ontwikkeld door <a href="https://www.totaldesign.com/" target="_blank">Total Design</a>,
  met steun van het <a href="https://netwerkdigitaalerfgoed.nl/" target="_blank">Netwerk Digitaal Erfgoed.</a>`,
]);

const logos = ref<{ name: string; src: string; url: string }[]>([
  {
    name: 'Amsterdam Time Machine',
    src: 'logos/atm.svg',
    url: 'https://www.amsterdamtimemachine.nl/',
  },
  {
    name: 'Netwerk Digitaal Erfgoed',
    src: 'logos/nde.png',
    url: 'https://netwerkdigitaalerfgoed.nl/',
  },
  {
    name: 'UvA',
    src: 'logos/uva.png',
    url: 'https://www.uva.nl/',
  },
  {
    name: 'VU',
    src: 'logos/vu.png',
    url: 'https://www.vu.nl/',
  },
  {
    name: 'Gemeente Amsterdam Stadsarchief',
    src: 'logos/gas.png',
    url: 'https://www.amsterdam.nl/stadsarchief/',
  },
  {
    name: 'Joods Cultureel Kwartier',
    src: 'logos/jck.png',
    url: 'https://jck.nl/',
  },
  {
    name: 'Atria',
    src: 'logos/atria.png',
    url: 'https://atria.nl/',
  },
  {
    name: 'Verzetsmuseum',
    src: 'logos/vrm.png',
    url: 'https://www.verzetsmuseum.org/',
  },
  {
    name: 'Total Design',
    src: 'logos/td.png',
    url: 'https://totaldesign.com/',
  },
]);
</script>

<style lang="scss" scoped>
.about {
  margin-top: calc(var(--page-margin) * 2);
  margin-bottom: var(--page-margin);

  h2 {
    margin-bottom: var(--size-9);
  }

  p {
    margin-bottom: var(--size-8);
  }
}

.logos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, calc(var(--size-12) - var(--size-4)));
  gap: var(--spacing-6);

  .logo {
    display: flex;
    align-items: center;
    background: var(--white-paper);
    padding: var(--spacing-9);
  }

  img {
    width: 100%;
  }
}
</style>
