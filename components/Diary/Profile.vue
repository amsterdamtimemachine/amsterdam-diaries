<template>
  <div
    v-if="currentAuthor"
    class="profile container">
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
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'left . right';
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
  padding-left: var(--space-14);
  padding-bottom: var(--space-14);

  .profile-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius-5);
    box-shadow: var(--shadow-1);
    grid-column: 3;
    background: var(--timberwolf);
  }
}

@include sm-screen-down {
  .profile {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    max-width: 100%; // Override max-width to align with the content width
    justify-content: flex-end;
    gap: var(--space-4);
    align-items: center;
  }

  .right {
    padding-bottom: 0;
    padding-left: 0;

    .profile-image {
      width: var(--space-15);
      border-radius: var(--border-radius-2);
    }
  }
}
</style>
