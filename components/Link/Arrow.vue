<template>
  <NuxtLink
    :to="link"
    class="link font-title">
    <span>{{ linkText }}</span>
    <BaseIcon
      class="arrow-icon"
      :icon="icon" />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    link?: string;
    linkText: string;
    icon?: string;
  }>(),
  {
    icon: 'mdi:arrow-right',
  },
);
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--black);
  text-decoration: none;
  transition: var(--transition-1);

  .arrow-icon {
    flex: none;
  }

  &:hover {
    box-shadow: inset 0 calc(var(--spacing-1) * -1) var(--black);
  }
}
</style>
