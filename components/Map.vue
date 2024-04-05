<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

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
    maxBounds: () => [
      [52.3815, 4.9576],
      [52.3483, 4.836],
    ],
    minZoom: 14,
    zoom: 15,
    markers: () => [],
  },
);

onMounted(() => {
  const { $L } = useNuxtApp();

  const map = $L
    .map('map')
    .setView([52.3678, 4.8969], props.zoom)
    .setMinZoom(props.minZoom)
    .setMaxBounds(props.maxBounds);

  $L.tileLayer('https://images.diginfra.net/webmapper/maps/pw-1943/{z}/{x}/{y}.png', {
    attribution:
      '&copy; Kaartgegevens: <a href="https://www.kadaster.nl/">Kadaster</a>, cartografie: <a href="https://www.webmapper.net/">Webmapper</a>',
  }).addTo(map);

  // Markers
  const svgFlag = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="41" viewBox="0 0 34 41" >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.5H0V40.5H4V20.5H34L28 10.5L34 0.5H4Z" fill="currentColor"/>
    </svg>`;

  props.markers.forEach(marker => {
    const flagIcon = $L.divIcon({
      className: `${props.markerVariant}-marker`,
      html: svgFlag,
      iconSize: [34, 41],
    });
    $L.marker([marker.lat, marker.lng], { icon: flagIcon }).addTo(map);
  });

  // TODO: Add popup window / click event to page for markers
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: var(--map-height);
}

:deep(.yellow-marker) {
  color: var(--yellow);
}
:deep(.light-pink-marker) {
  color: var(--light-pink);
}
</style>
