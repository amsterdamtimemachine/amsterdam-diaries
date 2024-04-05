<template>
  <div class="background-photos content-container">
    <div class="side">
      <DiaryFigure
        v-for="photo in leftPhotos"
        :key="photo.image"
        :image="photo.image"
        :alt="photo.alt"
        :date="photo.date"
        :description="photo.description"
        :style="{ top: `${photo.pos}px` }" />
    </div>
    <div class="side right">
      <DiaryFigure
        v-for="photo in rightPhotos"
        :key="photo.image"
        :image="photo.image"
        :alt="photo.alt"
        :date="photo.date"
        :description="photo.description"
        :style="{ top: `${photo.pos}px` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  containerId: string;
}>();

type Photo = {
  image: string;
  date?: string;
  description: string;
  alt: string;
  pos?: number;
  left?: boolean;
};

const PHOTO_FIGURE_HEIGHT = 420;

const leftPhotos = ref<Photo[]>([]);
const rightPhotos = ref<Photo[]>([]);

// TODO: Example set of photos. Replace with actual photos via prop for example
const photos: Photo[] = [
  {
    image: 'diary-photo-1.jpg',
    date: 'feb 1942',
    description: 'Hongerwinter in Amsterdam',
    alt: 'Hongerwinter',
  },
  {
    image: 'diary-photo-2.jpg',
    description: 'Voeding ging op de bon',
    alt: 'Voeding op de bon',
  },
  {
    image: 'diary-photo-3.jpg',
    date: '1940',
    description: 'Oorlog in Amsterdam',
    alt: 'Oorlog in Amsterdam',
  },
  {
    image: 'diary-photo-4.jpg',
    date: 'feb 1942',
    description: 'Hongerwinter in Amsterdam',
    alt: 'Hongerwinter',
  },
];

const getRandomPos = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const photoInterects = (sourceY: number, existingPhotos: Photo[]) => {
  for (const photo of existingPhotos) {
    const sourceAboveTarget = sourceY + PHOTO_FIGURE_HEIGHT < photo.pos!;
    const sourceBelowTarget = sourceY > photo.pos! + PHOTO_FIGURE_HEIGHT;
    if (!(sourceAboveTarget || sourceBelowTarget)) {
      return true;
    }
  }
  return false;
};

onMounted(() => {
  // TODO: For now get height after a timeout
  // In the future, a better solution using amount of characters, page width, page height etc. should be used
  setTimeout(() => {
    const totalHeight = document.getElementById(props.containerId)?.scrollHeight;
    if (totalHeight) {
      const maxPhotosPerSide = Math.ceil(photos.length / 2);
      setPhotoPositions(totalHeight, maxPhotosPerSide, true);
      setPhotoPositions(totalHeight, maxPhotosPerSide);
    }
  }, 250);
});

const setPhotoPositions = (totalHeight: number, maxPhotosPerSide: number, addToLeft?: boolean) => {
  const sidePhotos = addToLeft ? leftPhotos : rightPhotos;

  for (let i = 0; i < maxPhotosPerSide; i++) {
    const photo = photos.shift();
    if (!photo) {
      break;
    }
    let pos = getRandomPos(0, totalHeight - PHOTO_FIGURE_HEIGHT);
    let maxAttemps = 10;

    do {
      pos = getRandomPos(0, totalHeight - PHOTO_FIGURE_HEIGHT);
      maxAttemps--;
      if (maxAttemps <= 0) {
        console.log('Max attemps reached');
        return;
      }
    } while (photoInterects(pos, sidePhotos.value));

    photo.pos = pos;
    addToLeft ? leftPhotos.value.push(photo) : rightPhotos.value.push(photo);
  }
};
</script>

<style lang="scss" scoped>
.background-photos {
  position: absolute;
  margin-block: calc(var(--page-margin) + var(--spacing-11));

  .side {
    position: relative;

    figure {
      position: absolute;
    }

    &.right {
      figure {
        right: 0;
      }

      :deep(figcaption) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
