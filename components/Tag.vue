<template>
  <NuxtLink
    :class="{ tag: true, active: tag.active }"
    :to="tag.link">
    {{ tag.title }}
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  tag: Tag;
}>();
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  padding: 0 var(--space-4);
  color: var(--black);
  background: var(--linen);
  border: var(--space-0) solid var(--black);
  border-radius: var(--border-radius-6);
  transition: var(--transition-1);
  text-decoration: none;

  &:hover,
  &.active {
    background: var(--black);
    color: var(--linen);
  }
  &:active {
    background: var(--gray);
  }
}
</style>
