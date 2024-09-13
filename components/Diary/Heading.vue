<template>
  <h2 class="font-h2">
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
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  input: TextSectionData;
}>();
</script>

<style lang="scss" scoped>
span {
  &:not(:last-child) {
    margin-right: var(--space-1);
  }
}
</style>
