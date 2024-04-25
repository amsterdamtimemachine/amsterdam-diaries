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
          @annotation-click="annotationClicked"
          @annotation-hovering="setAnnotationDetails" />
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
const annotationDetailsLocked = ref<boolean>(false);
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
