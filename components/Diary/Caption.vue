<template>
  <p>
    <template
      v-for="(line, index) of input.lines"
      :key="index">
      <DiaryLine
        :line="line"
        @annotation-click="$emit('annotationClick', $event)"
        @annotation-hovering="$emit('annotationHovering', $event)" />
    </template>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  input: TextSection;
}>();

defineEmits(['annotationClick', 'annotationHovering']);
</script>

<style lang="scss" scoped>
p {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  border-left: var(--spacing-1) solid var(--image-caption);
  padding-left: var(--spacing-4);
  color: var(--image-caption);
}
</style>
