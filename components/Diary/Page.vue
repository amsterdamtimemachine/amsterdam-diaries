<template>
  <div
    class="container"
    ref="containerRef">
    <BasePage
      class="current-page"
      ref="basePageEl">
      <ReadIndicator
        :page-number="pageNumber"
        :total-pages="totalPages" />
      <ReadTimeIndicator
        class="read-indicator"
        :input="rawText" />
      <template
        v-for="(section, idx) in page.sections"
        :key="idx">
        <component
          :is="fetchComponent(section.type)"
          :input="section"
          @annotation-click="annotationClicked"
          @annotation-hovering="setAnnotationDetails" />
        <br v-if="idx !== page.sections.length - 1" />
      </template>
    </BasePage>
    <Transition name="fade">
      <div
        v-if="annotationDetails"
        class="annotation-details"
        :id="`${annotationDetails.id}-details`"
        :style="{ marginTop: `${annotationDetails.pos}px` }">
        <DiaryAnnotationDetailsDate
          v-if="annotationDetails.subType === 'Date'"
          :date-reference="annotationDetails.reference || annotationDetails.value || ''" />
        <DiaryAnnotationDetailsPlace v-if="annotationDetails.subType === 'Place'" />
        <DiaryAnnotationDetailsTheme
          v-if="annotationDetails.subType === 'Etenswaren'"
          :subType="annotationDetails.subType" />
        <DiaryAnnotationDetailsPerson
          v-if="annotationDetails.subType === 'Person'"
          :name="annotationDetails.name || annotationDetails.reference || annotationDetails.value || ''"
          :description="annotationDetails.description" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const annotationDetails = ref<AnnotationLine & { pos?: number }>();
const annotationDetailsLocked = ref<boolean>(false);
const containerRef = ref<HTMLElement>();
const basePageEl = ref();

const props = defineProps<{
  page: Page;
  pageNumber: number;
  totalPages: number;
}>();

/**
 * Computed Properties
 */
const rawText = computed<string>(() => {
  return props.page.sections
    .filter((s: Section) => s.type !== 'Visual')
    .map((s: Section) => (s as TextSection).lines)
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
    case 'Visual':
      return resolveComponent('DiaryVisual');
  }
};

const annotationClicked = async (line: AnnotationLine) => {
  // Toggle annotation details lock when clicking on the same annotation
  if (!annotationDetails.value?.id || annotationDetails.value?.id === line.id) {
    annotationDetailsLocked.value = !annotationDetailsLocked.value;
  }

  // Deselect annotation to hide annotation details immediately
  if (!annotationDetailsLocked.value) {
    annotationDetails.value = undefined;
  } else {
    // else set annotation details to the clicked annotation
    annotationDetails.value = line;
    setAnnotationDetailsPosition();
  }

  // nextTick() is used to to correctly transition between annotation details
  await nextTick();
};

const setAnnotationDetails = async (event: { line: AnnotationLine; hovering: boolean }) => {
  // Don't set annotation details when hovering over a different annotation
  if (annotationDetails.value?.id && annotationDetails.value?.id !== event.line.id) {
    return;
  }

  // Deselect when annotation is not hovered and annotation details are not locked
  if (!event.hovering && !annotationDetailsLocked.value) {
    annotationDetails.value = undefined;
    return;
  }
  // nextTick() is used to to correctly transition between annotation details
  await nextTick();

  // Set current annotation
  annotationDetails.value = event.line;

  // Set position
  setAnnotationDetailsPosition();
};

const setAnnotationDetailsPosition = () => {
  if (annotationDetails.value?.id) {
    const anno = document.getElementById(annotationDetails.value.id);
    const annoRect = anno!.getBoundingClientRect();
    const annoPos = annoRect.top + window.scrollY;
    const annoOffset = anno?.parentElement?.tagName === 'H2' ? 0 : annoRect.height / 2;
    const containerPos = containerRef.value!.getBoundingClientRect().top + window.scrollY;
    annotationDetails.value.pos = annoPos - containerPos - annoOffset;
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
  z-index: 2;
  width: 100%;
}
</style>
