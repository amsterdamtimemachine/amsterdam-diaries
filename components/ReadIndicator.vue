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
const indicator = ref<HTMLElement>();
const percentage = ref<number>(0);

onMounted(() => {
  const scrollHeight = indicator.value?.getBoundingClientRect().top;
  const documentHeight = document.querySelector('body')?.getBoundingClientRect().height;
  percentage.value = ((scrollHeight || 0) / (documentHeight || 1)) * 100;
});
</script>

<style lang="scss" scoped>
.scroll-indicator {
  grid-column: 2;
  width: 100%;
  height: var(--size-3);
  background-color: var(--bone-gray);
  border-radius: var(--border-radius-4);
  display: flex;
  align-items: center;
  padding: var(--spacing-1);

  .progress {
    height: var(--size-1);
    background-color: var(--black);
    border-radius: var(--border-radius-1);
  }
}
</style>
