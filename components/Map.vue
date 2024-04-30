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
      [52.328, 4.836],
    ],
    minZoom: 14,
    zoom: 15,
  },
);

const markerSources = ref<GeoSource[]>([]);

onMounted(async () => {
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

  const params = new URLSearchParams();
  params.append('bounds', JSON.stringify(props.maxBounds));

  markerSources.value = await $fetch(`/api/locations?${params.toString()}`);

  // Markers
  const svgFlag = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="41" viewBox="0 0 34 41" >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.5H0V40.5H4V20.5H34L28 10.5L34 0.5H4Z" fill="currentColor"/>
    </svg>`;

  markerSources.value.forEach((marker: GeoSource) => {
    const flagIcon = $L.divIcon({
      className: `${props.markerVariant}-marker`,
      html: svgFlag,
      iconSize: [34, 41],
      popupAnchor: [0, 160],
    });
    $L.marker([Number(marker.geo.latitude), Number(marker.geo.longitude)], { icon: flagIcon })
      .bindPopup(popupMarker(marker.name), { closeButton: false })
      .on('click', onMarkerClick)
      .addTo(map);
  });

  // TODO: Add popup window / click event to page for markers
});

const popupMarker = (name: string) => {
  return `<p class="font-body-l">${name}</p>`;
};

const onMarkerClick = (marker: L.LeafletMouseEvent) => {
  const source = getMarkerSource(marker);

  emit('markerClick', source);
};

const getMarkerSource = (marker: any): GeoSource | undefined => {
  const source = markerSources.value.find(source => {
    return Number(source.geo.latitude) === marker.latlng.lat && Number(source.geo.longitude) === marker.latlng.lng;
  });

  return source;
};

const emit = defineEmits(['markerClick']);
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
