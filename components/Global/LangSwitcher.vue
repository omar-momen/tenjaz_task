<template>
  <div @click="chnageLang" class="items-center cursor-pointer">
    <span class="pe-3 border-e-2 border-gray-300">
      <Icon size="24" name="mynaui:globe" />
    </span>
    <span class="ps-3 text-lg font-bold uppercase"> {{ lang }} </span>
  </div>
</template>

<script lang="ts" setup>
const { locales, locale, setLocale } = useI18n();

const lang = computed({
  get: () => locale.value,
  set: async (val) => {
    await setLocale(val);

    // reload the page
    location.reload();
  },
});

const chnageLang = () => {
  lang.value = lang.value === "en" ? "ar" : "en";
};
</script>
