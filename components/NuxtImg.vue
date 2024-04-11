<!-- TODO: This file is temporary until NuxtImg can fix the issue with images not loading in build -->
<template>
  <img
    :src="img"
    :alt="props.alt" />
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
}>();
const img = props.src.startsWith('https://') ? props.src : useImage(props.src);
</script>
