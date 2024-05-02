<template>
  <DiaryAnnotationDetailsBase
    icon="mdi-location"
    variant-color="green">
    <span class="type">locatie: </span>
    <NuxtLink
      class="link"
      to="/amsterdam"
      >bekijk locaties in Amsterdam</NuxtLink
    >
  </DiaryAnnotationDetailsBase>
</template>

<style lang="scss" scoped>
.type {
  color: var(--lavender-gray);
}
.link {
  color: var(--green);
}
</style>
