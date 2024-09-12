<template>
  <div class="page-container">
    <DiaryReadInfo
      :page="page"
      :page-number="pageNr"
      :total-pages="pages.length" />
    <DiaryProfile
      :author="author"
      class="diary-profile" />
    <button
      class="btn-flip"
      @click="flipped = !flipped">
      <span>{{ flipped ? 'Toon de digitale tekst' : 'Toon de originele dagboek pagina' }}</span>
      <BaseIcon icon="material-symbols:autorenew" />
    </button>
    <Flip
      v-if="page"
      class="flip-container"
      :flipped="flipped">
      <template #front>
        <DiaryPage
          class="diary-page"
          :id="page.id"
          :page="page"
          :page-number="pageNr"
          :total-pages="pages.length" />
      </template>
      <template #back>
        <ImageViewer
          class="image-viewer"
          :images="page.sections.map(p => p.uri)" />
      </template>
    </Flip>
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
    :pages="pages"
    @next-page="navigateTo(`/dagboeken/${authorSlug}?page=${pageNr + 1}`)"
    @previous-page="navigateTo(`/dagboeken/${authorSlug}?page=${pageNr - 1}`)" />
</template>

<script setup lang="ts">
/**
 * Meta data
 */
definePageMeta({
  layout: 'diary',
});

/**
 * Data fetching
 */
const slug = useRoute().params.authorName as string;
const author = (await $fetch(`/api/dagboekschrijfsters/${slug}`)) as Author;
const diaries = (await $fetch(`/api/diaries/${author.id}`)) as DiaryData[];
const pages = diaries.map((diary: DiaryData) => diary.pages).flat();
const authorSlug = useRoute().params.authorName as string;

/**
 * State & props
 */
const page = ref<PageData>();
const pageNr = ref<number>(1);
const PHOTO_AMOUNT = 10;
const flipped = ref<boolean>(false);

/**
 * Methods
 */
const loadPage = async (pageNumber: number) => {
  page.value = undefined;
  pageNr.value = pageNumber;
  const newPage = pages[pageNumber - 1];
  if (newPage) {
    newPage.sections = (await $fetch(`/api/entries/${newPage.id}`)) as SectionData[];
    page.value = newPage;
  }
};

watch(
  () => useRoute().query.page,
  newPageId => {
    const pageid = newPageId as string;
    pageNr.value = parseInt(pageid ?? 1);
    loadPage(pageNr.value);
  },
  {
    immediate: true,
  },
);

watch(flipped, (value: boolean) => {
  // Disable body scroll when flipping and make sure scroll top is 0
  document.body.style.overflow = value ? 'hidden' : 'auto';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/**
 * Lifecycle methods
 */
onMounted(async () => {
  loadPage(pageNr.value);
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>

<style lang="scss" scoped>
.page-container {
  @include flex-column;
  align-items: center;
  gap: var(--space-8);
  min-height: calc(100vh - var(--space-32));
  overflow: hidden;
  margin-bottom: 0;

  .btn-flip {
    @include flex-row;
    align-items: center;
    gap: var(--space-4);
    box-shadow: var(--shadow-2);
    margin-top: var(--space-16);
    background: var(--white);
    padding: var(--space-2) var(--space-7);
    z-index: 0;

    &:hover {
      background: var(--linen);
    }
    &:active {
      background: var(--alabaster);
    }
  }

  .diary-page {
    margin-bottom: var(--space-31);
  }

  .diary-profile {
    margin-top: var(--space-16);
  }

  .image-viewer {
    height: calc(100vh - var(--space-88));
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
    margin-bottom: var(--space-16);

    .btn-flip {
      margin-top: 0;
    }

    .diary-page {
      margin-block: 0;
    }

    .image-viewer {
      height: calc(100vh - var(--space-94));
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
