<template>
  <span
    ref="annotationLine"
    class="annotation-line">
    <template v-if="isNonClickable">
      <DiaryAnnotationDetailsBlackening
        :class="annotationLineClass"
        :line="line" />
    </template>
    <template v-else>
      <button
        :id="line.id"
        :class="annotationLineClass"
        @click="toggleAnnotation">
        {{ line.value }}
      </button>
      <Transition name="fade">
        <DiaryAnnotationDetails
          v-if="clicked"
          :line="line" />
      </Transition>
    </template>
  </span>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const props = defineProps<{
  line: AnnotationData;
}>();

const clicked = ref<boolean>(false);
const annotationLine = ref<HTMLElement>();

onClickOutside(annotationLine, () => {
  clicked.value = false;
});

/**
 * Computed properties
 */
const isNonClickable = computed(() => {
  return props.line.subType === 'Blackening';
});

const annotationLineClass = computed(() => {
  const subType = props.line.subType;

  return {
    annotation: true,
    [typeof subType === 'string' ? subType!.toLowerCase() : '']: true,
  };
});

/**
 * Methods
 */
const toggleAnnotation = () => {
  clicked.value = !clicked.value;
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
  color: var(--black);

  &.place {
    background: color-mix(in srgb, var(--green) 20%, transparent);
  }

  &.theme {
    background: color-mix(in srgb, var(--purple) 20%, transparent);
  }

  &.person {
    background: color-mix(in srgb, var(--blue) 20%, transparent);
  }

  &.organization {
    background: color-mix(in srgb, var(--maroon) 20%, transparent);
  }

  &.date {
    color: var(--blue);
    text-decoration: underline;
  }
}
</style>
