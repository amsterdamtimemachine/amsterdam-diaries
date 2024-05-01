<template>
  <div class="content-wrapper">
    <Image
      class="background-image content-wrapper content-container"
      src="about-atm.png"
      alt="About ATM" />
    <div class="gradient-bg" />
    <div class="content-wrapper content-container">
      <Header />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background-image {
  position: fixed;
  top: calc(var(--page-margin) * 2);
  z-index: 1;
  border-radius: var(--spacing-4);
  height: calc(var(--size-13) * 4);
  object-fit: cover;
}

.gradient-bg {
  @extend .background-image;
  background: linear-gradient(to bottom, rgba(255, 240, 211, 0) 0%, rgba(255, 240, 211, 1) 100%);
  width: 100%;
  height: 100%;
}
</style>
