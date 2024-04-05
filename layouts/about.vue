<template>
  <div class="content-wrapper">
    <NuxtImg
      class="background-image"
      src="about-atm.png"
      alt="About ATM" />
    <div class="gradient-wrapper">
      <div class="content-wrapper content-container">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-image {
  @include flex-column;
  align-items: center;
  width: calc(100% - 2 * var(--page-padding));
  max-width: var(--content-width);
  position: fixed;
  top: 10rem;
  z-index: 1;
}

.gradient-wrapper {
  @include flex-column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: linear-gradient(
      to bottom,
      rgba(255, 240, 211, 0.25) 20%,
      rgba(255, 240, 211, 1) 30%,
      rgba(255, 240, 211, 1) 50%,
      rgba(255, 240, 211, 0.25) 100%
    ),
    linear-gradient(to bottom, rgba(193, 228, 220, 0.1) 30%, rgba(193, 228, 220, 1) 80%);
}
</style>
