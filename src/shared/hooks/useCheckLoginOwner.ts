import { useAuiStore } from '../store/auiStore';
import { useAuth } from './useApi/useAuth';


export const useCheckLoginOwner = () => {
  const { aui } = useAuiStore();
  const { user } = useAuth();

  const isLoggedInOwner = (): boolean => {
    if (user == null) return false;
    return user && user.aui === aui;
  }

  return { isLoggedInOwner };
};