<template>
  <header>
    <span class="font-brand title">Amsterdam Diaries Time Machine</span>
    <div class="menu-section">
      <Transition name="fade">
        <nav v-if="showMenu">
          <NuxtLink to="/"> Home </NuxtLink>
          <NuxtLink to="/dagboekschrijfsters/els-polak"> Dagboekschrijfsters </NuxtLink>
          <NuxtLink to="/about"> Over ATM </NuxtLink>
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
const showMenu = ref<boolean>(false);
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: calc(var(--spacing-7) * 2);
  z-index: 10;
  width: 100%;
}

.title {
  width: calc(var(--size-12) * 2);
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
