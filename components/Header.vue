<template>
  <header :class="{ transparent, active: showMenu }">
    <NuxtLink to="/">
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
          width="var(--size-9)"
          color="var(--white)"
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
  z-index: 10;
  width: 100%;
  padding-block: var(--spacing-9) var(--spacing-8);
  background-color: transparent;
  transition: var(--transition-1);

  &.active:not(.transparent) {
    background-color: var(--white-paper);
  }
}

.menu-section {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-13) + 1rem);

  nav {
    display: flex;
    gap: var(--spacing-9);

    a {
      text-decoration: none;
      color: var(--black);
      padding: var(--spacing-2);
      border-bottom: var(--spacing-1) solid var(--black);
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
  width: var(--size-10);
  height: var(--size-10);
  border-radius: var(--border-radius-7);
  background: var(--purple);
  transition: var(--transition-1);

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
