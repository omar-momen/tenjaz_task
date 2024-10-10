<template>
  <div class="app">
    <AppLoader v-if="appStore?.appInitLoading" />
    <div class="layout-wrapper">
      <NuxtLayout>
        <PageLoader v-if="appStore?.pageLoading" />
        <div class="page-wrapper md:py-10 py-6">
          <NuxtPage />
        </div>
        <NuxtLoadingIndicator />
      </NuxtLayout>
    </div>

    <UNotifications />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const appStore = useAppStore();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${nuxtApp.$i18n.t("app.title")}`
      : nuxtApp.$i18n.t("app.title");
  },
  meta: [
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "description",
      content:
        "نحن شركة تقنية سعودية متخصصة فى تقديم حلول مبتكرة فى مجال البرمجة وتطوير المواقع والتطبيقات الإلكترونية. نهدف إلى تقديم خدمات متكاملة لعملائنا من خلال الجمع بين الإبداع التقني والجودة العالية لتلبية احتياجات السوق المتغيرة باستمرار.",
    },
    {
      name: "author",
      content: "Tenjaz",
    },
    {
      name: "keywords",
      content: "BYE",
    },
    {
      property: "og:title",
      content: "Tenjaz",
    },
    {
      property: "og:descreption",
      content:
        "نحن شركة تقنية سعودية متخصصة فى تقديم حلول مبتكرة فى مجال البرمجة وتطوير المواقع والتطبيقات الإلكترونية. نهدف إلى تقديم خدمات متكاملة لعملائنا من خلال الجمع بين الإبداع التقني والجودة العالية لتلبية احتياجات السوق المتغيرة باستمرار.",
    },
    {
      property: "og:type",
      content: "website",
    },
    // {
    //   property: "og:image",
    //   content: "/images/logo.png",
    // },
    {
      property: "og:url",
      content: "https://tenjaz-task.vercel.app/",
    },

    {
      property: "twitter:title",
      content: "Tenjaz",
    },
    {
      property: "twitter:descreption",
      content:
        "نحن شركة تقنية سعودية متخصصة فى تقديم حلول مبتكرة فى مجال البرمجة وتطوير المواقع والتطبيقات الإلكترونية. نهدف إلى تقديم خدمات متكاملة لعملائنا من خلال الجمع بين الإبداع التقني والجودة العالية لتلبية احتياجات السوق المتغيرة باستمرار.",
    },
    {
      property: "twitter:type",
      content: "website",
    },
    // {
    //   property: "twitter:image",
    //   content: "/images/logo.png",
    // },
    {
      property: "twitter:url",
      content: "https://tenjaz-task.vercel.app/",
    },
  ],
});
</script>
