<template>
  <DiaryBackgroundPhotos container-id="diary-pages" />
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
  padding-top: 4.25rem;
  gap: 3.75rem;
}
</style>
