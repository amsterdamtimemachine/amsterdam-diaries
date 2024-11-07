<template>
  <Image
    class="background-image container"
    src="about-atm.png"
    alt="About ATM" />
  <div class="gradient-bg" />
  <div class="page-container">
    <BasePaper>
      <div
        class="content"
        v-html="parsedDescription" />
      <div class="logos">
        <NuxtLink
          v-for="logo of logos"
          :key="logo.name"
          class="logo"
          :to="logo.url"
          target="_blank">
          <Image
            :src="logo.src"
            :alt="logo.name" />
        </NuxtLink>
      </div>
    </BasePaper>
  </div>
</template>

<script setup lang="ts">
const logos = ref<{ name: string; src: string; url: string }[]>([
  {
    name: 'Amsterdam Time Machine',
    src: 'logos/atm.svg',
    url: 'https://www.amsterdamtimemachine.nl/',
  },
  {
    name: 'Netwerk Digitaal Erfgoed',
    src: 'logos/nde.png',
    url: 'https://netwerkdigitaalerfgoed.nl/',
  },
  {
    name: 'UvA',
    src: 'logos/uva.png',
    url: 'https://www.uva.nl/',
  },
  {
    name: 'VU',
    src: 'logos/vu.png',
    url: 'https://www.vu.nl/',
  },
  {
    name: 'Gemeente Amsterdam Stadsarchief',
    src: 'logos/gas.png',
    url: 'https://www.amsterdam.nl/stadsarchief/',
  },
  {
    name: 'Joods Museum',
    src: 'logos/jm.svg',
    url: 'https://jck.nl/',
  },
  {
    name: 'Atria',
    src: 'logos/atria.png',
    url: 'https://atria.nl/',
  },
  {
    name: 'Verzetsmuseum',
    src: 'logos/vrm.png',
    url: 'https://www.verzetsmuseum.org/',
  },
  {
    name: 'Total Design',
    src: 'logos/td.png',
    url: 'https://totaldesign.com/',
  },
]);
const { description } = toRefs(reactive(await $fetch('/api/info?type=about')));
const parsedDescription = computed(() => description.value?.replace(/<h2>/g, '<h2 class="font-h2">') || '');
</script>

<style lang="scss" scoped>
.background-image {
  position: fixed;
  top: var(--space-40);
  z-index: -1;
  border-radius: var(--space-3);
  height: var(--about-background-height);
  object-fit: cover;
}

.gradient-bg {
  @extend .background-image;
  background: var(--linear-gradient-1);
  width: 100%;
  height: 100%;
}

.content {
  @include flex-column;
  gap: var(--space-8);
}

@include sm-screen-down {
  .background-image {
    display: none;
  }
}

.page-container {
  @include flex-column;
  align-items: center;
}

.paper {
  gap: var(--space-8);
}

.logos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, var(--space-28));
  gap: var(--space-5);

  .logo {
    display: flex;
    align-items: center;
    background: var(--alabaster);
    padding: var(--space-6);
    height: var(--space-28);
    transition: var(--transition-2);

    &:hover {
      transform: scale(1.1);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

@include sm-screen-down {
  .logos {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    gap: var(--space-3);

    .logo {
      height: var(--space-24);
    }
  }
}
</style>
