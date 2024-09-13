<template>
  <div
    class="flip-container"
    :style="{ '--perspective': `${perspective}px` }">
    <div :class="{ card: true, flipped }">
      <div class="card-front">
        <slot name="front" />
      </div>
      <div class="card-back">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const width = ref(0);
const height = ref(0);

// TODO: Check if better way of calculating perspective is possible
onMounted(() => {
  const flipContainer = document.querySelector('.flip-container');
  if (flipContainer) {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        width.value = entry.contentRect.width;
        height.value = entry.contentRect.height;
      }
    });
    resizeObserver.observe(flipContainer);

    // Clean up observer on unmount
    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

const perspective = computed<number>(() => {
  const widthScalingFactor = 0.5; // Minimize width influence
  const heightScalingFactor = 3.0; // Emphasize height more
  return (width.value * widthScalingFactor + height.value * heightScalingFactor) / 2;
});

defineProps<{
  flipped: boolean;
}>();
</script>

<style lang="scss" scoped>
.flip-container {
  background-color: var(--black-0);
  perspective: var(--perspective);

  .card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    transition: transform 1s;
    transform-style: preserve-3d;

    &.flipped {
      transform: rotateY(180deg);
    }
  }

  .card-front,
  .card-back {
    grid-column: 1;
    grid-row: 1;
    backface-visibility: hidden;
  }

  .card-back {
    transform: rotateY(180deg);
  }
}
</style>
