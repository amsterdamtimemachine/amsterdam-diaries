<template>
  <div class="pagination container">
    <div class="left">
      <LinkArrow
        v-if="previousPageLabel.length"
        class="arrow"
        :link-text="previousPageLabel"
        icon="mdi:arrow-left"
        @click="previousPage" />
    </div>
    <span
      class="middle"
      v-if="pages.length">
      {{ currentPage }}/{{ pages.length }}
    </span>
    <div class="right">
      <LinkArrow
        v-if="nextPageLabel.length"
        class="arrow"
        :link-text="nextPageLabel"
        icon="mdi:arrow-right"
        @click="nextPage" />
    </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'left middle right';
  position: fixed;
  bottom: 0;
  border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
  background: var(--white);
  padding: var(--space-2) var(--space-4);
  user-select: none;

  .right {
    grid-area: right;

    .arrow {
      justify-content: flex-end;
    }
  }

  .left {
    grid-area: left;

    .arrow {
      justify-content: flex-end;
      flex-flow: row-reverse;
    }
  }

  .middle {
    grid-area: middle;
    text-align: center;
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
