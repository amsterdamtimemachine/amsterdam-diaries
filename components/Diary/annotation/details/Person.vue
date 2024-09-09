<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-account"
    variant-color="blue">
    <span class="type">persoon: </span>
    <NuxtLink
      v-if="props.line.slug"
      :to="`/personen/${line.slug}`"
      class="person">
      {{ name }}
    </NuxtLink>
    <span
      v-else
      class="person">
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
const props = defineProps<{
  line: AnnotationLine;
}>();

const name = computed<string>(() => {
  return props.line.name || props.line.value || '';
});

const description = computed<string>(() => {
  return props.line.description || '';
});
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.person,
.description {
  color: var(--blue);
}
</style>
