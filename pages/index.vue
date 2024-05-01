<template>
  <div class="home">
    <div class="content">
      <div class="info">
        <h1 class="font-h2">Amsterdam</h1>
        <div class="font-body-l">
          Hoe zag het dagelijks leven in Amsterdam eruit in de Tweede Wereldoorlog? Hoe beleefden Amsterdammers hun
          stad? De Amsterdam Diaries Time Machine brengt het verleden tot leven met dagboekfragmenten van Amsterdamse
          vrouwen tijdens WOII. Navigeer door hun dagboeken. Lees over hun familie en vrienden, plaatsen en gebouwen in
          de stad.
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
            :tags="
              authors.map(a => ({
                title: Array.isArray(a.name) ? a.name.pop() : a.name,
                link: `/dagboekschrijfsters/${a.slug}`,
              }))
            " />
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
const { authors } = storeToRefs(useAuthorStore());
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: calc(var(--size-12) * 5) 1fr;
  height: 100%;
}

.content {
  @include flex-column;
  justify-content: space-between;
  padding-top: calc(var(--spacing-8) * 5);
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
