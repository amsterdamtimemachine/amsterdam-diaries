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
  background: var(--white);
  box-shadow: var(--card-shadow);

  .header {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-6);
    color: var(--lavender-gray);
  }

  .content {
    height: var(--size-13);
    overflow: hidden;
    margin: var(--spacing-10);
    margin-top: 0;

    .content-text {
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      position: relative;
      padding-left: var(--spacing-8);
      border-left: var(--spacing-1) solid var(--black);

      :deep(.highlight) {
        color: var(--purple);
      }
    }
  }

  .link {
    background-color: var(--white-basic);
    padding: var(--spacing-6);
  }
}
</style>
