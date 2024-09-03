<template>
  <div class="calendar">
    <client-only>
      <VCalendar
        ref="calendar"
        :attributes="attributes"
        class="cal"
        expanded
        borderless
        locale="nl"
        trim-weeks
        :min-date="calendarDates.min"
        :max-date="calendarDates.max"
        :initial-page="{ month: calendarMonth, year }"
        :disabled-dates="calendarDates.disabled"
        @dayclick="dayClick">
        <template #header-prev-button>
          <BaseIcon icon="mdi:arrow-left" />
        </template>
        <template #header-next-button>
          <BaseIcon icon="mdi:arrow-right" />
        </template>
      </VCalendar>
    </client-only>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const props = defineProps<{
  year: number;
  dates: { id: string; value: Date }[];
}>();
const calendar = ref<any>();
const emit = defineEmits(['setSnippets']);
/**
 * Computed Properties
 */
const attributes = computed<any>(() => [
  {
    bar: true,
    dates: props.dates.filter(d => d.value.getFullYear() === props.year).map(date => date.value),
  },
]);
/**
 * Methods
 */
const setActiveDay = (el: Element) => {
  if (!el.classList.contains('active')) {
    calendar.value.containerRef.querySelectorAll('.active').forEach((el: Element) => el.classList.remove('active'));
    el.classList.add('active');
  }
};
const dayClick = (calendarEvent: any, pointerEvent: any) => {
  if (calendarEvent.attributes?.length && pointerEvent.target?.parentElement) {
    // Set active state on clicked day (not optimal, but best solution for now)
    const parent = pointerEvent.target.parentElement;
    setActiveDay(parent);
    const date: Date = calendarEvent.date;
    emit(
      'setSnippets',
      props.dates.find(d => {
        const dDate = new Date(d.value);
        return (
          dDate.getDate() === date.getDate() &&
          dDate.getMonth() === date.getMonth() &&
          dDate.getFullYear() === date.getFullYear()
        );
      }),
    );
  }
};

const calendarDates = computed<{ min: Date; max: Date; disabled: Date[] }>(() => {
  const dates = props.dates.filter(d => d.value.getFullYear() === props.year);
  const min = new Date(Math.min(...dates.map(d => d.value.getTime())));
  const max = new Date(Math.max(...dates.map(d => d.value.getTime())));
  // Get days between min and max which is used to fill the disabled array
  const days = Math.floor((Number(max) - Number(min)) / (1000 * 60 * 60 * 24));
  const disabled = [];

  // Fill disabled dates array
  for (let i = 1; i < days; i++) {
    const newDate = new Date(new Date(min).setDate(min.getDate() + i));
    if (
      !dates.some(date => {
        const dDate = new Date(date.value);
        return dDate.getDate() === newDate.getDate() && dDate.getMonth() === newDate.getMonth();
      })
    ) {
      disabled.push(newDate);
    }
  }

  return {
    min,
    max,
    disabled,
  };
});

const calendarMonth = computed<number>(() => {
  return calendarDates.value.min.getMonth() + 1;
});

const setCalenderYear = async (year: number) => {
  const month = calendarDates.value.min.getMonth() + 1;
  await nextTick();
  calendar.value.move({ month, year });
};
/**
 * Lifecycle Hooks
 */
onMounted(async () => {
  await nextTick();
  const firstDate = props.dates.find(d => d.value.getFullYear() === props.year);
  if (firstDate) {
    const dateClass = firstDate.value.toISOString().split('T')[0];
    // Days in VCalendar are rendered with a class with name id-<date>
    const dateElement = calendar.value.containerRef.querySelector(`.id-${dateClass}`);
    if (dateElement) {
      setActiveDay(dateElement);
      emit('setSnippets', firstDate);
    }
  }
});

/**
 * Watchers
 */
watch(
  () => props.year,
  () => {
    if (calendar.value) {
      setCalenderYear(props.year);
    }
  },
);
</script>

<style lang="scss" scoped>
/* VCalendar CSS overrides */
:deep(.cal) {
  background: var(--linen);
  box-shadow: var(--shadow-2);

  .vc-header {
    padding: 0;
    padding-inline: var(--space-10);
    margin: 0;
    height: var(--space-27);
  }
  .vc-title {
    font-family: 'Hanken Grotesk';
    font-size: var(--space-8);
    font-weight: 400;
  }
  .vc-arrow {
    color: var(--black);
  }
  .vc-weekdays {
    display: none;
  }
  .vc-weeks {
    padding: var(--space-4);
    background: var(--white);
  }
  .vc-day {
    min-height: var(--space-18);

    &:hover {
      .vc-day-content {
        background: none;
      }
    }

    &:has(.vc-day-layer) {
      &:hover,
      &.active {
        .vc-day-content {
          position: absolute;
          background: var(--alabaster);
          border: var(--space-0) solid var(--black);
          border-radius: initial;
          padding: var(--space-8);
          cursor: pointer;
        }
      }
    }
  }
  .vc-day-content {
    font-family: 'Hanken Grotesk';
    font-size: var(--space-8);
    font-weight: 400;
    cursor: initial;

    &:focus-within {
      box-shadow: none;
    }
  }
  .vc-bars {
    margin-bottom: var(--space-3);
    width: 50%;
  }
}

@include sm-screen-down {
  :deep(.cal) {
    .vc-title,
    .vc-day-content {
      font-size: 1.125rem;
    }

    .vc-header {
      height: var(--space-18);
    }

    .vc-day {
      min-height: var(--space-12);

      &:has(.vc-day-layer) {
        &:hover,
        &.active {
          .vc-day-content {
            padding: var(--space-5);
          }
        }
      }
    }
    .vc-bars {
      margin-bottom: var(--space-2);
      width: var(--space-7);
    }
  }
}
</style>
