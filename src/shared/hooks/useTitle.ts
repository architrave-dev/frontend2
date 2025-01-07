import { useEffect } from 'react';
import { extractUsernameFromAui } from './useApi/useAuth';
import { useAui } from './useAui';
import { useSetting } from '../../shared/hooks/useApi/useSetting';


export const useTitle = () => {
  const { aui } = useAui();
  const { setting } = useSetting();

  useEffect(() => {
    if (!setting) return;
    if (setting.pageName !== extractUsernameFromAui(aui)) {
      if (setting.pageName === "") {
        document.title = "Architrave";
      } else {
        document.title = setting.pageName.toUpperCase();
      }
    }
  }, [setting]);
}