import { useCallback } from 'react';
import { useModalStore } from '../store/portal/modalStore';
import { ModalType } from '../enum/EnumRepository';


export const useModal = () => {
  const setModalType = useModalStore((state) => state.setModalType);

  const openModal = useCallback((value: ModalType) => {
    setModalType(value);
  }, [setModalType]);

  const closeModal = useCallback(() => {
    setModalType(ModalType.NONE);
  }, [setModalType]);

  return {
    openModal,
    closeModal
  };
};