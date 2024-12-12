import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { signUp, login, refresh } from '../../api/authAPI';
import { convertStringToErrorCode } from '../../api/errorCode';
import { useGlobalErrStore } from '../../store/errorStore';
import { UserData } from '../../dto/EntityRepository';
import { LoginReq, RefreshReq, SignUpReq } from '../../dto/ReqDtoRepository';
import { AuthResponse } from '../../dto/ResDtoRepository';


interface UseAuthResult {
  isLoading: boolean;
  user: UserData | null;
  setUser: (user: UserData) => void;
  signUp: (data: SignUpReq) => Promise<void>;
  login: (data: LoginReq) => Promise<void>;
  refresh: (data: RefreshReq) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { setManagedErr, clearErr } = useGlobalErrStore();
  const { user, setUser, clearAuth } = useAuthStore();

  const handleLoginSuccess = (response: AuthResponse) => {
    const { data, authToken } = response;
    const onlyUserData: UserData = {
      id: data.id,
      email: data.email,
      username: data.username,
      aui: data.aui,
      role: data.role
    };
    setUser(onlyUserData);
    localStorage.setItem('userData', JSON.stringify(onlyUserData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  const handleRefreshSuccess = (response: AuthResponse) => {
    const { data, authToken } = response;
    localStorage.setItem('authToken', authToken);
  };

  const handleSignupSuccess = (response: AuthResponse) => {
    const { data } = response;
  };


  const handleAuthRequest = async <T extends SignUpReq | LoginReq | RefreshReq>(
    action: 'signup' | 'login' | 'refresh',
    data: T
  ) => {
    setIsLoading(true);
    clearErr();
    try {
      switch (action) {
        case 'signup':
          handleSignupSuccess(await signUp(data as SignUpReq));
          break;
        case 'refresh':
          handleRefreshSuccess(await refresh(data as RefreshReq));
          break;
        case 'login':
        default:
          handleLoginSuccess(await login(data as LoginReq));
          break;
      }
    } catch (err) {
      const errCode = err instanceof Error ? err.message : 'An unexpected error occurred';
      const convertedErrCode = convertStringToErrorCode(errCode);
      setManagedErr({
        errCode: convertedErrCode,
        retryFunction: () => handleAuthRequest(action, data)
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUpHandler = (data: SignUpReq) => handleAuthRequest('signup', data);
  const loginHandler = (data: LoginReq) => handleAuthRequest('login', data);
  const refreshHandler = (data: RefreshReq) => handleAuthRequest('refresh', data);

  const logout = () => {
    clearAuth();
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  return {
    isLoading,
    user,
    setUser,
    signUp: signUpHandler,
    login: loginHandler,
    refresh: refreshHandler,
    logout,
  };
}

export const extractUsernameFromAui = (aui: string): string => {
  return aui.split("-")[0].toUpperCase();
}