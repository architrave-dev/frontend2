import { AlertType } from '../enum/EnumRepository';
import { useStandardAlertStore } from '../store/portal/alertStore';
import { useEditMode } from './useEditMode';
import { AlertPosition } from '../enum/EnumRepository';

interface UseShiftTabResult {
  handleShiftTabForEditMode: (e: React.KeyboardEvent, isChanged: boolean) => void;
}

export const useShiftTab = (): UseShiftTabResult => {
  const { isEditMode, setEditMode } = useEditMode();
  const { setStandardAlert } = useStandardAlertStore();


  const handleShiftTabForEditMode = (e: React.KeyboardEvent, isChanged: boolean) => {
    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {        // Shift+Tab 키 조합 감지
          e.preventDefault();
          if (!isEditMode) {
            setEditMode(true);
          } else {
            if (isChanged) {
              setStandardAlert({
                type: AlertType.CONFIRM,
                position: AlertPosition.TOP,
                content: "You have unsaved changes. Are you sure you want to leave?\nAny unsaved changes will be discarded.",
                callBack: () => {
                  // setEditMode(false);
                  window.location.reload(); // 새로고침이 편하긴 해...
                  // 일단 이렇게 해두자.
                }
              })
            } else {
              setEditMode(false);
            }
          }
        }
        break;
      default:
        break;
    }
  };

  return { handleShiftTabForEditMode };
}

