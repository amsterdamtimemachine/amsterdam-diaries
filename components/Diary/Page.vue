<template>
  <BasePaper>
    <template
      v-for="(section, idx) in page.sections"
      :key="idx">
      <component
        :is="fetchComponent(section.type)"
        :input="section" />
      <br v-if="addBreak(idx)" />
    </template>
  </BasePaper>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const props = defineProps<{
  page: PageData;
}>();

/**
 * Methods
 */
const fetchComponent = (type: string) => {
  switch (type) {
    case 'Heading':
    case 'header':
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
