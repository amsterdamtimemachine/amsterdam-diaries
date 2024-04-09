<template>
  <NuxtLink
    class="tag"
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
  padding: 0 var(--spacing-5);
  color: var(--black);
  background: var(--white);
  border: var(--spacing-1) solid var(--black);
  border-radius: var(--border-radius-6);
  transition: var(--transition-1);
  text-decoration: none;

  &:hover {
    background: var(--black);
    color: var(--white);
  }
  &:active {
    background: var(--gray);
  }
}
</style>
