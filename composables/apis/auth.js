export const authService = () => {
  const nuxtApp = useNuxtApp();

  const locale = nuxtApp?.$i18n?.locale;
  const toast = useToast();
  const $dollarfetch = nuxtApp.$dollarfetch;

  return {
    async login(loginData) {
      let data;

      try {
        data = await $dollarfetch("member/auth/login", {
          method: "POST",
          body: loginData,
        });
      } catch (error) {
        toast.add({
          color: "red",
          id: "login_failed",
          title: getError(error),
        });
        return 0;
      }

      const message = locale.value == "en" ? "Welcome back" : "مرحبا بك";
      toast.add({
        color: "green",
        id: "login_success",
        title: message,
      });

      return data?.value?.data;
    },

    async logout() {
      const { data, error } = await useApi("member/auth/logout", {
        method: "POST",
      });

      if (error.value) {
        toast.add({
          color: "red",
          id: "logout_failed",
          title: getError(error.value),
        });
        return null;
      }

      const message =
        locale.value == "en"
          ? "You have been logged out successfully"
          : "تم تسجيل الخروج بنجاح";
      toast.add({
        color: "green",
        id: "logout_success",
        title: message,
      });

      return data?.value?.data;
    },
  };
};
