import { create } from 'zustand';

export enum ModalType {
  NONE = 'NONE',
  LOGIN = 'LOGIN',
  ALERT = 'ALERT',
}

interface AuthState {
  isLoggedIn: boolean;
  isEditMode: boolean;
  modalType: ModalType;
}

interface AuthActions {
  setIsLoggedIn: (value: boolean) => void;
  setIsEditMode: (value: boolean) => void;
  setModalType: (type: ModalType) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  isLoggedIn: false,
  isEditMode: false,
  modalType: ModalType.NONE,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setIsEditMode: (value) => set({ isEditMode: value }),
  setModalType: (type) => set({ modalType: type }),
}));