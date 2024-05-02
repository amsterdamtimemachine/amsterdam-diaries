<template>
  <div class="annotation-details font-body-m">
    <span class="icon variant-bg">
      <BaseIcon
        color="var(--white-paper)"
        width="var(--size-3)"
        height="var(--size-3)"
        :icon="icon" />
    </span>
    <div class="right">
      <slot />
      <span class="line variant-bg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  variantColor: 'purple' | 'green' | 'blue' | 'yellow';
}>();
const variantColor = computed(() => `var(--${props.variantColor})`);
</script>

<style lang="scss" scoped>
.annotation-details {
  display: flex;
  align-items: center;
  height: fit-content;
  gap: var(--spacing-3);
  background-color: var(--white-paper);
  padding-block: var(--spacing-3);
  padding-left: var(--spacing-3);

  .right {
    display: flex;
    gap: var(--spacing-4);
    align-items: center;
    flex: 1;

    .line {
      height: var(--spacing-1);
      flex: 1;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-7);
    width: var(--size-5);
    height: var(--size-5);
  }

  .variant-bg {
    background: v-bind('variantColor');
  }
}
</style>
