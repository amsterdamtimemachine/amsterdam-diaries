<template>
  <span
    v-if="duration"
    class="font-body-m">
    <span
      v-if="totalPages"
      class="total-pages"
      >{{ totalPages }} pagina's -
    </span>
    <span>leestijd: </span>
    <span>{{ duration }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  input?: string;
  totalPages: number;
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
@include sm-screen-up {
  .total-pages {
    display: none;
  }
}
span {
  color: var(--lavender-gray);
}
</style>
