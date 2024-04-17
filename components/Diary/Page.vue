<template>
  <div class="container">
    <BasePage
      class="current-page"
      ref="basePageEl">
      <ReadIndicator />
      <ReadTimeIndicator
        class="read-indicator"
        :input="rawText" />

      <div ref="pageContent">
        <template
          v-for="(paragraph, idx) in paragraphs"
          :key="idx">
          <DiaryParagraph
            :paragraph="paragraph"
            @annotation-click="setAnnotationDetails" />
          <br v-if="idx !== paragraphs.length - 1" />
        </template>
      </div>
    </BasePage>
    <Transition name="fade">
      <DiaryAnnotationDetails
        v-if="annotationDetails"
        class="annotation-details"
        :id="`${annotationDetails.id}-details`"
        :annotation="annotationDetails"
        :style="{ marginTop: `${annotationDetails.pos}px` }" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const diary = ref<DiaryPage>();
const paragraphs = ref<ParagraphLine[][]>([]);
const rawText = ref<string>();
const annotationDetails = ref<Annotation | null>(null);
const pageContent = ref<HTMLElement | null>(null);
const basePageEl = ref<HTMLElement | null>(null);
const contentPadding = 112;

const props = defineProps<{
  pageNumber: number;
}>();

const parseLine = (line: Line) => {
  // Fetch the text
  let text = line.text + ' ';
  let parts: ParagraphLine[] = [
    {
      type: 'text',
      value: text,
    },
  ];

  if (line.annotations?.length) {
    parts = [];
  }

  // Loop over the annotations, sort them by start position (last one first)
  (line.annotations || [])
    .sort((a, b) => (a.start || 0) - (b.start || 0))
    .forEach((annotation: Annotation) => {
      const hasStart = typeof annotation.start === 'number';
      const hasEnd = typeof annotation.end === 'number';

      if (hasStart) {
        const value = text.slice(0, annotation.start);
        if (value) {
          parts.push({
            type: 'text',
            value: text.slice(0, annotation.start),
          });
        }
      }
      if (hasStart && hasEnd) {
        parts.push({
          type: 'annotation',
          value: text.slice(annotation.start, annotation.end),
          id: `page-${props.pageNumber}-${annotation.id}`,
          annotationType: annotation.type,
        });
      }
      if (hasEnd) {
        const value = text.slice(annotation.end);
        if (value) {
          parts.push({
            type: 'text',
            value: text.slice(annotation.end),
          });
        }
      }
    });
  return parts;
};

onMounted(async () => {
  // TODO: This should be done in the store
  diary.value = await $fetch(`/api/diaries/${props.pageNumber}`);

  // Parse lines
  if (diary.value?.lines) {
    const paragraphIds = [...new Set(diary.value.lines.map((line: Line) => line.paragraphIdx))];
    const raw: string[] = [];

    // Loop over the ids and fetch the lines
    paragraphIds.forEach((id: number) => {
      const linesNext = (diary.value?.lines || [])
        .filter((line: Line) => line.paragraphIdx === id)
        .sort((lineA: Line, lineb: Line) => lineA.lineIdx - lineb.lineIdx)
        .map(parseLine);
      const flattened = linesNext.flat();
      paragraphs.value.push(flattened);
      raw.push(
        linesNext
          .flat()
          .map((line: any) => line.value)
          .join(''),
      );
    });

    rawText.value = raw.join('');
  }
});

/**
 * Methods
 */
const setAnnotationDetails = async (line: ParagraphLine) => {
  const currentAnnoId = annotationDetails.value?.id;
  annotationDetails.value = null;
  // Deselect when same annotation is clicked
  if (currentAnnoId === line.id) {
    return;
  }
  // nextTick() is used to to correctly transition between annotation details
  await nextTick();
  // Set current annotation
  annotationDetails.value = {
    id: line.id,
    type: line.annotationType,
    value: line.value,
  };
  // Set position
  setAnnotationDetailsPosition();
};

const setAnnotationDetailsPosition = () => {
  if (annotationDetails.value?.id) {
    const annoPos = document.getElementById(annotationDetails.value.id)?.getBoundingClientRect().top || 0;
    const contentTop = pageContent.value!.getBoundingClientRect().top;
    annotationDetails.value.pos = annoPos - contentTop + contentPadding - 3;
  }
};

// Resize observer
useResizeObserver(basePageEl, () => {
  setAnnotationDetailsPosition();
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1.9fr 1fr;
  grid-template-areas: 'left content right';
  justify-items: center;
  width: 100%;
}

.current-page {
  position: relative;
}

.read-indicator,
.page {
  grid-area: content;
}

.annotation-details {
  grid-area: left;
  transition: var(--transition-1);
}
</style>
