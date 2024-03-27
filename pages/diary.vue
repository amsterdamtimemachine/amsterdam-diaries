<template>
  <div class="diary">
    <section class="pages">
      <!-- TODO: Move page containers to DiaryPage component. This is placeholder content -->
      <DiaryPage :page-number="3" />
      <DiaryPage :page-number="4" />
      <DiaryPage :page-number="5" />
      <div class="bg-gradient" />
    </section>
    <section class="profile">
      <!-- TODO: Hardcoded for now. Replace with store data later -->
      <h1>Els Polak</h1>
      <img
        src="@/assets/photos/els-polak.png"
        alt="Els Polak" />
    </section>
  </div>
  <div class="bg-gradient" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.diary {
  padding-top: 4.25rem;

  .profile {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 6rem;

    position: fixed;
    width: calc(100% - var(--page-padding) * 2);
    top: 10.25rem;
    max-width: calc(var(--content-width) - var(--page-padding) * 2);

    h1 {
      font-family: 'Familjen Grotesk', sans-serif;
      font-size: 2rem;
      font-weight: 500;
      line-height: 100%;
      color: var(--black);
      grid-column: 1;
    }
    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 1.25rem;
      box-shadow: 0 1.875rem 2.5rem 0 rgba(0, 0, 0, 0.12);
      grid-column: 3;
    }
  }

  .pages {
    display: flex;
    flex-direction: column;
    gap: 3.75rem;
  }
}
.bg-gradient {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  // TODO: For now set use gradient of 100% screen height with 2 colors. Multiple colors based on scroll height will be implemented later.
  background: linear-gradient(180deg, var(--white-paper) 0%, var(--light-yellow) 100%);
  z-index: -1;
}
</style>
