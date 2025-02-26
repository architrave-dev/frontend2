import { useAuthStore } from '../../store/authStore';
import { signUp, login, refresh, activate } from '../../api/authAPI';
import { UserData, UserDataWithRefreshToken } from '../../dto/EntityRepository';
import { ActivateReq, LoginReq, RefreshReq, SignUpReq } from '../../dto/ReqDtoRepository';
import { AuthResponse, SimpleStringResponse } from '../../dto/ResDtoRepository';
import { useTempAlertStore } from '../../store/portal/tempAlertStore';
import { ModalType, TempAlertPosition, TempAlertType } from '../../enum/EnumRepository';
import { useApiWrapper } from './apiWrapper';
import { useModalStore } from '../../store/portal/modalStore';


interface UseAuthResult {
  user: UserData | null;
  setUser: (user: UserData) => void;
  signUp: (data: SignUpReq) => Promise<void>;
  login: (data: LoginReq) => Promise<void>;
  refresh: (data: RefreshReq) => Promise<void>;
  activate: (data: ActivateReq) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthResult => {
  const { user, setUser, clearAuth } = useAuthStore();
  const { setTempAlert } = useTempAlertStore();
  const { setStandardModal, clearModal } = useModalStore();
  const withApiHandler = useApiWrapper();

  const settingLoginUser = (data: UserDataWithRefreshToken, authToken: string) => {
    clearModal();
    const onlyUserData: UserData = {
      id: data.id,
      email: data.email,
      username: data.username,
      aui: data.aui,
      role: data.role
    };
    setUser(onlyUserData);
    setTempAlert({
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Welcome .",
      duration: 2000
    });
    localStorage.setItem('userData', JSON.stringify(onlyUserData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  const handleLoginSuccess = (response: AuthResponse) => {
    const { data, authToken } = response;
    settingLoginUser(data, authToken);
  };

  const handleRefreshSuccess = (response: AuthResponse) => {
    const { authToken } = response;
    localStorage.setItem('authToken', authToken);
  };

  const handleSignupSuccess = (response: SimpleStringResponse) => {
    const { data } = response;
    setTempAlert({
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Please verify your email.",
      duration: 2000
    });
    setStandardModal({
      modalType: ModalType.VERIFICATION,
      title: null,
      value: data.value || null,
      handleChange: () => { }
    });
  };

  const handleActivateSuccess = (response: AuthResponse) => {
    const { data } = response;
    setTempAlert({
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Email verification is complete. Please log in.",
      duration: 2000
    });
    setStandardModal({
      modalType: ModalType.LOGIN,
      title: null,
      value: null,
      handleChange: () => { }
    });
  };

  const handleAuthRequest = async <T extends SignUpReq | LoginReq | RefreshReq | ActivateReq>(
    action: 'signup' | 'login' | 'refresh' | 'activate',
    data: T
  ) => {
    const apiFunction = async () => {
      switch (action) {
        case 'signup':
          return handleSignupSuccess(await signUp(data as SignUpReq));
        case 'refresh':
          return handleRefreshSuccess(await refresh(data as RefreshReq));
        case 'activate':
          return handleActivateSuccess(await activate(data as ActivateReq));
        case 'login':
        default:
          return handleLoginSuccess(await login(data as LoginReq));
      }
    };

    await withApiHandler(apiFunction, [action, data]);
  };

  const signUpHandler = (data: SignUpReq) => handleAuthRequest('signup', data);
  const loginHandler = (data: LoginReq) => handleAuthRequest('login', data);
  const refreshHandler = (data: RefreshReq) => handleAuthRequest('refresh', data);
  const activateHandler = (data: ActivateReq) => handleAuthRequest('activate', data);
  const logout = () => {
    clearAuth();
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setTempAlert({
      type: TempAlertType.UPDATED,
      position: TempAlertPosition.RB,
      content: "Goodbye.",
      duration: 3000
    });
  };

  return {
    user,
    setUser,
    signUp: signUpHandler,
    login: loginHandler,
    refresh: refreshHandler,
    activate: activateHandler,
    logout,
  };
}

export const extractUsernameFromAui = (aui: string): string => {
  return aui.split("-")[0].toUpperCase();
}