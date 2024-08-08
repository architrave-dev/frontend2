export const isValidAui = (AUI: string | undefined): boolean => {
  if (!AUI) return false;
  const auiPattern = /^[a-zA-Z0-9가-힣]+-[a-zA-Z0-9]{8}$/;

  return auiPattern.test(AUI);
};