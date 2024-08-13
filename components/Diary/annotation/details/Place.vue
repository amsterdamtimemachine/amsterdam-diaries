<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-location"
    variant-color="green">
    <span class="type">locatie: </span>
    <NuxtLink
      class="link"
      :to="to">
      {{ name }}
    </NuxtLink>
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
  return props.line.name || props.line.reference || props.line.value || '';
});

const description = computed<string>(() => {
  return props.line.description || '';
});

const to = computed<RouteLocationRaw>(() => {
  const obj: RouteLocationRaw = { name: 'amsterdam' };
  if (props.line.reference) {
    obj.query = { id: btoa(props.line.reference) };
  }
  return obj;
});
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.link {
  color: var(--green);
}
</style>
