<template>
  <button
    v-if="line.type === 'Annotation'"
    @click="$emit('annotationClick', line)"
    @mouseover="$emit('annotationHovering', { line, hovering: true })"
    @mouseleave="$emit('annotationHovering', { line, hovering: false })"
    :id="line.id"
    :class="{ annotation: true, [typeof line.subType === 'string' ? line.subType!.toLowerCase() : '']: true }">
    {{ line.value }}
  </button>
  <span v-else>{{ line.value }}</span>
</template>

<script setup lang="ts">
defineProps<{
  line: TextLine | AnnotationLine;
}>();

defineEmits(['annotationClick', 'annotationHovering']);
</script>

<style lang="scss" scoped>
.annotation {
  line-height: 1.3;

  &.place {
    background: color-mix(in srgb, var(--green) 20%, transparent);
  }

  // TODO: If we want to support multiple themes in the future this should be just '.theme'
  &.etenswaren {
    background: color-mix(in srgb, var(--purple) 20%, transparent);
  }

  &.person {
    background: color-mix(in srgb, var(--blue) 20%, transparent);
  }

  &.organization,
  &.date {
    color: var(--blue);
    text-decoration: underline;
  }
}
</style>
