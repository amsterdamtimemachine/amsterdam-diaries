<template>
  <div
    v-if="currentAuthor"
    class="profile content-container">
    <div class="left">
      <span class="font-h2">{{ currentAuthor.name }}</span>
    </div>
    <div class="right">
      <Image
        class="profile-image"
        :src="`${useServerImage(`profile-overview/${currentAuthor.slug}/profile/1.jpg`)}`"
        default="default-profile.png"
        :alt="currentAuthor.slug" />
    </div>
  </div>
</template>

<script setup lang="ts">
const currentAuthor = computed<Author | undefined>(() => {
  const authorSlug = useRoute().params.authorName as string;
  return useAuthorStore().findAuthorBySlug(authorSlug);
});
</script>

<style lang="scss" scoped>
.profile {
  position: fixed;
  top: calc(var(--spacing-13) * 3);
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
    background: var(--profile-bg);
  }
}
</style>
