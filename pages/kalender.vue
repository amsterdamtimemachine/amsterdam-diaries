<template>
  <div class="calendar-view page-container-2">
    <template v-if="dateText">
      <div class="title font-h2">{{ dateText }}</div>
      <div class="description">{{ selectedDescription.replace('__DATETIME__', dateText) }}</div>
    </template>
    <div
      v-else
      class="description">
      {{ description }}
    </div>
    <CalendarYears
      class="years"
      :year="year"
      :years="years"
      @set-year="year = $event" />
    <Calendar
      class="calendar"
      :year="year"
      :dates="dates"
      @set-snippets="setSnippets" />
    <div class="snippets">
      <div
        v-if="snippets.length"
        class="snippet-header">
        {{ snippets.length }} dagboek item{{ snippets.length > 1 ? 's' : '' }}
      </div>
      <DiaryCards
        class="cards"
        :cards="snippets" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { description, selectedDescription } = (ResourceInfo.datums ?? {}) as DateResourceInfo;
if (!description) {
  throw new Error(`Invalid resource type: datums`);
}
const dates = ref<DateEntry[]>(
  (await $fetch('/api/dates')).map((d: DateData) => ({
    id: d.id,
    value: new Date(d.value),
  })),
);
const years = ref<number[]>(Array.from(new Set(dates.value.map(d => d.value.getFullYear()))).sort((a, b) => a - b));
// Set middle year as default selected year
const year = ref<number>(years.value[Math.floor(years.value.length / 2)]);
const dateText = ref<string>('');

const snippets = ref<SnippetData[]>([]);
const setSnippets = async ({
  date,
  scrollToSnippets,
}: {
  date: { id: string; value: Date };
  scrollToSnippets?: boolean;
}) => {
  dateText.value = date.value.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  snippets.value = await $fetch(`/api/snippets?id=${btoa(date.id)}&type=datums`);

  if (scrollToSnippets) {
    document.querySelector('.calendar')?.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="scss" scoped>
.calendar-view {
  display: grid;
  grid-template-columns: var(--space-36) 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  column-gap: var(--space-6);
  row-gap: var(--space-8);
  grid-template-areas:
    'a a e'
    'b b e'
    'c d e';

  .title {
    grid-area: a;
  }
  .description {
    grid-area: b;
  }
  .title,
  .description {
    text-align: center;
  }
  .years {
    grid-area: c;
  }
  .calendar {
    grid-area: d;
  }
  .snippets {
    grid-area: e;

    .snippet-header {
      color: var(--lavender-gray);
    }

    .cards {
      gap: var(--space-5);
    }

    :deep(.diary-card) {
      width: 100%;
    }
  }
}

@include sm-screen-down {
  .calendar-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto 1fr;
    row-gap: var(--space-7);
    grid-template-areas:
      'a'
      'b'
      'c'
      'd'
      'e';
  }
}
</style>
