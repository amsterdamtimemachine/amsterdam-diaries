<template>
  <span
    ref="annotationLine"
    class="annotation-line">
    <button
      :id="line.id"
      :class="{ annotation: true, [typeof line.subType === 'string' ? line.subType!.toLowerCase() : '']: true }"
      @click="toggleAnnotation">
      {{ line.value }}
    </button>
    <Transition name="fade">
      <component
        v-if="clicked"
        :is="fetchComponent(line.subType!)"
        :line="line" />
    </Transition>
  </span>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
defineProps<{
  line: AnnotationLine;
}>();

const clicked = ref<boolean>(false);
const annotationLine = ref<HTMLElement>();

onClickOutside(annotationLine, () => {
  clicked.value = false;
});

/**
 * Methods
 */
const toggleAnnotation = () => {
  clicked.value = !clicked.value;
};

const fetchComponent = (type: string) => {
  switch (type) {
    case 'Date':
      return resolveComponent('DiaryAnnotationDetailsDate');
    case 'Place':
      return resolveComponent('DiaryAnnotationDetailsPlace');
    // TODO: Change this once we have multiple themes
    case 'Etenswaren':
      return resolveComponent('DiaryAnnotationDetailsTheme');
    case 'Person':
      return resolveComponent('DiaryAnnotationDetailsPerson');
  }
};
</script>

<style lang="scss" scoped>
.annotation-line {
  position: relative;
  display: inline-block;
}

.annotation {
  display: flex;
  align-items: center;
  line-height: 1.3;

  &.place {
    background: color-mix(in srgb, var(--green) 20%, transparent);
  }

  // TODO: If we want to support multiple themes in the future this should be just '.theme'
  &.etenswaren {
    background: color-mix(in srgb, var(--purple) 20%, transparent);
  }

  &.person {
    background: color-mix(in srgb, var(--blue) 20%, transparent);
  }

  &.organization,
  &.date {
    color: var(--blue);
    text-decoration: underline;
  }
}
</style>
