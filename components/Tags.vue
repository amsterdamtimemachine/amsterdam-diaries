<template>
  <div class="tags">
    <div class="body-large">
      {{ title }}
    </div>
    <ul class="body-large">
      <li
        v-for="tag in tags"
        :key="tag.title">
        <NuxtLink
          class="link"
          :to="tag.link">
          {{ tag.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  tags: Tag[];
}>();
</script>

<style lang="scss" scoped>
.tags {
  @include flex-column;
  gap: 1rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 0.75rem;

    li {
      display: flex;
      align-items: center;
      height: 2.25rem;
      padding: 0 1rem;
      border-radius: 3.125rem;
      border: 1px solid var(--black);
      background: var(--white);
      text-decoration: none;

      transition: var(--smooth-transition);
      &:hover {
        background: var(--black);
        .link {
          color: var(--white);
        }
      }
      &:active {
        background: var(--gray);
      }

      .link {
        text-decoration: none;
        color: var(--black);
      }
    }
  }
}
</style>
