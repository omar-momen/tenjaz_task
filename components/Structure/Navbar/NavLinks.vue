<template>
  <ul @click="emit('close')">
    <li>
      <NuxtLink :to="localePath('/')" aria-label="go-to-home-page">{{
        $t("links.home")
      }}</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('/users')" aria-label="go-to-users-page">{{
        $t("links.users")
      }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
li a {
  @apply text-darkColor-400 font-bold text-lg relative transition-all hover:text-primary-700;

  &.router-link-exact-active {
    @apply text-primary-700 after:content-[''] after:block after:w-full after:h-[6px] after:bg-primary-700 after:rounded-t-2xl after:absolute after:-bottom-[22px] after:left-0;
  }
}
</style>
