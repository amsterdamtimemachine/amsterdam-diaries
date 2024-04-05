<template>
  <BasePage class="about">
    <h1>{{ pageTitle }}</h1>
    <p
      v-for="(paragraph, idx) in paragraphs"
      :key="idx"
      v-html="paragraph" />
  </BasePage>
  <div class="cards">
    <ColoredCard
      v-for="(card, idx) in cards"
      :key="idx"
      :description="card.description"
      image="els-polak.png"
      image-alt="[TODO image alt]"
      link="/"
      :linkText="card.linkText"
      :variant="card.variant" />
  </div>
  <NuxtLink
    to="/"
    class="link body-large">
    <span>Bekijk de gebeurtenissen in de stad</span>
    <BaseIcon
      class="arrow-icon"
      icon="mdi:arrow-right" />
  </NuxtLink>
  <Map
    class="map"
    marker-variant="light-pink"
    :markers="markers"
    :zoom="14.3" />
</template>

<script setup lang="ts">
/**
 * Metadata
 */
definePageMeta({
  layout: 'about',
});

const markers = [
  {
    lat: 52.35876,
    lng: 4.87177,
  },
  {
    lat: 52.3646,
    lng: 4.8863,
  },
  {
    lat: 52.377,
    lng: 4.8884,
  },
  {
    lat: 52.372,
    lng: 4.8949,
  },
  {
    lat: 52.374,
    lng: 4.9006,
  },
  {
    lat: 52.3688,
    lng: 4.902,
  },
  {
    lat: 52.3595,
    lng: 4.9124,
  },
  {
    lat: 52.3682,
    lng: 4.9165,
  },
  {
    lat: 52.3595,
    lng: 4.8984,
  },
];

const colors: CardColor[] = ['light-red', 'light-pink', 'light-yellow', 'light-green', 'light-purple', 'light-blue'];
const data: any[] = [
  {
    description:
      'Centraal in alle verhalen staat de impact van de Tweede Wereldoorlog en de Duitse bezetting op het dagelijks leven in Nederland.',
    linkText: 'Collectie: Oorlog en Bezetting',
  },
  {
    description: `Zij beschrijven de worsteling om autonomie en zelfexpressie te behouden in een tijd waarin deze vrijheden ernstig beperkt werden.`,
    linkText: 'Collectie: Persoonlijke Vrijheid en Onafhankelijkheid',
  },
  {
    description: `Dit thema belicht de tragische realiteit van systematische discriminatie en de impact ervan op individuen en gemeenschappen.`,
    linkText: 'Collectie: Jodenvervolging en Antisemitisme',
  },
  {
    description: `Dit omvat zowel fysiek als meer subtiele vormen van verzet, het behoud van culturele identiteit humor en momenten van vreugde ondanks de omstandigheden.`,
    linkText: 'Collectie: Verzet en Overleving',
  },
  {
    description: `De interacties met familie, vrienden en buren spelen een belangrijke rol in alle verhalen. `,
    linkText: 'Collectie: Interpersoonlijke Relaties en Gemeenschap',
  },
  {
    description: `Dit gaat over het begrijpen van haar eigen identiteit en plaats in een veranderende wereld.`,
    linkText: 'Collectie: Reflectie en Zelfbewustzijn',
  },
  {
    description: `Er is een algemeen besef van het leven in een historisch significante tijd, met reflecties over hoe deze periode zal worden herinnerd.`,
    linkText: 'Collectie: Verandering van Tijd en Geschiedenis',
  },
  {
    description: `Zij beschrijven de worsteling om autonomie en zelfexpressie te behouden in een tijd waarin deze vrijheden ernstig beperkt werden.`,
    linkText: 'Collectie: Cultuur en Dagelijks Leven',
  },
];

const pageTitle = ref<string>('Amsterdam Time Machine');
const paragraphs = ref<string[]>([
  `De Amsterdam Time Machine (ATM) is een openbare onderzoeksbron over de geschiedenis van Amsterdam. Het wordt
  momenteel gecoördineerd door het CREATE onderzoeksprogramma van de Universiteit van Amsterdam en aangedreven door
  een consortium van mensen en instellingen in de academische wereld, cultureel erfgoed en het bedrijfsleven.`,
  `De Amsterdam Time Machine (ATM) is in 2017 gestart als een hub voor gekoppelde historische gegevens over
  Amsterdam. Om het verleden van Amsterdam digitaal te ontsluiten, brengen we inspanningen op het gebied van de
  academische wereld, cultureel erfgoed, het bedrijfsleven en de informatica samen. Uiteindelijk zal het web van
  informatie over mensen, plaatsen, relaties, gebeurtenissen en objecten zich ontvouwen in tijd en ruimte door
  middel van geografische en 3D-weergaven. Terwijl we daaraan werken, willen we toegang geven tot de drie bouwstenen
  van de Tijdmachine: een Linked Data cloud visualisatie genaamd ALiDa; historische kaarten en andere
  georeferentiegegevens; en 3D reconstructies. Lees meer.`,
  `In de Tijdmachine kunnen gebruikers terug in de tijd reizen en door de stad navigeren op het niveau van buurten,
  straten, huizen en kamers, en uiteindelijk inzoomen op de afbeeldingen die de muren sierden. De systematische
  koppeling van datasets uit heterogene bronnen stelt gebruikers in staat om historische informatie op te halen,
  publieke interfaces te ondersteunen en nieuwe vragen te stellen over bijvoorbeeld culturele gebeurtenissen, het
  dagelijks leven, sociale relaties of het gebruik van de openbare ruimte in de stad Amsterdam.`,
  `ATM maakt gebruik van state-of-the-art computationele methoden en technieken en zal zorgvuldig worden geannoteerd
  met betrekking tot onzekerheden en vaagheden die inherent zijn aan historische gegevens.`,
]);

/**
 * Computed Properties
 */
const cards = computed(() => {
  return data.map((card, index) => {
    card.variant = colors[index % 6];
    return card;
  });
});
</script>

<style lang="scss" scoped>
.about {
  margin-top: 10rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: -2rem;
  z-index: 3;
  margin-bottom: 10rem;
  gap: 6rem;

  .card {
    max-width: 28.6875rem;
    max-height: 15rem;

    &:nth-child(4n + 1) {
      margin-top: 0rem;
      margin-left: 7rem;
    }
    &:nth-child(4n + 2) {
      margin-top: 8rem;
      margin-left: 5rem;
    }
    &:nth-child(4n + 3) {
      margin-top: -5rem;
      margin-left: 1rem;
    }
    &:nth-child(4n + 4) {
      margin-top: 5rem;
      margin-left: 5rem;
    }
  }
}

.map {
  margin-bottom: 5rem;
}

.link {
  align-self: flex-start;
  color: var(--black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  text-decoration: none;

  .arrow-icon {
    flex: none;
  }
}
</style>
