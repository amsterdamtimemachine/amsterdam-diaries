<template>
  <div class="annotation-details font-body-m">
    <div class="main">
      <span class="icon variant-bg">
        <BaseIcon
          color="var(--white-paper)"
          width="var(--size-3)"
          height="var(--size-3)"
          :icon="icon" />
      </span>
      <div class="right">
        <slot />
      </div>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  variantColor: 'purple' | 'green' | 'blue';
}>();
const variantColor = computed(() => `var(--${props.variantColor})`);
</script>

<style lang="scss" scoped>
.annotation-details {
  position: absolute;
  top: calc(100% + var(--size-1));
  left: 0;
  background: var(--white-paper);
  padding: var(--size-2);
  box-shadow: 0px var(--size-1) var(--size-1) rgba(0, 0, 0, 0.25);
  z-index: 2;

  .main {
    display: flex;
    align-items: center;
    height: fit-content;
    gap: var(--spacing-3);

    .right {
      display: flex;
      gap: var(--spacing-4);
      align-items: center;
      flex: 1;
      text-wrap: nowrap;

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
  .content {
    text-wrap: wrap;
    padding-left: var(--spacing-8);
  }
}
</style>
