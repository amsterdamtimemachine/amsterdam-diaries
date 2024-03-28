<template>
  <!-- TODO: Hardcoded for now. Replace with store data later -->
  <div class="profile">
    <div class="left">
      <h1>Els Polak</h1>
    </div>
    <div class="right">
      <img
        src="@/assets/photos/els-polak.png"
        alt="Els Polak" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: fixed;
  top: 10.25rem;
  width: calc(100% - 2 * var(--page-padding));
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'left . right';
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
  padding-left: 4rem;
  padding-bottom: 4rem;
}

h1 {
  font-family: 'Familjen Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  line-height: 100%;
  color: var(--black);
}
img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 1.25rem;
  box-shadow: 0 1.875rem 2.5rem 0 rgba(0, 0, 0, 0.12);
  grid-column: 3;
}
// }
</style>
