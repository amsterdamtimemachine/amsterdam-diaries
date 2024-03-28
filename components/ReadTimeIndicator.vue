<template>
  <span v-if="duration">Leestijd: {{ duration }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  input?: string;
}>();

const duration = computed(() => {
  if (props.input) {
    const items = props.input.split(' ');
    const duration = items.length / 202;
    const time = [Math.floor(duration).toString()];
    const seconds = Math.round((duration % 1) * 60);
    if (seconds > 0) {
      let formattedTime = seconds.toString();
      if (seconds < 10) {
        formattedTime = formattedTime.padStart(2, '0');
      }
      time.push(formattedTime);
    }
    return `${time.join(':')} min`;
  }
  return;
});
</script>

<style lang="scss" scoped>
span {
  color: var(--lavender-gray);
  font-family: 'Hanken Grotesk';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 200%;
}
</style>
