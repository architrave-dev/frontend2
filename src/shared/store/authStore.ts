import { create } from 'zustand';

export interface UserData {
  id: number;
  email: string;
  username: string;
  aui: string;
  role: string;
}
export interface UserDataWithRefreshToken extends UserData {
  refreshToken: string;
}

interface AuthState {
  user: UserData | null;
}

interface AuthActions {
  setUser: (user: UserData | null) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));

interface EditModeState {
  isEditMode: boolean;
}

interface EditModeActions {
  setIsEditMode: (value: boolean) => void;
}

type EditModeStore = EditModeState & EditModeActions;

export const useEditModeStore = create<EditModeStore>((set) => ({
  isEditMode: false,
  setIsEditMode: (value) => set({ isEditMode: value }),
}));