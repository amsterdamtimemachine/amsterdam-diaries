<template>
  <!-- For now don't show background photos -->
  <!-- <DiaryBackgroundPhotos container-id="diary-pages" /> -->
  <!-- TODO: Add props to open specific profile -->
  <DiaryProfile />
  <DiaryBook
    v-for="diary in diaries"
    :key="diary.id"
    :diary="diary" />
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
