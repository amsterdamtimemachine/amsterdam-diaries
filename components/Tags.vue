<template>
  <div class="tags">
    <div
      v-if="title"
      class="font-title">
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
  gap: var(--space-4);

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4) var(--space-3);
    list-style-type: none;
  }
}
</style>
