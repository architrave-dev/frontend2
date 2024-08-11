import { create } from 'zustand';
import defaultImage from '../asset/project/launches_header_desktop.jpg'

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

interface LandingBoxState {
  title: string;
  description: string;
  backgroundImageUrl: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setBackgroundImageUrl: (url: string) => void;
}

export const useLandingBoxStore = create<LandingBoxState>((set) => ({
  title: 'Initial Title',
  description: 'Initial Description',
  backgroundImageUrl: defaultImage,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setBackgroundImageUrl: (backgroundImageUrl) => set({ backgroundImageUrl }),
}));