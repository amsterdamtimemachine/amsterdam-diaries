<template>
  <div class="viewer">
    <div
      id="viewer-container"
      class="container" />
    <button
      v-if="images.length > 1"
      id="prev"
      class="nav-button left"
      @click="prevPage">
      <BaseIcon
        class="nav-icon"
        icon="mdi:chevron-left" />
    </button>
    <div class="controls">
      <button
        ref="zoomIn"
        class="zoom-button"
        @click="zoomIn">
        <BaseIcon icon="mdi:add" />
      </button>
      <button
        ref="zoomOut"
        class="zoom-button"
        @click="zoomOut">
        <BaseIcon icon="mdi:minus" />
      </button>
    </div>
    <button
      v-if="images.length > 1"
      id="next"
      class="nav-button right"
      @click="nextPage">
      <BaseIcon
        class="nav-icon"
        icon="mdi:chevron-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import OpenSeadragon from 'openseadragon';

/**
 * State & Props
 */
const props = defineProps<{
  images: string[];
}>();

const viewer = ref<OpenSeadragon.Viewer>();
const zoomLevel = ref(1);
const minZoomLevel = ref(1);

/**
 * Methods
 */
const prevPage = () => {
  viewer.value.goToPreviousPage();
};

const nextPage = () => {
  viewer.value.goToNextPage();
};

const zoomIn = () => {
  const zl = zoomLevel.value * 2;
  zoomLevel.value = zl > 4 ? 4 : zl;
  viewer.value.viewport.zoomTo(zoomLevel.value);
};

const zoomOut = () => {
  const zl = zoomLevel.value / 2;
  zoomLevel.value = zl < minZoomLevel.value ? minZoomLevel.value : zl;
  viewer.value.viewport.zoomTo(zoomLevel.value);
};

const loadTileSources = () => {
  return props.images.map(url => {
    return {
      type: 'image',
      url,
    };
  });
};

/**
 * Lifecycle methods
 */
onMounted(async () => {
  await nextTick();
  viewer.value = OpenSeadragon({
    id: 'viewer-container',
    tileSources: loadTileSources(),
    minZoomLevel: 1,
    maxZoomLevel: 4,
    showZoomControl: false,
    showHomeControl: false,
    showFullPageControl: false,
    showRotationControl: false,
    showFlipControl: false,
    showSequenceControl: false,
    visibilityRatio: 1,
    sequenceMode: props.images.length > 1,
    crossOriginPolicy: 'Anonymous',
  });

  // Set the minimum zoom level to the natural zoom level for small images
  viewer.value.addHandler('open', () => {
    const naturalZoom = viewer.value.viewport.imageToViewportZoom(1);
    if (naturalZoom < 1) {
      minZoomLevel.value = naturalZoom;
      zoomLevel.value = naturalZoom;
      viewer.value.viewport.minZoomLevel = naturalZoom;
      viewer.value.viewport.zoomTo(naturalZoom, null, true);
    }
  });
});

/**
 * Watchers
 */
watch(
  () => props.images,
  () => {
    if (viewer.value) {
      viewer.value.tileSources = loadTileSources();
    }
  },
);

onUnmounted(() => {
  // Unmount the viewer
  if (viewer.value) {
    viewer.value = null;
  }
});
</script>

<style lang="scss" scoped>
.viewer {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: var(--linen);
}

/**
 * Navigation buttons
 */
.nav-button {
  background-color: var(--black-50);
  border: none;
  color: var(--white);
  cursor: pointer;
  line-height: 1;
  padding: var(--space-1);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  :deep(.nav-icon) {
    width: var(--space-12) !important;
    height: var(--space-12) !important;
  }
}

.nav-button.left {
  left: 0;
}

.nav-button.right {
  right: 0;
}

.controls {
  @include flex-row;
  position: absolute;
  top: 0;
  z-index: 1;
  gap: var(--space-1);

  .zoom-button {
    background-color: var(--black-50);
    color: var(--white);
    cursor: pointer;
    padding: var(--space-2);
    line-height: 1;
  }
}

@include sm-screen-down {
  .nav-button {
    :deep(.nav-icon) {
      width: var(--space-8) !important;
      height: var(--space-8) !important;
    }
  }
  .controls {
    .zoom-button {
      padding: var(--space-1);
    }
  }
}
</style>
