<template>
  <div class="profile content-container">
    <div class="left">
      <span class="font-h2">{{ currentAuthor?.name }}</span>
    </div>
    <!-- TODO: Add correct avatar URL here when available -->
    <div
      v-if="currentAuthor?.photos?.[0]"
      class="right">
      <NuxtImg
        class="profile-image"
        :src="`photos/${currentAuthor.slug}.png`"
        :alt="currentAuthor.slug" />
    </div>
  </div>
</template>

<script setup lang="ts">
const currentAuthor = useAuthorStore().currentAuthor;
</script>

<style lang="scss" scoped>
.profile {
  position: fixed;
  top: calc(var(--page-margin) * 2 + var(--spacing-3));
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'left . right';
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
  padding-left: var(--spacing-14);
  padding-bottom: var(--spacing-14);

  .profile-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius-5);
    box-shadow: var(--card-shadow);
    grid-column: 3;
  }
}
</style>
