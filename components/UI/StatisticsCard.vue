<template>
  <div class="statistics-card">
    <div class=" text-white rounded-lg p-6 shadow-md w-64"
    :class="[`bg-${bgColor}-500`]"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">{{ title }}</h2>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="relative">
          <div class="w-16 h-16">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white font-bold text-4xl">{{ value }}</span>
            </div>
          </div>
        </div>

        <div class="w-12 h-12">
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
