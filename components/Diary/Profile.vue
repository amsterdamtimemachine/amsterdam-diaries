<template>
  <!-- TODO: Hardcoded for now. Replace with store data later -->
  <div class="profile content-container">
    <div class="left">
      <span class="font-h2">Els Polak</span>
    </div>
    <div class="right">
      <NuxtImg
        class="profile-image"
        src="photos/els-polak.png"
        alt="Els Polak" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: fixed;
  top: calc(var(--page-margin) * 2 + var(--spacing-3));
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'left . right';
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
  padding-left: var(--spacing-14);
  padding-bottom: var(--spacing-14);

  .profile-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius-5);
    box-shadow: var(--card-shadow);
    grid-column: 3;
  }
}
</style>
