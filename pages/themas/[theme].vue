<template>
  <div class="page-container">
    <PageIntro
      :title="title"
      :description="description"
      :lines="3" />
    <DiaryCards :cards="diaryCards" />
  </div>
</template>

<script setup lang="ts">
// Temporary data
const title = ref<string>('Eten en drinken');
const description = ref<string>(
  `Eten en drinken zijn een belangrijk thema in de oorlogsdagboeken.
  Tijdens de oorlog is voedsel erg schaars, etenswaren gaan op de bon,
  er wordt gesmokkeld en tijdens de hongerwinter trekken vele Amsterdammers naar het platteland op zoek naar eten.
  Tegelijkertijd zorgt eten ook voor kleine momentjes van geluk en kan het gedeeld worden met vrienden en familie.`,
);
const diaryCards = ref<DiaryCard[]>([]);

const annotations = await useFetchAnnotations('concept', 'atm_food');
diaryCards.value = useMapDiaryCards(annotations);
</script>

<style lang="scss" scoped>
.page-container {
  @include flex-column;
  align-items: center;
  gap: var(--space-21);
}

@include sm-screen-down {
  .page-container {
    gap: var(--space-6);
  }
}
</style>
