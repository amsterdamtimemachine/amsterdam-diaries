<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-calendar"
    variant-color="blue">
    <span class="type">datum: </span>
    <span class="date">
      {{ dateRef }}
    </span>
  </DiaryAnnotationDetailsBase>
</template>

<script setup lang="ts">
const props = defineProps<{
  line: AnnotationLine;
}>();

const dateRef = computed(() => {
  const dateString = props.line.correction || props.line.value || '';

  if (!useIsValidDateString(dateString)) {
    return dateString;
  }

  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
});
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.date {
  color: var(--blue);
}
</style>
