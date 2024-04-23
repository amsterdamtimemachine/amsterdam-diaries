<template>
  <div class="annotation-details font-body-m">
    <span class="icon variant-bg">
      <BaseIcon
        color="var(--white-paper)"
        width="var(--size-3)"
        height="var(--size-3)"
        :icon="info.icon" />
    </span>
    <div class="right">
      <div class="top">
        <div>
          <span class="type">{{ info.lblType }}: </span>
          <span
            class="variant-color"
            v-if="info.isExternal">
            ga naar ....
          </span>
          <!-- TODO: add correct URL for nuxt links -->
          <NuxtLink
            v-else
            class="variant-color"
            to="#"
            >{{ info.lblUrl || annotation.value }}</NuxtLink
          >
        </div>
        <span class="line variant-bg" />
      </div>
      <NuxtLink
        v-if="info.isExternal"
        class="link variant-color"
        to="#"
        >{{ info.lblUrl || annotation.value }}</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  annotation: AnnotationLine;
}>();

const info = computed(() => {
  switch (props.annotation.subType) {
    case 'Place':
      return AnnotationPlace;
    case 'Date':
      return AnnotationDate;
    case 'Organization':
      return AnnotationOrganization;
    case 'Person':
      return AnnotationPerson;
    case 'Theme':
      return AnnotationTheme;
    default:
      return AnnotationDefault;
  }
});
const variantColor = `var(--${info.value?.variant})`;
</script>

<style lang="scss" scoped>
.annotation-details {
  display: flex;
  width: 100%;
  height: fit-content;
  z-index: 2;
  gap: var(--spacing-3);

  .right {
    @include flex-column;
    flex: 1;

    .top {
      display: flex;
      gap: var(--spacing-4);
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-7);
    width: var(--size-5);
    height: var(--size-5);
    margin-top: 0.375rem;
  }

  .link {
    margin-right: var(--spacing-9);
  }

  .variant-color {
    color: v-bind('variantColor');
  }

  .type {
    color: var(--lavender-gray);
  }

  .line {
    height: var(--spacing-1);
    flex: 1;
  }

  .variant-bg {
    background: v-bind('variantColor');
  }
}
</style>
