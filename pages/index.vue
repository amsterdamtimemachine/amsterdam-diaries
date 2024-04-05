<template>
  <div class="home">
    <h1 class="font-h1">Homepage</h1>
    <NuxtLink to="/dagboeken/TobyVos">Dagboek Toby Vos</NuxtLink>
    <NuxtLink to="/profielen/Els">Profiel Els Polak</NuxtLink>
    <NuxtLink to="/themas/cultuur-en-dagelijks-leven">Cultuur en Dagelijks Leven</NuxtLink>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.home {
  @include flex-column;
  margin-block: var(--page-margin);
}
</style>
