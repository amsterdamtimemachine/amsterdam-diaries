<template>
  <div class="content-wrapper">
    <Header
      class="header"
      transparent />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 0;
}

.content-wrapper {
  padding: var(--space-8) var(--space-16);
}

.content {
  position: absolute;
  inset: 0;
  background: var(--linen);
}

@include sm-screen-down {
  .content-wrapper {
    padding: var(--space-8);
  }
}
</style>
