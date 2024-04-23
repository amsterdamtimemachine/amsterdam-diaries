<template>
  <div class="book">
    <DiaryPage
      v-for="page in diary.pages"
      :key="page.id"
      :page="page" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  diary: Book;
}>();
</script>

<style lang="scss" scoped>
.book {
  @include flex-column;
  margin-block: var(--page-margin);
  gap: var(--spacing-14);
}
</style>
