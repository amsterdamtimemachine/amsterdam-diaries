<template>
  <ul class="list">
    <li
      v-for="color in colors"
      :key="color"
      class="item">
      <div
        class="block"
        :style="`background-color: var(--${color})`" />
      {{ color }}
    </li>
  </ul>

  <ul class="list">
    <li
      v-for="font in fonts"
      :key="font">
      <span
        class="text"
        :style="`--font-family: '${font}'`"
        >Whereas recognition of the inherent dignity</span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
/**
 * State & props
 */
const colors = ref<string[]>([
  'black',
  'white-paper',
  'white',
  'light-green',
  'light-blue',
  'light-purple',
  'light-pink',
  'light-red',
  'light-yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'yellow',
]);

const fonts = ref<string[]>(['Hanken Grotesk', 'Schibsted Grotesk', 'Familjen Grotesk']);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 16px;
  list-style: none;
}

.item {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
}

.block {
  width: 20px;
  height: 20px;
}

.text {
  text-align: start;
  transition-property: opacity, transform;
  font-family: var(--font-family);
  font-weight: 100;
  font-style: normal;
  font-stretch: normal;
  font-optical-sizing: auto;
  opacity: 1;
  line-height: initial;
}
</style>
