import { useCallback, useMemo } from 'react';
import { useAuiStore } from '../store/auiStore';


export const useAui = () => {
  const { aui, setAui } = useAuiStore();

  const currentAui = useMemo(() => aui, [aui]);

  const setOwnerAui = useCallback((value: string | undefined) => {
    if (value === undefined) {
      return;
    }
    setAui(value);
  }, [setAui]);

  return {
    aui: currentAui,
    setOwnerAui,
  };
};