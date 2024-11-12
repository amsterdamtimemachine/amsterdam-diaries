<template>
  <div class="external-link font-body-m">
    <BaseIcon
      class="icon"
      color="var(--white)"
      icon="mdi:external-link"
      width="var(--space-5)"
      height="var(--space-5)" />
    <a
      class="link"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      >{{ linkText }}</a
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  linkText: string;
}>();
</script>

<style lang="scss" scoped>
.external-link {
  @include flex-row;
  gap: var(--space-2);
  align-items: center;

  :deep(.icon) {
    background: var(--blue);
    border-radius: var(--border-radius-7);
    padding: var(--space-1);
  }

  .label {
    color: var(--lavender-gray);
  }

  .link {
    color: var(--blue);
  }
}
</style>
