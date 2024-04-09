<template>
  <div class="content-wrapper">
    <Header />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  padding: var(--inner-page-padding);
}
.content {
  position: absolute;
  inset: 0;
  background: var(--white);
}
</style>
