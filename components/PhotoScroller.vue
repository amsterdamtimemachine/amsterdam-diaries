<template>
  <div
    class="photos"
    :style="{ pointerEvents: selectedPhoto ? 'none' : 'auto' }"
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
      <Image
        :src="useServerImage(`profile-overview/${slug}/${n + 1}.jpg`, { size: ',320' })"
        :alt="AuthorPhotoData[slug][n]" />
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
        <span class="full-header-title"> {{ selectedPhoto.title }} </span>
        <button
          class="btn-close"
          @click="setSelectedPhoto(0)">
          <BaseIcon
            icon="material-symbols:close"
            color="var(--linen)" />
        </button>
        <div class="full-photo-container">
          <Image
            class="full-photo"
            @load="new PinchZoom($event.target)"
            :src="useServerImage(`profile-overview/${slug}/${selectedPhoto.selected}.jpg`)"
            :alt="AuthorPhotoData[slug][selectedPhoto.selected - 1]" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import PinchZoom from 'pinch-zoom-js';
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
const setSelectedPhoto = async (n?: number, title?: string) => {
  selectedPhoto.value = n && title ? { selected: n, title: title } : undefined;
  selectedPhoto.value ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'initial');
};
const scrollPhotos = (toRight: boolean) => {
  x.value += toRight ? 500 : -500;
};
</script>

<style lang="scss" scoped>
.photos {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  overflow: hidden;
  height: 100%;
  padding-inline: var(--space-14);
}

.photo {
  display: flex;
  transition: var(--transition-2);

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
  width: 100%;
  height: 100%;
  z-index: 2001;
  padding: var(--space-14);
  background: var(--black-25);
  transition: var(--transition-1);

  .full-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'top-info close'
      'content content'
      'bottom-info bottom-info';
    gap: var(--space-4);
    background: var(--linen);
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-3);
    padding: var(--space-10);
  }

  .full-header-title {
    grid-area: top-info;
  }

  .full-photo-container {
    overflow: hidden;
    grid-area: content;
  }

  .full-photo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
  }

  .btn-close {
    background: var(--purple);
    border-radius: var(--border-radius-7);
    width: var(--space-12);
    height: var(--space-12);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition-1);
    grid-area: close;
    justify-self: flex-end;

    &:hover,
    &.active {
      background: var(--pink);
    }
  }
}

@include sm-screen-down {
  .photos {
    overflow-x: auto;
    padding-block: var(--space-9);
  }

  .photo {
    width: fit-content;
    height: 100%;

    img {
      height: 100%;
    }

    &:hover {
      transform: initial;
    }
  }

  .full-photo-section {
    padding: 0;

    .full-container {
      padding: var(--space-8);
    }

    .full-header-title {
      grid-area: bottom-info;
      justify-self: center;
      text-align: center;
    }

    .full-photo-container {
      margin-inline: calc(var(--space-8) * -1);
    }

    .full-photo {
      object-position: initial;
    }
  }
}
</style>
