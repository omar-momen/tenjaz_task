export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = useCookie("token");

  // ======== Handle First Load
  const handleFirstLoad = async () => {
    const localeUser = JSON.parse(localStorage.getItem("Blank_App_User"));
    if (!localeUser) return;
    user.value = localeUser;
  };

  // ======== Storage
  const setStorage = (userData) => {
    user.value = userData;
    token.value = userData.token;
    localStorage.setItem("Blank_App_User", JSON.stringify(userData));
    is_first_visit.value = userData.is_first_visit;
  };
  const clearStorage = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("Blank_App_User");
  };

  // ======== Main Actions
  const logIn = async (loginData, fakeLogin = false) => {
    if (fakeLogin) {
      setStorage(loginData);
      return navigateTo("/");
    }

    const user = await authService().login(loginData);
    if (user) {
      setStorage(user);
      return navigateTo("/");
    }
    return user;
  };

  const logOut = async (fakeLogin = false) => {
    if (fakeLogin) {
      clearStorage();
      return navigateTo("/authentication/login");
    }

    const data = await authService().logout();
    if (data) {
      clearStorage();
      return navigateTo("/authentication/login");
    }
  };

  return {
    logIn,
    logOut,

    user,

    handleFirstLoad,

    clearStorage,
    setStorage,
  };
});
