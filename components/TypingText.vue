<template>
  <div ref="typingText" />
</template>

<script setup lang="ts">
const typingText = ref<HTMLElement>();

const props = withDefaults(
  defineProps<{
    text: string;
    duration?: number;
  }>(),
  {
    duration: 16,
  },
);

onMounted(() => {
  if (typingText.value) {
    useGsap.to(typingText.value, {
      duration: props.duration,
      text: props.text,
      ease: 'none',
    });
  }
});
</script>
