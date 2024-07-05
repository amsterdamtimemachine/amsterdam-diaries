<template>
  <div class="page-container">
    <DiaryProfile />
    <div
      class="wrapper"
      v-for="(page, idx) in pages"
      :key="page.id">
      <DiaryPage
        :id="page.id"
        :page="page"
        :page-number="idx + 1"
        :total-pages="totalPages" />
      <div class="photos">
        <Image
          class="photo"
          :src="useServerImage(`diary-bg/${((idx * 2) % PHOTO_AMOUNT) + 1}.jpg`)"
          :alt="`foto-${idx * 2 + 1}`" />
        <Image
          class="photo right"
          :src="useServerImage(`diary-bg/${((idx * 2) % PHOTO_AMOUNT) + 2}.jpg`)"
          :alt="`foto-${idx * 2 + 2}`" />
      </div>
    </div>
    <div
      v-intersect="0.01"
      @intersect="loadNextPage"
      v-if="allowLoadingMore">
      <LoadingSpinner class="spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => loadNextPage());
// TODO: Add way to also load previous pages (navigating from other pages to specific page)
import type { DiaryPage } from '#build/components';

/**
 * Store deps
 */
const authorStore = useAuthorStore();
const authorSlug = useRoute().params.authorName as string;

/**
 * State & props
 */
const pages = ref<Page[]>([]);
const allowLoadingMore = ref<boolean>(true);

const PHOTO_AMOUNT = 10;

/**
 * Computed Properties
 */
const totalPages = computed<number>(() => {
  const author = authorStore.findAuthorBySlug(authorSlug);
  return author?.totalPages || 0;
});

/**
 * Methods
 */

/**
 * LoadNextPage callback
 * - Check which page wasn't loaded yet
 * - Turn off the spinner
 * - Fetch the next page and add to Array
 */
const loadNextPage = async () => {
  const lastId = pages.value[pages.value.length - 1]?.id;
  if (allowLoadingMore.value) {
    allowLoadingMore.value = false;
    const page = await authorStore.fetchNextPage(authorSlug, lastId);
    if (page) {
      pages.value.push(page);
      allowLoadingMore.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  @include flex-column;
  align-items: center;
  gap: var(--space-14);
}

.spinner {
  margin-block: calc(var(--space-11) * -1) var(--space-8);
}

.wrapper {
  @include flex-column;
  position: relative;
  align-items: center;
  width: 100%;
}

.photos {
  display: grid;
  grid-template-areas:
    'l l l . .'
    '. . r r r';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  position: absolute;
  z-index: -1;
  pointer-events: none;
  inset: 0;

  .photo {
    grid-area: l;
    opacity: 0.6;
    align-self: center;

    &.right {
      grid-area: r;
      justify-self: end;
    }
  }
}

@include sm-screen-down {
  .page-container,
  .wrapper {
    gap: var(--space-4);
  }

  .photos {
    @include flex-column;
    gap: var(--space-4);
    position: relative;
    overflow: hidden;

    .photo {
      display: none;
      width: 100%;
      height: auto;
    }

    :first-child {
      display: block;
    }
  }
}
</style>
