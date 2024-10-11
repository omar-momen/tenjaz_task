<template>
  <UButton
    @click="emits('toggleSidebar')"
    class="p-0 rounded-full bg-Tprimary-500 w-10 h-10 flex-center transition-all"
    aria-label="close"
  >
    <div
      class="group flex flex-col gap-[3px] flex-center"
      :class="{ minimized: isMinimized }"
    >
      <span
        class="w-4 h-[1.5px] bg-white transition-all ease-out duration-[1000ms]"
      ></span>
      <span
        class="group-[.minimized]:w-3 w-4 h-[1.5px] bg-white transition-all ease-out duration-[1000ms]"
      ></span>
      <span
        class="group-[.minimized]:w-2 w-4 h-[1.5px] bg-white transition-all ease-out duration-[1000ms]"
      ></span>
    </div>
  </UButton>
</template>

<script lang="ts" setup>
const emits = defineEmits(["toggleSidebar"]);
defineProps<{
  isMinimized: boolean;
}>();
</script>
