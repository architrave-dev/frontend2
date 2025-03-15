import { useEffect } from 'react';
import { useSetting } from '../../shared/hooks/useApi/useSetting';


export const useTitle = () => {
  const { setting } = useSetting();

  useEffect(() => {
    if (!setting) return;
    if (setting.pageName === "") {
      document.title = "Architrave";
    } else {
      document.title = setting.pageName.toUpperCase();
    }
  }, [setting]);
}