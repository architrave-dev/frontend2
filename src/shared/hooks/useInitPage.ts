import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from './useAuiValidation';
import { UserData } from '../store/authStore';
import { useAuth } from './useApi/useAuth';
import { useEditMode } from './useEditMode';


export const useInitPage = () => {
  const { AUI } = useParams<{ AUI: string }>();
  useAuiValidation(AUI);

  const { isEditMode, setEditMode } = useEditMode();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (isEditMode) {
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