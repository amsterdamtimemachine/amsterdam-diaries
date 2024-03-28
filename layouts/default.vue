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
  background: linear-gradient(
    180deg,
    var(--white-paper) 0%,
    var(--light-yellow) 40%,
    var(--white-paper) 60%,
    var(--light-green) 80%,
    var(--white-paper) 100%
  );
  z-index: -1;
}
</style>
