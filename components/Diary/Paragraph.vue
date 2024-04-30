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
span,
button {
  &:not(:last-child) {
    margin-right: 4px;
  }
}
</style>
