export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const locale = useNuxtApp().$i18n?.locale.value;
  const toast = useToast();

  if (to.meta.requireAuth && !token.value) {
    // 1- Show Message Not Authorized
    const message =
      locale == "en"
        ? "You have to login to access this page"
        : "يجب عليك تسجيل الدخول للوصول إلى هذه الصفحة";
    toast.add({
      color: "red",
      id: `Not_authenticated`,
      title: message,
    });

    // 2- Cancel Navigation
    if (from.href) {
      /* {{If}} Means that you navigate throw a link normaly */
      return navigateTo("/authentication/login");
    } else {
      /* {{Else}} Means that you navigate throw writing in the web search bar directly */
      return navigateTo("/authentication/login");
    }
  }

  if (to.path.includes("authentication") && token.value) {
    return navigateTo("/");
  }
});
