<template>
  <div class="fixed-full-screen">
    <div class="content">
      <div
        class="info"
        :class="{ 'sm-hide': showNav }">
        <NuxtLink
          class="logo"
          to="/">
          <Image
            src="logos/atm-diaries.svg"
            alt="Amsterdam Diaries Time Machine" />
        </NuxtLink>
        <div class="text-info">
          <h1 class="font-h2">Amsterdam</h1>
          <TypingText
            :duration="4"
            class="font-body-l"
            text="Hoe zag het dagelijks leven in Amsterdam eruit in de Tweede Wereldoorlog? Hoe beleefden Amsterdammers hun
          stad? De Amsterdam Diaries Time Machine brengt het verleden tot leven met dagboekfragmenten van Amsterdamse
          vrouwen tijdens WOII. Navigeer door hun dagboeken. Lees over hun familie en vrienden, plaatsen en gebouwen in
          de stad." />
        </div>
      </div>
      <div>
        <LinkArrow
          v-if="!showNav"
          class="link"
          @click="showNav = !showNav"
          link-text="Ontdek het verhaal van de stad" />
        <Transition name="fade">
          <div v-if="showNav">
            <div class="font-body-l">Selecteer:</div>
            <div class="nav-links">
              <LinkArrow
                class="nav-link"
                link-text="Amsterdam"
                link="/amsterdam" />
              <LinkArrow
                class="nav-link"
                link-text="Dagboekschrijfsters"
                link="/dagboekschrijfsters" />
              <LinkArrow
                class="nav-link"
                link-text="Thema's"
                link="/themas" />
              <LinkArrow
                class="nav-link"
                link-text="Organisaties"
                link="/organisaties" />
              <LinkArrow
                class="nav-link"
                link-text="Kalender"
                link="/kalender" />
              <LinkArrow
                class="nav-link"
                link-text="Personen"
                link="/personen" />
              <LinkArrow
                class="nav-link"
                link-text="Over ATM"
                link="/about" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="background" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'transparent',
});
const showNav = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.fixed-full-screen {
  display: grid;
  grid-template-columns: var(--space-160) 1fr;
  grid-template-areas: 'content background';
  height: 100%;
}

.content {
  @include flex-column;
  gap: var(--space-5);
  grid-area: content;
  justify-content: space-between;
  padding: var(--space-12);
  padding-top: var(--space-10);
  overflow: hidden; // Needed so no scrollbar appears when link is translated off screen
  background: var(--linen);
}

.info {
  @include flex-column;
  gap: var(--space-10);
}

.text-info {
  @include flex-column;
  gap: var(--space-5);
}

.link {
  width: fit-content;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-top: var(--space-2);

  .nav-link {
    background: var(--white);
    padding: var(--space-3) var(--space-5);
  }
}

.background {
  grid-area: background;
  background: url('@/assets/images/home-bg.jpg') no-repeat bottom;
  background-size: cover;
}

@include sm-screen-down {
  .logo {
    display: none;
  }

  .fixed-full-screen {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 3fr;
    grid-template-areas:
      'background'
      'content';
  }
  .content {
    padding: var(--space-6) var(--space-4);
    overflow: initial;
  }
  .nav-links {
    gap: var(--space-2);

    .nav-link {
      padding: var(--space-3) var(--space-5);
    }
  }
}
</style>
