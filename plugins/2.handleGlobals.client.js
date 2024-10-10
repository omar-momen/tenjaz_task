import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";

export default defineNuxtPlugin((nuxtApp) => {
  // App
  const appStore = useAppStore();
  appStore.handleFirstLoad();

  // Auth
  const authStore = useAuthStore();
  authStore.handleFirstLoad();

  nuxtApp.hook("app:mounted", async () => {
    // Handle Resize
    appStore.optimizedResize();
    window.addEventListener("resize", appStore.optimizedResize);

    // Handle Scroll
    const lastScrollTop = ref(document.documentElement.scrollTop);
    appStore.optimizedScroll(lastScrollTop);
    window.addEventListener(
      "scroll",
      () => {
        appStore.optimizedScroll(lastScrollTop);
      },
      false
    );
  });

  // Handle Page Loading...
  nuxtApp.hook("page:start", () => {
    if (appStore.appInitLoading) return;
    appStore.pageLoading = true;
  });
  nuxtApp.hook("page:finish", () => {
    appStore.pageLoading = false;
  });

  // Handle App Loading...
  nuxtApp.hook("app:suspense:resolve", async () => {
    appStore.appInitLoading = false;
  });
});
