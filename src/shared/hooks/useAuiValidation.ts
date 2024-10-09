import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAui } from './useAui';
import { useMember } from './useMember';


const isValidAui = (AUI: string | undefined): boolean => {
  if (!AUI) return false;
  const auiPattern = /^[a-zA-Z0-9가-힣]+-[a-zA-Z0-9]{8}$/;
  return auiPattern.test(AUI);
};

export const useAuiValidation = (AUI: string | undefined) => {
  const { setOwnerAui } = useAui();
  const navigate = useNavigate();
  const location = useLocation();
  const errorRoute = '/error';
  const { error, checkAui } = useMember();

  useEffect(() => {
    const handleAui = async () => {
      if (AUI === undefined) {
        navigate('/');
        return;
      }
      if (location.pathname !== '/' && !isValidAui(AUI)) {
        console.error("Invalid AUI:", AUI);
        navigate(errorRoute);
        return;
      } else {
        await checkAui(AUI);
        setOwnerAui(AUI);
      }
    }
    handleAui();
  }, [AUI, location.pathname, navigate]);

  useEffect(() => {
    if (error) {
      navigate('/');
    }

  }, [error]);

  return AUI;
};