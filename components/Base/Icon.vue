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

// TODO: Change into var(--space-6)?
const iconBindings = computed(() => {
  const height = attrs.height || '1.5rem';
  const width = attrs.width || '1.5rem';

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
