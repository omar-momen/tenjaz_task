<template>
  <div class="statistics-card">
    <div
      class="relative group/cards text-white overflow-hidden rounded-lg p-6 shadow-md min-w-64 z-[2] before:content-[''] before:block before:absolute before:top-[-20px] before:left-[-40px] before:w-60 before:h-60 before:z-[-1] before:rounded-full before:bg-darkColor-500 before:opacity-20 cursor-pointer before:transition-all before:duration-1000 hover:before:translate-x-[20px] hover:before:translate-y-[-20px]"
      :class="[`bg-${bgColor}-500`]"
    >
      <h2 class="text-xl font-bold">{{ title }}</h2>

      <div class="flex items-center justify-between mt-4">
        <div class="relative">
          <span class="text-white font-bold text-4xl">{{ value }}</span>
        </div>

        <div
          class="w-12 h-12 transition-all duration-1000 group-hover/cards:-translate-y-5"
        >
          <Icon class="text-white" :name="icon" size="50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  value: string;
  icon: string;
  bgColor: string;
}>();
</script>
