<template>
  <!-- TODO: Hardcoded for now. Replace with store data later -->
  <div class="profile content-container">
    <div class="left">
      <span class="profile-name">Els Polak</span>
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
  top: 10.25rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'left . right';
}

.left {
  grid-area: left;

  // TODO: Discuss if this should be in main.scss
  .profile-name {
    font-family: 'Familjen Grotesk';
    font-size: 2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    color: var(--black);
  }
}

.right {
  grid-area: right;
  padding-left: 4rem;
  padding-bottom: 4rem;

  .profile-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 1.25rem;
    box-shadow: var(--card-shadow);
    grid-column: 3;
  }
}
</style>
