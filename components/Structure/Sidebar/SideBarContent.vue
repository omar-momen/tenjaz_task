<template>
  <div
    class="group/content sidebar-content"
    :class="{ isMinimized: isMinimized }"
  >
    <ul @click="emits('closeSideBar')">
      <li>
        <NuxtLink
          class="flex items-center gap-3 p-2 transition-all hover:bg-slate-200 duration-700 cursor-pointer group-[.isMinimized]/content:ps-4"
          :to="localePath('/')"
          aria-label="go-to-home-page"
        >
          <span><Icon size="30" name="mdi:home" /></span>
          <span class="group-[.isMinimized]/content:hidden">{{
            $t("links.home")
          }}</span></NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-3 p-2 transition-all hover:bg-slate-200 duration-700 cursor-pointer group-[.isMinimized]/content:ps-4"
          :to="localePath('/users')"
          aria-label="go-to-home-page"
        >
          <span><Icon size="30" name="mdi:users" /></span>
          <span class="group-[.isMinimized]/content:hidden">{{
            $t("links.users")
          }}</span></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["closeSideBar"]);

defineProps<{
  isMinimized: boolean;
}>();

const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
a.router-link-exact-active {
  @apply text-primary-700;
}
</style>
