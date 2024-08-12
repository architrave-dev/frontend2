import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAui } from './useAui';


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

  useEffect(() => {
    if (location.pathname !== '/' && !isValidAui(AUI)) {
      console.error("Invalid AUI:", AUI);
      navigate(errorRoute);
    } else {
      setOwnerAui(AUI);
    }
  }, [AUI, location.pathname, navigate]);

  return AUI;
};