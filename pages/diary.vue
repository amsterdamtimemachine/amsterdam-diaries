<template>
  <!-- TODO: Add props to open specific profile -->
  <DiaryProfile />
  <section class="pages">
    <DiaryPage
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      :page-number="pageNumber" />
  </section>
</template>

<script setup lang="ts">
const pageNumbers = ref<number[]>([3, 4, 5]);
</script>

<style lang="scss" scoped>
.pages {
  padding-top: 4.25rem;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
}
</style>
