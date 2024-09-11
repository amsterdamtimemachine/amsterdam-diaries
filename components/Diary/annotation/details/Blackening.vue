<template>
  <s>{{ line.value }}</s>
</template>

<script setup lang="ts">
defineProps<{
  line: AnnotationData;
}>();
</script>
