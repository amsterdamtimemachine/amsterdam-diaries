<template>
  <div class="background-photos content-container">
    <div
      v-for="(photo, idx) in photos"
      :key="`foto-${idx}`"
      :class="{
        photo: true,
        'align-right': idx % 2,
      }">
      <NuxtImg
        :src="photo"
        :alt="`foto-${idx}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  containerId: string;
}>();

const PHOTO_HEIGHT = 768;
const PHOTO_GAP = 480;
const PHOTO_AMOUNT = 8;
const photos = ref<string[]>([]);

onMounted(() => {
  const totalHeight = document.getElementById(props.containerId)?.scrollHeight;
  if (totalHeight) {
    const amount = Math.floor(totalHeight / (PHOTO_HEIGHT + PHOTO_GAP));
    for (let i = 0; i < amount; i++) {
      // Make sure to loop through photos
      photos.value.push(useServerImage(`diary-bg/${(i % PHOTO_AMOUNT) + 1}.jpg`));
    }
  }
});
</script>

<style lang="scss" scoped>
.background-photos {
  @include flex-column;
  gap: calc(var(--spacing-11) * 12);
  position: absolute;
  margin-block: calc(var(--page-margin) + var(--spacing-11));

  .photo {
    @include flex-column;
    justify-content: center;
    height: calc(var(--size-13) * 3);

    &.align-right {
      align-self: flex-end;
    }
  }

  img {
    width: fit-content;
    opacity: 0.6;
  }
}
</style>
