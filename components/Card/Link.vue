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
  background-color: var(--white-basic);
  color: var(--black);
  padding: var(--spacing-6);
  text-decoration: none;

  .arrow-icon {
    flex: none;
  }
}
</style>
