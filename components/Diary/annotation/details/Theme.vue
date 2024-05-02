<template>
  <DiaryAnnotationDetailsBase
    icon="gridicons:themes"
    variant-color="purple">
    <span class="type">topic: </span>
    <NuxtLink
      class="link"
      :to="`/themas/${subType.toLowerCase()}`"
      >{{ subType }}</NuxtLink
    >
  </DiaryAnnotationDetailsBase>
</template>

<script setup lang="ts">
defineProps<{
  subType: string;
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
