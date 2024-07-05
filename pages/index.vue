<template>
  <div class="fixed-full-screen">
    <div class="content">
      <div
        class="info"
        :class="{ 'sm-hide': showAuthors }">
        <h1 class="font-h2">Amsterdam</h1>
        <div class="font-body-l">
          Hoe zag het dagelijks leven in Amsterdam eruit in de Tweede Wereldoorlog? Hoe beleefden Amsterdammers hun
          stad? De Amsterdam Diaries Time Machine brengt het verleden tot leven met dagboekfragmenten van Amsterdamse
          vrouwen tijdens WOII. Navigeer door hun dagboeken. Lees over hun familie en vrienden, plaatsen en gebouwen in
          de stad.
        </div>
      </div>
      <div>
        <LinkArrow
          v-if="!showAuthors"
          class="link"
          @click="showAuthors = !showAuthors"
          link-text="Ontdek het verhaal van de stad" />
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
  layout: 'transparent',
});
const showAuthors = ref<boolean>(false);
const { authors } = storeToRefs(useAuthorStore());
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
  padding: var(--space-35) var(--space-12) var(--space-11) var(--space-12);
  overflow: hidden; // Needed so no scrollbar appears when link is translated off screen
  background: var(--light-green);
}

.info {
  @include flex-column;
  gap: var(--space-5);
}

.link {
  width: fit-content;
}

.background {
  grid-area: background;
  background: url('@/assets/images/home-bg.jpg') no-repeat bottom;
  background-size: cover;
}

@include sm-screen-down {
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
}
</style>
