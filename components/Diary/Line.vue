<template>
  <button
    v-if="line.type === 'annotation'"
    @click="$emit('annotationClick', line)"
    :id="line.id"
    :class="{ annotation: true, [line.annotationType!]: true }">
    {{ line.value }}
  </button>
  <span v-else> {{ line.value }} </span>
</template>

<script setup lang="ts">
defineProps<{
  line: ParagraphLine;
}>();

defineEmits(['annotationClick']);
</script>

<style lang="scss" scoped>
// TODO: annotation type names may have to be changed
.annotation {
  line-height: 1.3;
  padding-inline: calc(var(--spacing-1) * 2);

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
