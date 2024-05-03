<template>
  <div
    class="background-photos content-container"
    :style="{ height: `${bgPhotosHeight}px` }">
    <div
      v-for="(photo, idx) in photos"
      :key="`foto-${idx}`"
      :class="{
        photo: true,
        'align-right': idx % 2,
      }">
      <Image
        :src="photo"
        :alt="`foto-${idx}`" />
    </div>
  </div>
  <DiaryProfile />
  <div ref="diaryBook">
    <!-- TODO: Add way to also load previous pages (navigating from other pages to specific page) -->
    <div class="diary-book">
      <DiaryPage
        v-for="(page, idx) in pages"
        :key="page.id"
        :page="page"
        :page-number="idx + 1"
        :total-pages="totalPages"
        @vue:mounted="mountedPage" />
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
/**
 * Store deps
 */
const authorStore = useAuthorStore();
const authorSlug = useRoute().params.authorName as string;

/**
 * State & props
 */
const diaryBook = ref<HTMLElement>();
const pages = ref<Page[]>([]);
const photos = ref<string[]>([]);
const bgPhotosHeight = ref<number>(0);
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
    const page = await authorStore.fetchNextPage(authorSlug, lastId);
    allowLoadingMore.value = false;
    if (page) {
      pages.value.push(page);
    }
  }
};

/**
 * Page mounted callback
 * - Add extra photos to the background
 * - Informat the spinner to allow more content
 */
const mountedPage = () => {
  allowLoadingMore.value = true;
  bgPhotosHeight.value = diaryBook.value?.scrollHeight || 0;
  const amount = 2 + photos.value.length;
  for (let i = photos.value.length; i < amount; i++) {
    photos.value.push(useServerImage(`diary-bg/${(i % PHOTO_AMOUNT) + 1}.jpg`));
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  margin-block: calc(var(--spacing-12) * -1) var(--spacing-9);
}

.diary-book {
  @include flex-column;
  margin-block: var(--page-margin);
  gap: var(--spacing-14);
}

.background-photos {
  @include flex-column;
  gap: calc(var(--spacing-11) * 12);
  position: absolute;
  margin-block: calc(var(--page-margin) + var(--spacing-11));
  overflow: hidden;

  .photo {
    @include flex-column;
    justify-content: center;
    height: calc(var(--size-13) * 3);

    &.align-right {
      align-self: flex-end;
    }
  }

  img {
    width: fit-content;
    opacity: 0.6;
  }
}
</style>
