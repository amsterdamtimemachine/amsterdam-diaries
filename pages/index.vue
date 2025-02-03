<template>
  <div class="fixed-full-screen">
    <div class="content">
      <div
        class="info"
        :class="{ 'sm-hide': showNav }">
        <NuxtLink
          class="logo"
          to="/">
          <Image
            src="logos/atm-diaries.svg"
            alt="Amsterdam Diaries Time Machine" />
        </NuxtLink>
        <div class="text-info">
          <h1 class="font-h2">{{ title }}</h1>
          <TypingText
            v-if="showTypedText"
            :duration="4"
            class="font-body-l"
            :text="description" />
          <div
            v-else
            class="font-body-l">
            {{ description }}
          </div>
        </div>
      </div>
      <div>
        <button
          v-if="!showNav"
          class="link"
          @click="showNav = !showNav">
          <span>Ontdek het verhaal van de stad</span>
          <BaseIcon
            class="arrow-icon"
            icon="mdi:arrow-right" />
        </button>
        <Transition name="fade">
          <div v-if="showNav">
            <div class="font-body-l">Selecteer:</div>
            <div class="nav-links">
              <LinkArrow
                class="nav-link"
                link-text="Kaart"
                link="/kaart" />
              <LinkArrow
                class="nav-link"
                link-text="Dagboekschrijfsters"
                link="/dagboekschrijfsters" />
              <LinkArrow
                class="nav-link"
                link-text="Thema's"
                link="/themas" />
              <LinkArrow
                class="nav-link"
                link-text="Organisaties"
                link="/organisaties" />
              <LinkArrow
                class="nav-link"
                link-text="Kalender"
                link="/kalender" />
              <LinkArrow
                class="nav-link"
                link-text="Personen"
                link="/personen" />
              <LinkArrow
                class="nav-link"
                link-text="Over ATM"
                link="/about" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="background">
      <div class="notice">
        <div class="message">
          <p class="font-body-m">Afbeelding door AI gegenereerd</p>
        </div>
        <BaseIcon
          class="icon"
          icon="mdi:information-slab-symbol"
          width="var(--space-8)"
          height="var(--space-8)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'transparent',
});
const showNav = ref<boolean>(false);
const { title, description } = toRefs(reactive(await $fetch('/api/info?type=home')));
const showTypedText = useState('showTypedText', () => true);

onUnmounted(() => {
  showTypedText.value = false;
});
</script>

<style lang="scss" scoped>
.fixed-full-screen {
  display: grid;
  grid-template-columns: var(--space-160) 1fr;
  grid-template-areas: 'content background';
  height: 100%;
}

.content {
  @include flex-column;
  gap: var(--space-5);
  grid-area: content;
  justify-content: space-between;
  padding: var(--space-12);
  padding-top: var(--space-10);
  overflow: hidden; // Needed so no scrollbar appears when link is translated off screen
  background: var(--linen);
}

.info {
  @include flex-column;
  gap: var(--space-10);
}

.text-info {
  @include flex-column;
  gap: var(--space-5);
}

.link {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  color: var(--black);
  text-decoration: none;
  transition: var(--transition-1);
  border-bottom: var(--space-0) solid transparent;
  width: fit-content;

  .arrow-icon {
    flex: none;
  }

  &:hover {
    border-bottom: var(--space-0) solid var(--black);
  }
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-top: var(--space-2);

  .nav-link {
    background: var(--white);
    padding: var(--space-3) var(--space-5);
  }
}

.background {
  grid-area: background;
  background: url('@/assets/images/home-bg.jpg') no-repeat bottom;
  background-size: cover;
  position: relative;
}

.notice {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  height: var(--space-8);
  background: var(--white);
  border-radius: var(--border-radius-6);
  text-align: center;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .message {
    flex-shrink: 1;
    max-width: 0;
    white-space: nowrap;
    overflow: hidden;
    transition: var(--transition-2);
    color: var(--black);

    p {
      margin-left: var(--space-2);
    }
  }

  &:hover {
    .message {
      max-width: var(--space-80);
    }
  }
}

@include sm-screen-down {
  .logo {
    display: none;
  }

  .fixed-full-screen {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 3fr;
    grid-template-areas:
      'background'
      'content';
  }
  .content {
    padding: var(--space-6) var(--space-4);
    overflow: initial;
  }
  .nav-links {
    gap: var(--space-2);

    .nav-link {
      padding: var(--space-3) var(--space-5);
    }
  }
}
</style>
