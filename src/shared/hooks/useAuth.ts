import { useState } from 'react';
import { useAuthStore } from '../store';
import { signUp, login, SignUpData, LoginData, AuthResponse } from '../api/authAPI';


interface UseAuthResult {
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setAuthToken, clearAuth } = useAuthStore();

  const handleAuthSuccess = (response: AuthResponse) => {
    const { authToken, ...userData } = response.data;
    setUser(userData);
    setAuthToken(authToken);
  };


  const handleAuthRequest = async <T extends SignUpData | LoginData>(
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

  const logout = () => {
    clearAuth();
  };

  return {
    isLoading,
    error,
    signUp: signUpHandler,
    login: loginHandler,
    logout,
  };
}