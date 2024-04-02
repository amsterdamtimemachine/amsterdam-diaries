<template>
  <div class="home">
    <h1>Homepage</h1>
    <NuxtLink to="/dagboek/TobyVos">Dagboek Toby Vos</NuxtLink>
    <NuxtLink to="/profiel/Els">Profiel Els Polak</NuxtLink>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.home {
  @include flex-column;
  padding-top: 3rem;
}
</style>
