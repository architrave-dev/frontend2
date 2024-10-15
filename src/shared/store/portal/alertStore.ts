import { create } from 'zustand';
import { AlertPosition, AlertType } from '../../enum/EnumRepository';


export interface StandardAlert {
  type: AlertType | null;
  position: AlertPosition | null;
  content: string;
  callBack?: () => void;
}

interface standardAlertState {
  standardAlert: StandardAlert | null;
  setStandardAlert: (standardAlert: StandardAlert) => void;
  clearAlert: () => void;
}

export const useStandardAlertStore = create<standardAlertState>((set) => ({
  standardAlert: null,
  setStandardAlert: (standardAlert: StandardAlert) => set({ standardAlert }),
  clearAlert: () => set({ standardAlert: null })
}));