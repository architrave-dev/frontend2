import { create } from 'zustand';

export enum ModalType {
  NONE = 'NONE',
  SIGNIN = 'SIGNIN',
  LOGIN = 'LOGIN',
  ALERT = 'ALERT',
}
export interface UserData {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  user: UserData | null;
  authToken: string | null;
  isLoggedIn: boolean;
  isEditMode: boolean;
  modalType: ModalType;
}

interface AuthActions {
  setUser: (user: UserData | null) => void;
  setAuthToken: (token: string | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsEditMode: (value: boolean) => void;
  setModalType: (type: ModalType) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  authToken: null,
  isLoggedIn: false,
  isEditMode: false,
  modalType: ModalType.NONE,

  setUser: (user) => set({ user }),
  setAuthToken: (authToken) => set({ authToken }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setIsEditMode: (value) => set({ isEditMode: value }),
  setModalType: (type) => set({ modalType: type }),
  clearAuth: () => set({ user: null, authToken: null, isLoggedIn: false }),
}));