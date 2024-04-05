<template>
  <div class="card">
    <div class="top">
      <NuxtImg
        class="image"
        :src="`photos/${image}`"
        :alt="imageAlt" />
      <div
        class="content"
        :style="`background-color: var(--${variant})`">
        <div class="card-text font-body-m">
          {{ description }}
        </div>
      </div>
    </div>
    <CardLink
      :link="link"
      :linkText="linkText" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkText: string;
  variant: 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';
}>();
</script>

<style lang="scss" scopes>
.card {
  @include flex-column;
  box-shadow: var(--card-shadow);

  .top {
    display: flex;
    flex: 1;
  }

  .image {
    width: 8.5rem;
    object-fit: cover;
  }

  .content {
    padding: var(--spacing-8);
    display: flex;
    align-items: center;

    .card-text {
      border-left: var(--spacing-1) solid var(--black);
      padding-left: var(--spacing-4);
    }
  }
}
</style>
