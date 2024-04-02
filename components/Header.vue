<template>
  <header>
    <span class="brand-title">Amsterdam Time Machine</span>
    <slot />
    <!-- TODO: Add actual menu for for the button -->
    <button class="menu">
      <img
        src="~/assets/icons/menu.svg"
        alt="menu" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 3rem;
}
.brand-title {
  font-family: 'Familjen Grotesk';
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 90%;
  color: var(--purple);
  width: 13.5rem;
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--purple);
  transition: all 0.12s ease;

  &:hover {
    // Temporary hover state color, since it is not defined in the design
    background: var(--pink);
  }
}
</style>
