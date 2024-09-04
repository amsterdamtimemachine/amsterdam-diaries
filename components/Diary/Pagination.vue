<template>
  <div class="pagination container">
    <LinkArrow
      class="arrow left-arrow"
      :link-text="previousPageLabel"
      icon="mdi:arrow-left"
      @click="previousPage" />
    <span
      class="middle"
      v-if="pages.length"
      >{{ currentPage }}/{{ pages.length }}</span
    >
    <LinkArrow
      class="arrow"
      :link-text="nextPageLabel"
      icon="mdi:arrow-right"
      @click="nextPage" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  pages: Page[];
}>();

const previousPageLabel = computed<string>(() => {
  if (props.currentPage === 1) return '';
  return `pag. ${props.currentPage - 1}`;
});

const nextPageLabel = computed<string>(() => {
  if (props.currentPage === props.pages.length) return '';
  return `pag. ${props.currentPage + 1}`;
});

const nextPage = () => {
  if (props.currentPage === props.pages.length) return;
  emit('nextPage');
};

const previousPage = () => {
  if (props.currentPage === 1) return;
  emit('previousPage');
};

const emit = defineEmits(['nextPage', 'previousPage']);
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
  background: var(--white);
  padding: var(--space-2) var(--space-4);

  .left-arrow {
    flex-flow: row-reverse;
  }

  .arrow:hover {
    border-color: var(--white);
  }
}

@include sm-screen-down {
  .pagination .middle {
    display: none;
  }
}
</style>
