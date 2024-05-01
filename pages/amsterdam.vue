<template>
  <div class="content">
    <h1 class="font-h1">Wat gebeurde er in Amsterdam</h1>
    <p class="font-body-l">
      Op 7 mei 1945 beleefde Amsterdam een uitbundige bevrijding. Canadeze troepen trokken de stad binnen en
      feestvierende menigtes vulden de straten. Na vijf lange jaren van bezetting was de vreugde enorm. De bevrijding
      betekende het einde van de terreur, honger en angst, en het begin van een nieuwe toekomst in vrijheid.
    </p>
  </div>
  <Map marker-variant="light-pink" />
</template>

<style lang="scss" scoped>
.content {
  margin: calc(var(--page-margin) / 2) auto calc(var(--page-margin) / 2);
  width: var(--content-sub-width);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-9);
}
</style>
