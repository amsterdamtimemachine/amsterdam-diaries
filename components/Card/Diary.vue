<template>
  <div class="diary-card">
    <div class="header font-body-m">
      <div>{{ headerTitle }}</div>
      <div>{{ headerSubtitle }}</div>
    </div>
    <div class="content">
      <div
        class="content-text"
        v-html="content" />
    </div>
    <LinkArrow
      :link="link"
      :linkText="linkText" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headerTitle: string;
  headerSubtitle: string;
  content: string;
  link: string;
  linkText: string;
}>();
</script>

<style lang="scss" scoped>
.diary-card {
  @include flex-column;
  width: var(--diary-card-width);
  background: var(--linen);
  box-shadow: var(--shadow-1);

  .header {
    display: flex;
    justify-content: space-between;
    padding: var(--space-5);
    color: var(--lavender-gray);
  }

  .content {
    height: var(--space-64);
    overflow: hidden;
    margin: var(--space-9);
    margin-top: 0;
    flex: 1;

    .content-text {
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      position: relative;
      padding-left: var(--space-7);
      border-left: var(--space-0) solid var(--black);

      :deep(.highlight) {
        color: var(--purple);
      }
    }
  }

  .link {
    background-color: var(--white);
    padding: var(--space-5);
  }
}
</style>
