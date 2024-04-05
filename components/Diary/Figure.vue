<template>
  <figure>
    <NuxtImg
      :src="`photos/${image}`"
      :alt="alt" />
    <!-- TODO: For now do not include the figcaption -->
    <!-- <figcaption>
      <div class="vertical-line" />
      <div>
        <div>{{ date || '' }}</div>
        <div>{{ description }}</div>
      </div>
    </figcaption> -->
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  date?: string;
  description: string;
  alt: string;
}>();
</script>

<style lang="scss" scoped>
figure {
  height: 20rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }
  figcaption {
    display: flex;
    gap: var(--spacing-4);
    color: var(--gray);
    margin-top: var(--spacing-4);
    margin-left: var(--spacing-1);

    .vertical-line {
      width: calc(var(--spacing-1) * 2);
      background: var(--brown);
    }
  }
}
</style>
