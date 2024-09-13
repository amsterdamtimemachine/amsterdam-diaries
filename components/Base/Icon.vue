<template>
  <ClientOnly>
    <Icon v-bind="iconBindings" />
  </ClientOnly>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const iconBindings = computed(() => {
  const height = attrs.height || 'var(--space-6)';
  const width = attrs.width || 'var(--space-6)';

  return {
    ...attrs,
    height: 'none',
    width: 'none',
    style: {
      width,
      height,
    },
  };
});
</script>
