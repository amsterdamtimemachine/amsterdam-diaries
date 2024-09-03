<template>
  <div class="read-info container">
    <ReadIndicator
      :page-number="pageNumber"
      :total-pages="totalPages" />
    <ReadTimeIndicator
      :input="rawText"
      :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  page?: Page;
  pageNumber: number;
  totalPages: number;
}>();

/**
 * Computed Properties
 */
const rawText = computed<string>(() => {
  if (!props.page) return '';
  return props.page.sections
    .filter((s: Section) => s.type !== 'Visual')
    .map((s: Section) => (s as TextSection).lines)
    .flat()
    .map(y => y.value)
    .join(' ');
});
</script>

<style lang="scss" scoped>
.read-info {
  position: fixed;
  background: var(--alabaster);
  z-index: 1;
}
</style>
