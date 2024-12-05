import { useCallback } from 'react';
import { useEditModeStore, useMenuToggleStore } from '../store/authStore';
import { useStandardAlertStore } from '../store/portal/alertStore';
import { AlertPosition, AlertType } from '../enum/EnumRepository';


export const useMenu = () => {
  const { isEditMode } = useEditModeStore();
  const { isMenuOpen, setIsMenuOpen } = useMenuToggleStore();
  const { setStandardAlert } = useStandardAlertStore();

  const openMenu = useCallback(() => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Cannot open menu in edit mode.",
      });
      return;
    }
    setIsMenuOpen(true);
  }, [isEditMode, setIsMenuOpen]);

  const closeMenu = useCallback(() => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Cannot close menu in edit mode.",
      });
      return;
    }
    setIsMenuOpen(false);
  }, [isEditMode, setIsMenuOpen]);

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
  };
};