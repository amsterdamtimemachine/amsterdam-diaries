<template>
  <div
    v-if="currentAuthor"
    class="diary-authors">
    <div class="info">
      <div class="title-desc">
        <div class="profile-image-name">
          <Image
            class="profile-image"
            :src="`${useServerImage(`profile-overview/${currentAuthor.slug}/profile/1.jpg`, { size: '96,' })}`"
            default="default-profile.png"
            :alt="currentAuthor.slug" />
          <h1 class="font-h2">
            {{ currentAuthor.name }}
          </h1>
        </div>
        <div class="font-body-l">
          {{ currentAuthor.description || 'Nederlandse dagboekschrijfster' }}
        </div>
      </div>
      <LinkArrow
        :link="`/dagboeken/${currentAuthor.slug}`"
        :link-text="`Dagboek van ${currentAuthor.name}`" />
    </div>
    <div
      :class="{ background: true, [AuthorDiaryOverviewGradients[currentAuthor.slug]]: true }"
      ref="bgcontainer">
      <PhotoScroller
        :slug="currentAuthor.slug"
        :diary-teaser-text="AuthorDiaryPreviews[currentAuthor.slug]">
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
const authorStore = useAuthorStore();
const { authors } = storeToRefs(authorStore);

const currentAuthor = computed<Author | undefined>(() => {
  const authorSlug = useRoute().params.authorName as string;
  return authorStore.findAuthorBySlug(authorSlug);
});
</script>

<style lang="scss" scoped>
.diary-authors {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr var(--space-10);
  grid-template-areas: 'info bg' 'authors authors';
  gap: var(--space-14) var(--space-16);
  min-height: var(--diary-authors-min-height);
  margin-top: var(--space-9);
  margin-bottom: var(--space-18);

  .info {
    @include flex-column;
    justify-content: space-between;
    gap: var(--space-8);
    grid-area: info;
  }
  .title-desc {
    @include flex-column;
    gap: var(--space-8);
  }
  .profile-image-name {
    display: flex;
    align-items: center;
    gap: var(--space-5);
  }
  .profile-image {
    height: var(--space-24);
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius-3);
    background: var(--timberwolf);
  }

  .background {
    display: flex;
    align-items: center;
    grid-area: bg;
    position: relative;
    overflow-x: hidden;
  }

  .left-arrow {
    position: absolute;
    left: var(--space-6);
    bottom: var(--space-6);
    flex-flow: row-reverse;
  }

  .right-arrow {
    position: absolute;
    right: var(--space-6);
    bottom: var(--space-6);
  }

  .authors {
    grid-area: authors;

    :deep(ul) {
      gap: var(--space-4) var(--space-5);
    }
  }
}
</style>
