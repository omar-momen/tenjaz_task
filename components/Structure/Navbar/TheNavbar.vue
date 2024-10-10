<template>
  <nav
    class="shadow-lg bg-whiteColor fixed z-[998] end-0 top-0 h-[var(--navbar-height)] lg:transition-all lg:duration-[800ms]"
    :class="{ 'sidebar-minimized': isMinimized }"
  >
    <UContainer class="flex justify-between items-center py-4">
      <div class="flex items-center gap-2">
        <UButton
          @click="isOpen = true"
          class="p-0 lg:hidden block"
          variant="ghost"
          aria-label="close"
        >
          <MenuIcon class="strok-secondary" />
        </UButton>

        <Logo class="me-5" />

        <NavLinks class="hidden lg:flex items-center gap-10" />
      </div>

      <!-- Actions -->
      <ul class="flex items-center gap-5">
        <li class="lg:pe-6 lg:border-e lg:border-secondary-200 cursor-pointer">
          <NotificationIcon class="stroke-darkColor" />
        </li>
        <li>
          <UserInfo class="hidden lg:flex" />
        </li>
        <LangSwitcher class="hidden lg:flex" />
      </ul>
    </UContainer>

    <!-- Menu Links SlideOver -->
    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <UButton
          color="primary"
          variant="ghost"
          size="md"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
          aria-label="close"
        />
        <UserInfo class="mt-16 mb-10" />
        <NavLinks
          class="flex justify-center items-center flex-col gap-8"
          @close="isOpen = false"
        />
        <LangSwitcher class="mt-16 flex justify-center" />
      </div>
    </USlideover>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  isMinimized: boolean;
}>();

const isOpen = ref(false);
</script>

<style lang="postcss" scoped>
nav {
  width: 100vw;

  @screen lg {
    width: calc(100vw - var(--max-sidebar-width));

    &.sidebar-minimized {
      width: calc(100vw - var(--min-sidebar-width));
    }
  }
}
</style>
