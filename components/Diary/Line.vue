<template>
  <button
    v-if="line.type === 'Annotation'"
    @click="$emit('annotationClick', line)"
    :id="line.id"
    :class="{ annotation: true, [line.subType!.toLowerCase()]: true }">
    {{ line.value }}
  </button>
  <span v-else>{{ line.value }}</span>
</template>

<script setup lang="ts">
defineProps<{
  line: TextLine | AnnotationLine;
}>();

defineEmits(['annotationClick']);
</script>

<style lang="scss" scoped>
// TODO: annotation type names may have to be changed
.annotation {
  line-height: 1.3;

  &.place {
    background: color-mix(in srgb, var(--green) 20%, transparent);
  }

  &.organization,
  &.date {
    color: var(--blue);
    text-decoration: underline;
  }

  &.theme {
    background: color-mix(in srgb, var(--purple) 20%, transparent);
  }
}
</style>
