<template>
  <div class="overview page-container-2">
    <PageIntro
      class="page-intro"
      :title="title"
      :description="description"
      :lines="7" />
    <div class="content">
      <div class="header">
        <div
          v-if="total"
          class="label">
          {{ total }} {{ overviewLabel }}
        </div>
      </div>
      <div
        v-if="items"
        class="cards">
        <CardOverview
          v-for="item in items"
          :key="item.id"
          :title="(item.name === 'Theme' ? useCapitalize(item.slug!) : item.name) || ''"
          :description="item.description"
          :image="item.image"
          :link="`/${resourceType}/${item.slug}`"
          :linkText="linkText(item.name || '')"
          :lines="lines"
          :resourceType="resourceType" />
        <div
          v-intersect="0.01"
          @intersect="loadNext"
          v-if="allowLoadingMore">
          <LoadingSpinner class="spinner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * State & props
 */
const allowLoadingMore = ref(true);
const items = ref<Resource[]>([]);
const total = ref(0);
const offset = ref(0);
const LIMIT = 50;
const resourceType = useRoute().params.resourceType as string;
const { readMore, overviewLabel } = (ResourceInfo[resourceType] ?? {}) as ResourceInfo;
const { id, title, description } = toRefs(reactive(await $fetch(`/api/info?type=${resourceType}`)));

if (!readMore || !id) {
  throw new Error(`Invalid resource type: ${resourceType}`);
}

/**
 * Computed properties
 */
const lines = computed<number>(() => (resourceType === 'dagboekschrijfsters' ? 5 : 2));
const linkText = (name: string) => {
  return readMore.replace('{X}', name);
};

/**
 * Methods
 */
const loadNext = async () => {
  const newItems = ref(await $fetch(`/api/${resourceType}?limit=${LIMIT}&offset=${offset.value}`)) as Ref<Resource[]>;
  if (newItems.value.length === 0) {
    allowLoadingMore.value = false;
  }
  items.value = items.value.concat(newItems.value);
  // Sort all items by name
  items.value.sort((a, b) => a?.name?.localeCompare(b?.name));
  offset.value += newItems.value.length;
  if (items.value.length >= total.value) {
    allowLoadingMore.value = false;
  }
};

onMounted(async () => {
  total.value = await $fetch(`/api/${resourceType}/_count`);
});
</script>

<style lang="scss" scoped>
.overview {
  @include flex-column;
  align-items: center;
  gap: var(--space-8);
}
.page-intro {
  text-align: center;
}
.content {
  @include flex-column;
  gap: var(--space-5);
  width: 100%;
  animation: var(--animation-fade-in-up);
}
.header {
  padding-inline: var(--space-4);
  .label {
    float: right;
    color: var(--lavender-gray);
  }
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  width: 100%;
  gap: var(--space-5);
}

@include sm-screen-down {
  .content {
    gap: var(--space-3);
  }
  .label {
    font-size: 0.875rem;
    line-height: 165%;
  }
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
