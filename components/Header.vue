<template>
  <header>
    <span class="font-brand title">Amsterdam Time Machine</span>
    <slot />
    <!-- TODO: Add actual menu for for the button -->
    <button class="menu">
      <BaseIcon
        width="2.25rem"
        color="var(--white)"
        icon="mdi:menu" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: calc(var(--spacing-7) * 2);
  z-index: 2;
}
.title {
  width: var(--size-13);
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--size-10);
  height: var(--size-10);
  border-radius: var(--border-radius-7);
  background: var(--purple);
  transition: var(--smooth-transition);

  &:hover {
    background: var(--pink);
  }
}
</style>
