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
  }>(),
  {
    markerVariant: 'yellow',
    minZoom: 14,
    zoom: 15,
  },
);
const emit = defineEmits(['markerClick']);

const markerSources = ref<LocationRef[]>([]);

/**
 * Methods
 */
const popupMarker = (name: string) => {
  return `<p class="font-body-l">${name}</p>`;
};

const onMarkerClick = (marker: L.LeafletMouseEvent) => {
  emit('markerClick', getMarkerSource(marker));
};

const getMarkerSource = (marker: any): LocationRef | undefined => {
  return markerSources.value.find((source: LocationRef) => {
    return Number(source.latitude) === marker.latlng.lat && Number(source.longitude) === marker.latlng.lng;
  });
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

  const { locations } = await $fetch(`/api/locations`);
  markerSources.value = locations;

  // Markers
  const svgFlag = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="41" viewBox="0 0 34 41" >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.5H0V40.5H4V20.5H34L28 10.5L34 0.5H4Z" fill="currentColor"/>
    </svg>`;

  markerSources.value.forEach((marker: LocationRef) => {
    const flagIcon = $L.divIcon({
      className: `${props.markerVariant}-marker`,
      html: svgFlag,
      iconSize: [34, 41],
      popupAnchor: [0, 160],
    });
    $L.marker([Number(marker.latitude), Number(marker.longitude)], { icon: flagIcon })
      .bindPopup(popupMarker(marker?.name || ''), { closeButton: false })
      .on('click', onMarkerClick)
      .addTo(map);
  });
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: var(--map-height);
  margin: 0;
}

:deep(.yellow-marker) {
  color: var(--yellow);
}
:deep(.light-pink-marker) {
  color: var(--light-pink);
}

:deep(.leaflet-popup-content-wrapper) {
  background: var(--white-paper);
  border-radius: 0;
  padding: var(--spacing-6) var(--spacing-9);
  box-shadow: none;

  p,
  .leaflet-popup-content {
    margin: 0;
  }
}

:deep(.leaflet-popup-tip-container) {
  width: var(--size-10);
  height: var(--size-6);
  position: relative;
  top: calc(var(--size-10) * -2);
  left: calc(50% - var(--size-10) / 2);
  margin-left: 0;
  transform: rotate(180deg);

  .leaflet-popup-tip {
    box-shadow: none;
    background-color: var(--white-paper);
    width: var(--size-10);
    height: var(--size-10);
    margin: calc(var(--spacing-10) * -1) auto 0;
  }
}
</style>
