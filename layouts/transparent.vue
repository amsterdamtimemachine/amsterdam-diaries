<template>
  <div class="content-wrapper">
    <Header transparent />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
header {
  max-width: unset;
}

@include sm-screen-up {
  header {
    display: none;
  }
}
</style>
