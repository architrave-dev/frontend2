import { create } from 'zustand';

export interface UserData {
  id: number;
  email: string;
  username: string;
  aui: string;
  role: string;
}

interface AuthState {
  user: UserData | null;
  authToken: string | null;
}

interface AuthActions {
  setUser: (user: UserData | null) => void;
  setAuthToken: (token: string | null) => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  authToken: null,

  setUser: (user) => set({ user }),
  setAuthToken: (authToken) => set({ authToken }),
  clearAuth: () => set({ user: null, authToken: null }),
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