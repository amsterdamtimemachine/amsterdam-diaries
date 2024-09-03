<template>
  <div class="page-container">
    <DiaryReadInfo
      :page="page"
      :page-number="pageNr"
      :total-pages="totalPages" />
    <DiaryProfile class="diary-profile" />
    <DiaryPage
      class="diary-page"
      v-if="page"
      :id="page.id"
      :page="page"
      :page-number="pageNr"
      :total-pages="totalPages" />
    <LoadingSpinner v-if="!page" />
    <div
      v-if="page"
      class="photos">
      <Image
        class="photo right"
        :src="useServerImage(`diary-bg/${(((pageNr - 1) * 2) % PHOTO_AMOUNT) + 1}.jpg`)"
        alt="foto-1" />
      <Image
        class="photo"
        :src="useServerImage(`diary-bg/${(((pageNr - 1) * 2) % PHOTO_AMOUNT) + 2}.jpg`)"
        alt="foto-2" />
    </div>
  </div>
  <DiaryPagination
    :current-page="pageNr"
    @next-page="loadPage(pageNr + 1)"
    @previous-page="loadPage(pageNr - 1)" />
</template>

<script setup lang="ts">
/**
 * Meta data
 */
definePageMeta({
  layout: 'diary',
});

/**
 * Store deps
 */
const authorStore = useAuthorStore();
const authorSlug = useRoute().params.authorName as string;
const pageId = useRoute().query.page as string;

/**
 * State & props
 */
const author = ref<Author>();
const page = ref<Page>();
const pageNr = ref<number>(pageId ? parseInt(pageId) : 1);
const PHOTO_AMOUNT = 10;

/**
 * Computed Properties
 */
const totalPages = computed<number>(() => {
  return author.value?.totalPages || 0;
});

/**
 * Methods
 */
const loadPage = async (pageNumber: number) => {
  page.value = undefined;
  pageNr.value = pageNumber;
  const newPage = await authorStore.fetchPage(authorSlug, pageNumber);
  if (newPage) {
    page.value = newPage;
  }
};

/**
 * Lifecycle methods
 */
onMounted(async () => {
  // Fetch the authors
  await authorStore.fetchAuthors(authorSlug);
  // Load the author
  author.value = authorStore.findAuthorBySlug(authorSlug);
  // Load the page based on the uri
  loadPage(pageNr.value);
});
</script>

<style lang="scss" scoped>
.page-container {
  @include flex-column;
  align-items: center;
  gap: var(--space-14);
  min-height: calc(100vh - var(--space-32));
  overflow: hidden;
  margin-bottom: 0;

  .diary-page {
    margin-bottom: var(--space-18);
    margin-top: var(--space-16);
  }

  .diary-profile {
    margin-top: var(--space-16);
  }
}

.photos {
  display: grid;
  grid-template-areas:
    '. . . r r'
    'l l . . .';
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  position: absolute;
  z-index: -1;
  pointer-events: none;
  inset: 0;
  padding: var(--space-32);

  .photo {
    grid-area: l;
    opacity: 0.6;
    align-self: center;
    max-width: 100%;

    &.right {
      grid-area: r;
      justify-self: end;
    }
  }
}

@include sm-screen-down {
  .page-container {
    gap: var(--space-4);

    .diary-page {
      margin-block: 0;
    }
  }

  .photos {
    @include flex-column;
    gap: var(--space-4);
    position: relative;
    overflow: hidden;
    padding: 0;

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
