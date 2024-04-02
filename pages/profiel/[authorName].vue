<template>
  <div class="profile">
    <div class="two-column">
      <div class="left">
        <div class="intro">
          <h1 class="title">{{ title }}</h1>
          <span class="body-large">{{ description }}</span>
        </div>
        <p
          class="paragraph"
          v-for="(paragraph, index) in paragraphs"
          :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div class="right">
        <img
          class="image"
          src="@/assets/photos/els-polak.png"
          alt="Els Polak" />
        <img
          class="image"
          src="@/assets/photos/els-polak-building.png"
          alt="Building" />
      </div>
    </div>
    <Map
      class="map"
      marker-variant="light-pink"
      :markers="markers"
      :zoom="14.3" />
    <div class="two-column">
      <div class="left">
        <p
          class="paragraph"
          v-for="(paragraph, index) in paragraphs2"
          :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div class="right">
        <ColoredCard variant="light-yellow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const title = ref<string>(`Els Polak`);

const description =
  ref<string>(`Els Polak deelt haar ervaringen in Amsterdam tijdens de Tweede Wereldoorlog, van haar onafhankelijkheid in een
  atelier aan de Prinsengracht tot de dagelijkse uitdagingen en vreugden tegen de achtergrond van de oorlog. Haar
  teksten belichten haar persoonlijke groei en de impact van de oorlogstijd.`);

const paragraphs = ref<string[]>([
  `Els Polak is een jonge vrouw die onlangs naar Amsterdam is verhuisd om een nieuwe fase in haar leven te beginnen,
  vol van vrijheid en zelfontdekking. Ze heeft examen gedaan, is geslaagd, en woont nu in een atelier achter in de
  tuin van Fem en Frits, gescheiden van het andere huis door een stevige muur. Dit nieuwe thuis, gelegen aan de
  Prinsengracht 905, biedt haar een eigen plek, compleet met een divan, bed, witte grof geweven gordijnen, een
  elektrische haard, en betegelde wanden met open kastjes en planken. Ze heeft de beschikking over eigen
  huissleutels, zowel van het atelier als van het huis.`,
  `Els is ondergedompeld in het sociale leven en de
  culturele mogelijkheden die de stad haar biedt. Ze woont vlakbij vrienden en familie, gaat naar lessen, zoals
  naailessen van Uli Citroen en plant om concerten te bezoeken en te leren bridgen. Haar dagen zijn gevuld met de
  vrijheid om haar eigen keuzes te maken, van lezen tot aan het al dan niet roken van sigaretten, een vrijheid die
  nieuw voor haar is na een leven van structuur en verwachtingen.`,
  `Haar academische en sociale leven
  bloeit; ze haalt haar lesrooster op, bezoekt een Montessorischool, en maakt plannen voor de weekenden. Ze staat op
  het punt nieuwe vrienden te maken tijdens haar cursussen en is benieuwd naar de toekomstige relaties die ze zal
  vormen, met name met een medecursist wiens naam ze hoopt te onthouden.`,
]);

const paragraphs2 = ref<string[]>([
  `Els ervaart ook de zorgen en onzekerheden van het leven in een tijd van oorlog, met verduisteringsmaatregelen en
  afweergeschut dat naar de kust wordt verplaatst. Ondanks deze externe spanningen blijft ze zich concentreren op
  haar persoonlijke ontwikkeling en sociale interacties, waarbij ze geniet van de kleine momenten van geluk en
  comfort die haar nieuwe leven haar biedt.`,
  `Ze toont een onafhankelijke geest, met plannen om zelfstandig
  te blijven, terwijl ze ook geniet van de zorg en het gezelschap van mensen om haar heen. Haar leven in Amsterdam
  is een mengeling van persoonlijke vrijheid, academische streven, en sociale verbondenheid, allemaal onder de
  schaduw van de grotere gebeurtenissen die zich in de wereld afspelen.`,
]);
</script>

<style lang="scss" scoped>
.profile {
  @include flex-column;
  margin-top: 5rem;
  gap: 4rem;
  padding-bottom: 5rem;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'left right';
  gap: 2rem;
}

.left {
  @include flex-column;
  grid-area: left;
  gap: 2rem;
  margin-left: 3rem;

  .intro {
    @include flex-column;
    gap: 2rem;
    margin-top: 8rem;
    margin-bottom: 8rem;
  }
}

.right {
  @include flex-column;
  grid-area: right;
  justify-content: space-between;
  align-items: center;

  .image {
    max-width: 29rem;
  }
}
</style>
