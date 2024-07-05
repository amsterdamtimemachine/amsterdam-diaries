<template>
  <div class="description">
    <div
      ref="text"
      class="text"
      :class="{ collapsed: isCollapsed }"
      :style="textStyles">
      {{ input }}
    </div>
    <button
      v-if="hasCollapse"
      class="show-more"
      @click="isCollapsed = !isCollapsed">
      {{ buttonText }}
      <BaseIcon
        class="arrow-icon"
        :icon="icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * State & props
 */
const props = defineProps<{
  input: string;
  lines: number;
}>();

const text = ref<HTMLDivElement>();
const isCollapsed = ref<boolean>(true);
const maxHeight = ref<number | string>('unset');
const collapsedHeight = ref<number | string>('unset');

/**
 * Computed Properties
 */
const buttonText = computed<string>(() => {
  return isCollapsed.value ? 'Toon meer' : 'Toon minder';
});

const icon = computed<string>(() => {
  return isCollapsed.value ? 'mdi:arrow-down' : 'mdi:arrow-up';
});

const textStyles = computed(() => {
  const collapsedValue = collapsedHeight.value >= maxHeight.value ? maxHeight.value : collapsedHeight.value;
  const value = isCollapsed.value ? collapsedValue : maxHeight.value;
  const suffix = typeof value === 'number' ? 'px' : '';
  return {
    '--number-of-lines': props.lines,
    '--height': `${value}${suffix}`,
  };
});

const hasCollapse = computed<boolean>(() => {
  if (maxHeight.value === 'unset' || collapsedHeight.value === 'unset') {
    return false;
  }

  return maxHeight.value > collapsedHeight.value;
});

const calculateFullHeight = () => {
  // If no element exists, return
  if (!text.value) {
    return;
  }

  // Get the computed styles of the text element
  const computedStyles = window.getComputedStyle(text.value);
  // Calculate the collapsed height based on number of lines
  collapsedHeight.value = parseInt(computedStyles.lineHeight) * props.lines;

  // Clone the text element and remove unneeded classes/styles
  const clone = text.value.cloneNode(true) as HTMLDivElement;
  clone.classList.remove('collapsed');
  clone.style.cssText = '';

  // Apply necessary styles to the clone to hide it and get the full height
  Object.assign(clone.style, {
    display: 'block',
    position: 'absolute',
    visibility: 'hidden',
    whiteSpace: 'normal',
    WebkitLineClamp: 'unset',
    // Copy the computed styles from the text element
    width: computedStyles.width,
    fontSize: computedStyles.fontSize,
    fontWeight: computedStyles.fontWeight,
    lineHeight: computedStyles.lineHeight,
    letterSpacing: computedStyles.letterSpacing,
    wordSpacing: computedStyles.wordSpacing,
    padding: computedStyles.padding,
    margin: computedStyles.margin,
    border: computedStyles.border,
    boxSizing: computedStyles.boxSizing,
  });

  // Get the height of the clone by adding it to the document and removing it
  document.body.appendChild(clone);
  maxHeight.value = clone.offsetHeight;
  document.body.removeChild(clone);
};

onMounted(async () => {
  // Calculate the heights for collapse
  calculateFullHeight();

  // handle possible screen resizing
  window.addEventListener('resize', calculateFullHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateFullHeight);
});
</script>

<style lang="scss" scoped>
.description {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.show-more {
  display: none;
}

@include sm-screen-down {
  .text {
    overflow: hidden;
    height: var(--height);
    transition: var(--transition-1);

    &.collapsed {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--number-of-lines);
    }
  }

  .show-more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 0 calc(var(--space-0) * -1) var(--black);
    padding-bottom: var(--space-2);
    color: var(--text-color);
  }
}
</style>
