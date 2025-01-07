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
  setStandardModal: (standardModal: StandardModal) => void;
  clearModal: () => void;
}

export const useModalStore = create<standardModalState>()((set) => ({
  standardModal: null,
  setStandardModal: (standardModal: StandardModal) => set({ standardModal }),
  clearModal: () => set({ standardModal: null })
}));