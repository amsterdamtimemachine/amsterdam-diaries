<template>
  <div
    :class="{
      'overview-detail': true,
      'page-container-2': true,
      'overview-horizontal': resourceType === 'personen',
      'no-image': !resource.image,
    }">
    <Image
      v-if="resource.image"
      class="image"
      :src="resource.image || defaultImage"
      :default="defaultImage"
      :alt="capitalizedTitle" />
    <PageIntro
      class="page-intro"
      :title="capitalizedTitle"
      :description="resource.description || ''"
      :lines="7">
      <ExternalLink
        v-if="externalLinkText && resourceType !== 'themas'"
        :class="{ 'external-link': true, 'align-left': resource.image && resourceType === 'personen' }"
        :link="resource.id"
        :link-text="externalLinkText" />
    </PageIntro>
    <DiaryCards
      class="snippets"
      :cards="snippets" />
  </div>
</template>

<script setup lang="ts">
const { resourceType, slug } = useRoute().params;
const { defaultImage } = (ResourceInfo[resourceType as string] ?? {}) as ResourceInfo;
if (!defaultImage) {
  throw new Error(`Invalid resource type: ${resourceType}`);
}
const resource = ref(await $fetch(`/api/${resourceType as string}/${slug}`)) as Ref<Resource>;
const capitalizedTitle = computed(() => (resource.value.name ? useCapitalize(resource.value.name) : ''));
const snippets = ref(await $fetch(`/api/snippets?type=${resourceType}&id=${btoa(resource.value.id)}`));

const externalLinkText = computed<string>(() => {
  return useExternalLinkType(resource.value.id);
});
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
.external-link {
  justify-content: center;
}
.snippets {
  width: 100%;
  height: fit-content;
}

@include sm-screen-up {
  .overview-horizontal {
    grid-template-rows: auto 1fr;
    grid-template-columns: var(--space-105) 1fr;
    justify-items: initial;
    row-gap: var(--space-20);
    column-gap: var(--space-40);

    &.no-image {
      grid-template-columns: 1fr;

      .intro {
        max-width: var(--space-160);
        margin-inline: auto;
        text-align: center;
      }
    }

    .page-intro {
      text-align: initial;
      width: 100%;
    }

    .snippets {
      grid-column: 1 / -1;
    }

    .external-link.align-left {
      justify-content: flex-start;
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
