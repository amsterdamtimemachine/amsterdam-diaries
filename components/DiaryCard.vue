<template>
  <div class="diary-card">
    <div class="header card-text">
      <div>{{ headerTitle }}</div>
      <div>{{ headerSubtitle }}</div>
    </div>
    <div class="content">
      <div
        class="content-text"
        v-html="content" />
    </div>
    <NuxtLink
      :to="link"
      class="link">
      <span>{{ linkText }}</span>
      <BaseIcon icon="mdi:arrow-right" />
    </NuxtLink>
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
  width: 21.125rem;
  background: var(--white);
  box-shadow: var(--card-shadow);

  .header {
    display: flex;
    justify-content: space-between;
    padding: 1.25rem 1.25rem 1.25rem 1.625rem;
    color: var(--lavender-gray);
  }

  .content {
    height: 15.125rem;
    overflow: hidden;
    margin: 0 1.0625rem 2.375rem 2.375rem;

    .content-text {
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      position: relative;
      padding-left: 1.75rem;
      border-left: 1px solid var(--black);
      margin-top: -0.25rem;

      :deep(.highlight) {
        color: var(--purple);
      }
    }
  }

  .link {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: var(--white-basic);
    color: var(--black);
    padding: 1.25rem 1rem 1.25rem 1.625rem;
    text-decoration: none;
    align-items: center;
  }
}
</style>
