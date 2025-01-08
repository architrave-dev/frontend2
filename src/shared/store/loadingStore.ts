// 글로벌 에러 처리를 위한 store
import { create } from 'zustand';

interface globalLoadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<globalLoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));