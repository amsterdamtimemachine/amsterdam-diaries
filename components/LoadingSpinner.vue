<template>
  <div class="spinner"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.spinner {
  width: var(--size-9);
  height: var(--size-9);
  border: var(--size-1) solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--black);
  border-radius: var(--border-radius-7);
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
