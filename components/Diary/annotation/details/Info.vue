<template>
  <DiaryAnnotationDetailsBase
    :icon="icon"
    :variant-color="variant"
    v-bind="infoBindings">
    <span class="type"> {{ label }}: </span>
    <span
      v-if="line.subType === 'Date'"
      class="info">
      {{ dateRef }}
    </span>
    <NuxtLink
      v-else-if="to"
      :to="to"
      class="info">
      {{ name }}
    </NuxtLink>
    <span
      v-else
      class="info">
      {{ name }}
    </span>
    <template
      v-if="description"
      #content>
      {{ description }}
    </template>
  </DiaryAnnotationDetailsBase>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';

/**
 * State & Props
 */
const props = defineProps<{
  line: AnnotationLine;
}>();

const { icon, label, variant, useExternalLink, path, useTypeForNameAndPath } =
  AnnotationDetailsInfo[props.line.subType.toLowerCase()];

const name = computed<string>(() => {
  return useTypeForNameAndPath ? props.line.subType : props.line.name || props.line.value || '';
});

/**
 * Computed properties
 */
const description = computed<string>(() => {
  return props.line.description || '';
});

const variantColor = computed<string>(() => `var(--${variant})`);

const infoBindings = computed(() => {
  if (useExternalLink) {
    return { 'external-link': props.line.identifyingId };
  }
  return {};
});

const to = computed(() => {
  if (props.line.subType === 'Place') {
    if (!props.line.latitude || !props.line.longitude) {
      return '';
    }
    const { maxBounds } = useRuntimeConfig().app;
    if (useIsCoordinateWithinBounds(props.line.latitude, props.line.longitude, maxBounds)) {
      const obj: RouteLocationRaw = { name: 'amsterdam' };
      if (props.line.identifyingId) {
        obj.query = { id: btoa(props.line.identifyingId) };
      }
      return obj;
    }
    return '';
  }

  if (path) {
    if (useTypeForNameAndPath) {
      return `/${path}/${props.line.subType.toLowerCase()}`;
    } else if (props.line.slug) {
      return `/${path}/${props.line.slug}`;
    }
  }
  return '';
});

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
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.info,
.description {
  color: v-bind('variantColor');
}
</style>
