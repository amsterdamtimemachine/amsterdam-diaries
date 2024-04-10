<template>
  <div class="tags">
    <div
      v-if="title"
      class="font-body-l">
      {{ title }}
    </div>
    <ul>
      <li
        v-for="tag in tags"
        :key="tag.title">
        <Tag :tag="tag" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  tags: Tag[];
}>();
</script>

<style lang="scss" scoped>
.tags {
  @include flex-column;
  gap: var(--spacing-5);

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-5) var(--spacing-4);
    list-style-type: none;
  }
}
</style>
