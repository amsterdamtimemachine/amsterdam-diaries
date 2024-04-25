<template>
  <DiaryBackgroundPhotos
    v-if="diaries"
    container-id="diary-pages" />
  <!-- TODO: Add props to open specific profile -->
  <DiaryProfile />
  <div id="diary-pages">
    <DiaryBook
      v-for="diary in diaries"
      :key="diary.id"
      :diary="diary" />
  </div>
</template>

<script setup lang="ts">
const diaries = await useAuthorStore().fetchCurrentAuthorDiaries();

/**
 * Metadata
 */
definePageMeta({
  layout: 'gradient',
});
</script>

<style lang="scss" scoped></style>
