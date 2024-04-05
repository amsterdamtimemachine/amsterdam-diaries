<template>
  <div class="content-wrapper">
    <NuxtImg
      class="background-image content-wrapper content-container"
      src="about-atm.png"
      alt="About ATM" />
    <div class="gradient-wrapper content-wrapper">
      <div class="content-wrapper content-container">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-image {
  position: fixed;
  top: calc(var(--page-margin) * 2);
  z-index: 1;
}

.gradient-wrapper {
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
    linear-gradient(to bottom, rgba(193, 228, 220, 0.1) 30%, rgba(193, 228, 220, 1) 75%);
}
</style>
