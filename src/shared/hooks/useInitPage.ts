import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAuiValidation } from './useAuiValidation';
import { useAuth } from './useApi/useAuth';
import { useEditMode } from './useEditMode';
import { UserData } from '../dto/EntityRepository';


export const useInitPage = () => {
  const { AUI } = useParams<{ AUI: string }>();
  const [searchParams] = useSearchParams();
  useAuiValidation(AUI);

  const { isEditMode, setEditMode } = useEditMode();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const editModeParam = searchParams.get('isEditMode');
    if (editModeParam) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      const userFromStorage = localStorage.getItem('userData');
      if (userFromStorage) {
        const parsedUserData: UserData = JSON.parse(userFromStorage);
        setUser(parsedUserData);
      } else {
        console.error("there is no login data");
      }
    }
  }, [user]);

  return { AUI, user };
}