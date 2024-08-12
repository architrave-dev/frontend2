import { useCallback, useMemo } from 'react';
import { useAuthStore, useEditModeStore } from '../store/authStore';


export const useEditMode = () => {
  const user = useAuthStore((state) => state.user);
  const isEditMode = useEditModeStore((state) => state.isEditMode);
  const setIsEditMode = useEditModeStore((state) => state.setIsEditMode);

  const effectiveIsEditMode = useMemo(() => isEditMode && (user != null), [isEditMode, user]);

  const setEditMode = useCallback((value: boolean) => {
    if (value && !user) {
      console.warn("Cannot enter edit mode when not logged in");
      return;
    }
    setIsEditMode(value);
  }, [user, setIsEditMode]);

  return {
    isEditMode: effectiveIsEditMode,
    setEditMode,
  };
};