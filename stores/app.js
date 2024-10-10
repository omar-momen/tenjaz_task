export const useAppStore = defineStore("app", () => {
  // Loading
  const appInitLoading = ref(true);
  const pageLoading = ref(false);

  // Scroll
  const scroll_direction = ref(null);
  const handleScroll = (lastScrollTop) => {
    const scrollTopPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTopPosition > lastScrollTop.value) {
      scroll_direction.value = "down";
    } else if (scrollTopPosition < lastScrollTop.value) {
      scroll_direction.value = "up";
    }
    lastScrollTop.value = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  };
  const optimizedScroll = useHelpers().throttle(handleScroll, 200);

  // Resize
  const current_x_size = ref(null);
  const screen = computed(() => {
    if (current_x_size.value > 0 && current_x_size.value < 640) return "xs";
    if (current_x_size.value > 640 && current_x_size.value < 768) return "sm";
    if (current_x_size.value > 768 && current_x_size.value < 1024) return "md";
    if (current_x_size.value > 1024 && current_x_size.value < 1280) return "lg";
    if (current_x_size.value > 1280 && current_x_size.value < 1536) return "xl";
    else return "2xl";
  });
  const handleResize = () => {
    current_x_size.value = window.innerWidth;
  };
  const optimizedResize = useHelpers().debounce(handleResize, 200);

  // HandleFirtsLoad
  const handleFirstLoad = async () => {
    const lang = useCookie("i18n_redirected").value;
    document.documentElement.lang = lang;
    document
      .querySelector("body")
      .setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  };

  return {
    appInitLoading,
    pageLoading,

    optimizedScroll,
    scroll_direction,

    screen,
    current_x_size,
    optimizedResize,

    handleFirstLoad,
  };
});
