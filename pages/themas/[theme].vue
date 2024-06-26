<template>
  <div class="theme content-container">
    <div class="intro content-sub-container">
      <h1 class="title font-h1">{{ title }}</h1>
      <div class="font-body-l">{{ description }}</div>
    </div>
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
.theme {
  @include flex-column;
  align-items: center;
  gap: var(--space-21);
  margin-block: var(--space-30) var(--space-20);

  .intro {
    @include flex-column;
    gap: var(--space-7);
  }

  .diaries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-11);
    max-width: var(--theme-diaries-max-width);
  }
}
</style>
