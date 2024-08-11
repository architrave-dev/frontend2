import { useCallback, useMemo } from 'react';
import { useAuthStore, useEditModeStore } from '../store/authStore';


export const useEditMode = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isEditMode = useEditModeStore((state) => state.isEditMode);
  const setIsEditMode = useEditModeStore((state) => state.setIsEditMode);

  const effectiveIsEditMode = useMemo(() => isEditMode && isLoggedIn, [isEditMode, isLoggedIn]);

  const setEditMode = useCallback((value: boolean) => {
    if (value && !isLoggedIn) {
      console.warn("Cannot enter edit mode when not logged in");
      return;
    }
    setIsEditMode(value);
  }, [isLoggedIn, setIsEditMode]);

  return {
    isEditMode: effectiveIsEditMode,
    setEditMode,
  };
};