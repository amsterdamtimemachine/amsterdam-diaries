<template>
  <div class="calendar-years">
    <client-only>
      <button
        @click="scrollYears(true)"
        class="font-h2">
        <BaseIcon icon="mdi:arrow-up" />
      </button>
      <div
        ref="yearsList"
        class="years">
        <button
          v-for="(year, idx) in years"
          :key="year"
          :class="{ 'font-h2': true, active: idx === selectedYearIndex }"
          @click="setYear(idx, year)">
          {{ year }}
        </button>
      </div>
      <button
        @click="scrollYears()"
        class="font-h2">
        <BaseIcon icon="mdi:arrow-down" />
      </button>
    </client-only>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const props = defineProps<{ year: number; years: number[] }>();
const emit = defineEmits(['setYear']);

const yearsList = ref<HTMLElement>();
const selectedYearIndex = ref<number>(props.years.indexOf(props.year));
/**
 * Methods
 */
const onMobile = () => {
  return window.innerWidth <= 1024;
};
const setYear = (idx: number, year: number) => {
  selectedYearIndex.value = idx;
  emit('setYear', year);
};
const scrollYears = (up?: boolean) => {
  if (yearsList.value) {
    const options: ScrollToOptions = { behavior: 'smooth' };
    const useHorizontalScroll = onMobile();
    const dimension = useHorizontalScroll ? 'clientWidth' : 'clientHeight';
    options[useHorizontalScroll ? 'left' : 'top'] = up ? -yearsList.value[dimension] : yearsList.value[dimension];
    yearsList.value.scrollBy(options);
  }
};
/**
 * Lifecycle
 */
onMounted(async () => {
  await nextTick();
  if (yearsList.value) {
    const yearBtns = yearsList.value?.querySelectorAll('button');
    if (yearBtns && yearsList.value) {
      // Set scroll position to middle (horizontal or vertical)
      const middleYear = yearBtns[Math.floor(yearBtns.length / 2)];
      const offset = 100;
      if (onMobile()) {
        yearsList.value.scrollLeft = middleYear.offsetLeft - offset / 4 - yearsList.value.clientWidth / 2;
      } else {
        yearsList.value.scrollTop = middleYear.offsetTop - offset - yearsList.value.clientHeight / 2;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.calendar-years {
  @include flex-column;
  overflow: hidden;
  background: var(--white);
  box-shadow: var(--shadow-2);
  max-height: var(--space-120);

  button {
    font-weight: 400;
    line-height: var(--space-9);
    color: var(--black);
  }

  .years {
    @include flex-column;
    gap: var(--space-4);
    height: 100%;
    padding: var(--space-0) var(--space-4);
    overflow: auto;

    scrollbar-color: var(var(--light-blue)) var(--black-0);

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--light-blue);
      border-radius: var(--border-radius-1);
    }

    &::-webkit-scrollbar-track {
      background: var(--black-0);
    }

    > button {
      padding: var(--space-4);

      &.active {
        background: var(--light-blue);
        outline: var(--black) solid var(--space-0);
      }

      &:hover {
        background: var(--light-blue);
        outline: var(--black) solid var(--space-0);
      }
    }
  }
}

@include sm-screen-down {
  .calendar-years {
    @include flex-row;
    padding-block: var(--space-2);

    > button {
      transform: rotate(-90deg);
      padding-inline: var(--space-4);
    }

    .years {
      @include flex-row;
      width: 100%;

      > button {
        padding-block: var(--space-1);
        font-size: 1.125rem;
      }
    }
  }
}
</style>
