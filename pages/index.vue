<template>
  <div class="index-page">
    <UContainer>
      <h1>Home Page</h1>

      <div class="flex flex-wrap gap-5 mt-5">
        <StatisticsCard
          title="Total Users"
          value="100"
          icon="i-heroicons-users"
          bgColor="primary"
          class="grow"
        />
        <StatisticsCard
          title="Active Requests"
          value="34"
          icon="icon-park-outline:pull-requests"
          bgColor="secondary"
          class="grow"
        />
        <StatisticsCard
          title="Total Users"
          value="100"
          icon="i-heroicons-users"
          bgColor="primary"
          class="grow"
        />
        <StatisticsCard
          title="Active Requests"
          value="34"
          icon="icon-park-outline:pull-requests"
          bgColor="secondary"
          class="grow"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: "HomePage",
});
</script>
