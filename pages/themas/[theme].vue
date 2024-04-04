<template>
  <div class="theme content-container">
    <div class="intro content-width">
      <h1 class="title">{{ title }}</h1>
      <span class="body-large">{{ description }}</span>
    </div>
    <div class="diaries">
      <DiaryCard
        v-for="card in diaryCards"
        :key="card.headerTitle"
        :headerTitle="card.headerTitle"
        :headerSubtitle="card.headerSubtitle"
        :content="card.content"
        :link="card.link"
        :linkText="card.linkText" />
    </div>
    <div class="related">
      <ColoredCard
        class="content-width"
        description="De interacties met familie, vrienden en buren spelen een belangrijke rol in alle verhalen."
        image="collectie-1.jpg"
        imageAlt="Interacties familie"
        link="/themas/collectie-interpersoonlijke-relaties-en-gemeenschap"
        linkText="Collectie: Interpersoonlijke Relaties en Gemeenschap"
        variant="light-purple" />
    </div>
    <Tags
      class="content-width"
      title="Anderen bekeken ook:"
      :tags="tags" />
  </div>
</template>

<script setup lang="ts">
// Temporary data
const title = ref<string>('Cultuur en Dagelijks Leven');
const description = ref<string>(
  `In oorlogstijd bood cultuur Amsterdamse vrouwen troost en kracht.
  Ze zongen om te ontsnappen aan de realiteit, uiting te geven aan hun emoties en verbondenheid te voelen.
  Muziek  en cultuur was een symbool van hoop.`,
);
const diaryCards = [
  {
    headerTitle: 'Els Polak',
    headerSubtitle: 'P.2-3',
    content: `Van de winter ga ik naar <span class="highlight">concerten</span>, ik leer bridgen. Ik weet gewoonweg niet wat ermet me gebeurd is. Die
        vrijheid die ik nu heb. Ik wordt niet achterna gereden met: <span class="highlight">piano spelen</span>, in bad.`,
    link: '/dagboeken/els-polak',
    linkText: 'Lees Els’ dagboek',
  },
  {
    headerTitle: 'Toby Vos',
    headerSubtitle: '1944-1945',
    content: `Eens zal ik een dame zijn van een jaar of veertig of misschien vijftig.
      Ik stel mij voor, dat ik dan op een <span class="highlight">zomerse dag</span> in de Haarlemse tram zit om <span class="highlight">groente</span> of
      <span class="highlight">aardappelen</span> te halen ten behoeve van mijn gezin.`,
    link: '/dagboeken/toby-vos',
    linkText: 'Lees Toby’ dagboek',
  },
  {
    headerTitle: 'Samuel',
    headerSubtitle: 'Vervolg',
    content: `En mochten de Joodsche <span class="highlight">leerlingen</span> van de Schker vraagt
      by deme aa in hoogen Ambtenaar „O nee mevrouw – Von Sysbenb geen maatregelen tegen de leerlingen" Dat is het stereotype antwoord....`,
    link: '/dagboeken/samuel',
    linkText: 'Lees Samuel’ dagboek',
  },
  {
    headerTitle: 'Dien de Jong',
    headerSubtitle: 'Juni',
    content: `Sterilisatie der Joden in Amsterdam begonnen. Ook <span class="highlight">meisjesstudenten</span>
      reeds oproepen voor arbeidsinzet!<br/><br/>Inlevering der <span class="highlight">radio</span> toestellen geeist!`,
    link: '/dagboeken/dien-de-jong',
    linkText: 'Lees Dien’ dagboek',
  },
];
const tags = ref<Tag[]>([
  { title: 'Vervoer', link: '/themas/vervoer' },
  { title: 'School', link: '/themas/school' },
  { title: 'Verzet', link: '/themas/verzet' },
  { title: 'Bevrijding', link: '/themas/bevrijding' },
  { title: 'Tweede wereldoorlog', link: '/themas/tweede-wereldoorlog' },
  { title: 'Vrije tijd', link: '/themas/vrije-tijd' },
  { title: 'Voeding', link: '/themas/voeding' },
  { title: 'Media', link: '/themas/media' },
  { title: 'Feest', link: '/themas/feest' },
]);
</script>

<style lang="scss" scoped>
.content-width {
  max-width: 43.5rem;
  width: 100%;
}

.theme {
  @include flex-column;
  align-items: center;
  margin-top: 8.25rem;
  padding-bottom: 5rem;

  .intro {
    @include flex-column;
    gap: 2rem;
  }

  .diaries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 5rem;
    margin-bottom: 7.5rem;
  }

  .related {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    margin-bottom: 5.5rem;
  }
}
</style>
