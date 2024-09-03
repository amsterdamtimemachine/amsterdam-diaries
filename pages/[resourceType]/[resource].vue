<template>
  <div
    :class="{
      'overview-detail': true,
      'page-container': true,
      'overview-horizontal': resourceType === 'personen',
    }">
    <Image
      :class="{ image: true, 'image-contain': !resource.imageid }"
      :src="resource.imageid || defaultImage"
      :default="defaultImage"
      :alt="capitalizedTitle" />
    <PageIntro
      class="page-intro"
      :title="capitalizedTitle"
      :description="resource.description || ''"
      :lines="7" />
    <DiaryCards
      class="snippets"
      :cards="snippets" />
  </div>
</template>

<script setup lang="ts">
const { resourceType, resource: slug } = useRoute().params;
const path = ValidResources[resourceType as string];
if (!path) {
  throw new Error(`Invalid resource type: ${resourceType}`);
}
const resource = ref(await $fetch(`/api/${path}/${slug}`)) as Ref<Resource>;
const capitalizedTitle = computed(() => (resource.value.name ? useCapitalize(resource.value.name) : ''));
const { defaultImage } = ResourceInfo[resourceType as string];
const snippets = ref(await $fetch(`/api/snippets?id=${resource.value.id}&field=identifyingid`));
</script>

<style lang="scss" scoped>
.overview-detail {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  gap: var(--space-15);
  justify-items: center;
}
.image {
  width: 100%;
  height: var(--space-88);
  object-fit: cover;
  background: var(--bone-gray);
}
.image-contain {
  object-fit: contain;
}
.page-intro {
  text-align: center;
}
.snippets {
  width: 100%;
  height: fit-content;
}

@include sm-screen-up {
  .overview-horizontal {
    padding-top: var(--space-26);
    grid-template-rows: auto 1fr;
    grid-template-columns: var(--space-105) 1fr;
    justify-items: initial;
    row-gap: var(--space-20);
    column-gap: var(--space-40);

    .page-intro {
      text-align: initial;
      width: 100%;
    }

    .snippets {
      grid-column: 1 / -1;
    }
  }
}
@include sm-screen-down {
  .overview-detail {
    @include flex-column;
    gap: var(--space-8);
  }
}
</style>
