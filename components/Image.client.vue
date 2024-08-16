<template>
  <img
    v-if="!invalidImage"
    :src="img"
    :alt="props.alt"
    @error="handleImageError" />
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
  default?: string;
}>();
const img = ref<string>(props.src.startsWith('https://') ? props.src : useLocalImage(props.src));
const invalidImage = ref<boolean>(false);

// Add watcher to update image source when src prop changes
watch(
  () => props.src,
  newSrc => {
    img.value = newSrc.startsWith('https://') ? newSrc : useLocalImage(newSrc);
  },
);

const handleImageError = () => {
  if (props.default) {
    img.value = props.default!.startsWith('https://') ? props.default : useLocalImage(props.default!);
  } else {
    invalidImage.value = true;
  }
};
</script>
