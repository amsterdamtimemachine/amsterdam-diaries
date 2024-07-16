<template>
  <div
    ref="snippets"
    class="diaries">
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
const snippets = ref<HTMLElement>();

const props = defineProps<{
  cards: DiaryCard[];
}>();

const restartAnimation = () => {
  if (snippets.value) {
    snippets.value.style.animation = 'none';
    snippets.value.offsetHeight;
    snippets.value.style.animation = '';
  }
};

watch(() => props.cards, restartAnimation);
</script>

<style lang="scss" scoped>
.diaries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-11);
  max-width: var(--theme-diaries-max-width);
  opacity: 0;
  transform: translateY(var(--space-5));
  animation: fadeSlideIn 0.5s ease-in forwards;
}

@include sm-screen-down {
  .diaries {
    @include flex-column;
    gap: var(--space-6);
    max-width: 100%;
  }
}
</style>
