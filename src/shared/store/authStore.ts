import { create } from 'zustand';
import { UserData } from '../dto/EntityRepository';

interface AuthStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));

//----- editMode -----
interface EditModeStore {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export const useEditModeStore = create<EditModeStore>((set) => ({
  isEditMode: false,
  setIsEditMode: (value) => set({ isEditMode: value }),
}));