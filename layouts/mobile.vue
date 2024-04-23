<template>
  <div class="warning-popup">
    <div class="header">
      <NuxtImg
        src="logos/atm.svg"
        alt="About ATM" />
    </div>

    <NuxtImg
      class="background-image"
      src="home-bg.jpg"
      alt="About ATM" />
    <div class="content-block">
      <h2>Gemaakt voor grote schermen</h2>
      <div class="content">
        <p>
          Voor de ultieme beleving van Amsterdam Diaries, raden we je aan om deze op een groter scherm te bekijken. De
          persoonlijke dagboeken en boeiende verhalen komen dan volledig to hun recht. Bezoek te website op een apparaat
          met een groter scherm via:
        </p>
        <NuxtLink to="https://diaries.amsterdamtimemachine.nl/">https://diaries.amsterdamtimemachine.nl/</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warning-popup {
  position: fixed;
  background: #c7ecf7;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-content: stretch;

  .header {
    padding: 1.5rem;
    overflow: visible;
    height: 3.5rem;
    z-index: 2;
  }

  .background-image {
    object-fit: cover;
    height: 100%;
  }

  .content-block {
    background-color: var(--white);
    padding: 2.75rem 2.125rem;
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 100%;
      letter-spacing: -0.48px;
    }

    .content {
      font-size: 14px;
      line-height: 180%;
      letter-spacing: -0.14px;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
