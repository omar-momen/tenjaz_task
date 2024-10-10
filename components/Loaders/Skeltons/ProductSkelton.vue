<template>
  <div class="flex gap-5">
    <USkeleton
      class="w-[110px] h-[85px] md:w-[145px] md:h-[127px]"
      :ui="{ rounded: 'rounded-md' }"
    />

    <div class="flex-grow flex flex-col gap-5">
      <USkeleton class="w-full h-3" :ui="{ rounded: 'rounded-md' }" />

      <USkeleton class="w-full h-6" :ui="{ rounded: 'rounded-lg' }" />

      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <div class="flex md:gap-4 gap-2">
          <USkeleton class="w-20 h-6" :ui="{ rounded: 'rounded-lg' }" />

          <USkeleton class="w-20 h-6" :ui="{ rounded: 'rounded-lg' }" />

          <USkeleton class="w-20 h-6" :ui="{ rounded: 'rounded-lg' }" />
        </div>
      </div>
    </div>
  </div>
</template>
