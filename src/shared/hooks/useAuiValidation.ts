import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAui } from './useAui';
import { useMember } from './useApi/useMember';


const isValidAui = (AUI: string): boolean => {
  if (!AUI) return false;
  const auiPattern = /^[a-f0-9]{8}$/;
  const onlyDigitsPattern = /^[0-9]+$/;
  const onlyLettersPattern = /^[a-f]+$/;

  if (onlyDigitsPattern.test(AUI) || onlyLettersPattern.test(AUI)) {
    return false;
  }

  return auiPattern.test(AUI);
};

export const useAuiValidation = (AUI: string | undefined) => {
  const { setOwnerAui } = useAui();
  const navigate = useNavigate();
  const errorRoute = '/error';
  const { checkAui } = useMember();

  useEffect(() => {
    const handleAui = async () => {
      if (!AUI) return;
      if (!isValidAui(AUI)) {
        console.error("Invalid AUI:", AUI);
        navigate(errorRoute);
        return;
      } else {
        await checkAui(AUI);
        setOwnerAui(AUI);
      }
    }
    handleAui();
  }, [AUI]);
};