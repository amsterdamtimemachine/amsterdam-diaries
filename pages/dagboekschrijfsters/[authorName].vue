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
        <div
          class="profile-description font-body-l"
          :class="{ 'show-full-description': showFullDescription }">
          {{ currentAuthor.description || 'Nederlandse dagboekschrijfster' }}
        </div>
        <LinkArrow
          class="show-more"
          :link-text="showFullDescription ? 'Toon minder' : 'Toon meer'"
          :icon="showFullDescription ? 'mdi:arrow-up' : 'mdi:arrow-down'"
          @click="showFullDescription = !showFullDescription" />
      </div>
      <LinkArrow
        class="diary-link"
        :link="`/dagboeken/${currentAuthor.slug}`"
        :link-text="`Dagboek van ${currentAuthor.name}`" />
      <LinkArrow
        class="view-more-authors"
        link-text="Meer auteurs bekijken?"
        icon="mdi:arrow-down"
        @click="scrollToTags" />
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
    <div ref="tags">
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
  </div>
</template>

<script setup lang="ts">
const authorStore = useAuthorStore();
const { authors } = storeToRefs(authorStore);
const showFullDescription = ref(false);
const tags = ref<HTMLElement>();

const currentAuthor = computed<Author | undefined>(() => {
  const authorSlug = useRoute().params.authorName as string;
  return authorStore.findAuthorBySlug(authorSlug);
});

const scrollToTags = () => {
  tags.value?.scrollIntoView({ behavior: 'smooth' });
};
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

  .show-more {
    display: none;
    box-shadow: inset 0 calc(var(--space-0) * -1) var(--black);
    padding-bottom: var(--space-2);
  }

  // TODO: Add animation for show more
  .show-full-description {
    display: initial !important;
    overflow: initial !important;
  }

  .view-more-authors {
    display: none;
    width: fit-content;
    align-self: center;
  }
}

@include sm-screen-down {
  .diary-authors {
    grid-template-columns: 1fr;
    grid-template-areas:
      'bg'
      'info'
      'authors';
    grid-template-rows: var(--space-80) auto auto;
    gap: var(--space-9);

    margin-top: 0;
    margin-bottom: var(--space-8);

    .profile-image {
      height: var(--space-11);
      border-radius: var(--border-radius-2);
    }

    .title-desc {
      gap: var(--space-4);
    }

    .profile-description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .show-more,
    .view-more-authors {
      display: flex;
    }

    .diary-link {
      background: var(--linen);
      border: var(--space-0) solid var(--black);
      padding: var(--space-3) var(--space-5);

      &:hover {
        box-shadow: initial;
      }
    }

    .left-arrow,
    .right-arrow {
      display: none;
    }

    .authors {
      :deep(li:has(.active)) {
        display: none;
      }
    }
  }
}
</style>
