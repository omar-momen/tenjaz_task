<template>
  <div class="default-layout">
    <TheSidebar
      :links="sideBarlinks"
      :isMinimized="isMinimized"
      class="hidden lg:block"
      @toggleSidebar="toggleSidebar"
    />

    <div
      class="inside-view pt-[var(--navbar-height)] fixed end-0 top-0 lg:transition-all lg:duration-[800ms] group h-[100vh] max-h-[100vh] overflow-y-scroll"
      :class="{ 'sidebar-minimized': isMinimized }"
    >
      <TheNavbar :isMinimized="isMinimized" />

      <!-- Mobile Sidebar -->
      <aside
        class="bg-whiteColor pt-10 fixed lg:hidden group-[.sidebar-minimized]:start-0 -start-[250px] h-full w-[250px] transition-all duration-[800ms] z-[999]"
      >
        <UVerticalNavigation @click="toggleSidebar" :links="sideBarlinks" />

        <div
          class="lg:hidden absolute -end-8 top-1/2 -translate-y-1/2 z-50"
          aria-label="close"
          role="button"
        >
          <SidebarMenuIcon
            :isMinimized="isMinimized"
            @toggleSidebar="toggleSidebar"
          />
        </div>
      </aside>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const isMinimized = ref<boolean>(false);
const toggleSidebar = () => {
  isMinimized.value = !isMinimized.value;
};

const sideBarlinks = [
  {
    label: "Home",
    icon: "i-heroicons-chart-bar",
    to: "/",
  },
  {
    label: "Users",
    icon: "i-heroicons-users",
    to: "/users",
  },
];
</script>

<style lang="postcss" scoped>
.inside-view {
  width: 100vw;

  @screen lg {
    width: calc(100vw - var(--max-sidebar-width));

    &.sidebar-minimized {
      width: calc(100vw - var(--min-sidebar-width));
    }
  }
}

.mobileSidbar {
}
</style>
