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
  height: 0.75rem;
  background-color: var(--bone-gray);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;

  .progress {
    height: 0.25rem;
    background-color: var(--black);
    border-radius: 0.25rem;
  }
}
</style>
