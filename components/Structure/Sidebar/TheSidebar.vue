<template>
  <nav
    class="group shadow-lg bg-whiteColor fixed z-[5] start-0 top-0 h-full w-[var(--max-sidebar-width)] lg:transition-all lg:duration-[800ms] pt-[var(--navbar-height)]"
    :class="{ 'nav-minimized': isMinimized }"
  >
    <div class="absolute top-3 end-3 group-[.nav-minimized]:end-4">
      <SidebarMenuIcon
        :isMinimized="isMinimized"
        @toggleSidebar="toggleSidebar"
      />
    </div>
    <UVerticalNavigation @click="toggleSidebar" :links="links" />
  </nav>
</template>

<script setup lang="ts">
const emits = defineEmits(["toggleSidebar"]);
const props = defineProps<{
  isMinimized: boolean;
  links: [];
}>();

const toggleSidebar = () => {
  emits("toggleSidebar", props.isMinimized);
};
</script>

<style lang="postcss" scoped>
.nav-minimized {
  width: var(--min-sidebar-width) !important;
}
</style>
