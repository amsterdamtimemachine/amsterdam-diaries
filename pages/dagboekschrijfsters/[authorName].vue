<template>
  <div
    v-if="currentAuthor"
    class="diary-authors page-container">
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
        <Description
          class="font-body-l"
          :input="currentAuthor.description || 'Nederlandse dagboekschrijfster'"
          :lines="3" />
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
    <div
      ref="tags"
      class="authors"
      v-intersect="0.01"
      @intersect="setTagsVisibility">
      <Tags :tags="authorTags" />
    </div>
  </div>
</template>

<script setup lang="ts">
const authorStore = useAuthorStore();
const { authors } = storeToRefs(authorStore);
const tags = ref<HTMLElement>();

const currentAuthor = computed<Author | undefined>(() => {
  const authorSlug = useRoute().params.authorName as string;
  return authorStore.findAuthorBySlug(authorSlug);
});

const authorTags = computed(() => {
  return authors.value.map(a => ({
    title: a.name,
    link: `/dagboekschrijfsters/${a.slug}`,
    active: currentAuthor.value?.slug === a.slug,
  }));
});

const scrollToTags = () => {
  tags.value?.scrollIntoView({ behavior: 'smooth' });
};

const setTagsVisibility = () => {
  if (tags.value && !tags.value.classList.contains('authors-animate')) {
    tags.value.classList.add('authors-animate');
  }
};
</script>

<style lang="scss" scoped>
.diary-authors {
  display: grid;
  grid-template-rows: 1fr var(--space-10);
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    'info bg'
    'authors authors';
  gap: var(--space-14) var(--space-16);

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

    .profile-image {
      height: var(--space-11);
      border-radius: var(--border-radius-2);
    }

    .title-desc {
      gap: var(--space-4);
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
      opacity: 0;

      :deep(li:has(.active)) {
        display: none;
      }

      &.authors-animate {
        transform: translateY(var(--space-5));
        animation: fadeSlideIn 1s ease-in forwards;
      }
    }

    .view-more-authors {
      display: flex;
    }
  }
}

@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
