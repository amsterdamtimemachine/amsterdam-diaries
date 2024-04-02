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
    gap: 1rem;
    font-family: 'Hanken Grotesk';
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 200%;
    color: var(--gray);
    margin-top: 1rem;
    margin-left: 0.25rem;

    .vertical-line {
      width: 0.125rem;
      background: var(--brown);
    }
  }
}
</style>
