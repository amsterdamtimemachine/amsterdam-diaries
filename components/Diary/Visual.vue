<template>
  <img :src="input.uri" />
</template>

<script setup lang="ts">
defineProps<{
  input: VisualSectionData;
}>();
</script>

<style lang="scss" scoped>
img {
  width: fit-content;
  max-width: 100%;
}
</style>
