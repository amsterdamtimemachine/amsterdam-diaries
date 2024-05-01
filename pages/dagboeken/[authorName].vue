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
        :total-pages="totalPages" />
    </div>
    <div
      v-intersect="0.25"
      @intersect="loadMore"
      v-if="!loadedAllPages">
      <LoadingSpinner class="spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
await useAuthorStore().fetchCurrentAuthorDiaries();
let diaryIndex = 0;
let pageIndex = 0;

const diaries = useAuthorStore().currentAuthor?.diaries || [];
const totalPages = diaries.reduce((acc: number, diary: Diary) => acc + diary.pages.length, 0);
const currentDiary = ref<Diary>(diaries[diaryIndex++]);
const pages = ref<Page[]>([]);
const processingPage = ref<boolean>(false);
const loadedAllPages = ref<boolean>(false);

const diaryBook = ref<HTMLElement>();
const PHOTO_AMOUNT = 8;
const photos = ref<string[]>([]);
const bgPhotosHeight = ref<number>(0);

const addPhotos = async () => {
  await nextTick();
  bgPhotosHeight.value = diaryBook.value?.scrollHeight || 0;
  const amount = 2 + photos.value.length;
  for (let i = photos.value.length; i < amount; i++) {
    // Make sure to loop through photos
    photos.value.push(useServerImage(`diary-bg/${(i % PHOTO_AMOUNT) + 1}.jpg`));
  }
};

const loadMore = async () => {
  if (!processingPage.value) {
    await getSections();

    // If the content we added isn't filling the screen, call loadMore again
    if ((diaryBook.value?.offsetHeight || 0) < window.innerHeight) {
      loadMore();
    }
  }
};

const getSections = async () => {
  processingPage.value = true;
  const page: Page = currentDiary.value.pages[pageIndex++];
  if (!page) {
    pageIndex = 0;
    const newDiary = diaries[diaryIndex++];
    if (!newDiary) {
      loadedAllPages.value = true;
      return;
    }
    currentDiary.value = newDiary;
    await getSections();
    return;
  }
  await useAuthorStore().fetchDiaryEntrySections(page.id);
  pages.value.push(page);
  addPhotos();
  processingPage.value = false;
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
