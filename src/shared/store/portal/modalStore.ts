import { create } from 'zustand';
import { ModalType } from '../../enum/EnumRepository';


interface ModalState {
  modalType: ModalType;
}
interface ModalActions {
  setModalType: (type: ModalType) => void;
}

type ModalStore = ModalState & ModalActions;

export const useModalStore = create<ModalStore>()((set) => ({
  modalType: ModalType.NONE,
  setModalType: (type) => set({ modalType: type }),
}));