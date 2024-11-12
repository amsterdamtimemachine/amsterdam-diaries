<template>
  <div class="intro">
    <h1 class="title font-h1">{{ title }}</h1>
    <Description
      v-if="description"
      :input="description"
      :lines="lines"
      class="font-body-l" />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  lines: number;
}>();
</script>

<style lang="scss" scoped>
.intro {
  @include flex-column;
  gap: var(--space-8);
  width: var(--intro-width);
}

@include sm-screen-down {
  .intro {
    gap: var(--space-4);
    width: 100%;
  }
}
</style>
