export default defineAppConfig({
  ui: {
    primary: "Tprimary",
    gray: "neutral",

    input: {
      rounded: "rounded-xl",
    },

    container: {
      padding: "px-4",
    },

    slideover: {
      wrapper: "z-[9999]",
    },

    button: {
      color: {
        default: {
          solid:
            "rounded-xl text-whiteColor bg-gradient-to-r from-primary-700 to-secondary-500 text-md",
        },
      },
    },
  },
});
