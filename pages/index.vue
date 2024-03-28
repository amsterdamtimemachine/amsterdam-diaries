<template>
  <div class="home">
    <Map
      marker-variant="light-pink"
      :markers="markers"
      :zoom="14.3" />
  </div>
</template>

<script lang="ts" setup>
const markers = [
  {
    lat: 52.35876,
    lng: 4.87177,
  },
  {
    lat: 52.3646,
    lng: 4.8863,
  },
  {
    lat: 52.377,
    lng: 4.8884,
  },
  {
    lat: 52.372,
    lng: 4.8949,
  },
  {
    lat: 52.374,
    lng: 4.9006,
  },
  {
    lat: 52.3688,
    lng: 4.902,
  },
  {
    lat: 52.3595,
    lng: 4.9124,
  },
  {
    lat: 52.3682,
    lng: 4.9165,
  },
  {
    lat: 52.3595,
    lng: 4.8984,
  },
];
</script>

<style lang="scss" scoped>
.home {
  padding-top: 3rem;
}
</style>
