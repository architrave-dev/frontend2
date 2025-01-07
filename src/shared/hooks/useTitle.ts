import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAuiValidation } from './useAuiValidation';
import { extractUsernameFromAui } from './useApi/useAuth';
import { useEditMode } from './useEditMode';
import { UserData } from '../dto/EntityRepository';
import { useAui } from './useAui';
import { useSetting } from '../../shared/hooks/useApi/useSetting';


export const useTitle = () => {
  const { aui } = useAui();
  const { setting } = useSetting();

  useEffect(() => {
    if (!setting) return;
    if (setting.pageName !== extractUsernameFromAui(aui)) {
      document.title = setting.pageName.toUpperCase();
    }
  }, [setting]);
}