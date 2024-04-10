<template>
  <div class="diary-authors">
    <div
      v-if="selectedAuthor"
      class="info">
      <div class="title-desc">
        <h1 class="font-h2">
          {{ selectedAuthor.name }}
        </h1>
        <div class="font-body-l">
          {{ selectedAuthor.description }}
        </div>
      </div>
      <LinkArrow
        :link="`/profielen/${selectedAuthor.slug}`"
        :link-text="`Profiel van ${selectedAuthor.name}`" />
    </div>
    <!-- TODO: Add relevant photos + diary snippets to background -->
    <div class="background" />
    <Tags
      class="authors"
      :tags="
        authors.map(a => ({
          title: a.name,
          link: `/dagboekschrijfsters/${a.slug}`,
          active: selectedAuthor?.slug === a.slug,
        }))
      " />
  </div>
</template>

<script setup lang="ts">
const authors = useAuthorData();
const selectedAuthor = authors.find(author => author.slug === useRoute().params.authorName);
</script>

<style lang="scss" scoped>
.diary-authors {
  display: grid;
  grid-template-columns: 21.125rem 1fr;
  grid-template-rows: 1fr calc(var(--size-5) * 2);
  grid-template-areas: 'info bg' 'authors authors';
  gap: var(--spacing-14) calc(var(--spacing-9) * 2);
  min-height: 46rem;

  margin-top: calc(var(--page-margin) + var(--spacing-13));
  margin-bottom: calc(var(--spacing-10) * 2);

  .info {
    @include flex-column;
    justify-content: space-between;
    gap: var(--spacing-9);
    grid-area: info;
  }
  .title-desc {
    @include flex-column;
    gap: var(--spacing-9);
  }
  .background {
    grid-area: bg;
    background: url('@/assets/images/diaries-bg.png') no-repeat bottom;
    background-size: cover;
  }
  .authors {
    grid-area: authors;

    :deep(ul) {
      gap: var(--spacing-5) var(--spacing-6);

      li a {
        width: calc(var(--size-8) * 5 + var(--size-2));
      }
    }
  }
}
</style>
