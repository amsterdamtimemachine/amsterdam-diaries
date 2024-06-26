<template>
  <div class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  @include flex-column;
  padding: var(--space-15);
  background-color: var(--linen);
  border-radius: var(--border-radius-2);
  box-shadow: var(--shadow-1);
  gap: var(--space-1);
  width: var(--inner-page-width);

  img {
    border-radius: var(--border-radius-3);
    box-shadow: var(--shadow-1);
    width: 100%;
  }
}
</style>
