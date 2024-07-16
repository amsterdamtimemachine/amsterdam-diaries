export default defineNuxtPlugin(nuxtApp => {
  let observer: IntersectionObserver;
  const defaults = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  nuxtApp.vueApp.directive('intersect', {
    created(el, binding) {
      const options = binding.value === Object(binding.value) ? binding.value : { threshold: binding.value };
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            el.dispatchEvent(
              new CustomEvent('intersect', {
                detail: {
                  isIntersecting: entry.isIntersecting,
                  threshold: entry.intersectionRatio,
                },
              }),
            );
          }
        },
        { ...defaults, ...options },
      );
    },
    mounted(el) {
      observer.observe(el);
    },
    beforeUnmount() {
      observer.disconnect();
    },
  });
});
