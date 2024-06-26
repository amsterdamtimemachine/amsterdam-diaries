<template>
  <div
    ref="indicator"
    class="scroll-indicator">
    <div
      class="progress"
      :style="`width: ${percentage}%`" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pageNumber: number;
  totalPages: number;
}>();
const percentage = computed<number>(() => {
  return (props.pageNumber / props.totalPages) * 100;
});
</script>

<style lang="scss" scoped>
.scroll-indicator {
  grid-column: 2;
  width: 100%;
  height: var(--space-3);
  background-color: var(--bone-gray);
  border-radius: var(--border-radius-4);
  display: flex;
  align-items: center;
  padding: var(--space-0);

  .progress {
    height: var(--space-1);
    background-color: var(--black);
    border-radius: var(--border-radius-1);
  }
}
</style>
