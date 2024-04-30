<template>
  <div class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  @include flex-column;
  padding: var(--inner-page-padding);
  background-color: var(--white);
  border-radius: var(--border-radius-2);
  box-shadow: var(--card-shadow);
  gap: var(--spacing-2);
  width: var(--inner-page-width);
  z-index: 2;

  img {
    border-radius: var(--border-radius-3);
    box-shadow: var(--card-shadow);
    width: 100%;
  }
}
</style>
