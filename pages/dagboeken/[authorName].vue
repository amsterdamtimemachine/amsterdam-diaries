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
      <NuxtImg
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
      v-intersect="0.5"
      @intersect="loadMore"
      v-if="!loadedAllPages">
      <LoadingSpinner class="spinner" />
    </div>
  </div>
</template>

<script setup lang="ts">
const diaries = (await useAuthorStore().fetchCurrentAuthorDiaries()) || [];
const totalPages = diaries.reduce((acc: number, diary: any) => acc + diary.pages.length, 0);
const currentDiary = ref<any>(diaries.shift());
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

// TODO: If after the first page is loaded and the spinner is still on screen, more pages need to be loaded.
// This does not happen yet. Find a fix for this.
const loadMore = async () => {
  if (!processingPage.value) {
    await getSections();
  }
};

const getSections = async () => {
  processingPage.value = true;
  const page: Page = currentDiary.value.pages.shift();
  if (!page) {
    const newDiary = diaries.shift();
    if (!newDiary) {
      loadedAllPages.value = true;
      return;
    }
    currentDiary.value = newDiary;
    await getSections();
    return;
  }
  page.sections = await useAuthorStore().fetchDiaryEntrySections(page.id);
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
