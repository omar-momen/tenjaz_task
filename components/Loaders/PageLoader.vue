<template>
  <div
    class="w-100 h-screen absolute z-[997] bg-primary-200 flex justify-center items-center inset-0"
  >
    <div class="loader"></div>
  </div>
</template>

<style lang="postcss" scoped>
.loader {
  @apply w-12 h-12 rounded-full;
  background: conic-gradient(
    from 0deg at 50% 50%,
    #119f49,
    #dbfde8,
    #f0fdf4,
    #119f49
  );
  animation: spin 1.5s linear infinite;
}
</style>
