<template>
  <div class="warning-popup">
    <div class="header">
      <Image
        src="logos/atm-diaries.svg"
        alt="About ATM" />
    </div>

    <Image
      class="background-image"
      src="home-bg.jpg"
      alt="About ATM" />
    <div class="content-block">
      <h2 class="font-h2">Gemaakt voor grote schermen</h2>
      <div class="content font-body-l">
        <p>
          Voor de ultieme beleving van Amsterdam Diaries Time Machine, raden we je aan om deze op een groter scherm te
          bekijken. De persoonlijke dagboeken en boeiende verhalen komen dan volledig tot hun recht. Bezoek de website
          op een apparaat met een groter scherm via:
        </p>
        <NuxtLink to="https://diaries.amsterdamtimemachine.nl/">https://diaries.amsterdamtimemachine.nl/</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warning-popup {
  @include flex-column;
  position: fixed;
  background: linear-gradient(180deg, var(--light-cyan) 0%, var(--white) 50%);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: auto;

  .header {
    padding: var(--spacing-7);
    overflow: visible;
    height: var(--size-11);
    z-index: 2;
  }

  .background-image {
    object-fit: cover;
    flex: 1;
  }

  .content-block {
    background-color: var(--white);
    padding: var(--spacing-9);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-5);

    h2 {
      font-size: var(--size-6);
    }

    .content {
      @include flex-column;
      font-size: 0.875rem;
      line-height: 180%;
      gap: var(--spacing-9);
    }
  }
}
</style>
