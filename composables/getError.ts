export const getError = (error: any) => {
  // Extract error message depending on api structure
  return error?.data?.message || "msg failed";
};
