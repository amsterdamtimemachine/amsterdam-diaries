<template>
  <div class="diary-card">
    <div class="content">
      <div
        class="content-text"
        v-html="content" />
    </div>
    <div class="link-container">
      <LinkArrow
        :link="link"
        :linkText="linkText" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string;
  link: string;
  linkText: string;
}>();
</script>

<style lang="scss" scoped>
.diary-card {
  @include flex-column;
  width: var(--diary-card-teaser-width);
  background: var(--light-yellow);
  box-shadow: var(--shadow-1);

  .header {
    display: flex;
    justify-content: space-between;
    padding: var(--space-5);
    color: var(--lavender-gray);
  }

  .content {
    display: flex;
    align-items: center;
    padding: var(--space-10);

    .content-text {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .link-container {
    background-color: var(--white);
    padding: var(--space-5);
  }
}
</style>
