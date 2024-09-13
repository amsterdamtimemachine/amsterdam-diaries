<template>
  <footer>
    <div class="main container">
      <NuxtLink
        class="logo"
        to="/">
        <Image
          src="logos/atm-diaries-white.svg"
          alt="Amsterdam Diaries Time Machine" />
      </NuxtLink>
      <div class="menu-items">
        <div class="font-h2">Menu items</div>
        <div class="items">
          <div class="column">
            <NuxtLink to="/themas"> Thema's </NuxtLink>
            <NuxtLink to="/personen"> Personen </NuxtLink>
            <NuxtLink to="/amsterdam"> Amsterdam </NuxtLink>
          </div>
          <div class="column">
            <NuxtLink to="/organisaties"> Organisaties </NuxtLink>
            <NuxtLink to="/kalender"> Kalender </NuxtLink>
            <NuxtLink to="/about"> Over ATM </NuxtLink>
          </div>
        </div>
      </div>
      <div class="newsletter">
        <div class="font-h2">Volg de nieuwsbrief</div>
        <p>Wil je meer weten over nieuwe projecten van Amsterdam Time Machine? Meld je aan!</p>
        <input
          type="email"
          placeholder="E-mailadres" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
footer {
  @include flex-row;
  justify-content: center;
  width: 100%;
  background: var(--taupe);
}
.main {
  display: grid;
  width: 100%;
  grid-template-columns: auto 1fr minmax(0, var(--space-98));
  gap: var(--space-8);
  height: var(--space-80);
  padding: var(--space-16);
}

.menu-items {
  justify-self: center;
  max-width: var(--space-120);
  width: 100%;

  a {
    color: var(--white);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.newsletter {
  p {
    color: var(--white);
  }
  input {
    background: var(--white);
    padding: var(--space-1) var(--space-4);
    width: fit-content;
  }
}

.menu-items,
.newsletter {
  @include flex-column;
  gap: var(--space-4);
}

.items {
  @include flex-row;
  justify-content: space-between;

  .column {
    @include flex-column;
  }
}

.font-h2 {
  font-size: 1.625rem;
  color: var(--white);
}

@include sm-screen-down {
  .main {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding: var(--space-8);
    height: 100%;
  }

  .menu-items {
    justify-self: initial;
  }

  .items {
    flex-direction: column;
    gap: var(--space-2);
  }

  .column {
    gap: var(--space-2);
  }

  .font-h2 {
    font-size: 1.5rem;
  }
}
</style>
