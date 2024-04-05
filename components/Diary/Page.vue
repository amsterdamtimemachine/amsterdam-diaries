<template>
  <div class="container">
    <BasePage>
      <ReadIndicator />
      <ReadTimeIndicator
        class="read-indicator"
        :input="rawText" />
      <div
        class="content"
        v-html="body" />
    </BasePage>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const diary = ref<DiaryPage>();
const rawText = ref<string>();
const props = defineProps<{
  pageNumber: number;
}>();

const body = computed<string>(() => {
  if (diary.value?.lines) {
    const paragraphIds = [...new Set(diary.value.lines.map((line: Line) => line.paragraphIdx))];
    const html: string[] = [];
    const raw: string[] = [];

    // Loop over the ids and fetch the lines
    // TODO: Lines should provide some context for rendering, like new lines
    paragraphIds.forEach((id: number) => {
      const lines = (diary.value?.lines || [])
        .filter((line: Line) => line.paragraphIdx === id)
        .sort((lineA: Line, lineb: Line) => lineA.lineIdx - lineb.lineIdx)
        .map((line: Line) => line.text)
        .join(' ');
      raw.push(lines);
      html.push(`<p>${lines}</p><br/>`);
    });

    rawText.value = raw.join();
    return html.join('');
  }

  return '';
});

// TODO: This should be done in the store
onMounted(async () => {
  diary.value = await $fetch(`/api/diaries/${props.pageNumber}`);
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: '. content .';
  width: 100%;
}

.read-indicator,
.page {
  grid-area: content;
}
</style>
