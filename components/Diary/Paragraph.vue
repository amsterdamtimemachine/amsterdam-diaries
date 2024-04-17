<template>
  <p>
    <template
      v-for="(line, index) of paragraph"
      :key="index">
      <DiaryLine
        :line="line"
        @annotation-click="$emit('annotationClick', $event)" />
    </template>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  paragraph?: ParagraphLine[];
}>();

defineEmits(['annotationClick']);
</script>
