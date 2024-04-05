<template>
  <NuxtLink
    :to="link"
    class="link font-body-l">
    <span>{{ linkText }}</span>
    <BaseIcon
      class="arrow-icon"
      icon="mdi:arrow-right" />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  linkText: string;
}>();
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--black);
  text-decoration: none;

  .arrow-icon {
    flex: none;
  }
}
</style>
