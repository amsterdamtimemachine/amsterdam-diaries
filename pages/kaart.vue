<template>
  <div class="amsterdam page-container-2">
    <PageIntro
      :title="title"
      :description="description"
      :lines="7" />
    <Map
      class="map"
      marker-variant="light-pink"
      @marker-click="onMarkerClick"
      :initial-marker-id="initialMarkerId"
      :scroll-map-into-view="scrollMapIntoView" />

    <h2 class="diaries-header font-h2">{{ diariesHeaderText }}</h2>
    <DiaryCards :cards="diaryCards" />
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const currentLocation = ref<AnnotationData>();
const diaryCards = ref<SnippetData[]>([]);
const { defaultLocation, defaultLabel, aboutLabel } = (ResourceInfo.locaties as LocationResourceInfo) ?? {};
const { title, description } = toRefs(reactive(await $fetch(`/api/info?type=amsterdam`)));

// Fetch the initial marker from the query parameter or use the default marker
const route = useRoute();
const initialMarkerId = ref<string>((route.query.id as string) ?? btoa(defaultLocation as string));
const scrollMapIntoView = ref<boolean>(!!route.query.id);

/**
 * Computed Properties
 */
const diariesHeaderText = computed(() => {
  const location = unref(currentLocation);
  if (!location) {
    return '';
  }
  if (location.id === btoa(defaultLocation)) {
    return `${defaultLabel} ${location.name}`;
  }
  return `${aboutLabel} ${location.name}`;
});

/**
 * Methods
 */
const onMarkerClick = async (source: AnnotationData) => {
  currentLocation.value = source;
};

/**
 * Watchers
 */
watch(currentLocation, async newValue => {
  diaryCards.value = await $fetch(`/api/snippets?id=${newValue?.id}&type=locaties`);
});
</script>

<style lang="scss" scoped>
.amsterdam {
  @include flex-column;
  align-items: center;
  gap: var(--space-8);
}

.diaries-header {
  text-align: center;
  margin-block: var(--space-10);
}

.map {
  border-radius: var(--border-radius-2);
}

@include sm-screen-down {
  .amsterdam {
    gap: var(--space-4);
  }
  .diaries-header {
    margin-block: var(--space-5);
  }
}
</style>
