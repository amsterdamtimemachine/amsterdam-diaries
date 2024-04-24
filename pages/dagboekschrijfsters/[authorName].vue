<template>
  <div
    v-if="currentAuthor"
    class="diary-authors">
    <div class="info">
      <div class="title-desc">
        <h1 class="font-h2">
          {{ currentAuthor.name }}
        </h1>
        <div class="font-body-l">
          {{ currentAuthor.description || 'Nederlandse dagboekschrijfster' }}
        </div>
      </div>
      <LinkArrow
        :link="`/dagboeken/${currentAuthor.slug}`"
        :link-text="`Dagboek van ${currentAuthor.name}`" />
    </div>
    <div
      class="background"
      ref="bgcontainer">
      <!-- TODO: Replace diary teaser text with actual text -->
      <PhotoScroller
        :slug="currentAuthor.slug"
        diary-teaser-text="p.20 8 mei 1941 Korte studie over het antisemitisme. Er zijn geen Joden meer. Er zijn geen Christenen">
        <template #prev-button="{ scrollPhotos }">
          <LinkArrow
            class="left-arrow"
            @click="scrollPhotos(false)"
            link-text="Vorige"
            icon="mdi:arrow-left" />
        </template>
        <template #next-button="{ scrollPhotos }">
          <LinkArrow
            class="right-arrow"
            @click="scrollPhotos(true)"
            link-text="Volgende" />
        </template>
      </PhotoScroller>
    </div>
    <Tags
      class="authors"
      :tags="
        authors.map(a => ({
          title: a.name,
          link: `/dagboekschrijfsters/${a.slug}`,
          active: currentAuthor?.slug === a.slug,
        }))
      " />
  </div>
</template>

<script setup lang="ts">
const { authors, currentAuthor } = storeToRefs(useAuthorStore());
</script>

<style lang="scss" scoped>
.diary-authors {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr calc(var(--size-5) * 2);
  grid-template-areas: 'info bg' 'authors authors';
  gap: var(--spacing-14) calc(var(--spacing-9) * 2);
  min-height: 46rem;

  margin-top: calc(var(--page-margin) + var(--spacing-13));
  margin-bottom: calc(var(--spacing-10) * 2);

  .info {
    @include flex-column;
    justify-content: space-between;
    gap: var(--spacing-9);
    grid-area: info;
  }
  .title-desc {
    @include flex-column;
    gap: var(--spacing-9);
  }
  .background {
    display: flex;
    align-items: center;
    grid-area: bg;
    background: linear-gradient(to left, var(--light-yellow) 0%, var(--light-purple) 100%);
    position: relative;
    overflow-x: hidden;
  }

  .left-arrow {
    position: absolute;
    left: var(--spacing-7);
    bottom: var(--spacing-7);
    flex-flow: row-reverse;
  }

  .right-arrow {
    position: absolute;
    right: var(--spacing-7);
    bottom: var(--spacing-7);
  }

  .authors {
    grid-area: authors;

    :deep(ul) {
      gap: var(--spacing-5) var(--spacing-6);
    }
  }
}
</style>
