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
        <div class="card-text">
          {{ description }}
        </div>
      </div>
    </div>
    <NuxtLink
      :to="link"
      class="link">
      <span>{{ linkText }}</span>
      <BaseIcon
        class="arrow-icon"
        icon="mdi:arrow-right" />
    </NuxtLink>
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
    padding: 2rem;
    display: flex;
    align-items: center;

    .card-text {
      border-left: 1px solid var(--black);
      padding-left: 1rem;
    }
  }

  .link {
    background-color: var(--white-basic);
    color: var(--black);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    text-decoration: none;

    .arrow-icon {
      flex: none;
    }
  }
}
</style>
