import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isValidAui } from '../isValidAui';

export const useArtistIdValidation = () => {
  const { AUI } = useParams<{ AUI: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValidAui(AUI)) {
      navigate('/error', { replace: true });
    }
  }, [AUI, navigate]);

  return AUI;
};