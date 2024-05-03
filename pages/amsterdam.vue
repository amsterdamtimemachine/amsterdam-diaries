<template>
  <div class="content">
    <h1 class="font-h1">Wat beleefden de dagboekschrijfsters in Amsterdam?</h1>
    <p class="font-body-l">
      In de dagboeken was veel aandacht voor de beslommeringen van alle dag. Onvermijdelijk drong ook de oorlog daarin
      door. Bekijk op deze kaart waar in Amsterdam het dagelijks leven van de dagboekschrijfsters zich afspeelde en wat
      ze erover in hun dagboeken noteerden.
    </p>
  </div>
  <Map
    marker-variant="light-pink"
    @marker-click="onMarkerClick" />

  <h2 class="diaries-header">{{ diariesHeaderText }}</h2>
  <div class="diaries">
    <CardDiary
      v-for="card in diaryCards"
      :key="card.headerTitle"
      :headerTitle="card.headerTitle"
      :headerSubtitle="card.headerSubtitle"
      :content="card.content"
      :link="card.link"
      :linkText="card.linkText" />
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const locationsName = ref('Amsterdam');
const diaryCards = ref<DiaryCard[]>([]);

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

const annotations = await useFetchAnnotations('context', 'aHR0cDovL3d3dy53aWtpZGF0YS5vcmcvZW50aXR5L1E3Mjc='); // Amsterdam
diaryCards.value = useMapDiaryCards(annotations);
</script>

<style lang="scss" scoped>
.content {
  margin: calc(var(--page-margin) / 2) auto calc(var(--page-margin) / 2);
  width: var(--content-sub-width);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-9);
}

.diaries {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-14);
}

.diaries-header {
  text-align: center;
  margin-block: var(--spacing-11);
}
</style>
