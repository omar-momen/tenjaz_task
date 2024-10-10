import axios from "axios";

const handleUnAuthunticated = async (
  auth_store: any,
  locale: any,
  nuxtApp: any,
  response: any
) => {
  if (response.status === 401 && response.config.url.includes("/auth/logout")) {
    const toast = useToast();

    const message =
      locale == "en" ? "You have been logged out" : "تم تسجيل الخروج";

    toast.add({
      color: "green",
      id: "logout_success",
      title: message,
    });

    auth_store.clearStorage();

    return navigateTo("/authentication/login");
  }

  if (
    response.status === 401 &&
    !response.config.url.includes("/auth/login") &&
    !response.config.url.includes("/auth/logout") &&
    auth_store.user
  ) {
    await nuxtApp.$Swal.fire({
      title: useLayerHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.title")
      ),
      text: useLayerHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.text")
      ),
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: nuxtApp.$i18n.t("form.ok"),
    });

    auth_store.logOut();
  }
};

const handleUnAuthorized = async (locale: any, response: any) => {
  const toast = useToast();

  if (response.status === 403) {
    const message =
      locale == "en"
        ? "You don't have permission to access this page"
        : "ليس لديك الصلاحية للوصول إلى هذه الصفحة";
    toast.add({
      color: "green",
      id: "unauthorized",
      title: message,
    });
    return navigateTo("/");
  }
};

const serverError = async (locale: any, response: any) => {
  if (response.status === 500) {
    const message = locale == "en" ? "server error" : "خطأ في الخادم";
    showError({
      message: message,
      statusCode: 500,
    });
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("token");
  const locale = (nuxtApp.$i18n as any)?.locale;
  const appConfig = useRuntimeConfig();
  const auth_store = useAuthStore();

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: appConfig.public.apiBase,
  });

  // Add request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Set the Authorization header & Accept-Language
      if (token.value) {
        config.headers["Authorization"] = `Bearer ${token.value}`;
      }
      config.headers["Accept-Language"] = locale.value;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response error interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const response = error.response;

      if (response) {
        await handleUnAuthunticated(
          auth_store,
          locale.value,
          nuxtApp,
          response
        );
        await handleUnAuthorized(locale.value, response);
        await serverError(locale.value, response);
      }

      return Promise.reject(error);
    }
  );

  // Expose to useNuxtApp().$axios
  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
