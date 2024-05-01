<template>
  <h2 class="font-h2">
    <template
      v-for="(line, index) of input.lines"
      :key="index">
      <DiaryLine
        :line="line"
        @annotation-click="$emit('annotationClick', $event)"
        @annotation-hovering="$emit('annotationHovering', $event)" />
    </template>
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  input: TextSection;
}>();

defineEmits(['annotationClick', 'annotationHovering']);
</script>

<style lang="scss" scoped>
span,
button {
  &:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
