<template>
  <div class="card">
    <img
      class="image"
      src="@/assets/photos/els-polak.png"
      alt="Els Polak" />
    <div
      class="content"
      :style="`background-color: var(--${variant})`">
      <div class="card-text">
        Ik ben in Amsterdam. Eerst heb ik examen gedaan, ben geslaagd en zit nu eindelijk, waar ik zolang heb willen
        zitten. Achter in de Tuin van Fem[?] en Frits in een atelier....
      </div>
    </div>
    <NuxtLink
      to="/dagboek/TobyVos"
      class="link">
      <span>Lees het dagboek van Els</span>
      <BaseIcon icon="mdi:arrow-right" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant: 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';
}>();
</script>

<style lang="scss" scopes>
.card {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 11rem 4rem;
  grid-template-areas:
    'image content'
    'link link';
  box-shadow: 0 1.875rem 2.5rem 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;

  .image {
    grid-area: image;
    width: 100%;
    object-fit: cover;
  }

  .content {
    grid-area: content;
    padding: 2rem;
    display: flex;
    align-items: center;

    .card-text {
      border-left: 1px solid var(--black);
      padding-left: 1rem;
    }
  }

  .link {
    grid-area: link;
    background-color: var(--white, #ffffff);
    color: var(--black);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    text-decoration: none;
  }
}
</style>
