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

@include sm-screen-down {
  .background-image {
    display: none;
  }
}
</style>
