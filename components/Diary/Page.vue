<template>
  <div
    class="container"
    ref="containerRef">
    <BasePage
      class="current-page"
      ref="basePageEl">
      <ReadIndicator />
      <ReadTimeIndicator
        class="read-indicator"
        :input="rawText" />
      <template
        v-for="(section, idx) in page.sections"
        :key="idx">
        <component
          :is="fetchComponent(section.type)"
          :input="section"
          @annotation-click="setAnnotationDetails" />
        <br v-if="idx !== page.sections.length - 1" />
      </template>
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
const annotationDetails = ref<AnnotationLine & { pos?: number }>();
const containerRef = ref<HTMLElement>();
const basePageEl = ref();

const props = defineProps<{
  page: Page;
}>();

/**
 * Computed Properties
 */
const rawText = computed<string>(() => {
  return props.page.sections
    .map(s => s.lines)
    .flat()
    .map(y => y.value)
    .join(' ');
});

/**
 * Methods
 */
const fetchComponent = (type: string) => {
  switch (type) {
    case 'Heading':
      return resolveComponent('DiaryHeading');
    case 'Paragraph':
      return resolveComponent('DiaryParagraph');
  }
};

const setAnnotationDetails = async (line: AnnotationLine) => {
  const currentAnnoId = annotationDetails.value?.id;
  annotationDetails.value = undefined;
  // Deselect when same annotation is clicked
  if (currentAnnoId === line.id) {
    return;
  }
  // nextTick() is used to to correctly transition between annotation details
  await nextTick();

  // Set current annotation
  annotationDetails.value = line;

  // Set position
  setAnnotationDetailsPosition();
};

const setAnnotationDetailsPosition = () => {
  if (annotationDetails.value?.id) {
    const annoRect = document.getElementById(annotationDetails.value.id)?.getBoundingClientRect();
    const containerPos = containerRef.value!.getBoundingClientRect().top;
    annotationDetails.value.pos = annoRect!.top - containerPos - annoRect!.height / 4;
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
