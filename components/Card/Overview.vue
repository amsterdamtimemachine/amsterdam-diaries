<template>
  <div class="card-overview">
    <div class="body">
      <div class="header font-h2">
        <Image
          class="image"
          :src="image || defaultImage"
          :default="defaultImage"
          :alt="title" />
        <div class="title">
          {{ capitalizedTitle }}
        </div>
      </div>
      <div
        class="description"
        :style="descriptionStyling">
        {{ description }}
      </div>
    </div>
    <LinkArrow
      class="link"
      :link="link"
      :linkText="linkText" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    image?: string;
    description?: string;
    lines?: number;
    link: string;
    linkText: string;
    resourceType: string;
  }>(),
  {
    lines: 2,
  },
);
const { defaultImage } = (ResourceInfo[props.resourceType] ?? {}) as ResourceInfo;
const capitalizedTitle = computed(() => (props.title ? useCapitalize(props.title) : ''));
const descriptionStyling = computed(() => {
  return {
    '--number-of-lines': props.lines,
  };
});
</script>

<style lang="scss" scoped>
.card-overview {
  @include flex-column;
  justify-content: space-between;
  background: var(--linen);
  box-shadow: var(--shadow-1);
  min-height: var(--space-78);
}

.body {
  @include flex-column;
  gap: var(--space-5);
  padding: var(--space-7);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--space-6);

  .image {
    flex: none;
    width: var(--space-20);
    height: var(--space-19);
    object-fit: cover;
    border-radius: var(--border-radius-3);
  }

  .title {
    word-break: break-word;
  }
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--number-of-lines);
  overflow: hidden;
}

.link {
  :deep(span) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  background: var(--white);
  padding: var(--space-5) var(--space-7);
}
</style>
