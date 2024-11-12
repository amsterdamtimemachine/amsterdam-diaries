<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

/**
 * State & Props
 */
const props = withDefaults(
  defineProps<{
    minZoom?: number;
    zoom?: number;
    maxBounds?: [number, number][];
    markers?: { lat: number; lng: number }[];
    markerVariant?: 'yellow' | 'light-pink';
    initialMarkerId?: string;
    scrollMapIntoView?: boolean;
  }>(),
  {
    markerVariant: 'yellow',
    minZoom: 14,
    zoom: 15,
  },
);
const emit = defineEmits(['markerClick']);

const markerSources = ref<LocationData[]>([]);

/**
 * Methods
 */
const popupMarker = (name: string) => {
  return `<p class="font-body-l">${name}</p>`;
};

const onMarkerClick = (event: L.LeafletMouseEvent) => {
  const marker = markerSources.value.find((source: LocationData) => {
    return Number(source.latitude) === event.latlng.lat && Number(source.longitude) === event.latlng.lng;
  });
  emit('markerClick', marker);
};

/**
 * Lifecycle methods
 */
onMounted(async () => {
  const { $L } = useNuxtApp();
  const { app } = useRuntimeConfig();

  const map = $L
    .map('map')
    .setView([52.3678, 4.8969], props.zoom)
    .setMinZoom(props.minZoom)
    .setMaxBounds(props.maxBounds || app.maxBounds);

  $L.tileLayer('https://images.diginfra.net/webmapper/maps/pw-1943/{z}/{x}/{y}.png', {
    attribution:
      '&copy; Kaartgegevens: <a href="https://www.kadaster.nl/">Kadaster</a>, cartografie: <a href="https://www.webmapper.net/">Webmapper</a>',
  }).addTo(map);

  markerSources.value = await $fetch(`/api/locations`);

  // Markers
  const svgFlag = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7 7 0 0 1 5 9m5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06" clip-rule="evenodd" />
    </svg>
  `;

  markerSources.value.forEach((marker: LocationData) => {
    const flagIcon = $L.divIcon({
      className: `${props.markerVariant}-marker`,
      html: svgFlag,
      iconSize: [48, 48],
      popupAnchor: [0, 160],
    });
    const curMarker = $L
      .marker([Number(marker.latitude), Number(marker.longitude)], { icon: flagIcon })
      .bindPopup(popupMarker(marker?.name || ''), { closeButton: false })
      .on('click', onMarkerClick)
      .addTo(map);

    if (marker.id === props.initialMarkerId) {
      curMarker.fire('click', {
        latlng: curMarker.getLatLng(),
      });
    }
  });

  // Scroll map into view
  if (props.scrollMapIntoView) {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: var(--space-160);
  margin: 0;
}

:deep(.yellow-marker) {
  color: var(--yellow);
}
:deep(.light-pink-marker) {
  color: var(--light-pink);
}
:deep(.leaflet-marker-icon) {
  animation: var(--animation-fade-in);
}

:deep(.leaflet-popup-content-wrapper) {
  background: var(--alabaster);
  border-radius: 0;
  padding: var(--space-5) var(--space-8);
  box-shadow: none;

  p,
  .leaflet-popup-content {
    margin: 0;
  }
}

:deep(.leaflet-popup-tip-container) {
  width: var(--space-12);
  height: var(--space-6);
  position: relative;
  top: calc(var(--space-24) * -1);
  left: calc(50% - var(--space-6));
  margin-left: 0;
  transform: rotate(180deg);

  .leaflet-popup-tip {
    box-shadow: none;
    background-color: var(--alabaster);
    width: var(--space-12);
    height: var(--space-12);
    margin: calc(var(--space-9) * -1) auto 0;
  }
}

@include sm-screen-down {
  #map {
    height: var(--space-88);
  }

  :deep(.leaflet-marker-icon) {
    svg {
      transform: scale(0.75);
    }
  }

  :deep(.leaflet-popup-content-wrapper) {
    margin-bottom: var(--space-4);
  }
}
</style>
