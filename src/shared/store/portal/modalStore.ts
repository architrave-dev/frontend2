import { create } from 'zustand';

export enum ModalType {
  NONE = 'NONE',
  SIGNIN = 'SIGNIN',
  LOGIN = 'LOGIN',
  ALERT = 'ALERT',
}
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