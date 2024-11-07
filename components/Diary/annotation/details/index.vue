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
        <span class="type"> {{ label }}: </span>
        <span v-if="line.subType === 'Date'">
          {{ dateRef }}
        </span>
        <NuxtLink
          v-else-if="to"
          :to="to">
          {{ line.subType === 'Theme' ? useCapitalize(line.slug!) : name }}
        </NuxtLink>
        <span v-else>
          {{ name }}
        </span>
      </div>
    </div>
    <div class="content">
      {{ description }}
    </div>
    <ExternalLink
      v-if="useExternalLink && externalLinkText"
      :link="line.identifyingId || ''"
      :link-text="externalLinkText" />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';

/**
 * State & Props
 */
const props = defineProps<{
  line: AnnotationData;
}>();
const { icon, label, variant, useExternalLink, path } = AnnotationDetails[props.line.subType.toLowerCase()];
const details = ref<HTMLElement>();

/**
 * Computed properties
 */
const detailsStyle = computed(() => {
  const element = details.value;
  const parentElement = element?.parentElement;
  const page = document.querySelector('.diary-page');

  // If we don't have a parent element or page, return object with left 0
  if (!parentElement || !page) {
    return { left: 0 };
  }

  const parentRect = parentElement.getBoundingClientRect();
  const value = parentRect.left + element.offsetWidth;

  // On desktop check body offsetwidth
  if (window.innerWidth > 1024) {
    return document.body.offsetWidth < value ? { right: 0 } : { left: 0 };
  } else {
    const pageRect = page?.getBoundingClientRect();
    const valueRight = parentRect.right - element.offsetWidth;

    // Reset position if element is outside of page, otherwise return 0 pos
    if (page.offsetWidth < value) {
      const pos = valueRight - pageRect.left;
      return { right: `${pos < pageRect.left ? pos : 0}px` };
    } else {
      const pos = pageRect.left + value;
      return { left: `${pos > pageRect.right ? pos : 0}px` };
    }
  }
});

const variantColor = computed<string>(() => `var(--${variant})`);

const dateRef = computed(() => {
  const dateString = props.line.correction || props.line.value || '';

  if (!useIsValidDateString(dateString)) {
    return dateString;
  }

  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
});

const name = computed<string>(() => {
  return props.line.name || props.line.value || '';
});

const description = computed<string>(() => {
  return props.line.description || '';
});

const to = computed(() => {
  if (props.line.subType === 'Place') {
    if (!props.line.latitude || !props.line.longitude) {
      return '';
    }
    const { maxBounds } = useRuntimeConfig().app;
    if (useIsCoordinateWithinBounds(props.line.latitude, props.line.longitude, maxBounds)) {
      const obj: RouteLocationRaw = { name: 'kaart' };
      if (props.line.identifyingId) {
        obj.query = { id: btoa(props.line.identifyingId) };
      }
      return obj;
    }
    return '';
  }

  if (path && props.line.slug) {
    return `/${path}/${props.line.slug}`;
  }
  return '';
});

const externalLinkText = computed<string>(() => {
  return useExternalLinkType(props.line.identifyingId || '');
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
  line-height: 200%;

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

      .type {
        color: var(--lavender-gray);
      }
      > :not(.type) {
        color: v-bind('variantColor');
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
