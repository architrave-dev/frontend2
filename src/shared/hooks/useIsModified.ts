export const isModified = <T extends object>(prev: T, now: T): boolean => {
  const keys = new Set([...Object.keys(prev), ...Object.keys(now)]);
  return Array.from(keys).some(key => {
    return prev[key as keyof T] !== now[key as keyof T];
  });
};