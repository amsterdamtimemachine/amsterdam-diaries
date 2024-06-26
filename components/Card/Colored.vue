<template>
  <div class="card">
    <div class="top">
      <Image
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
    <div class="link-arrow">
      <LinkArrow
        :link="link"
        :linkText="linkText" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkText: string;
  variant: CardColor;
}>();
</script>

<style lang="scss" scopes>
.card {
  @include flex-column;
  box-shadow: var(--shadow-1);

  .top {
    display: flex;
    flex: 1;
  }

  .image {
    width: var(--space-34);
    object-fit: cover;
  }

  .content {
    padding: var(--space-7);
    display: flex;
    align-items: center;

    .card-text {
      border-left: var(--space-0) solid var(--black);
      padding-left: var(--space-3);
    }
  }

  .link-arrow {
    background-color: var(--white);
    padding: var(--space-5);
  }
}
</style>
