import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuiValidation } from './useAuiValidation';
import { useAuth } from './useApi/useAuth';
import { UserData } from '../dto/EntityRepository';
import { useEditMode } from './useEditMode';
//AUI를 처음으로 받아서
//useAuiValidation 확인

//로그인정보 여부를 
// localStorage에서 확인 후
//user 세팅

export const useInitPage = () => {
  const { AUI } = useParams<{ AUI: string }>();
  const { user, setUser } = useAuth();
  const { isEditMode, setEditMode } = useEditMode();

  useAuiValidation(AUI);

  //뒤로가기, 앞으로가기 등 브라우저 레벨의 액션을 취했을 때, isEditMode를 false로 초기화
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
      }
    }
  }, []);

  return { AUI };
}