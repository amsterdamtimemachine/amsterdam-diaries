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
          :input="section" />
        <br v-if="addBreak(idx)" />
      </template>
    </BasePage>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
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
    case 'Caption':
      return resolveComponent('DiaryCaption');
  }
};

// Helper function to determine if we should add a break or not;
const addBreak = (sectionIdx: number) => {
  const sections = props.page.sections;
  const lastSectionIdx = sections.length - 1;
  const currentSection = sections[sectionIdx];
  if (currentSection.type === 'Visual') {
    const nextSection = sections[sectionIdx + 1];
    if (nextSection?.type === 'Caption') {
      return false;
    }
  }
  return sectionIdx !== lastSectionIdx;
};
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
  width: 100%;
}
</style>
