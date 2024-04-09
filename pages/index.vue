<template>
  <div class="home">
    <div class="content">
      <div class="info">
        <h1 class="font-h2">Amsterdam</h1>
        <div class="font-body-l">
          Stap in de schoenen van Amsterdammers die de Tweede Wereldoorlog meemaakten. Beleef de impact van bezetting en
          terreur op hun dagelijks leven, hun strijd voor vrijheid en normaliteit, en de moed die ze toonden in het
          verzet tegen de vijand.
        </div>
      </div>
      <div class="bottom">
        <Transition name="slide">
          <LinkArrow
            v-if="!showAuthors"
            @click="showAuthors = !showAuthors"
            link-text="Ontdek het verhaal van de stad" />
        </Transition>
        <Transition name="fade">
          <Tags
            v-if="showAuthors"
            class="tags"
            title="Selecteer een auteur:"
            :tags="authors" />
        </Transition>
      </div>
    </div>
    <div class="background" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home',
});
const showAuthors = ref<boolean>(false);
// TODO: Replace authors with actual authors from api
const authors = [
  {
    title: 'Els Polak',
    link: '/dagboeken/els-polak',
  },
  {
    title: 'Toby Vos',
    link: '/dagboeken/toby-vos',
  },
  {
    title: 'Dien de Jong',
    link: '/dagboeken/dien-de-jong',
  },
  {
    title: 'Samuel',
    link: '/dagboeken/samuel',
  },
  {
    title: 'Jan',
    link: '/dagboeken/jan',
  },
  {
    title: 'Truus',
    link: '/dagboeken/truus',
  },
  {
    title: 'Kees',
    link: '/dagboeken/kees',
  },
  {
    title: 'Gerda',
    link: '/dagboeken/gerda',
  },
];
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 27.75rem 1fr;
  height: 100%;
}

.content {
  @include flex-column;
  justify-content: space-between;
  padding-top: calc(var(--spacing-9) * 6);
  padding-inline: var(--inner-page-padding);
  padding-bottom: var(--spacing-12);
  overflow: hidden; // Needed so no scrollbar appears when link is translated off screen
}

.info {
  @include flex-column;
  gap: var(--spacing-6);
}

.bottom {
  position: relative;
  bottom: 0;

  > * {
    position: absolute;
    bottom: 0;
  }
}

.tags {
  width: 100%;

  :deep(ul) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    a {
      width: 100%;
    }
  }
}

.background {
  background: url('@/assets/images/home-bg.jpg') no-repeat bottom;
  background-size: cover;
}

// Transitions
.slide-enter-active,
.slide-leave-active {
  transition: var(--transition-2);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(300%); // Translates off screen
}
</style>
