<template>
  <!-- For now don't show background photos -->
  <!-- <DiaryBackgroundPhotos container-id="diary-pages" /> -->
  <!-- TODO: Add props to open specific profile -->
  <DiaryProfile />
  <section
    id="diary-pages"
    class="pages">
    <DiaryPage
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      :page-number="pageNumber" />
  </section>
</template>

<script setup lang="ts">
/**
 * Metadata
 */
definePageMeta({
  layout: 'gradient',
});

/**
 * State & Props
 */
const pageNumbers = ref<number[]>([3, 4, 5]);
</script>

<style lang="scss" scoped>
.pages {
  @include flex-column;
  margin-block: var(--page-margin);
  gap: var(--spacing-14);
}
</style>
