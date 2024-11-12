<template>
  <span>{{ line.value }}</span>
</template>

<script setup lang="ts">
defineProps<{
  line: LineData;
}>();
</script>
