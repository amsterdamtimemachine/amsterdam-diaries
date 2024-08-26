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
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  border-left: var(--space-0) solid var(--taupe);
  padding-left: var(--space-3);
  color: var(--taupe);
}

span {
  &:not(:last-child) {
    margin-right: var(--space-1);
  }
}
</style>
