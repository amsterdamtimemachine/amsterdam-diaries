<template>
  <header :class="{ transparent, active: showMenu }">
    <NuxtLink
      class="logo"
      to="/">
      <Image
        src="logos/atm-diaries.svg"
        alt="Amsterdam Diaries Time Machine" />
    </NuxtLink>

    <div class="menu-section">
      <Transition name="fade">
        <nav v-if="showMenu">
          <NuxtLink to="/"> Home </NuxtLink>
          <NuxtLink to="/dagboekschrijfsters/gerda-oestreicher-laqueur"> Dagboekschrijfsters </NuxtLink>
          <NuxtLink to="/about"> Over ATM </NuxtLink>
          <NuxtLink to="/amsterdam"> Wat gebeurde in Amsterdam </NuxtLink>
        </nav>
      </Transition>
      <button
        :class="{ menu: true, active: showMenu }"
        @click="showMenu = !showMenu">
        <BaseIcon
          width="var(--space-9)"
          color="var(--linen)"
          :icon="showMenu ? 'mdi:times' : 'mdi:menu'" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  transparent?: boolean;
}>();

const showMenu = ref<boolean>(false);
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2000;
  width: 100%;
  padding-block: var(--space-8) var(--space-7);
  background-color: transparent;
  transition: var(--transition-1);
  pointer-events: none;

  &.active:not(.transparent) {
    background-color: var(--alabaster);
    pointer-events: initial;
  }
}

.logo {
  pointer-events: initial;
}

.menu-section {
  display: flex;
  align-items: center;
  gap: var(--space-17);
  pointer-events: initial;

  nav {
    display: flex;
    gap: var(--space-8);

    a {
      text-decoration: none;
      color: var(--black);
      padding: var(--space-1);
      border-bottom: var(--space-0) solid var(--black);
      transition: var(--transition-1);

      &:hover {
        color: var(--purple);
        border-color: var(--purple);
      }
    }
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--space-12);
  height: var(--space-12);
  border-radius: var(--border-radius-7);
  background: var(--purple);
  transition: var(--transition-1);
  pointer-events: initial;

  &:hover,
  &.active {
    background: var(--pink);
  }
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: var(--transition-1);
}
</style>
