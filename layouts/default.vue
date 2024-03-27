<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div {
  max-width: var(--content-width);
  padding: var(--page-padding);
  margin: 0 auto;
}
</style>
