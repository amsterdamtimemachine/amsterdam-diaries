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
  const height = attrs.height || '1rem';
  const width = attrs.width || '1rem';

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
