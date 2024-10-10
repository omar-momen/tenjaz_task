export function useApi(url: string | (() => string), options?: any) {
  return useFetch(url, {
    ...options,
    // $fetch: useNuxtApp().$dollarfetch,
    $fetch: useNuxtApp().$axios,
  });
}
