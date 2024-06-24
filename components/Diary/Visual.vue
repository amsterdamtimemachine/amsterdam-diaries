<template>
  <figure>
    <img :src="input.uri" />
    <DiaryCaption
      v-if="input.captions?.length"
      :input="captionInput" />
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  input: VisualSection;
}>();

const captionInput = computed<TextSection>(() => {
  return {
    type: 'Caption',
    lines: props.input.captions || [],
  };
});
</script>

<style lang="scss" scoped>
figure {
  img {
    max-width: 100%;
  }
}
</style>
