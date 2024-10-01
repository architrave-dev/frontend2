import { useState } from 'react';
import { UserData, useAuthStore } from '../store/authStore';
import { signUp, login, SignUpData, LoginData, AuthResponse, RefreshData, refresh } from '../api/authAPI';


interface UseAuthResult {
  isLoading: boolean;
  error: string | null;
  user: UserData | null;
  setUser: (user: UserData) => void;
  signUp: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  refresh: (data: RefreshData) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, clearAuth } = useAuthStore();

  const handleAuthSuccess = (response: AuthResponse) => {
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


  const handleAuthRequest = async <T extends SignUpData | LoginData | RefreshData>(
    authFunction: (data: T) => Promise<AuthResponse>,
    data: T
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authFunction(data);
      handleAuthSuccess(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpHandler = (data: SignUpData) => handleAuthRequest(signUp, data);
  const loginHandler = (data: LoginData) => handleAuthRequest(login, data);
  const refreshHandler = (data: RefreshData) => handleAuthRequest(refresh, data);

  const logout = () => {
    clearAuth();
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  return {
    isLoading,
    error,
    user,
    setUser,
    signUp: signUpHandler,
    login: loginHandler,
    refresh: refreshHandler,
    logout,
  };
}

export const extractUsernameFromAui = (aui: string): string => {
  return aui.split("-")[0];
}