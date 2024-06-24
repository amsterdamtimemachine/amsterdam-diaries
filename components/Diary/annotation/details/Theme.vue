<template>
  <DiaryAnnotationDetailsBase
    icon="gridicons:themes"
    variant-color="purple">
    <span class="type">topic: </span>
    <NuxtLink
      class="link"
      :to="`/themas/${line.subType.toLowerCase()}`"
      >{{ line.subType }}</NuxtLink
    >
  </DiaryAnnotationDetailsBase>
</template>

<script setup lang="ts">
defineProps<{
  line: AnnotationLine;
}>();
</script>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.link {
  color: var(--purple);
}
</style>
