<template>
  <div class="page-container">
    <PageIntro
      :title="introTitle"
      :description="introDescription"
      :lines="7" />
    <Map
      class="map"
      marker-variant="light-pink"
      @marker-click="onMarkerClick"
      :selected-marker-id="selectedMarkerId" />

    <h2 class="diaries-header font-h2">{{ diariesHeaderText }}</h2>
    <DiaryCards :cards="diaryCards" />
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const locationsName = ref('Amsterdam');
const diaryCards = ref<DiaryCard[]>([]);
const introTitle = ref<string>('Wat beleefden de dagboekschrijfsters in Amsterdam?');
const introDescription = ref<string>(
  `In de dagboeken was veel aandacht voor de beslommeringen van alle dag. Onvermijdelijk drong ook de oorlog daarin
   door. Bekijk op deze kaart waar in Amsterdam het dagelijks leven van de dagboekschrijfsters zich afspeelde en
   wat ze erover in hun dagboeken noteerden.`,
);
const selectedMarkerId = ref<string>('');

/**
 * Computed Properties
 */
const diariesHeaderText = computed(() =>
  locationsName.value === 'Amsterdam'
    ? `Dagboekteksten uit ${locationsName.value}`
    : `Dagboekteksten over ${locationsName.value}`,
);

/**
 * Methods
 */
const onMarkerClick = async (source: AnnotationLine) => {
  locationsName.value = source?.name || '';
  const annotations = await useFetchAnnotations('context', source.id);
  diaryCards.value = useMapDiaryCards(annotations);
};

/**
 * Lifecycle methods
 */
onMounted(async () => {
  // Get id from route
  const route = useRoute();
  selectedMarkerId.value = route.query.id as string;
  const annotations = await useFetchAnnotations('context', 'aHR0cDovL3d3dy53aWtpZGF0YS5vcmcvZW50aXR5L1E3Mjc='); // Amsterdam
  diaryCards.value = useMapDiaryCards(annotations);
});
</script>

<style lang="scss" scoped>
.page-container {
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
  .page-container {
    gap: var(--space-4);
  }
  .diaries-header {
    margin-block: var(--space-5);
  }
}
</style>
