import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


const isValidAui = (AUI: string | undefined): boolean => {
  if (!AUI) return false;
  const auiPattern = /^[a-zA-Z0-9가-힣]+-[a-zA-Z0-9]{8}$/;

  return auiPattern.test(AUI);
};

export const useAuiValidation = () => {
  const { AUI } = useParams<{ AUI?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const errorRoute = '/error';

  const isValid = useMemo(() => {
    if (location.pathname === '/') return true;
    return isValidAui(AUI);
  }, [AUI, location.pathname]);

  useEffect(() => {
    if (!isValid) {
      try {
        navigate(errorRoute, { replace: true });
      } catch (error) {
        console.error('Navigation failed:', error);
      }
    }
  }, [isValid, navigate]);

  return AUI;
};