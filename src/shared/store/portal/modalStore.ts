import { create } from 'zustand';
import { ModalType } from '../../enum/EnumRepository';

export interface StandardModal {
  modalType: ModalType;
  title: string | null;
  value: string | null;
  handleChange: (value: string) => void;
}

interface standardModalState {
  standardModal: StandardModal | null;
  isClosing: boolean;
  setStandardModal: (standardModal: StandardModal) => void;
  clearModal: () => void;
}

export const useModalStore = create<standardModalState>()((set) => ({
  standardModal: null,
  isClosing: false,
  setStandardModal: (standardModal: StandardModal) =>
    set({ standardModal, isClosing: false }),
  clearModal: () => {
    set({ isClosing: true });

    setTimeout(() => {
      set({ standardModal: null, isClosing: false });
    }, 300);
  }
}));