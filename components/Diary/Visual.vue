<template>
  <figure>
    <img :src="input.uri" />
    <figcaption v-if="input.captions?.length">
      <template
        v-for="(line, index) of input.captions"
        :key="index">
        <DiaryLine
          :line="line"
          class="caption" />
      </template>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  input: VisualSection;
}>();
defineEmits(['annotationClick', 'annotationHovering']);
</script>

<style lang="scss" scoped>
figure {
  img {
    width: 100%;
  }

  figcaption {
    color: var(--gray);
    padding-left: var(--spacing-4);
    border-left: var(--spacing-1) solid var(--gray);
  }

  .caption {
    display: block;
  }
}
</style>
