<template>
  <div class="paper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.paper {
  @include flex-column;
  padding: var(--space-15);
  background-color: var(--linen);
  border-radius: var(--border-radius-2);
  box-shadow: var(--shadow-1);
  gap: var(--space-1);
  width: var(--page-width);
  height: fit-content;

  img {
    border-radius: var(--border-radius-3);
    box-shadow: var(--shadow-1);
    width: 100%;
  }
}

@include sm-screen-down {
  .paper {
    width: 100%;
    padding: var(--space-4);
  }
}
</style>
