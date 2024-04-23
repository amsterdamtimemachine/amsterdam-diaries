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
const diaries = ref<any[]>([]);

onMounted(async () => {
  diaries.value = (await $fetch('/api/diaries/Q125020291'))?.diaries;
});

/**
 * Metadata
 */
definePageMeta({
  layout: 'gradient',
});
</script>

<style lang="scss" scoped></style>
