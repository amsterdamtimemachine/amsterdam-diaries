<template>
  <header :class="{ container: true, active: showMenu }">
    <NuxtLink
      class="logo"
      to="/">
      <Image
        src="logos/atm-diaries.svg"
        alt="Amsterdam Diaries Time Machine" />
    </NuxtLink>
    <nav class="menu-section">
      <NuxtLink
        @click="hideMenu"
        to="/themas">
        Thema's
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/personen">
        Personen
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/dagboekschrijfsters">
        Dagboekschrijfsters
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/amsterdam">
        Amsterdam
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/organisaties">
        Organisaties
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/kalender">
        Kalender
      </NuxtLink>
      <NuxtLink
        @click="hideMenu"
        to="/about">
        Over ATM
      </NuxtLink>
    </nav>
    <button
      class="menu-button"
      @click="showMenu = !showMenu">
      <BaseIcon
        width="var(--space-9)"
        color="var(--linen)"
        :icon="showMenu ? 'mdi:times' : 'mdi:menu'" />
    </button>
  </header>
</template>

<script setup lang="ts">
/**
 * State
 */
const showMenu = ref<boolean>(false);

/**
 * Methods
 */

const hideMenu = () => {
  showMenu.value = false;
};

/**
 * Watcher
 * Note: Needed to prevent the user from reloading the page on swipe down
 */
watch(showMenu, newValue => {
  const htmlElement = document.documentElement;
  if (newValue) {
    htmlElement.style.overscrollBehavior = 'none';
    htmlElement.style.overflow = 'hidden';
  } else {
    htmlElement.style.overscrollBehavior = '';
    htmlElement.style.overflow = '';
  }
});
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-rows: var(--space-18); // 4.5rem;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'logo menu button';
  align-items: center;
  position: fixed;
  padding-top: var(--space-8);
  padding-bottom: var(--space-6);
  z-index: 2000; // Above the map
  transition: var(--transition-3);
  pointer-events: none;
  top: 0;
  background-color: var(--alabaster);

  &.active {
    .menu-section {
      opacity: 1;
      pointer-events: initial;
    }

    .menu-button {
      background: var(--pink);
    }
  }
}

.logo {
  pointer-events: initial;
  grid-area: logo;
}

.menu-button {
  position: relative;
  grid-area: button;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--space-12);
  height: var(--space-12);
  border-radius: var(--border-radius-7);
  background: var(--purple);
  pointer-events: initial;

  &:hover {
    background: var(--pink);
  }
}

.menu-section {
  grid-area: menu;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  width: 100%;
  transition: var(--transition-3);
  gap: var(--space-8);

  a {
    // Prevents the text from wrapping
    flex: none;
    text-decoration: none;
    color: var(--black);
    padding: var(--space-1);
    border-bottom: var(--space-0) solid var(--black);

    &:hover {
      color: var(--purple);
      border-color: var(--purple);
    }
  }
}

@include sm-screen-up {
  .menu-button {
    display: none;
  }
  .menu-section {
    opacity: 1;
    pointer-events: initial;
    padding-left: var(--space-16);
  }
}

// Used for screens in between mobile and desktop. Only used once so no mixin needed
@media screen and (max-width: 74.25rem) {
  .menu-section {
    gap: var(--space-4);
  }
}

@include sm-screen-down {
  header {
    grid-template-rows: var(--space-20) auto;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'logo button'
      'menu menu';
    gap: 0;
    margin: 0;
    padding: var(--space-2) var(--space-4);
    transition: var(--transition-3);
    height: var(--space-22);
    overflow: hidden;
    inset: 0;
    max-width: unset;

    &.active {
      overscroll-behavior: none;
      background-color: var(--alabaster);
      height: 100%;

      :root {
        --scrollbar-width: 0;
      }
    }

    .menu-button {
      justify-self: end;
    }

    .menu-section {
      justify-content: flex-start;
      align-self: start;
      overflow-y: scroll;
      height: 100%;
      flex-direction: column;
      gap: 0;
      width: 100%;
      margin-bottom: var(--space-8);

      a {
        width: 100%;
        padding-block: var(--space-6);
      }
    }
  }
}
</style>
