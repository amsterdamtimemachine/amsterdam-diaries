<template>
  <div
    v-if="author"
    class="diary-author page-container">
    <div class="info">
      <div class="title-desc">
        <div class="profile-image-name">
          <Image
            class="profile-image"
            :src="`${useServerImage(`profile-overview/${author.slug}/profile/1.jpg`, { size: '96,' })}`"
            default="default-author.svg"
            :alt="author.slug" />
          <h1 class="font-h2">
            {{ author.name }}
          </h1>
        </div>
        <Description
          class="font-body-l"
          :input="author.description || 'Nederlandse dagboekschrijfster'"
          :lines="3" />
      </div>
      <LinkArrow
        class="diary-link"
        :link="`/dagboeken/${author.slug}`"
        :link-text="`Dagboek van ${author.name}`" />
    </div>
    <div
      :class="{ background: true, [AuthorDiaryOverviewGradients[author.slug]]: true }"
      ref="bgcontainer">
      <PhotoScroller
        :slug="author.slug"
        :diary-teaser-text="AuthorDiaryPreviews[author.slug]">
        <template #prev-button="{ scrollPhotos }">
          <LinkArrow
            class="left-arrow"
            @click="scrollPhotos(false)"
            link-text="Vorige"
            icon="mdi:arrow-left" />
        </template>
        <template #next-button="{ scrollPhotos }">
          <LinkArrow
            class="right-arrow"
            @click="scrollPhotos(true)"
            link-text="Volgende" />
        </template>
      </PhotoScroller>
    </div>
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.authorName as string;
const author = (await $fetch(`/api/author/${slug}`)) as unknown as Author;
</script>

<style lang="scss" scoped>
.diary-author {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'info bg';
  gap: var(--space-14) var(--space-16);

  .info {
    @include flex-column;
    justify-content: space-between;
    gap: var(--space-8);
    grid-area: info;
  }
  .title-desc {
    @include flex-column;
    gap: var(--space-8);
  }
  .profile-image-name {
    display: flex;
    align-items: center;
    gap: var(--space-5);
  }
  .profile-image {
    height: var(--space-24);
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius-3);
    background: var(--timberwolf);
  }

  .background {
    display: flex;
    align-items: center;
    grid-area: bg;
    position: relative;
    overflow-x: hidden;
  }

  .left-arrow {
    position: absolute;
    left: var(--space-6);
    bottom: var(--space-6);
    flex-flow: row-reverse;
  }

  .right-arrow {
    position: absolute;
    right: var(--space-6);
    bottom: var(--space-6);
  }
}

@include sm-screen-down {
  .diary-author {
    grid-template-columns: 1fr;
    grid-template-areas:
      'bg'
      'info';
    grid-template-rows: var(--space-80) auto;
    gap: var(--space-9);

    .info {
      justify-content: initial;
    }

    .profile-image {
      height: var(--space-11);
      border-radius: var(--border-radius-2);
    }

    .title-desc {
      gap: var(--space-4);
    }

    .diary-link {
      background: var(--linen);
      border: var(--space-0) solid var(--black);
      padding: var(--space-3) var(--space-5);

      &:hover {
        box-shadow: initial;
      }
    }

    .left-arrow,
    .right-arrow {
      display: none;
    }
  }
}
</style>
