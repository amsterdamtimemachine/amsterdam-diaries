<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-location"
    variant-color="green">
    <span class="type">locatie: </span>
    <NuxtLink
      v-if="hasLocation"
      class="label"
      :to="to">
      {{ name }}
    </NuxtLink>
    <span
      class="label"
      v-else
      >{{ name }}</span
    >
    <template
      v-if="description"
      #content>
      {{ description }}
    </template>
  </DiaryAnnotationDetailsBase>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';

const props = defineProps<{
  line: AnnotationLine;
}>();

const name = computed<string>(() => {
  return props.line.name || props.line.value || '';
});

const description = computed<string>(() => {
  return props.line.description || '';
});

const to = computed<RouteLocationRaw>(() => {
  const obj: RouteLocationRaw = { name: 'amsterdam' };
  if (props.line.identifyingId) {
    obj.query = { id: btoa(props.line.identifyingId) };
  }
  return obj;
});

const hasLocation = computed<boolean>(() => {
  const noLocation = !props.line.latitude || !props.line.longitude;
  if (noLocation) {
    return false;
  }
  const maxBounds = useRuntimeConfig().app.maxBounds;
  return useIsCoordinateWithinBounds(props.line.latitude!, props.line.longitude!, maxBounds);
});
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.label {
  color: var(--green);
}
</style>
