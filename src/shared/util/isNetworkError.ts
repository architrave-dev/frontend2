export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error &&
    (error.message === 'Network Error' || !navigator.onLine);
};