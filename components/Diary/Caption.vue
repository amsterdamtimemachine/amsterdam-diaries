<template>
  <p>
    <template
      v-for="(line, index) of input.lines"
      :key="index">
      <DiaryAnnotationLine
        v-if="line.type === 'Annotation'"
        :line="line" />
      <DiaryLine
        v-else
        :line="line" />
    </template>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  input: TextSection;
}>();
</script>

<style lang="scss" scoped>
p {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  border-left: var(--spacing-1) solid var(--image-caption);
  padding-left: var(--spacing-4);
  color: var(--image-caption);
}

span {
  &:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
