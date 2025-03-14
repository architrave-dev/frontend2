// 1. 로그인 정보 없으면 빠이
// 2. 로그인 정보가 해당 AUI와 맞지 않으면 빠이
export const isLoggedInOwner = (AUI: string | undefined): boolean => {
  if (!AUI) return false;
  const userData = localStorage.getItem('userData');
  if (!userData) return false;
  const userDataParsed = JSON.parse(userData);
  return userDataParsed.aui === AUI;
};