<template>
  <div class="index-page">
    <UContainer class="flex flex-col md:flex-row gap-6">
      <section class="flex flex-col gap-6">
        <h1>Home Page</h1>

        <div class="flex flex-wrap gap-5">
          <StatisticsCard
            title="Total Users"
            value="100"
            icon="i-heroicons-users"
            bgColor="primary"
          />
          <StatisticsCard
            title="Active Requests"
            value="34"
            icon="icon-park-outline:pull-requests"
            bgColor="secondary"
          />
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: "HomePage",
});
</script>
