<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-account"
    variant-color="blue">
    <span class="type">persoon: </span>
    <span class="person">
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
defineProps<{
  name: string;
  description?: string;
}>();
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
