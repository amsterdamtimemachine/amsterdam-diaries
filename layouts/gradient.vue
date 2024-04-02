<template>
  <div class="content-wrapper">
    <div class="content-container">
      <Header />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  background: linear-gradient(
    180deg,
    var(--white-paper) 0%,
    var(--light-yellow) 40%,
    var(--white-paper) 60%,
    var(--light-green) 80%,
    var(--white-paper) 100%
  );
}
</style>
