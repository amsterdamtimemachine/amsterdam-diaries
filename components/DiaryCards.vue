<template>
  <div class="diaries">
    <CardDiary
      v-for="card in cards"
      :key="card.headerTitle"
      :headerTitle="card.headerTitle"
      :headerSubtitle="card.headerSubtitle"
      :content="card.content"
      :link="card.link"
      :linkText="card.linkText" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cards: DiaryCard[];
}>();
</script>

<style lang="scss" scoped>
.diaries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-11);
  max-width: var(--theme-diaries-max-width);
}

@include sm-screen-down {
  .diaries {
    @include flex-column;
    gap: var(--space-6);
    max-width: 100%;
  }
}
</style>
