<template>
  <div
    ref="details"
    class="annotation-details font-body-m"
    :style="detailsStyle">
    <div class="main">
      <span class="icon variant-bg">
        <BaseIcon
          color="var(--alabaster)"
          width="var(--space-3)"
          height="var(--space-3)"
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
const details = ref<HTMLElement>();
const props = defineProps<{
  icon: string;
  variantColor: 'purple' | 'green' | 'blue';
}>();
const variantColor = computed(() => `var(--${props.variantColor})`);

const detailsStyle = computed(() => {
  // If we don't have a parent element, return an empty object
  const element = details.value;
  const parentElement = element?.parentElement;
  if (!parentElement) {
    return { left: 0 };
  }

  // Get the parent element's bounding rect
  const parentRect = parentElement.getBoundingClientRect();
  const value = parentRect.left + element.offsetWidth;
  return document.body.offsetWidth < value ? { right: 0 } : { left: 0 };
});
</script>

<style lang="scss" scoped>
.annotation-details {
  position: absolute;
  top: calc(100% + var(--space-1));
  background: var(--alabaster);
  padding: var(--space-2);
  box-shadow: var(--shadow-2);
  z-index: 2;

  .main {
    display: flex;
    align-items: center;
    height: fit-content;
    gap: var(--space-2);

    .right {
      display: flex;
      gap: var(--space-2);
      align-items: center;
      flex: 1;
      text-wrap: nowrap;

      .line {
        height: var(--space-0);
        flex: 1;
      }
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--border-radius-7);
      width: var(--space-5);
      height: var(--space-5);
    }

    .variant-bg {
      background: v-bind('variantColor');
    }
  }
  .content {
    text-wrap: wrap;
    padding-left: var(--space-7);
  }
}
</style>
