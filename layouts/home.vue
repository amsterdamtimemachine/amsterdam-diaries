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
  padding: var(--inner-page-padding);
  padding-block: var(--spacing-9);
}
.content {
  position: absolute;
  inset: 0;
  background: var(--white);
}
</style>
