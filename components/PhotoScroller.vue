<template>
  <div
    class="photos"
    ref="photos">
    <slot
      name="prev-button"
      :scrollPhotos="scrollPhotos" />
    <button
      v-for="(title, n) in AuthorPhotoData[slug]"
      :id="`photo-${slug}-${n + 1}`"
      :key="n"
      class="photo"
      @click="setSelectedPhoto(n + 1, title)">
      <NuxtImg
        :src="useServerImage(`profile-overview/${slug}/${n + 1}.jpg`, { size: ',320' })"
        :alt="`${slug}-${n + 1}`" />
    </button>
    <CardDiaryTeaser
      class="diary-card"
      :content="diaryTeaserText"
      :link="`/dagboeken/${slug}`"
      link-text="Lees het hele verhaal" />
    <slot
      name="next-button"
      :scrollPhotos="scrollPhotos" />
  </div>

  <Transition name="fade">
    <div
      v-if="selectedPhoto"
      class="full-photo-section">
      <div class="full-container">
        <div class="full-header font-body-l">
          <span> {{ selectedPhoto.title }} </span>
          <button
            class="btn-close"
            @click="setSelectedPhoto(0)">
            <BaseIcon
              icon="material-symbols:close"
              color="var(--white)" />
          </button>
        </div>
        <NuxtImg
          class="full-photo"
          :src="useServerImage(`profile-overview/${slug}/${selectedPhoto.selected}.jpg`)"
          :alt="`${slug}-${selectedPhoto.selected}`" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
defineProps<{
  slug: string;
  diaryTeaserText: string;
}>();

const photos = ref<HTMLElement>();
const selectedPhoto = ref<{ selected: number; title: string }>();
const { x } = useScroll(photos, { behavior: 'smooth' });

/**
 * Methods
 */
const setSelectedPhoto = (n?: number, title?: string) => {
  selectedPhoto.value = n && title ? { selected: n, title: title } : undefined;
};
const scrollPhotos = (toRight: boolean) => {
  x.value += toRight ? 500 : -500;
};
</script>

<style lang="scss" scoped>
.photos {
  display: flex;
  align-items: center;
  gap: var(--spacing-11);
  overflow: hidden;
  height: 100%;
  padding-inline: var(--spacing-14);
}

.photo {
  display: flex;
  transition: var(--transition-3);

  img {
    width: fit-content;
    height: calc(var(--size-11) + var(--size-13));
  }

  &:hover {
    transform: scale(1.1);
  }
}

.diary-card {
  height: fit-content;
  flex: none;
}

.full-photo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  padding: var(--spacing-14);
  background: rgba(0, 0, 0, 0.25);
  transition: var(--transition-1);

  .full-container {
    @include flex-column;
    gap: var(--spacing-5);
    background: var(--white);
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-3);
    padding: var(--spacing-11);
    height: calc(100% - var(--spacing-12) * 2);
    margin-top: calc(var(--spacing-12) * 2);
  }

  .full-header {
    display: flex;
    justify-content: space-between;
  }

  .full-photo {
    max-width: 100%;
    max-height: calc(100% - var(--size-11));
    align-self: center;
  }

  .btn-close {
    background: var(--purple);
    border-radius: var(--border-radius-7);
    width: var(--size-10);
    height: var(--size-10);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition-1);

    &:hover,
    &.active {
      background: var(--pink);
    }
  }
}
</style>
